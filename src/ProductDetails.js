import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Container, Content, Text, Button, Header, Left, Right, Title, Body, Item, Icon, Separator, Label, Input, Form, Toast, Picker, Subtitle, View } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'
import { Platform, Image } from 'react-native'
import NavHeader from './common/NavHeader'

const PickerItem = Picker.Item

import initialCase from '../utils/stringUtils'

@inject('favoriteStore') @observer
export default class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      product: {
        "productName": "",
        "upcCode": "",
        "manufacturer": "",
        "image": null,
        "additionalInfo": "",
        "type": ""
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
          productTypeID: this.props.productTypeID
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
    Toast.show({
      text: 'Saved Successfully!',
      type: 'success',
      position: 'bottom',
      duration: 5000
    })
    Actions.pop()
  }

  render() {
    const { product } = this.state
    const disabled = !this.state.editable
    return (
      <Container>
        <Header style={{ backgroundColor: '#673AB7' }}
          iosBarStyle='light-content'
        >
          <Left>
            <Button iconLeft transparent light onPress={() => Actions.pop()}>
              <Icon name='ios-arrow-back' />
              {Platform.OS === 'ios' && <Text>Back</Text>}
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: 'white' }}>
              {
                product._id ?
                  product.productName
                  : 'Add Product'
              }
            </Title>
            {
              this.state.editable &&
              <Subtitle style={{ color: 'white' }}>
                Edit product
              </Subtitle>
            }
          </Body>
          <Right>
            {this.props.right && this.props.right()}
          </Right>
        </Header>
        <Content>
          <Form style={{ backgroundColor: 'white' }}>
            <Item>
              <Label>Product Name</Label>
              <Input
                disabled={disabled}
                value={product.productName}
                onChangeText={(text) => this.changeProductInformation('productName', text)} />
            </Item>
            {product.image &&
              <Button full style={{ height: 200 }} transparent onPress={() => Actions.FullScreenImage({ image: product.image })}>
                <Image style={{ flex: 1, width: null, height: 200, paddingRight: 10 }} source={{ uri: product.image }} />
              </Button>
            }
            <Item>
              <Label>Type</Label>
              {disabled ?
                <Input
                  disabled={disabled}
                  value={initialCase(product.type)}
                />
                :
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  selectedValue={product.type}
                  onValueChange={this.changeProductType}
                  enabled={this.props.editable}
                  renderHeader={(backAction) =>
                    <Header style={{ backgroundColor: '#673AB7' }}
                      iosBarStyle='light-content'>
                      <Left>
                        <Button iconLeft light transparent onPress={backAction}>
                          <Icon name='ios-arrow-back' /><Text>Back</Text>
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: 'white' }}>
                          Select One
                      </Title>
                      </Body>
                      <Right />
                    </Header>
                  }
                >
                  <PickerItem label="Favorites" value="favorites" />
                  <PickerItem label="Acceptables" value="acceptables" />
                  <PickerItem label="Unnaceptables" value="unacceptables" />
                </Picker>
              }
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
                disabled={true}
                value={product.upcCode}
              />
              {
                !disabled ?
                  <Button transparent onPress={() => Actions.BarcodeReader({ returnBarcode: this.changeProductInformation })}>
                    <Icon active name='ios-barcode-outline' />
                  </Button>
                  :
                  null
              }
            </Item>

            <Item stackedLabel>
              <Label>Additional Information</Label>
              <Input
                disabled={disabled}
                multiline={true}
                numberOfLines={5}
                style={{ height: 120, marginTop: 8 }}
                value={product.additionalInfo}
                onChangeText={(text) => this.changeProductInformation('additionalInfo', text)}
              />
            </Item>
            {this.state.editable &&
              <Button full warning onPress={() => Actions.ProductCamera({ returnImage: this.changeProductInformation })}>
                <Text>Capture Image</Text>
              </Button>
            }
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
