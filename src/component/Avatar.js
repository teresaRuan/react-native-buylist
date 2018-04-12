import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Avatar extends Component {
  render() {
    const { isEdit, name } = this.props;
    return (
      <View
        style={[
          style.avatarContainer,
          { backgroundColor: isEdit ? '#f9f9f9' : '#48a7bd' }
        ]}
      >
        {/* <View> */}
        {isEdit ? (
          <Image
            source={require('../assets/image/add_duck.png')}
            style={style.avatar}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../assets/image/add_duck.png')}
            style={style.avatar}
            resizeMode="contain"
          />
        )}
        <Text style={style.name}>{name}</Text>
        {/* </View> */}
      </View>
    );
  }
}
const style = StyleSheet.create({
  avatarContainer: {
    height: 200,
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  avatar: {
    marginTop: -40,
    width: '30%'
  },
  name: {
    marginTop: -40,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
});
