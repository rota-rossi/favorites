import React, { Component } from 'react';
// import favorites from '../data/favorites'
import { List, ListItem, Text } from 'native-base';
var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'favoritesDocs', autoload: true });


import FavoriteCategory from './FavoriteCategory'

export default class FavoritesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteList: []
    }
  }
  componentDidMount() {

    db.findOne({}, (err, doc) => {
      this.setState({
        favoriteList: doc.favorite_list
      })
    })
  }

  render() {
    const { favoriteList } = this.state
    return (
      <List>
        {
          favoriteList.map(prodCategory => (
            <FavoriteCategory key={prodCategory.category} prodCategory={prodCategory} navigation={this.props.navigation} />
          ))
        }
      </List>
    );

  }
}