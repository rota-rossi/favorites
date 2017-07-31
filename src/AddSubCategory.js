import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Content, Form, Item, Label, Input, Text, Button, Separator, Toast, Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'

let Datastore = require('react-native-local-mongodb');
let dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })
let dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })

const PickerItem = Picker.Item

export default class AddSubCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subCategoryName: '',
      category: '',
      categories: []
    }
  }

  componentDidMount() {
    dbCategories.find({}, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        this.setState({ categories: res })
      }
    })
  }

  changeSelectedCategory = (value) => {
    this.setState({ category: value })
  }

  saveSubCategory = () => {
    dbSubCategories.insert({ subCategoryName: this.state.subCategoryName, categoryID: this.state.category }, (err, res) => {
      if (err) {
        Toast.show({
          text: 'Error!',
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      } else {
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
    const { category, subCategoryName, categories } = this.state
    return (
      <Content>
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
      </Content>
    );
  }
}