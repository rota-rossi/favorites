import React, { Component } from 'react';
import { ListItem, Text, Right, Icon } from 'native-base';
import initialCase from '../utils/stringUtils'
import { Actions } from 'react-native-router-flux';

export default class FavoriteListItem extends Component {
  render() {
    return (
      <ListItem onPress={() => Actions.FavoriteDetails({ product: this.props.product })}>
        <Text>{initialCase(this.props.product.product_type)}</Text>
        <Right><Icon name="ios-arrow-forward" /></Right>
      </ListItem>
    );
  }
}