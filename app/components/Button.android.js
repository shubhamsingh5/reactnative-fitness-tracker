import React from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <TouchableNativeFeedback onPress={() => this.props.onPress()}>
        <View style={this.props.buttonStyle}>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default Button;
