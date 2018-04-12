import { observable, action, computed, flow } from 'mobx';
import { anscyPerson, fetchOrder, fetchDel, updateOrder } from '../api/server';
class PersonStore {
  @observable product = [];
  @observable orderList = [];

  @computed
  get currentProduct() {
    let arr = this.product.filter(item => !!item.name);
    return arr;
  }

  @action.bound
  addProduct = function() {
    this.product.push({});
  };

  @action.bound
  editProduct = function(id, data, type) {
    type ? (this.product[id][type] = data) : (this.product[id] = data);
  };

  // 提交任务添加
  @action
  addPerson = function(pa) {
    try {
      let params = Object.assign({}, { list: this.currentProduct }, pa);
      let status = anscyPerson(params);

      return status;
    } catch (err) {}
  };

  // 获取当前用户的order列表
  @action
  fetchOrderList = function(uid) {
    let that = this;
    try {
      fetchOrder(uid).then(result => {
        console.log(result);
        that.orderList = result.data;
      });
    } catch (err) {
      console.log(err);
    }
  };
  // 删除添加产品任务
  @action.bound
  delPro = function(orderId, index) {
    let that = this;
    try {
      fetchDel(orderId).then(result => {
        let arr = Array.from(that.orderList);
        that.orderList = arr.filter((item, i) => i != index);
        // }
      });
    } catch (err) {
      console.log(err);
    }
  };
  @action.bound
  updateOrder = function(id, current) {
    let that = this;
    updateOrder(id, current);
    try {
    } catch (e) {
      console.log(err);
    }
  };
}

export default new PersonStore();
