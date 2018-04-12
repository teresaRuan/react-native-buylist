import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

// type Props = {};
export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this._skip = this._skip.bind(this);
  }
  _skip() {
    console.log(this.props.data);
    this.props.navigation.navigate('Person', { data: this.props.data });
  }
  render() {
    return (
      <View style={styles.item}>
        <Text onPress={this._skip}>{this.props.data.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    // marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12.5,
    width: '100%',
    height: 50,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1
  }
});
