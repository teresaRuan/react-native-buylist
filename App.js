import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
// import Index from './src/views/index';
import Navigator from './src/router/stack';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu'
// });
const AppNavigation = () => <Navigator />;
// type Props = {};
export default class App extends Component {
  render() {
    return <AppNavigation />;
  }
}
