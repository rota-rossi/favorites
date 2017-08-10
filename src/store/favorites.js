import { observable, computed, action } from 'mobx'

var Datastore = require('react-native-local-mongodb')
var dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
var dbProductTypes = new Datastore({ filename: 'productTypesDocs', autoload: true })
var dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })


class Favorites {
  @observable _categories = [];
  @observable _productTypes = [];
  @observable _products = [];

  constructor() {
    this.readData()
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

  readData() {
    this.readCategories()
    this.readProductTypes()
    this.readProducts()
  }

  readCategories() {
    dbCategories.loadDatabase((err) => {
      dbCategories.find({}, (err, categories) => {
        if (err) {
          console.error(err)
        } else {
          console.debug(categories)
          this._categories = categories
        }
      })
    })
  }
  readProductTypes() {
    dbProductTypes.loadDatabase((err) => {
      dbProductTypes.find({}, (err, productTypes) => {
        if (err) {
          console.debug(err)
        } else {
          console.debug(productTypes)
          this._productTypes = productTypes
        }
      })
    })
  }
  readProducts() {
    dbProducts.loadDatabase((err) => {
      dbProducts.find({}, (err, products) => {
        if (err) {
          console.debug(err)
        } else {
          console.debug(products)
          this._products = products
        }
      })
    })
  }

  getProduct(productID) {
    return this._products.find(product => product._id === productID)
  }
  getProductType(productTypeID) {
    return this._productTypes.find(productType => productType._id === productTypeID)
  }

  filteredProductTypes(categoryID) {

    return this._productTypes.filter(productType => productType.categoryID === categoryID)
  }

  filteredProducts(productTypeID) {
    return this._products.filter(product => product.productTypeID === productTypeID)
  }

  @action addCategory(category) {
    return new Promise((request, reject) => {
      dbCategories.insert({ categoryName: category }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          this.readCategories()
          request(res)
        }
      })
    })
  }

  @action saveProductType(productType) {
    if (productType._id) {
      return new Promise((request, reject) => {
        dbProductTypes.update({ _id: productType._id }, productType, (err, res) => {
          console.debug(res)
          if (err) {
            reject(err)
          } else {
            dbProducts.update({ productTypeID: productType._id }, { $set: { categoryID: productType.categoryID } }, { multi: true }, (err, res) => {
              console.debug(res)
              if (err) {
                reject(err)
              } else {
                this.readProductTypes()
                this.readProducts()
                request(res)
              }
            })
          }
        })
      })
    } else {
      return new Promise((request, reject) => {
        dbProductTypes.insert(productType, (err, res) => {
          console.debug(res)
          if (err) {
            reject(err)
          } else {
            this.readProductTypes()
            request(res)
          }
        })
      })
    }
  }

  @action deleteProductType(productTypeID) {
    console.debug(productTypeID)
    return new Promise((request, reject) => {
      dbProductTypes.remove({ _id: productTypeID }, (err, res) => {
        console.debug(res)
        if (err) {
          reject(err)
        } else {
          dbProducts.remove({ productTypeID: productTypeID }, { multi: true }, (err, res) => {
            console.debug(res)
            if (err) {
              reject(err)
            } else {
              this.readProductTypes()
              this.readProducts()
              request(res)
            }
          })

        }
      })
    })
  }
  @action saveProduct(product) {
    if (product._id) {
      return new Promise((request, reject) => {
        dbProducts.update({ _id: product._id }, product, (err, res) => {
          if (err) {
            reject(err)
          } else {
            this.readProducts()
            request(product)
          }
        })

      })
    } else {
      return new Promise((request, reject) => {
        dbProducts.insert(product, (err, res) => {
          if (err) {
            reject(err)
          } else {
            this.readProducts()
            request(res)
          }
        })
      })
    }
  }
}

const favoriteStore = new Favorites()

export default favoriteStore