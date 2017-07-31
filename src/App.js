import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Container, Content, Root, List, ListItem, Text, Icon } from 'native-base';
import { Router, Scene, } from 'react-native-router-flux';

import Nav from './Nav'
import FavoritesList from './FavoritesList'
import FavoriteDetails from './FavoriteDetails'
import ProductDetails from './ProductDetails'
import AddCategory from './AddCategory'
import AddSubCategory from './AddSubCategory'


// import createDB from '../seeds/createDB'
// createDB()

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Menu',
    drawerIcon: ({ tintColor }) => (
      <Icon name='ios-menu' />
    )
  });
  render() {
    return (
      <FavoritesList />
    );
  }
}

// this.props.navigation.navigate('DrawerOpen')
const AppNavigator = () => (
  <Router>
    <Scene key='root'>
      <Scene key='Home' component={HomeScreen} title='Favorites' />
      <Scene key='FavoriteDetails' component={FavoriteDetails} title='Favorite Details' />
      <Scene key='ProductDetails' component={ProductDetails} title='Product Details' />
      <Scene key='AddCategory' component={AddCategory} title='Add Category' />
      <Scene key='AddSubCategory' component={AddSubCategory} title='Add Sub-category' />
    </Scene>
  </Router>
)

const App = () => (
  <Root>
    <AppNavigator />
  </Root>
)
AppRegistry.registerComponent('favorites', () => App);
