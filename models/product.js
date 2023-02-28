const mongodb = require("mongodb");
const getDB = require("../util/database").getBD;

class Product {
  constructor(title, price, imageURL, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    this._id = id ? id : null;
    this.userId = userId;
  }

  save() {
    let db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
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
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDB();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
