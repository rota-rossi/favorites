import React, { Component } from 'react';
import { Container, Content, Text, Icon, Button, Left, Title, Body, List, ListItem, Right, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import initialCase from '../utils/stringUtils'

import NavHeader from './common/NavHeader'


@inject('favoriteStore') @observer
export default class FavoriteDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      types: ['favorites', 'acceptables', 'unacceptables']
    }
  }

  render() {
    const { types } = this.state
    const { _id: subCategoryID, subCategoryName } = this.props.subCategory
    const { _id: categoryID } = this.props.category
    const products = this.props.favoriteStore.filteredProducts(subCategoryID)

    return (
      <Container>
        <NavHeader back title={initialCase(subCategoryName)} />
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {types.map(type =>
              <Content key={type}>
                <Separator>
                  <Text>
                    {type.toUpperCase()}
                  </Text>
                </Separator>
                {
                  products.filter(prod => prod.type === type).length ?
                    products
                      .filter(prod => prod.type === type)
                      .map(product =>
                        <ListItem key={product._id} onPress={() => Actions.ProductDetails({ productID: product._id })}>
                          <Text>{product.product_name}</Text>
                          <Right><Icon name="ios-arrow-forward" /></Right>
                        </ListItem>
                      )
                    :
                    <ListItem>
                      <Text>No Products</Text>
                    </ListItem>
                }
              </Content>
            )}
          </List>
          <Separator />
          <Button full onPress={() => Actions.ProductDetails({ subCategoryID, categoryID })}>
            <Text>Add New Product</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
