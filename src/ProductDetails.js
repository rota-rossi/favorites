import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Container, Content, Text, Button, Item, Icon, Separator, Label, Input, Form, Right, Toast, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

import NavHeader from './common/NavHeader'

const PickerItem = Picker.Item

let Datastore = require('react-native-local-mongodb')

let dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })


import initialCase from '../utils/stringUtils'

@inject('favoriteStore') @observer
export default class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      product: {
        "product_name": "",
        "upc_code": 0,
        "manufacturer": "",
        "image": null,
        "additional_info": ""
      }
    }
  }

  changeProductInformation = (attribute, value) => {
    this.setState({
      product: {
        ...this.state.product,
        [attribute]: value
      }
    })
  }

  componentDidMount() {
    if (this.props.productID) {
      let product = this.props.favoriteStore.getProduct(this.props.productID)
      this.setState({ product })
    } else {
      this.setState({
        editable: true,
        product: {
          ...this.state.product,
          categoryID: this.props.categoryID,
          subCategoryID: this.props.subCategoryID
        }
      })
    }
  }

  enableEdit = () => {
    this.setState({
      editable: true
    })
  }

  changeProductType = (value) => {
    this.setState({
      product: {
        ...this.state.product,
        type: value
      }
    })
  }

  saveItem = () => {
    this.props.favoriteStore.saveProduct(this.state.product)
      .then(product => {
        console.log("product:", product)
        Toast.show({
          text: 'Saved Successfully!',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        this.setState({ product, editable: false })
      })
      .catch(error => {
        console.log('error', error)
        Toast.show({
          text: 'error',
          type: 'error',
          position: 'bottom',
          duration: 5000
        })
      })
  }

  render() {
    const { product } = this.state
    const disabled = !this.state.editable
    return (
      <Container>
        <NavHeader back title={product._id ? 'Edit Product' : 'Add Product'} />
        <Content>
          <Form style={{ backgroundColor: 'white' }}>
            <Item>
              <Label>Product Name</Label>
              <Input
                disabled={disabled}
                value={product.product_name}
                onChangeText={(text) => this.changeProductInformation('product_name', text)} />
            </Item>
            <Item>
              <Label>Type</Label>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                selectedValue={product.type}
                onValueChange={this.changeProductType}
              >
                <PickerItem label="Favorites" value="favorites" />
                <PickerItem label="Acceptables" value="acceptables" />
                <PickerItem label="Unnaceptables" value="unacceptables" />
              </Picker>
            </Item>

            <Item>
              <Label>Manufacturer</Label>
              <Input
                disabled={disabled}
                value={product.manufacturer}
                onChangeText={(text) => this.changeProductInformation('manufacturer', text)} />
            </Item>

            <Item>
              <Label>UPC Code</Label>
              <Input
                disabled={disabled}
                value={product.upc_code.toString()}
                keyboardType='numeric'
                onChangeText={(text) => this.changeProductInformation('upc_code', Number(text))} />
            </Item>

            <Item stackedLabel>
              <Label>Additional Information</Label>
              <Input
                disabled={disabled}
                multiline={true}
                numberOfLines={5}
                style={{ height: 120, marginTop: 8 }}
                value={product.additional_info}
                onChangeText={(text) => this.changeProductInformation('additional_info', text)}
              />
            </Item>
            <Separator />
            {this.state.editable ?
              <Button full primary onPress={this.saveItem}>
                <Text>Save Changes</Text>
              </Button>
              :
              <Button full primary
                onPress={this.enableEdit}
              >
                <Text>Edit</Text>
              </Button>
            }
          </Form>
        </Content>
      </Container>
    );
  }
}
