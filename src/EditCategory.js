import React, { Component } from 'react';
import { Container, Content, Form, Item, Label, Input, Text, Button, Separator, Toast } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { inject } from 'mobx-react'

import NavHeader from './common/NavHeader'

@inject('favoriteStore')
export default class EditCategory extends Component {
    constructor(props) {
        super(props)
        this.state = { category: { categoryName: '' } }
    }


    componentDidMount() {
        if (this.props.categoryID) {
            let category = this.props.favoriteStore.getCategory(this.props.categoryID)
            this.setState({ category })
        }
    }

    saveCategory = () => {
        this.props.favoriteStore.saveCategory(this.state.category)
        Toast.show({
            text: 'Saved Successfully!',
            type: 'success',
            position: 'bottom',
            duration: 2000
        })
        Actions.pop()
    }

    changeCategory = (categoryName) => {
        this.setState({
            category: {
                ...this.state.category,
                categoryName
            }
        })
    }

    render() {
        return (
            <Container>
                <NavHeader back title={this.props.categoryID ? 'Edit Category' : 'Add Category'} />
                <Content>
                    <Form style={{ backgroundColor: 'white' }}>
                        <Item>
                            <Label>Category Name:</Label>
                            <Input
                                value={this.state.category.categoryName}
                                onChangeText={this.changeCategory} />
                        </Item>
                        <Separator />
                        <Button full onPress={this.saveCategory} disabled={!this.state.category.categoryName.length}>
                            <Text>Save Category</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}