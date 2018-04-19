import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export default WrappedComponent => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = {
        overlay: true,
        closeOnClickOverlay: true
      };
    }

    render() {
      return (
        <View style={style.container}>
          <WrappedComponent />
          {/* 蒙层 */}
          <View style={style.bg} />
        </View>
      );
    }
  }

  return NewComponent;
};
// Wrap ;

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingTop: '40%',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height,
    zIndex: 9
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.4)'
  }
});
