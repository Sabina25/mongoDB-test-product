const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;
const mongoConnect = () => {
  MongoClient.connect(
    "mongodb+srv://kadyrova19:ja6IBjE35Sa0MNvY@test.2qyqgfl.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected! WOW!");
      db = client.db();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBD = () => {
  if (db) {
    return db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getBD = getBD;
