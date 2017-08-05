import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Text, Button, Separator, Toast, Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react'

const PickerItem = Picker.Item

import NavHeader from './common/NavHeader'

@inject('favoriteStore')
export default class EditSubCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subCategory: { subCategoryName: '', categoryID: '' },
    }
  }

  componentDidMount() {
    if (this.props.subCategoryID) {
      let subCategory = this.props.favoriteStore.getSubCategory(this.props.subCategoryID)
      this.setState({ subCategory })
    }
  }

  changeSubCategoryName = (subCategoryName) => {
    this.setState({
      subCategory: {
        ...this.state.subCategory,
        subCategoryName
      }
    })
  }

  changeSelectedCategory = (categoryID) => {
    this.setState({
      subCategory: {
        ...this.state.subCategory,
        categoryID
      }
    })
  }

  saveSubCategory = () => {
    this.props.favoriteStore.saveSubCategory(this.state.subCategory)
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
    const { subCategoryName, categoryID } = this.state.subCategory
    return (
      <Container>
        <NavHeader title='Add Sub-category' back />
        <Content>
          <Form style={{ backgroundColor: 'white' }}>
            <Item>
              <Label>Sub-category Name:</Label>
              <Input
                value={subCategoryName}
                onChangeText={(subCategoryName) => this.changeSubCategoryName(subCategoryName)} />
            </Item>
            <Item>
              <Label>Category</Label>
              <Picker
                mode="dropdown"
                placeholder="Select Category"
                selectedValue={categoryID}
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
      </Container>
    );
  }
}