import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Text, Button, Separator, Toast } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react'

import NavHeader from './common/NavHeader'

@inject('favoriteStore')
export default class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = { category: '' }
  }

  saveCategory = () => {
    this.props.favoriteStore.addCategory(this.state.category)
      .then(result => {
        Toast.show({
          text: 'Saved Successfully!',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
      })
      .catch(error => {
        Toast.show({
          text: error,
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      })
    Actions.pop()
  }

  render() {
    return (
      <Container>
        <NavHeader back title='Add Category' />
        <Content>
          <Form style={{ backgroundColor: 'white' }}>
            <Item>
              <Label>Category Name:</Label>
              <Input
                value={this.state.category}
                onChangeText={(category) => this.setState({ category })} />
            </Item>
            <Separator />
            <Button full onPress={this.saveCategory} disabled={!this.state.category.length}>
              <Text>Save Category</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}