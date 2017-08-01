import { observable, computed } from 'mobx'

var Datastore = require('react-native-local-mongodb')
var dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
var dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })
var dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })


class Favorites {
    @observable categories = [];
    @observable subCategories = [];
    @observable products = [];

    constructor() {
        this.readData()
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
                    this.categories = categories
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
                    this.subCategories = subCategories
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
                    this.products = products
                }
            })
        })
    }


    @computed get sortedCategories() {
        return this.categories.sort(
            (a, b) =>
                a.categoryName < b.categoryName ? -1 : 1
        )
    }

    filteredProducts(subCategoryID) {
        return this.products.filter(product => product.subCategoryID === subCategoryID)
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
}

const favoriteStore = new Favorites()

export default favoriteStore