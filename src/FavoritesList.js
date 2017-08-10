import React, { Component } from 'react';
// import { ListView } from 'react-native'
import { Container, Left, Content, View, Separator, Text, List, ListItem, Footer, Grid, Col, Button, Icon, SwipeRow, Row, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { ScrollView, RefreshControl } from 'react-native'
import { SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'

import FavoriteListItem from './FavoriteListItem'
import NavHeader from './common/NavHeader'

@inject('favoriteStore') @observer
class FavoritesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editItems: false
    }
  }

  RightMenu = () =>
    <Button transparent light onPress={() => this.setState({ editItems: !this.state.editItems })}>
      <Text>{this.state.editItems ? 'Done' : 'Edit'}</Text>
    </Button>


  render() {
    const { categories, productTypes } = this.props.favoriteStore
    let data = categories.map(category => {
      return {
        ...category,
        data: productTypes
          .filter(productType => productType.categoryID === category._id)
      }
    })
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <NavHeader title='My Favorites' right={this.RightMenu} />
        <Content>
          <SectionList
            renderItem={({ item }) =>
              <FavoriteListItem
                productType={item}
                edit={this.state.editItems}
              />
            }
            renderSectionHeader={({ section }) => <Separator bordered><Text>{section.categoryName.toUpperCase()}</Text></Separator>}
            sections={data}
            keyExtractor={item => item._id}
          />
        </Content>
        <Footer>
          <Grid>
            <Col style={{ height: 200, alignItems: 'center' }}>
              <Button full info onPress={Actions.AddCategory}><Text>Add Category</Text></Button>
            </Col>
            <Col style={{ height: 200 }}>
              <Button full danger onPress={Actions.EditProductType}><Text>Add Product Type</Text></Button>
            </Col>
          </Grid>
        </Footer>
      </Container>
    );

  }
}

export default (FavoritesList)