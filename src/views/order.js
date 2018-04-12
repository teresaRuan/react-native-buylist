import React, { Component } from 'react';
import { ScrollView, ListView } from 'react-native';
import ListItem from '../component/ListItem';

export default class Order extends Component {
  render() {
    return (
      <ScrollView>
        <ListItem />
      </ScrollView>
    );
  }
}
