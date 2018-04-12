import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AddItem extends Component {
  render() {
    return <View style={style.item} />;
  }
}

const styles = {
  item: {
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: 350,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#e6e6e6',
    borderWidth: 1
  }
};
