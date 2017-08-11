import React, { Component } from 'react';
import { SwipeRow, Row, Body, Text, Right, Icon, Button, ListItem, View, Toast } from 'native-base';
import initialCase from '../utils/stringUtils'
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native'

import { inject } from 'mobx-react'


@inject('favoriteStore')
export default class CategoryListItem extends Component {
    showAlert = () => {
        Alert.alert(
            'Delete', 'Are you sure? All products of this category will also be deleted!',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.favoriteStore.deleteCategory(this.props.category._id)
                        Toast.show({
                            text: 'Deleted Successfully!',
                            type: 'success',
                            position: 'bottom',
                            duration: 2000
                        })
                    }
                },
                {
                    text: 'Cancel'
                }
            ])
    }
    render() {
        const { category } = this.props
        const { categoryName } = category
        return (
            <ListItem>
                <Text>
                    {initialCase(categoryName)}
                </Text>
                <Right>
                    <Row>
                        <Button style={{ flex: 0 }} small transparent onPress={() => Actions.EditCategory({ categoryID: category._id })} >
                            <Icon name='md-create' />
                        </Button>
                        <Button style={{ flex: 0 }} small transparent
                            onPress={
                                () => this.showAlert()}>
                            <Icon name='trash' />
                        </Button>
                    </Row>
                </Right>
            </ListItem>
        );

        // NOT READY YET: Wait for Native base to support it.
        // return (
        //   <SwipeRow
        //     rightOpenValue={-75}
        //     disableRightSwipe
        //     right={
        //       <Button danger onPress={() => alert('Trash')}>
        //         <Icon active name="trash" />
        //       </Button>
        //     }
        //     body={
        //       <ListItem onPress={() => Actions.FavoriteDetails({ category })}>
        //         <Text>{initialCase(categoryName)}</Text>
        //       </ListItem>
        //     }
        //   />
        // )
    }
}