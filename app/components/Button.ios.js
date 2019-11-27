import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={this.props.buttonStyle}>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Button;
