import { observable, computed, action } from 'mobx';
import { fetchProductInfo } from '../api/server';

class OrderStore {
  @observable orderList = [];

  @action
  fetchList = function() {
    let that = this;
    try {
      fetchProductInfo().then(result => {
        console.log(result);
        that.orderList = result.data;
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default new OrderStore();
