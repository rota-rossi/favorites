import React, { Component } from 'react';
import { ListItem, Text, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux'



import initialCase from '../utils/stringUtils'

export default class FavoriteProductItem extends Component {
  render() {
    return (
      <ListItem onPress={() => Actions.ProductDetails({ product: this.props.item })}>
        <Text>{initialCase(this.props.item.product_name)}</Text>
        <Right><Icon name="ios-arrow-forward" /></Right>
      </ListItem>
    );
  }
}