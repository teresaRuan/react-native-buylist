import React, { Component } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  CameraRoll,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from './Icon';
import SelectInput from './SelectInput';

export default class ProEdit extends Component {
  constructor(props) {
    super(props);
    this._update = this._update.bind(this);
  }
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        console.log(err);
      });
  };
  _skip() {
    const { index, navigation, handleSelect } = this.props;
    navigation.navigate('Select', { id: index, select: handleSelect });
  }
  // 可删除
  _update(val, s) {
    this.props.handleSelect;
    console.log(val, s);
  }
  render() {
    const { index, name, handleSelect, unit } = this.props;
    return (
      <View style={style.container}>
        <View style={style.row}>
          <TouchableOpacity onPress={this._handleButtonPress.bind(this)}>
            <View style={style.imgContainer}>
              <Image
                source={require('../assets/image/img.png')}
                resizeMethod="contain"
                style={style.defaultImg}
              />
            </View>
            {/* <Text
              style={style.image}
              onPress={this._handleButtonPress.bind(this)}
            /> */}
          </TouchableOpacity>
          <View style={[style.row, style.nameContainer]}>
            <Icon name={'home'} />
            <Text onPress={this._skip.bind(this)} style={style.name}>
              {name || '输入商品名称'}
            </Text>
          </View>
        </View>
        {/* 数量 */}
        <View style={style.section}>
          <View style={style.num}>
            <TextInput
              onChangeText={val => handleSelect(index, val, 'num')}
              style={[style.input, style.smallInput]}
              placeholder="数量"
            />
            <Text style={style.ge}> /</Text>
            <TextInput
              value={unit || ''}
              onChangeText={val => handleSelect(index, val, 'unit')}
              style={[style.input, style.smallInput]}
              placeholder="单位"
            />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingBottom: 20,
    // borderBottomWidth: 10,
    // borderBottomColor: '#efefef',
    backgroundColor: '#fff'
  },
  input: {
    width: 200,
    marginBottom: 22,
    paddingLeft: 10,
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  smallInput: {
    paddingLeft: 0,
    width: 100,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ge: {
    color: '#e6e6e6',
    marginLeft: 10,
    marginRight: 10
  },
  num: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    marginBottom: 10
  },
  section: {
    marginTop: 15
  },
  nameContainer: {
    marginLeft: 20
  },
  name: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333'
  },
  imgContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9'
  },
  defaultImg: {
    width: 40,
    height: 40
  }
});
