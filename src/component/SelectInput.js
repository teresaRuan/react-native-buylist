import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Picker
} from 'react-native';

export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        { name: '测试商品一', id: 1 },
        { name: '测试商品二', id: 2 },
        { name: '其他', id: 3 }
      ]),
      current: '',
      showList: false
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(data) {
    this.setState({
      current: data.name,
      showList: false
    });
  }
  handleList() {
    this.setState({
      showList: true
    });
  }
  render() {
    return (
      <View style={style.select}>
        {/* 所选内容展示区域 */}
        <View style={style.inputContainer}>
          <TextInput
            onFocus={this.handleList.bind(this)}
            style={style.input}
            placeholder="输入商品名"
          />
        </View>
        {/* 选项内容 */
        this.state.showList ? (
          <ListView
            style={style.list}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Text
                onPress={() => {
                  this.handleSelect(rowData);
                }}
              >
                {rowData.name}
              </Text>
            )}
          />
        ) : null}
      </View>
    );
  }
}

const style = StyleSheet.create({
  inputContainer: {
    // position: 'fixed',
    // top: 0,
    // left: 0
  },
  input: {
    width: 200,
    marginBottom: 22,
    paddingLeft: 10,
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  }
  // list: {
  //   position: 'fixed'
  // }
});
