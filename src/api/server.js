import FileSystem from 'react-native-filesystem';
import * as path from '../constants/path';
import SQLite from '../sqlite/sqlite';

var sqlite = new SQLite();
// sqlite.init()
async function readFile(path) {
  const fileContainer = await FileSystem.readFile(path.MAINPATH + '/' + path);
  return JSON.parse(fileContainer);
}

async function writeToFile(path, val) {
  await FileSystem.writeToFile(path.MAINPATH + '/' + path, val);
}
// 获取首页任务列表
export const fetchList = () => sqlite.queryHome();

// 获取已有商品列表
export const fetchSelectList = fn => {
  sqlite.queryProduct(fn);
};

// 添加任务, 任务内进行商品是否存在，不存在添加新商品
export const anscyPerson = params => {
  sqlite.insertOrder(params);
};

export const fetchOrder = uid => sqlite.queryPeronOrder(uid);

// 删除商品任务
export const fetchDel = orderId => sqlite.delPersonOrder(orderId);

// 更新订单
export const updateOrder = (id, num) => sqlite.updateOrder(id, num);

// 获取每个产品的目前基本信息
export const fetchProductInfo = () => sqlite.queryProduct();
/*
用户列表页面
{
    data: [
        {
            username: '',
            uid: '',
            totalPrice: ''
        }
    ]
} */
// 添加用户至用户列表

const addPerson = (user, data) => {
  //   let data = readFile(path.PEPLELIST);
  let userOption = {
    username: user,
    uid: ++data.data.length,
    totalPrice: ''
  };
  let userInfo = Object.assign({}, userOption);
  data.data.push(userInfo);
  writeToFile(path.PEPLELIST, Object.assign({}, data));
};
/*
商品列表页面
*/
const addProduct = product => {
  let newProduct = data.data.filter(item => !item.id);
  if (newProduct.length <= 0) return;
  let data = readFile(path.SELECTLIST);
  let l = data.data.length + 1;
  let param = [];
  newProduct.map((item, i) => {
    param.push({
      product: item.name,
      id: l + i,
      img: item.img,
      unit: item.unit
    });
  });
  data.data = data.data.concat(param);
  writeToFile(path.SELECTLIST, Object.assign({}, data));
};
