import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Title, Form, Icon, Item, Label, Input, Text, Button, Separator, Toast, Picker } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react'
import { Platform } from "react-native";

const PickerItem = Picker.Item

import NavHeader from './common/NavHeader'

@inject('favoriteStore')
export default class EditProductType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productType: { productTypeName: '', categoryID: '' },
    }
  }

  componentDidMount() {
    if (this.props.productTypeID) {
      let productType = this.props.favoriteStore.getProductType(this.props.productTypeID)
      this.setState({ productType })
    }
  }

  changeProductTypeName = (productTypeName) => {
    this.setState({
      productType: {
        ...this.state.productType,
        productTypeName
      }
    })
  }

  changeSelectedCategory = (categoryID) => {
    this.setState({
      productType: {
        ...this.state.productType,
        categoryID
      }
    })
  }

  saveProductType = () => {
    this.props.favoriteStore.saveProductType(this.state.productType)
    Toast.show({
      text: 'Saved Successfully!',
      type: 'success',
      position: 'bottom',
      duration: 2000
    })
    Actions.pop()
  }

  render() {
    const { categories } = this.props.favoriteStore
    const { productTypeName, categoryID } = this.state.productType
    return (
      <Container>
        <NavHeader title={this.props.productTypeID ? 'Edit Product Type' : 'Add Product Type'} back />
        <Content>
          <Form style={{ backgroundColor: 'white' }}>
            <Item>
              <Label>Product Type:</Label>
              <Input
                value={productTypeName}
                onChangeText={this.changeProductTypeName} />
            </Item>
            <Item>
              <Label>Category</Label>
              <Picker
                mode='dropdown'
                style={{ width: (Platform.OS === 'ios') ? undefined : 200 }}
                placeholder='Select Category'
                selectedValue={categoryID}
                onValueChange={this.changeSelectedCategory}
                renderHeader={(backAction) =>
                  <Header>
                    <Left>
                      <Button iconLeft transparent onPress={backAction}>
                        <Icon name='ios-arrow-back' /><Text>Back</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Title>
                        <Text>Select Category</Text>
                      </Title>
                    </Body>
                    <Right />
                  </Header>
                }
              >
                {categories.map(cat =>
                  <Picker.Item key={cat._id} label={cat.categoryName} value={cat._id} />
                )}
              </Picker>
            </Item>
            <Separator />
            <Button full onPress={this.saveProductType}>
              <Text>Save Product Type</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}