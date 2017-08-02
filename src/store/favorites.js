import { observable, computed } from 'mobx'

var Datastore = require('react-native-local-mongodb')
var dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
var dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })
var dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })


class Favorites {
    @observable _categories = [];
    @observable _subCategories = [];
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
    @computed get subCategories() {
        return this._subCategories.sort(
            (a, b) =>
                a.subCategoryName < b.subCategoryName ? -1 : 1
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
        this.readSubCategories()
        this.readProducts()
    }

    readCategories() {
        dbCategories.loadDatabase((err) => {
            dbCategories.find({}, (err, categories) => {
                if (err) {
                    console.error(err)
                } else {
                    this._categories = categories
                }
            })
        })
    }
    readSubCategories() {
        dbSubCategories.loadDatabase((err) => {
            dbSubCategories.find({}, (err, subCategories) => {
                if (err) {
                    console.log(err)
                } else {
                    this._subCategories = subCategories
                }
            })
        })
    }
    readProducts() {
        dbProducts.loadDatabase((err) => {
            dbProducts.find({}, (err, products) => {
                if (err) {
                    console.log(err)
                } else {
                    this._products = products
                }
            })
        })
    }

    getProduct(productID) {
        return this._products.find(product => product._id === productID)
    }

    filteredSubCategories(categoryID) {

        return this._subCategories.filter(subCategory => subCategory.categoryID === categoryID)
    }

    filteredProducts(subCategoryID) {
        return this._products.filter(product => product.subCategoryID === subCategoryID)
    }

    addCategory(category) {
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

    addSubCategory(subCategoryName, categoryID) {
        return new Promise((request, reject) => {
            dbSubCategories.insert({ subCategoryName, categoryID }, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    this.readSubCategories()
                    request(res)
                }
            })
        })
    }

    saveProduct(product) {
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