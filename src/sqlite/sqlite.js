import React, { Component } from 'react';
import config from './config';
import SQLiteStorage from 'react-native-sqlite-storage';
import { anscyPerson } from '../api/server';
// import { resolve } from 'path';

// SQLiteStorage.DEBUG(true);
// SQLiteStorage.enablePromise(true);
let db;
export default class SQLite {
  constructor() {
    this.createProTable();
    this.createUserTable();
    this.createOrderTable();
  }
  componentWillUnmount() {
    this.close();
  }
  createUserTable() {
    this.createTable(
      'CREATE TABLE IF NOT EXISTS USER(uid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR)'
    );
  }
  createProTable() {
    this.createTable(
      'CREATE TABLE IF NOT EXISTS PRODUCT(pid INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, price VARCHAR, unit VARCHAR, img VARCHAR)'
    );
  }
  createOrderTable() {
    // this.createTable(
    //   'CREATE TABLE IF NOT EXISTS ORDER (id INTEGER PRIMARY KEY AUTOINCREMENT,uid  INTEGER NOT NULL,name VARCHAR,pid  INTEGER NOT NULL,num  INTEGER)'
    // );
    this.createTable(
      'CREATE TABLE IF NOT EXISTS ITEM (id INTEGER PRIMARY KEY AUTOINCREMENT,uid  INTEGER NOT NULL,name VARCHAR,pid  INTEGER,num  INTEGER)'
    );
  }
  createTable(sql) {
    if (!db) {
      this.open();
    }
    db.transaction(
      tx => {
        tx.executeSql(
          sql,
          [],
          x => {
            console.log('表创建成功', x);
            this._successCB('表创建成功');
          },
          err => {
            this._errorCB('excutesql', err);
          }
        );
      },
      err => {
        this._errorCB('transaction', err);
      },
      () => {
        this._successCB('transaction');
      }
    );
  }
  open() {
    db = SQLiteStorage.openDatabase(
      config,
      () => {
        this._successCB('open');
      },
      err => {
        this._errorCB('open', err);
      }
    );
  }
  close() {
    if (db) {
      db.close();
      this._successCB('close');
    }
    db = null;
  }
  transaction(fn) {
    db.transaction(
      tx => {
        fn(tx);
      },
      err => this._errorCB('insert', err),
      () => this._successCB('insert')
    );
  }
  // 商品相关
  // 获取所有商品列表
  queryProduct(fn) {
    let result = {};
    this.transaction(tx => {
      tx.executeSql('SELECT * FROM PRODUCT', [], (tx, rs) => {
        result.data = [];
        for (let i = rs.rows.length - 1; i >= 0; --i) {
          rs.rows.item(i) && result.data.push(rs.rows.item(i));
        }
        result.status = '10010';
        fn(result);
      });
    });
    // return result;
  }
  // 添加order
  async insertOrder(data) {
    let that = this;
    // await this.transaction(tx => {
    let { username, list } = data;
    console.log('insert');
    let params = {
      uid: ''
    };
    this.insertUserData(data.name)
      .then(uid => {
        params.uid = uid || data.uid;
        console.log(uid);
        return this.insertProduct(list);
      })
      .then(product => {
        console.log('开始插入', product);
        this.transaction(tx => {
          console.log(product);
          product.map((item, i) => {
            try {
              tx.executeSql(
                'INSERT INTO ITEM(uid, pid, num) values(?,?,?)',
                [params.uid, item.id, item.num, item.unit],
                (tx, rs) => {
                  console.log('插入成功');
                },
                err => {
                  console.log('ITEM 插入失败', err);
                }
              );
            } catch (err) {
              console.log(err);
            }
            console.log('插入操作');
          });
        });
      });
    // });
  }
  // 添加用户
  insertUserData(name, tx) {
    let that = this;
    return new Promise((resolve, reject) => {
      if (!name) {
        resolve();
      } else {
        that.transaction(tx => {
          let sql = 'INSERT INTO USER(name) values(?)';
          tx.executeSql(
            sql,
            [name],
            (tx, rs) => {
              resolve(rs.insertId);
              console.log('添加用户' + rs.insertId);
            },
            err => {
              reject();
            }
          );
        });
      }
    });
  }
  // 添加新的产品
  async insertProduct(product, tx) {
    let arr = Array.from(product);
    let pro = [];
    let that = this;
    return new Promise((resolve, reject) => {
      // that.transaction(tx => {
      arr.map((item, i) => {
        that.transaction(tx => {
          try {
            if (!item.id) {
              tx.executeSql(
                'INSERT INTO product(name, unit, img) VALUES(?,?,?)',
                [item.name, item.unit, item.img],
                (tx, rs) => {
                  pro.push({ id: rs.insertId, num: item.num || 1 });
                  i == arr.length - 1 && resolve(pro);
                  console.log(rs.insertId);
                },
                err => {
                  console.log(err);
                }
              );
            } else {
              pro.push({ id: item.id, num: item.num || 1 });
              i == arr.length - 1 && resolve(pro);
              console.log('add', i == arr.length - 1);
            }
          } catch (err) {}
        });
      });
      // });
    });
  }
  _successCB(name) {
    console.log(name + 'success');
  }
  _errorCB(name, err) {
    console.log(name, err);
  }
  // 公共查询方法
  handleQuery(sql) {
    let that = this;
    return new Promise((resolve, reject) => {
      that.transaction(tx => {
        let result = {};
        tx.executeSql(
          sql,
          [],
          (tx, rs) => {
            result.data = [];
            for (let i = rs.rows.length - 1; i >= 0; --i) {
              rs.rows.item(i) && result.data.push(rs.rows.item(i));
            }
            result.status = '10010';
            resolve(result);
          },
          err => {
            console.log(err);
          }
        );
      });
    });
  }
  // 公共删除方法
  // 首页展示列表
  queryHome() {
    return this.handleQuery('SELECT * FROM USER ');
  }
  // 个人页面订单
  queryPeronOrder(uid) {
    return this.handleQuery(
      'SELECT * FROM ITEM  LEFT JOIN PRODUCT ON ITEM.pid=PRODUCT.pid WHERE uid=' +
        uid
    );
  }
  // 删除个人订单
  delPersonOrder(orderId) {
    console.log('del action' + orderId);
    return this.handleQuery('DELETE FROM ITEM WHERE id =' + orderId);
  }
  // 更新个人订单
  updateOrder(orderId, num) {
    console.log('更新个人订单', orderId, num);
    return this.handleQuery(
      'UPDATE ITEM SET num=' + num + ' WHERE id=' + orderId
    );
  }
  // 获取每件商品的信息
  queryProduct() {
    return this.handleQuery(
      'SELECT ITEM.pid,name,price,img,unit, SUM(num) FROM ITEM ' +
        'INNER JOIN PRODUCT ON ITEM.pid=PRODUCT.pid GROUP BY ITEM.pid;'
    );
  }
  // render() {
  //   return null;
  // }
}

// export default SQLite;
