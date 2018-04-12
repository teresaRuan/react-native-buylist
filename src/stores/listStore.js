import { observable, computed, action, flow } from 'mobx';
import { fetchList } from '../api/server';
// import { ListView, Text } from 'react-native';

class ListStore {
  @observable propleList = [];
  //   action.bound  可以用来自动地将动作绑定到目标对象
  @action
  handleList = function() {
    let that = this;
    try {
      fetchList().then(result => {
        that.propleList = result.data;
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export default new ListStore();
