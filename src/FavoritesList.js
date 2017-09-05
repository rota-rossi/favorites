import React, { Component } from 'react';
// import { ListView } from 'react-native'
import { Container, Left, Content, View, Separator, Text, List, ListItem, Footer, Grid, Col, Button, Icon, SwipeRow, Row, Right, Body, ActionSheet } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { ScrollView, RefreshControl, SectionList } from 'react-native'
import { inject, observer } from 'mobx-react'

import FavoriteListItem from './FavoriteListItem'
import NavHeader from './common/NavHeader'



@inject('favoriteStore') @observer
class FavoritesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editItems: false
        }
    }
    BUTTONS = [
        'Add Category',
        'Manage Categories',
        'Add Product Type',
        'Manage Product Types',
        'Cancel'
    ]
    CANCEL_INDEX = 4

    ACTIONS = [
        Actions.EditCategory,
        Actions.ManageCategories,
        Actions.EditProductType,
        () => this.setState({ editItems: true })
    ]

    RightMenu = () =>
        <Button transparent light onPress={() => {
            this.state.editItems
                ? this.setState({ editItems: false })
                : this.showActionSheet()
        }}>
            {this.state.editItems
                ? <Text>Done</Text>
                : <Icon name='ios-settings-outline' />
            }
        </Button>

    showActionSheet = () => {
        ActionSheet.show(
            {
                options: this.BUTTONS,
                cancelButtonIndex: this.CANCEL_INDEX,
                title: "Select:"
            },
            buttonIndex => {
                // alert('Clicked: ' + this.BUTTONS[buttonIndex])
                this.CANCEL_INDEX !== buttonIndex && this.ACTIONS[buttonIndex]()
            }
        )
    }

    render() {
        let { user } = this.props.favoriteStore
        let data = this.props.favoriteStore.productTypesByCategory
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <NavHeader title='My Favorites' right={this.RightMenu} />
                <Content>
                    <SectionList
                        renderItem={({ item }) =>
                            <FavoriteListItem
                                productType={item}
                                edit={this.state.editItems}
                            />
                        }
                        renderSectionHeader={({ section }) =>
                            <View>
                                <Separator section={section} bordered>
                                    <Text>{section.categoryName.toUpperCase()}</Text>
                                </Separator>
                                {!section.data.length &&
                                    <ListItem>
                                        <Text>No Items</Text>
                                    </ListItem>
                                }
                            </View>
                        }
                        sections={data}
                        keyExtractor={item => item.productTypeName}
                        ListEmptyComponent={
                            <ListItem>
                                <Text>No Items - Add a Category to get Started!</Text>
                            </ListItem>
                        }
                    />
                </Content>
                <Footer>
                    <Button full primary onPress={Actions.LoginScreen}><Text>Login</Text></Button>
                </Footer>
            </Container>
        );

    }
}

export default (FavoritesList)