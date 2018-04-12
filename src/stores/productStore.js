import { observable, action, computed, flow } from 'mobx';
import { fetchSelectList } from '../api/server';
import { ListView } from 'react-native';

class ProductStore {
  constructor() {
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }
  @observable product = [];
  @observable dataSource = this.ds.cloneWithRows(this.product);
  // get dataSource() {
  //   console.log('change');
  //   return this.ds.cloneWithRows(this.product);
  // }
  @action
  handleSelectList = flow(function*() {
    try {
      let that = this;
      fetchSelectList(result => {
        console.log(result);
        that.dataSource = that.ds.cloneWithRows(result.data);
      });
    } catch (err) {}
  });
}
export default new ProductStore();
