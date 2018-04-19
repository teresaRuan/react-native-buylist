import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      moveY: new Animated.Value(28),
      scale: new Animated.Value(1),
      lineScale: new Animated.Value(0)
    };
  }
  handleFocus() {
    if (!this.val) {
      Animated.timing(this.state.moveY, {
        toValue: 0,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
      Animated.timing(this.state.scale, {
        toValue: 0.8,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
      Animated.timing(this.state.lineScale, {
        toValue: 1,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
    }
  }
  handleBlur() {
    if (!this.state.val) {
      Animated.timing(this.state.moveY, {
        toValue: 28,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
      Animated.timing(this.state.scale, {
        toValue: 1,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
      Animated.timing(this.state.lineScale, {
        toValue: 0,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        duration: 450
      }).start();
    }
  }
  render() {
    const { label } = this.props;
    return (
      <View style={style.container}>
        <Animated.Text
          style={[
            style.label,
            {
              transform: [
                {
                  translateY: this.state.moveY
                },
                {
                  scale: this.state.scale
                }
              ]
            }
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          style={style.input}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
        />
        <View>
          <Text style={style.line} />
          <Animated.Text
            style={[
              style.line,
              style.focusLine,
              {
                transform: [{ scaleX: this.state.lineScale }]
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 30
  },
  label: {
    position: 'absolute',
    top: 8,
    color: 'rgba(0, 0, 0, 0.38)',
    transform: [{ scale: 1 }]
  },
  input: {
    height: 32
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    left: 0,
    right: 0,
    position: 'absolute'
  },
  focusLine: {
    height: 2,
    backgroundColor: '#2e889d'
  }
});
