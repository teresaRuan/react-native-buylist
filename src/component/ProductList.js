import React, { Component } from 'react';
import { View } from 'react-native';
import ProductItem from './ProductItem';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, handleDel, updateOrder } = this.props;
    return (
      <View>
        {data.map((item, i) => {
          return (
            <ProductItem
              data={item}
              index={i}
              key={item.id}
              del={handleDel}
              updateOrder={updateOrder}
            />
          );
        })}
      </View>
    );
  }
}
