import React, { Component } from 'react';
import { Container, Content, View, Button, Text } from 'native-base'
import { FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'


import NavHeader from './common/NavHeader'
import CategoryListItem from './CategoryListItem'

@inject('favoriteStore') @observer
export default class ManageCategories extends Component {

  RightMenu = () =>
    <Button transparent light onPress={Actions.pop}>
      <Text>Done</Text>
    </Button>


  render() {
    const { categories } = this.props.favoriteStore
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <NavHeader title='Manage Categories' right={this.RightMenu} />
        <Content>
          <FlatList
            renderItem={({ item }) =>
              <CategoryListItem
                category={item}
              />
            }
            data={categories}
            keyExtractor={item => item._id}
          />
        </Content>
      </Container>
    );
  }
}