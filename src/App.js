import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Content, Root, List, ListItem, Text } from 'native-base';
import { Router, Scene, } from 'react-native-router-flux';

import favorites from '../data/favorites'

import Nav from './Nav'
import FavoritesList from './FavoritesList'
import FavoriteDetails from './FavoriteDetails'
import ProductDetails from './ProductDetails'

class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content >
          <FavoritesList />
        </Content>
      </Container>
    );
  }
}

const AppNavigator = () => (
  <Router>
    <Scene key='root'>
      <Scene key='Home' component={HomeScreen} title='Favorites' />
      <Scene key='FavoriteDetails' component={FavoriteDetails} title='Details' />
      <Scene key='ProductDetails' component={ProductDetails} title='Details' />
    </Scene>
  </Router>
)

const App = () => (
  <Root>
    <AppNavigator />
  </Root>
)
AppRegistry.registerComponent('favorites', () => App);
