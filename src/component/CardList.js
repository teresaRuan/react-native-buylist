import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardItem from './CardItem';

export default class CardList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, navigation } = this.props;
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>全部用户</Text> */}
        {data.map((item, i) => {
          return <CardItem navigation={navigation} data={item} key={item.id} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '90%',
    marginLeft: '5%'
  },
  title: {
    marginTop: 20,
    fontSize: 14,
    color: '#999'
  }
});
