import React, { Component } from 'react';
import CardList from '../component/CardList';
import { View, Button, Picker, ScrollView, StyleSheet } from 'react-native';
import ListStore from '../stores/listStore';
import { observer } from 'mobx-react';

@observer
export default class Home extends Component {
  // static navigationOptions = {
  //   title: ''
  // };
  constructor(props) {
    super(props);
  }
  addList() {
    this.props.navigation.navigate('Add');
  }
  componentDidMount() {
    ListStore.handleList();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.info} />
        <CardList
          navigation={this.props.navigation}
          data={ListStore.propleList}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  info: {
    marginTop: 20,
    marginLeft: '10%',
    width: '80%',
    height: 150,
    borderRadius: 5,
    backgroundColor: '#A2C7D4'
  }
});
// #A2C7D4
