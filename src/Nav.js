import React, { Component } from 'react';
import { Header, Left, Body, Text, Title, Right, Icon, Button } from 'native-base';

export default class Nav extends Component {
  render() {
    return (
      <Header>
        {this.props.back ?
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          : <Left />
        }
        <Body>
          <Title>{this.props.header}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}