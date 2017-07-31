import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Content, Form, Item, Label, Input, Text, Button, Separator, Toast } from 'native-base'
import { Actions } from 'react-native-router-flux'

let Datastore = require('react-native-local-mongodb');
let dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })

export default class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = { category: '' }
  }

  saveCategory = () => {
    dbCategories.insert({ categoryName: this.state.category }, (err, res) => {
      if (err) {
        Toast.show({
          text: 'Error!',
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      } else {
        // dbCategories.persistence.compactDatafile()
        Toast.show({
          text: 'Saved Successfully!',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        Actions.pop()
      }
    })
  }
  render() {
    return (
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
    );
  }
}