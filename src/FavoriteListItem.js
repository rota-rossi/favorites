import React, { Component } from 'react';
import { SwipeRow, Row, Body, Text, Right, Icon, Button, ListItem, View } from 'native-base';
// import { ListItem, Text, Right, Icon, SwipeRow, Button } from 'native-base';
import initialCase from '../utils/stringUtils'
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native'

export default class FavoriteListItem extends Component {
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
              <Button style={{ flex: 0 }} small transparent>
                <Icon name='md-create' />
              </Button>
              <Button style={{ flex: 0 }} small transparent
                onPress={
                  () => Alert.alert('Delete', 'Are you sure? item ' + subCategory._id, [{ text: 'Yes' }, { text: 'Cancel' }])}>
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