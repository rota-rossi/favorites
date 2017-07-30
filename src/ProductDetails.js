import React, { Component } from 'react';
// import { Text, View } from 'react-native';
import { Content, Text, Button, Item, Icon, Label, Input, Form, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'
import initialCase from '../utils/stringUtils'

export default class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false
    }
  }


  static navigationOptions = ({ navigation }) => ({
    title: initialCase(navigation.state.params.product.product_name),
    headerRight: (!navigation.state.params.editable ?
      <Button transparent onPress={() => Actions.ProductDetails({ editable: true, product: navigation.state.params.product })}>
        <Icon name='md-create' />
      </Button> : null)

  });

  componentDidMount() {
    this.setState({ editable: this.props.editable || false })
  }

  saveItem() {
    Actions.pop()
  }
  render() {
    const { product } = this.props
    const disabled = !this.state.editable
    return (
      <Content>
        <Form>
          <Item stackedLabel>
            <Label>Product Name</Label>
            <Input disabled={disabled} value={product.product_name} />
          </Item>

          <Item stackedLabel>
            <Label>Manufacturer</Label>
            <Input disabled={disabled} value={product.manufacturer} />
          </Item>

          <Item stackedLabel>
            <Label>UPC Code</Label>
            <Input disabled={disabled} value={product.upc_code.toString()} />
          </Item>

          <Item stackedLabel>
            <Label>Additional Information</Label>
            <Input
              disabled={disabled}
              multiline={true}
              numberOfLines={5}
              style={{ height: 120, marginTop: 8 }}
              value={product.additional_info}
            />
          </Item>
          {this.state.editable ?
            <Button full primary onPress={this.saveItem}>
              <Text>Save Changes</Text>
            </Button>
            : null
          }
        </Form>
      </Content>
    );
  }
}
