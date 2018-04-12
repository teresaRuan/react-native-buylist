import React, { Component } from 'react';
import {
  ScrollView,
  Button,
  StyleSheet,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import ProductList from '../component/ProductList';
import PersonStore from '../stores/PersonStore';
import { observer } from 'mobx-react';
import Avatar from '../component/Avatar';

@observer
export default class Personal extends Component {
  static navigationOptions = {
    title: 'person'
  };
  constructor(props) {
    super(props);
    this.state = {
      uid: props.navigation.state.params.data.uid
    };
  }
  componentDidMount() {
    // let uid = this.props.navigation.state.params.uid
    PersonStore.fetchOrderList(this.state.uid);
  }
  _skip() {
    this.props.navigation.navigate('Add', {
      uid: this.state.uid
    });
  }
  render() {
    const { name } = this.props.navigation.state.params.data;
    return (
      <View style={style.page}>
        <Avatar name={name} />
        <ProductList
          data={PersonStore.orderList}
          handleDel={PersonStore.delPro}
          updateOrder={PersonStore.updateOrder}
        />
        <SafeAreaView style={style.btn}>
          <Text style={style.text} onPress={this._skip.bind(this)}>
            添加
          </Text>
        </SafeAreaView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  page: {
    // position: 'relative',
    flex: 1,
    backgroundColor: '#fff'
    // backgroundColor: '#fff'
  },
  btn: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#ff8e8e'
  },
  text: {
    width: '100%',
    lineHeight: 30,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
});
