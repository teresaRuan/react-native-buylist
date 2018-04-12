import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Picker,
  SafeAreaView
} from 'react-native';
import ProductStore from '../stores/productStore';
import { observer } from 'mobx-react';

let navigation;
let id, handle;
let inputVal;
let handleChange = function(val) {
  inputVal = val;
};
const searchHeader = () => (
  <SafeAreaView style={style.header}>
    <Text style={style.left} onPress={() => navigation.goBack()}>
      取消
    </Text>
    <View style={style.container}>
      <TextInput
        onChangeText={handleChange}
        style={style.input}
        placeholder="输入商品名"
      />
    </View>
    <Text
      style={style.right}
      onPress={() => {
        handle(id, { name: inputVal });
        navigation.goBack();
      }}
    >
      完成
    </Text>
  </SafeAreaView>
);

@observer
export default class Select extends Component {
  static navigationOptions = {
    header: searchHeader,
    headerStyle: {}
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(ProductStore.product),
      current: '',
      showList: true
    };
    navigation = this.props.navigation;
    handle = this.props.navigation.state.params.select;
    id = this.props.navigation.state.params.id;
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    ProductStore.handleSelectList();
  }
  componentWillUpdate() {
    console.log('update');
    console.log(ProductStore.dataSource);
  }
  handleSelect(data) {
    const { id, select } = this.props.navigation.state.params;
    // const select = this.props.handleSelect;
    select(id, data);
    this.props.navigation.goBack();
  }
  handleList() {
    this.setState({
      showList: true
    });
  }
  render() {
    return (
      <ScrollView style={style.select}>
        {/* 所选内容展示区域 */}
        {/* <View style={style.inputContainer}>
          <TextInput style={style.input} placeholder="输入商品名" />
        </View> */}
        {/* 选项内容 */}
        <ListView
          style={style.list}
          enableEmptySections={true}
          dataSource={ProductStore.dataSource}
          renderRow={rowData => (
            <View style={style.product}>
              <Text
                onPress={() => {
                  this.handleSelect(rowData);
                }}
                style={style.productContent}
              >
                {rowData.name}
              </Text>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  select: {
    backgroundColor: '#fff'
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33798c',
    flexDirection: 'row'
  },
  left: {
    marginLeft: 10,
    color: '#fff'
  },
  right: {
    marginRight: 10,
    color: '#fff'
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    width: 250,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    // lineHeight: 30,
    backgroundColor: '#fff',
    borderRadius: 3
  },
  product: {
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  productContent: {
    color: '#333',
    lineHeight: 40
  },
  list: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff'
  }
});
