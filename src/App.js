import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'mobx-react'

import Nav from './Nav'
import FavoritesList from './FavoritesList'
import FavoriteDetails from './FavoriteDetails'
import ProductDetails from './ProductDetails'
import AddCategory from './AddCategory'
import AddSubCategory from './AddSubCategory'
import BarcodeReader from './BarcodeReader'

import favoriteStore from './store/favorites'

// import createDB from '../seeds/createDB'
// createDB()

const AppNavigator = () => (
  <Router>
    <Scene key='root' hideNavBar>
      <Scene key='Home' component={FavoritesList} title='Favorites' />
      <Scene key='FavoriteDetails' component={FavoriteDetails} title='Favorite Details' />
      <Scene key='AddCategory' component={AddCategory} title='Add Category' />
      <Scene key='AddSubCategory' component={AddSubCategory} title='Add Sub-category' />
      <Scene key='ProductDetails' component={ProductDetails} title='Product Details' />
      <Scene key='BarcodeReader' component={BarcodeReader} title='Barcode Reader' />
    </Scene>
  </Router>
)

const App = () => (
  <Root>
    <Provider favoriteStore={favoriteStore}>
      <AppNavigator />
    </Provider>
  </Root>
)
AppRegistry.registerComponent('favorites', () => App);
