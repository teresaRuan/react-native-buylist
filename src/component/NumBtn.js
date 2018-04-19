import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NumBtn extends Component {
  render() {
    return (
      <View style={style.editNum}>
        <Text style={style.btnNum} onPress={this.delNum.bind(this)}>
          -
        </Text>
        <Text style={style.currentNum}>{this.state.currentNum || num}</Text>
        <Text style={style.btnNum} onPress={this.addNum.bind(this)}>
          +
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  editNum: {
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnNum: {
    width: 30,
    height: 30,
    lineHeight: 25,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 3,
    textAlign: 'center'
  },
  currentNum: {
    width: 90,
    height: 30,
    textAlign: 'center',
    lineHeight: 35
  }
});
