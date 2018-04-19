import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list } = this.props.list;
    console.log(list);
    return (
      <View>
        {list &&
          list.map(item => {
            return (
              <View style={[style.row, style.container]}>
                <View style={style.img}>
                  <Image />
                </View>
                <View style={style.content}>
                  <View style={[style.row, style.between, style.dis]}>
                    <Text style={style.name}>{item.name}</Text>
                    <Text style={style.name}>¥{item.price || '-'}</Text>
                  </View>
                  <Text style={[style.dis, style.label]}>
                    需购买量 <Text style={style.num}>{item.SUM(num)}</Text>
                  </Text>
                  <Text style={[style.dis, style.label]}>
                    实购买量 <Text style={style.num}>{item.buy}</Text>
                  </Text>
                  <Text style={[style.dis, style.label]}>
                    售价
                    <Text style={style.num}> ¥{item.sale || '-'}</Text>
                  </Text>
                  <View style={[style.row, style.between]}>
                    <View style={[style.btn, style.upBtn]}>
                      <Text style={[style.btnContent, style.upContent]}>
                        更新
                      </Text>
                    </View>
                    {/* <View style={[style.btn, style.comBtn]}>
                    <Text style={[style.btnContent, style.comContent]}>完成</Text>
                  </View> */}
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  between: {
    justifyContent: 'space-between'
  },
  content: {
    paddingTop: 10,
    width: '75%'
  },
  img: {
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#e6e6e6'
  },
  dis: {
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    color: '#333'
  },
  label: {
    fontWeight: 'bold'
  },
  num: {
    paddingLeft: 10,
    fontWeight: '300'
  },
  btn: {
    width: '45%',
    borderRadius: 4
  },
  upBtn: {
    backgroundColor: '#F5F5F8'
    // color: '#ff8e8e'
  },
  comBtn: {
    backgroundColor: '#ff8e8e'
    // color: '#fff'
  },
  btnContent: {
    letterSpacing: 5,
    lineHeight: 30,
    textAlign: 'center'
  },
  upContent: {
    color: '#ff8e8e'
  },
  comContent: {
    color: '#fff'
  }
});
