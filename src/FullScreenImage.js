import React, { Component } from 'react';
import { Button, Icon } from 'native-base'
import { ImageBackground, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class FullScreenImage extends Component {
  render() {
    return (
      <ImageBackground style={{ flex: 1, width: null, height: null }} source={{ uri: this.props.image }}>
        <StatusBar
          hidden={true}
        />
        <Button transparent onPress={Actions.pop}>
          <Icon style={{ color: 'white' }} name='ios-close-circle-outline' />
        </Button>
      </ImageBackground>
    )
  }
}