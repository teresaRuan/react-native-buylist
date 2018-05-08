import React, { Component } from 'react';
import { ScrollView, ListView } from 'react-native';
import ListItem from '../component/ListItem';
import Poup from '../component/Poup';
import { observer } from 'mobx-react';
import OrderStore from '../stores/orderStore';

@observer
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProp: false,
      popInfo: {}
    };
    this._showPoup = this._showPoup.bind(this);
  }
  componentDidMount() {
    OrderStore.fetchList();
  }
  _showPoup(item, i) {
    this.setState(
      {
        showProp: true,
        popInfo: item
      },
      () => {
        console.log(this.state.popInfo);
      }
    );
  }
  render() {
    return (
      <ScrollView>
        <ListItem list={OrderStore.orderList} showUpdate={this._showPoup} />
        {/* <Poup /> */}
        {this.state.showProp ? <Poup info={this.state.popInfo} /> : null}
      </ScrollView>
    );
  }
}
