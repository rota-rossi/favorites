import { observable, computed, action } from 'mobx'
import { persist, create } from 'mobx-persist'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'

class Favorites {

  @persist('list') @observable _categories = [];
  @persist('list') @observable _productTypes = [];
  @persist('list') @observable _products = [];

  @computed get categories() {
    return this._categories.sort(
      (a, b) =>
        a.categoryName < b.categoryName ? -1 : 1
    )
  }

  @computed get productTypes() {
    return this._productTypes.sort(
      (a, b) =>
        a.productTypeName < b.productTypeName ? -1 : 1
    )
  }

  @computed get products() {
    return this._products.sort(
      (a, b) =>
        a.productName < b.productName ? -1 : 1
    )
  }

  @computed get productTypesByCategory() {
    return this.categories.map(
      category => ({
        _id: category._id,
        categoryName: category.categoryName,
        data: this.productTypes.filter(productType => productType.categoryID === category._id)
      }))
  }

  getProduct(productID) {
    return this.products.find(product => product._id === productID)
  }
  getProductType(productTypeID) {
    return this.productTypes.find(productType => productType._id === productTypeID)
  }

  getProductTypesByCategory(categoryID) {
    return this.productTypes.filter(productType => productType.categoryID === categoryID)
  }

  getProductsByProductType(productTypeID) {
    return this.products.filter(product => product.productTypeID === productTypeID)
  }

  @action saveCategory(editedCategory) {
    this._categories = editedCategory._id ?
      this._categories.map(
        category =>
          category._id === editedCategory._id
            ? editedCategory
            : category
      ) :
      [...this._categories, {
        _id: uuid(),
        ...editedCategory
      }]
  }

  @action deleteCategory(categoryID) {
    this._categories = this._categories.filter(
      category => category._id !== categoryID
    )
    this._productTypes = this._productTypes.filter(
      productType => productType.categoryID !== categoryID
    )
    this._products = this._products.filter(
      product => product.categoryID !== categoryID
    )
  }

  @action saveProductType(editedProductType) {
    console.log({
      _id: uuid(),
      ...editedProductType
    })
    this._productTypes = editedProductType._id ?
      this._productTypes.map(
        productType =>
          productType._id === editedProductType._id
            ? editedProductType
            : productType
      ) :
      [...this._productTypes, {
        _id: uuid(),
        ...editedProductType
      }]
  }

  @action deleteProductType(productTypeID) {
    this._productTypes = this._productTypes.filter(
      productType => productType._id !== productTypeID
    )
    this._products = this._products.filter(
      product => product.productTypeID !== productTypeID
    )
  }

  @action saveProduct(editedProduct) {
    this._products = editedProduct._id ?
      this._products.map(
        product =>
          product._id === editedProduct._id
            ? editedProduct
            : product
      ) :
      [...this._products, {
        _id: uuid(),
        ...editedProduct
      }]
  }

  @action deleteProduct(productID) {
    this._products = this._products.filter(
      product => product._id !== productID
    )
  }
}

const favoriteStore = new Favorites()

const hydrate = create({ storage: AsyncStorage })
hydrate('favorites', favoriteStore)

export default favoriteStore