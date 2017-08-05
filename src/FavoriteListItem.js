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
      'Delete', 'Are you sure? All products from this sub-category will also be deleted!',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.props.favoriteStore.deleteSubCategory(this.props.subCategory._id)
              .then(result => {
                Toast.show({
                  text: 'Deleted Successfully!',
                  type: 'success',
                  position: 'bottom',
                  duration: 5000
                })
              })
              .catch(error => {
                console.log(error)
                Toast.show({
                  text: error,
                  type: 'error',
                  position: 'bottom',
                  duration: 5000
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
    const { subCategory, editable } = this.props
    const { subCategoryName } = subCategory
    return (
      <ListItem
        onPress={() => !this.props.edit ? Actions.FavoriteDetails({ subCategory }) : null}
      >
        <Text>
          {initialCase(subCategoryName)}
        </Text>
        {this.props.edit ?
          <Right>
            <Row>
              <Button style={{ flex: 0 }} small transparent onPress={() => Actions.EditSubCategory({ subCategoryID: subCategory._id })} >
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
            <Icon name="ios-arrow-forward" />
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
    //       <ListItem onPress={() => Actions.FavoriteDetails({ subCategory })}>
    //         <Text>{initialCase(subCategoryName)}</Text>
    //       </ListItem>
    //     }
    //   />
    // )
  }
}