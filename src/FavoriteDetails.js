import React, { Component } from 'react';
import { Container, Content, Text, Icon, Button, List, ListItem, Right, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import initialCase from '../utils/stringUtils'

let Datastore = require('react-native-local-mongodb')

// let db = new Datastore({ filename: 'favoritesDocs', autoload: true });
let dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })

@inject('favoriteStore') @observer
export default class FavoriteDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      types: ['favorites', 'acceptables', 'unacceptables']
    }
  }

  // componentDidMount() {
  //   let { _id: subCategoryID } = this.props.subCategory
  //   dbProducts.find({ subCategoryID }, (err, res) => {
  //     this.setState({ products: res })
  //   })
  // }

  // componentWillReceiveProps(nextProps) {
  //   let { subCategoryID } = nextProps.type

  //   dbProducts.find({ subCategoryID }, (err, res) => {

  //     this.setState({ products: res })
  //   })
  // }

  static navigationOptions = ({ navigation }) => ({
    title: initialCase(navigation.state.params.subCategory.subCategoryName)
  });
  render() {
    const { types } = this.state
    const { _id: subCategoryID } = this.props.subCategory
    const { _id: categoryID } = this.props.category
    const products = this.props.favoriteStore.filteredProducts(subCategoryID)

    return (
      <Container>
        <Content>
          <List style={{ backgroundColor: 'white' }}
          >
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
