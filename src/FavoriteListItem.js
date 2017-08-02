import React, { Component } from 'react';
import { ListItem, Text, Right, Icon } from 'native-base';
import initialCase from '../utils/stringUtils'
import { Actions } from 'react-native-router-flux';

export default class FavoriteListItem extends Component {
  render() {
    const { subCategory, category } = this.props
    const { subCategoryName } = subCategory
    return (
      <ListItem
        onPress={() => Actions.FavoriteDetails({ subCategory, category })}>
        <Text>
          {initialCase(subCategoryName)}
        </Text>
        <Right>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    );
  }
}