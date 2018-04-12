import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Avatar from '../component/Avatar';
import SelectInput from '../component/SelectInput';
import ProEdit from '../component/ProEdit';
import AddBtn from '../component/AddBtn';
import PersonStore from '../stores/PersonStore';
import { observer } from 'mobx-react';

@observer
export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      uid: null
    };
  }
  getName(val) {
    this.setState({
      name: val
    });
  }
  async handleCreate() {
    let param = this.state.uid
      ? { uid: this.state.uid }
      : { name: this.state.name };
    await PersonStore.addPerson(param);
    this.props.navigation.navigate('Main');
  }
  componentDidMount() {
    // let uid = this.props.navigation.state.params.uid || null;
    this.setState({
      uid: this.props.navigation.state.params
        ? this.props.navigation.state.params.uid
        : null
    });
  }
  render() {
    return (
      <ScrollView style={style.container}>
        <Avatar isEdit={true} />
        {/* <Text>
          添加新用户信息
          </Text> */}
        <View style={style.content}>
          {this.state.uid ? null : (
            <TextInput
              onChangeText={this.getName.bind(this)}
              style={style.input}
              placeholder="输入用户名"
            />
          )}
          {/* <View style={style.container}> */}
          <View style={style.proList}>
            {PersonStore.product.map((item, i) => {
              return (
                <ProEdit
                  handleSelect={PersonStore.editProduct}
                  navigation={this.props.navigation}
                  key={i}
                  index={i}
                  name={item.name}
                  unit={item.unit}
                />
              );
            })}
            <AddBtn handle={PersonStore.addProduct} />
          </View>
          {/* </View> */}
          {/* <Button title="创建" onPress={this.handleCreate.bind(this)} /> */}
        </View>
        <TouchableOpacity onPress={this.handleCreate.bind(this)}>
          <View style={style.btnContainer}>
            <Image
              source={require('../assets/image/add_btn.jpg')}
              resizeMode="contain"
              style={style.btn}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  content: {
    // paddingTop: 20,
    // paddingLeft: 10,
    // paddingRight: 20
  },
  input: {
    marginTop: 10,
    marginLeft: 10,
    paddingLeft: 10,
    marginBottom: 10,
    lineHeight: 30,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
    // backgroundColor: '#fff'
  },
  proList: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 10,
    borderColor: '#efefef',
    borderBottomWidth: 10
    // borderTopColor: '#efefef',
  },
  btnContainer: {
    alignItems: 'center'
  },
  btn: {
    width: 70
  }
});
