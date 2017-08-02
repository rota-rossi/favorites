import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux'


export default class BarcodeReader extends Component {

  captureBarcode = (data, bounds) => {
    Actions.pop()
    this.props.returnBarcode('upc_code', data.data);
  }

  render() {
    return (
      <Container>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.captureBarcode}
          barcodeTypes={['ean8', 'ean13']}
        >
          <Text style={styles.capture} onPress={Actions.pop}>[Back]</Text></Camera>
      </Container>
    );
  }
}



const styles = {
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
}