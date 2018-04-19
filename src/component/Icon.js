import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

let iconMap = {
  home: '0xe654',
  order: '0xe674',
  add: '0xe659'
};
export default class Icon extends Component {
  render() {
    const { name } = this.props;
    return (
      <Text style={[styles.icon]}>{String.fromCharCode(iconMap[name])}</Text>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
    fontSize: 22
  }
});
