const mongodb = require("mongodb");
const getDB = require("../util/database").getBD;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
    this._id = new ObjectId(id);
  }

  save() {
    let db = getDB();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  static findById(userId) {
    let db = getDB();
    return db
      .collection("users")
      .find({ _id: new ObjectId(userId) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
