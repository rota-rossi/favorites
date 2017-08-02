import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, Button, Title, Text } from 'native-base'

import { Actions } from 'react-native-router-flux'


export default class NavHeader extends Component {
  render() {
    return (
      <Header>
        {
          this.props.back ?
            <Left>
              <Button iconLeft transparent onPress={() => Actions.pop()}>
                <Icon name='ios-arrow-back' />
                <Text>Back</Text>
              </Button>
            </Left>
            :
            <Left />
        }
        <Body style={{ flex: 3 }}>
          <Title>{this.props.title}</Title>
        </Body>
        {this.props.right ?
          <Right>
            <Button transparent onPress={() => Actions.AddSubCategory()}>
              <Icon name='ios-home-outline' />
            </Button>
          </Right>
          :
          <Right />
        }
      </Header>
    );
  }
}