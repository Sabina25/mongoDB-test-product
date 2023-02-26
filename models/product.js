const mongoDB = require("mongodb");
const getDB = require("../util/database").getBD;

class Product {
  constructor(title, price, imageURL, description) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
  }

  save() {
    let db = getDB();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  static fetchAll() {
    let db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  static findById(prodId) {
    let db = getDB();
    return db
      .collection("products")
      .find({ _id: new mongoDB.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
