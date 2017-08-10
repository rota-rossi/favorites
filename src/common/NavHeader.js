import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, Button, Title, Text } from 'native-base'
import { Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class NavHeader extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: '#673AB7' }}
        iosBarStyle='light-content'
      >
        {
          this.props.back ?
            <Left>
              <Button iconLeft transparent light onPress={() => Actions.pop()}>
                <Icon name='ios-arrow-back' />
                {Platform.OS === 'ios' && <Text>Back</Text>}
              </Button>
            </Left>
            :
            <Left />
        }
        <Body style={{ flex: 3 }}>
          <Title style={{ color: 'white' }}>{this.props.title}</Title>
        </Body>
        <Right>
          {this.props.right && this.props.right()}
        </Right>
      </Header>
    );
  }
}