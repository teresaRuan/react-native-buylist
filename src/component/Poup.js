import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Input from './Input';
import Wrap from './WrappComponent';

class Poup extends Component {
  render() {
    const { name, num, buyPrice, sale } = this.props;
    return (
      <View style={style.container}>
        <Text style={style.title}>产品名字</Text>
        <View>
          <Input label="购买数量" />
          <Input label="售价" />
          <Input label="购入价格" />
        </View>
        <View style={style.btnContainer}>
          <Text style={style.btn}>确认更改</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    zIndex: 999
  },
  title: {
    paddingBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    marginLeft: '10%',
    width: '80%',
    backgroundColor: '#2e889d',
    borderRadius: 5
  },
  btn: {
    color: '#fff',
    lineHeight: 32,
    textAlign: 'center'
  }
});

export default Wrap(Poup);
