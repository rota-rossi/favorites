import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Form, Body, Title, Input, Button, Icon, Text, Separator, Item, Label, Toast } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject, observer } from 'mobx-react'

@inject('favoriteStore') @observer
export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  submitLogin = () => {
    let { firebase } = this.props.favoriteStore
    let { username, password } = this.state
    return firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((user) => {
        Toast.show({
          text: 'Login Successfully!',
          type: 'success',
          position: 'bottom',
          duration: 2000
        })
        // console.log(user)
        Actions.pop()
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Toast.show({
          text: errorMessage,
          type: 'danger',
          position: 'bottom',
          duration: 2000
        })
      })
  }

  updateState = (attrib, value) => {
    this.setState({
      [attrib]: value
    })
  }

  render() {
    return (
      <Container>
        <Header
          style={{ backgroundColor: '#673AB7' }}
          iosBarStyle='light-content'
        >
          <Left>
            <Button transparent light onPress={Actions.pop}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'white' }}>Login Screen</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={(text) => this.updateState('username', text)}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={(text) => this.updateState('password', text)}
              />
            </Item>
          </Form>
          <Button full primary onPress={this.submitLogin}><Text>Login</Text></Button>
        </Content>
      </Container>
    );
  }
}
