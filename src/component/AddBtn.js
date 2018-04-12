import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class AddBtn extends Component {
  constructor(props) {
    super(props);
  }
  test() {
    console.log('ccc');
    this.props.handle();
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.handle} style={styles.btn}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/image/add.png')}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  },
  btn: {
    // marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#c3c3c3',
    borderRadius: 5
  }
});
