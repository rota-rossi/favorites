import React, { Component } from 'react';
import { SwipeRow, Row, Body, Text, Right, Icon, Button, ListItem, View, Toast } from 'native-base';
import initialCase from '../utils/stringUtils'
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native'

import { inject } from 'mobx-react'


@inject('favoriteStore')
export default class FavoriteListItem extends Component {
  showAlert = () => {
    Alert.alert(
      'Delete', 'Are you sure? All products of this type will also be deleted!',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.favoriteStore.deleteProductType(this.props.productType._id)
              .then(result => {
                Toast.show({
                  text: 'Deleted Successfully!',
                  type: 'success',
                  position: 'top',
                  duration: 2000
                })
              })
              .catch(error => {
                console.log(error)
                Toast.show({
                  text: error,
                  type: 'error',
                  position: 'top',
                  duration: 2000
                })
              })
          }
        },
        {
          text: 'Cancel'
        }
      ])
  }
  render() {
    const { productType, editable } = this.props
    const { productTypeName } = productType
    return (
      <ListItem
        onPress={() => !this.props.edit ? Actions.FavoriteDetails({ productType }) : null}
      >
        <Text>
          {initialCase(productTypeName)}
        </Text>
        {this.props.edit ?
          <Right>
            <Row>
              <Button style={{ flex: 0 }} small transparent onPress={() => Actions.EditProductType({ productTypeID: productType._id })} >
                <Icon name='md-create' />
              </Button>
              <Button style={{ flex: 0 }} small transparent
                onPress={
                  () => this.showAlert()}>
                <Icon name='trash' />
              </Button>
            </Row>
          </Right>
          :
          <Right>
            <Icon name="ios-arrow-forward" style={{ color: '#FF4081' }} />
          </Right>
        }
      </ListItem>
    );

    // NOT READY YET: Wait for Native base to support it.
    // return (
    //   <SwipeRow
    //     rightOpenValue={-75}
    //     disableRightSwipe
    //     right={
    //       <Button danger onPress={() => alert('Trash')}>
    //         <Icon active name="trash" />
    //       </Button>
    //     }
    //     body={
    //       <ListItem onPress={() => Actions.FavoriteDetails({ productType })}>
    //         <Text>{initialCase(productTypeName)}</Text>
    //       </ListItem>
    //     }
    //   />
    // )
  }
}