import React, { Component } from 'react';
import { Container, Content, Text, Icon, List, ListItem, Right, Separator } from 'native-base';

import initialCase from '../utils/stringUtils'

import FavoriteProductItem from './FavoriteProductItem'

export default class ProductDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: initialCase(navigation.state.params.product.product_type)
  });
  render() {
    const categories = ['favorites', 'acceptables', 'unacceptables'];
    const { product } = this.props
    return (
      <Container>
        <Content>
          <List style={{ backgroundColor: 'white' }}
          >
            {categories.map((category, i) => (
              product[category].length ?
                <Content key={category}>
                  <Separator>
                    <Text>
                      {category.toUpperCase()}
                    </Text>
                  </Separator>
                  {
                    product[category].map(item =>
                      <FavoriteProductItem key={item} item={item} />
                    )
                  }
                  <Separator />
                </Content>
                : null
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}