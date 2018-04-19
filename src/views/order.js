import React, { Component } from 'react';
import { ScrollView, ListView } from 'react-native';
import ListItem from '../component/ListItem';
import Poup from '../component/Poup';
import { observer } from 'mobx-react';
import OrderStore from '../stores/orderStore';

@observer
export default class Order extends Component {
  componentDidMount() {
    OrderStore.fetchList();
    console.log(OrderStore.orderList);
  }
  render() {
    return (
      <ScrollView>
        <ListItem list={OrderStore.orderList} />
        <Poup />
      </ScrollView>
    );
  }
}
