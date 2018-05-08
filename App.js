import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
// import Index from './src/views/index';
import Navigator from './src/router/stack';

const AppNavigation = () => <Navigator />;
// type Props = {};
export default class App extends Component {
  render() {
    return <AppNavigation />;
  }
}
