import React, { Component } from 'react';
// import favorites from '../data/favorites'
import { List, ListItem, Text, Separator, Container, Content, View, Footer, Button, Grid, Col, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { ScrollView, RefreshControl } from 'react-native'
let Datastore = require('react-native-local-mongodb')

let dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
let dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })

import FavoriteListItem from './FavoriteListItem'

export default class FavoritesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      subCategories: [],
      refreshing: false
    }
  }
  componentDidMount() {
    this.reloadData()
  }

  reloadData() {
    this.setState({ refreshing: true });
    dbCategories.loadDatabase((err) => {
      if (err) {
        console.err(err)
      } else {
        dbCategories.find({}, (err, categories) => {
          dbSubCategories.loadDatabase((err) => {
            dbSubCategories.find({}, (err, subCategories) => {
              if (err) {
                console.log(err)
              } else {
                let catSorted = categories.sort(
                  (a, b) =>
                    a.categoryName < b.categoryName ? -1 : 1
                )
                this.setState({ categories: catSorted, subCategories, refreshing: false })
              }
            })
          })
        })
      }
    })
  }

  render() {
    const { categories, subCategories } = this.state
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.reloadData.bind(this)}
            />}
        >

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