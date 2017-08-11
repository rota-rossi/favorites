import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'mobx-react'

import FavoritesList from './FavoritesList'
import FavoriteDetails from './FavoriteDetails'
import ProductDetails from './ProductDetails'
import EditCategory from './EditCategory'
import ManageCategories from './ManageCategories'
import EditProductType from './EditProductType'
import BarcodeReader from './BarcodeReader'
import ProductCamera from './ProductCamera'
import FullScreenImage from './FullScreenImage'

import favoriteStore from './store/favorites'

// import createDB from '../seeds/createDB'
// createDB()

const AppNavigator = () => (
  <Router>
    <Scene key='root' hideNavBar>
      <Scene key='Home' component={FavoritesList} title='Favorites' />
      <Scene key='FavoriteDetails' component={FavoriteDetails} title='Favorite Details' />
      <Scene key='EditCategory' component={EditCategory} title='Add Category' />
      <Scene key='ManageCategories' component={ManageCategories} title='Manage Categories' />
      <Scene key='EditProductType' component={EditProductType} title='Add Product Type' />
      <Scene key='ProductDetails' component={ProductDetails} title='Product Details' />
      <Scene key='BarcodeReader' component={BarcodeReader} title='Barcode Reader' />
      <Scene key='ProductCamera' component={ProductCamera} title='Product Camera' />
      <Scene key='FullScreenImage' component={FullScreenImage} title='Image Full screen' />
    </Scene>
  </Router>
)

const App = () => (
  <Root style={{ backgroundColor: 'white' }}>
    <Provider favoriteStore={favoriteStore}>
      <AppNavigator />
    </Provider>
  </Root>
)
AppRegistry.registerComponent('favorites', () => App);
