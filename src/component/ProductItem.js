import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endX: 0,
      oldX: 0,
      moveX: new Animated.Value(0),
      isEdit: false,
      currentNum: props.data.num
    };
    this.num = null;
  }
  handleDel() {
    this.props.del(this.props.data.id);
  }
  handleEdit() {
    this.setState({
      isEdit: true,
      oldX: 0,
      endX: 0
    });
    Animated.timing(this.state.moveX, {
      toValue: 0
    }).start();
  }
  _handleMove(evt) {
    const { locationX } = evt.nativeEvent;
    // console.log('move' + (this.state.startX - pageX));
    if (this.state.oldX == 0) {
      this.setState({
        oldX: locationX
      });
      return true;
    }
    let dis = locationX - this.state.oldX;
    if (dis > 0 && this.state.endX == 0) {
      return;
    }
    dis = dis > 0 ? 0 : Math.abs(dis) > 10 ? -140 : 0;
    Animated.timing(this.state.moveX, {
      toValue: dis
    }).start();
    this.setState({
      endX: locationX
    });
    // evt.stopPropagation();
    return true;
  }
  _handleOut(evt) {
    this.setState({
      oldX: 0
    });
  }
  delNum() {
    if (this.currentNum == 1) {
      return;
    }
    this.setState({
      currentNum: this.state.currentNum--
    });
  }
  addNum() {
    this.setState({
      currentNum: ++this.state.currentNum
    });
  }
  updateOrder() {
    const { data, updateOrder } = this.props;
    if (this.state.currentNum != data.num) {
      updateOrder(data.id, this.state.currentNum);
    }
    this.setState({
      isEdit: false
    });
  }
  render() {
    const { name, unit, num, price, img, id } = this.props.data;
    const index = this.props.index;
    // this.setState({
    //   currentNum: num
    // });
    return (
      <Animated.View
        style={[style.item, { transform: [{ translateX: this.state.moveX }] }]}
        // onStartShouldSetResponderCapture={evt => true}
        // onMoveShouldSetResponderCapture={this._handleMove.bind(this)}
        onStartShouldSetResponder={() => true}
        onResponderMove={this._handleMove.bind(this)}
        onResponderRelease={this._handleOut.bind(this)}
      >
        {/* 产品信息 */}
        {this.state.isEdit ? (
          <View style={style.editContainer}>
            <View>
              <Text style={[style.name, style.editName]}>{name}</Text>
              <View style={style.editNum}>
                <Text style={style.btnNum} onPress={this.delNum.bind(this)}>
                  -
                </Text>
                <Text style={style.currentNum}>
                  {this.state.currentNum || num}
                </Text>
                <Text style={style.btnNum} onPress={this.addNum.bind(this)}>
                  +
                </Text>
              </View>
            </View>
            <Text
              style={style.btnComplete}
              onPress={this.updateOrder.bind(this)}
            >
              完成
            </Text>
          </View>
        ) : (
          <View style={style.row}>
            <View style={style.info}>
              <Text style={style.name}>{name}</Text>
              <Text style={style.price}>{price || ''}</Text>
              <Text style={style.num}>
                x {this.state.currentNum}/{unit}
              </Text>
            </View>
            {/* 按钮 */}
            <View style={style.btnList}>
              <Text
                style={style.delBtn}
                onPress={() => this.props.del(id, index)}
              >
                删除
              </Text>
              <Text style={style.editBtn} onPress={this.handleEdit.bind(this)}>
                编辑
              </Text>
            </View>
          </View>
        )}
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // paddingTop: 10,
    // paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6'
    // transform: [{ translateX: -100 }]
  },
  row: {
    flexDirection: 'row'
  },
  productImg: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 20,
    width: 100,
    height: 100,
    backgroundColor: '#e6e6e6'
  },
  info: {
    paddingLeft: '5%',
    paddingTop: 20,
    width: Dimensions.get('window').width
  },
  name: {
    color: '#696770',
    fontSize: 18
  },
  editName: {
    marginLeft: '5%',
    marginBottom: 10
  },
  price: {
    marginTop: 15,
    marginBottom: 5,
    color: '#666',
    fontSize: 14
  },
  num: {
    fontSize: 15,
    color: '#e63639'
  },
  btnList: {
    flexDirection: 'row'
  },
  delBtn: {
    width: 70,
    lineHeight: 120,
    backgroundColor: '#f1667d',
    color: '#fff',
    textAlign: 'center'
  },
  editBtn: {
    width: 70,
    lineHeight: 120,
    backgroundColor: '#a2a1a6',
    textAlign: 'center',
    color: '#fff'
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  editNum: {
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnNum: {
    width: 30,
    height: 30,
    lineHeight: 25,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 3,
    textAlign: 'center'
  },
  btnComplete: {
    width: 70,
    lineHeight: 120,
    backgroundColor: '#e04a4a',
    color: '#fff',
    textAlign: 'center'
  },
  currentNum: {
    width: 90,
    height: 30,
    textAlign: 'center',
    lineHeight: 35
  }
});
