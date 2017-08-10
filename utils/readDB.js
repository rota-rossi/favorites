
var Datastore = require('react-native-local-mongodb')
var dbCategories = new Datastore({ filename: 'categoriesDocs', autoload: true })
var dbProductTypes = new Datastore({ filename: 'productTypesDocs', autoload: true })
var dbProducts = new Datastore({ filename: 'productsDocs', autoload: true })

export default function readData() {

  dbCategories.find({}, (err, categories) => {
    if (err) {
      console.error(err)
    } else {
      dbProductTypes.find({}, (err, productTypes) => {
        if (err) {
          console.log(err)
        } else {
          dbProducts.find({}, (err, products) => {
            if (err) {
              console.log(err)
            } else {
              return new Promise((resolve, reject) => {
                resolve({ categories, productTypes, products })
              })
            }
          })
        }
      })
    }
  })
}