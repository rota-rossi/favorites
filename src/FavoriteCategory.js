import React, { Component } from 'react';
import { Text, Content, ListItem, Separator } from 'native-base';
import initialCase from '../utils/stringUtils'

import FavoriteListItem from './FavoriteListItem'
export default class FavoriteCategory extends Component {
  render() {
    const { category, products } = this.props.prodCategory
    return (
      <Content style={{ backgroundColor: 'white' }}>
        <Separator>
          <Text>{category.toUpperCase()}</Text>
        </Separator>
        {
          products.map(product => (
            <FavoriteListItem key={product.product_type} product={product} />
          ))
        }
        <Separator />
      </Content>
    );
  }
}

