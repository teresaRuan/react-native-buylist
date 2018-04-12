import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class SelectItem extends Component {
  render() {
    return (
      <View>
        <Button title={this.props.data.name} />
      </View>
    );
  }
}
