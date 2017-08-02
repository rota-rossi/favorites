import React, { Component } from 'react';
// import favorites from '../data/favorites'
import { List, ListItem, Header, Body, Right, Icon, Title, Text, Separator, Container, Content, View, Footer, Button, Grid, Left, Col, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { ScrollView, RefreshControl } from 'react-native'

import { inject, observer } from 'mobx-react'

import FavoriteListItem from './FavoriteListItem'
import NavHeader from './common/NavHeader'

@inject('favoriteStore') @observer
class FavoritesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  reloadData = () => {
    this.props.favoriteStore.readData()
  }

  render() {
    const { categories, subCategories } = this.props.favoriteStore
    return (
      <Container>
        <NavHeader title='My Favorites' />
        <Content>
          {/* refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.reloadData}
            />} */}

          <List
            style={{ backgroundColor: 'white' }}
          >
            {
              categories.map(category =>
                <View key={category._id}>
                  <Separator bordered>
                    <Text>{category.categoryName}</Text>
                  </Separator>
                  {subCategories
                    .filter(subCategory => subCategory.categoryID === category._id)
                    .map(subCategory =>
                      <FavoriteListItem key={subCategory._id} category={category} subCategory={subCategory} />
                    )
                  }
                </View>
              )
            }
          </List>
        </Content>
        <Footer>
          <Grid>
            <Col style={{ height: 200, alignItems: 'center' }}>
              <Button full info onPress={Actions.AddCategory}><Text>Add Category</Text></Button>
            </Col>
            <Col style={{ height: 200 }}>
              <Button full danger onPress={Actions.AddSubCategory}><Text>Add Sub-category</Text></Button>
            </Col>
          </Grid>
        </Footer>
      </Container>
    );

  }
}

export default (FavoritesList)