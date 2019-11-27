import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Button from './Button';

class Modal extends React.Component {
  render() {
    if(this.props.show) {
      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);

      return (
        <View style={{position: 'absolute'}}>
          <TouchableWithoutFeedback onPress={() => this.props.hide()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={{fontSize: 25, marginLeft: 20, marginTop: 15}}>Modal</Text>
            <Button buttonStyle={{alignItems: 'center', justifyContent: 'center', width: 70, height: 70, position: 'absolute', right: 0}} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
          </View>
        </View>
      )
    }
    return (<View></View>)
  }
}

export default Modal;
