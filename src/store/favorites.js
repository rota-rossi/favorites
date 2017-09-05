import { observable, computed, action, autorun } from 'mobx'
import { persist, create } from 'mobx-persist'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'
import RNFirebase from 'react-native-firebase';


// import fbSettings from '../../utils/firebase_settings'

class Category {
  @persist @observable categoryName
  @persist @observable _id
}

class ProductType {
  @persist @observable productTypeName
  @persist @observable _id
}

class Product {
  @persist @observable productName
  @persist @observable _id
}


class Favorites {

  @persist('list', Category) @observable _categories = [{ _id: '1', categoryName: 'test' }];
  @persist('list', ProductType) @observable _productTypes = [];
  @persist('list', Product) @observable _products = [];
  @observable user


  constructor() {
    this.firebase = RNFirebase.initializeApp({ debug: true, persistence: true });
    this.db = this.firebase.database()
    this.auth = this.firebase.auth()
  }

  @action firebaseConnection() {
    this.auth.onAuthStateChanged((user) => {
      this.user = user
      if (this.user) {
        console.log('user authenticated: ', user.email)
        this.db.ref(`users/${user.uid}/`).once('value', (data) => console.log(data.toJSON()))
      }
    })
  }

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

  @computed get productsByClassification() {
    return this.products.reduce((accum, product) => {
      let position = accum.findIndex(item => item.type === product.type)
      if (position < 0) {
        console.log('not found: ', product.name)
        return [...accum, { type: product.type, products: [product] }]
      } else {
        let products = [...accum[position].products, product]
        console.log(accum[position].type, products, position)
        let newItem = Object.assign({}, accum[position])
        newItem.products = products
        return [...accum.slice(0, position), newItem, ...accum.slice(position + 1)]
      }
    }, [])
  }

  getCategory(categoryID) {
    return this.categories.find(category => category._id === categoryID)
  }

  getProductType(productTypeID) {
    return this.productTypes.find(productType => productType._id === productTypeID)
  }
  getProduct(productID) {
    return this.products.find(product => product._id === productID)
  }


  getProductTypesByCategory(categoryID) {
    return this.productTypes.filter(productType => productType.categoryID === categoryID)
  }

  getProductsByProductType(productTypeID) {
    return this.products.filter(product => product.productTypeID === productTypeID)
  }

  @action saveCategory(editedCategory) {
    if (editedCategory._id) {
      this._categories = this._categories.map(
        category =>
          category._id === editedCategory._id
            ? editedCategory
            : category
      )
    } else {
      editedCategory._id = uuid()
      this._categories = [...this._categories, editedCategory]
    }
    if (this.user) {
      this.db.ref(`users/${this.user.uid}/categories/${editedCategory._id}`)
        .set(editedCategory)
    }
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
    if (editedProductType._id) {
      this.firebase.database().ref(`users/${this.user.uid}/productTypes/${editedProductType._id}`)
        .set(editedProductType)
        .then(
        () =>
          this._productTypes = this._productTypes.map(
            productType =>
              productType._id === editedProductType._id
                ? editedProductType
                : productType
          )
        )
    } else {
      let key = uuid()
      this.firebase.database().ref(`users/${this.user.uid}/productTypes/${key}`)
        .set(editedProductType)
        .then(
        () =>
          this._productTypes = [...this._productTypes, { _id: key, ...editedProductType }]
        )
    }
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
    if (editedProduct._id) {
      this.firebase.database().ref(`users/${this.user.uid}/products/${editedProduct._id}`)
        .set(editedProduct)
        .then(
        () => this._products = this._products.map(
          product =>
            product._id === editedProduct._id
              ? editedProduct
              : product
        )
        )
    } else {
      let key = uuid()
      this.firebase.database().ref(`users/${this.user.uid}/products/${key}`)
        .set(editedProduct)
        .then(
        () =>
          this._products = [...this._products, { _id: key, ...editedProduct }]
        )
    }
  }

  @action deleteProduct(productID) {
    this.firebase.database().ref(`users/${this.user.uid}/products/${productID}`).remove()
      .then(() => {
        this._products = this._products.filter(
          product => product._id !== productID
        )
      })
  }
}

const favoriteStore = new Favorites()

const hydrate = create({ storage: AsyncStorage, jsonify: true })
hydrate('favorites', favoriteStore)
  .then(
  // () => {
  //   favoriteStore._categories = []
  //   favoriteStore._productTypes = []
  //   favoriteStore._products = []
  // }
  // () => favoriteStore.readFromFireBase()
  () => favoriteStore.firebaseConnection()
  )
export default favoriteStore