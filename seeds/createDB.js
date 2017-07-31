// SEEDING THE NEW DB

import favorites from '../data/favorites'

export default function createDB() {

  var Datastore = require('react-native-local-mongodb');
  var dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
  var dbSubCategories = new Datastore({ filename: 'subCategoriesDocs', autoload: true })
  var dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })

  dbCategories.remove({}, { multi: true })
  dbSubCategories.remove({}, { multi: true })
  dbProducts.remove({}, { multi: true })

  favorites.favorite_list.forEach(categoryItem => {
    dbCategories.insert({ categoryName: categoryItem.category }, (err, newCat) => {
      if (err) { console.error(err) }
      let categoryID = newCat._id;
      categoryItem.products.forEach(prodType => {
        dbSubCategories.insert({ subCategoryName: prodType.product_type, categoryID }, (err, newProdType) => {
          if (err) { console.error(err) }
          let subCategoryID = newProdType._id
          prodType.favorites.forEach(product => {
            dbProducts.insert(Object.assign({}, product, { subCategoryID, type: 'favorites' }), (err, res) => {
              if (err) { console.error(err) }
            })
          })
          prodType.acceptables.forEach(product => {
            dbProducts.insert(Object.assign({}, product, { subCategoryID, categoryID, type: 'acceptables' }), (err, res) => {
              if (err) { console.error(err) }
            })
          })
          prodType.unacceptables.forEach(product => {
            dbProducts.insert(Object.assign({}, product, { subCategoryID, categoryID, type: 'unacceptables' }), (err, res) => {
              if (err) { console.error(err) }
            })
          })
        })
      })
    })
  })


  setTimeout(() => {
    dbCategories.find({}, (err, res) => { console.log("Categories", err, res) })
    dbSubCategories.find({}, (err, res) => { console.log("SubCategories", err, res) })
    dbProducts.find({}, (err, res) => { console.log("Products", err, res) })
  }, 10000)
}