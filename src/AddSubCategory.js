import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Content, Form, Item, Label, Input, Text, Button, Separator, Toast, Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react'

let Datastore = require('react-native-local-mongodb');
let dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })
let dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })

const PickerItem = Picker.Item

@inject('favoriteStore')
export default class AddSubCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subCategoryName: '',
      category: '',
      categories: []
    }
  }

  changeSelectedCategory = (value) => {
    this.setState({ category: value })
  }

  saveSubCategory = () => {
    this.props.favoriteStore.addSubCategory(this.state.subCategoryName, this.state.category)
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
    const { categories } = this.props.favoriteStore
    const { subCategoryName, category } = this.state
    return (
      <Content >
        <Form style={{ backgroundColor: 'white' }}>
          <Item>
            <Label>Sub-category Name:</Label>
            <Input
              value={subCategoryName}
              onChangeText={(subCategoryName) => this.setState({ subCategoryName })} />
          </Item>
          <Item>
            <Label>Category</Label>
            <Picker
              mode="dropdown"
              placeholder="Select Category"
              selectedValue={category}
              onValueChange={this.changeSelectedCategory}
            >
              {categories.map(cat =>
                <PickerItem key={cat._id} label={cat.categoryName} value={cat._id} />
              )}
            </Picker>
          </Item>
          <Separator />
          <Button full onPress={this.saveSubCategory}>
            <Text>Save Sub-category</Text>
          </Button>
        </Form>
      </Content >
    );
  }
}