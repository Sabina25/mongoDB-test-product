const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://kadyrova19:ja6IBjE35Sa0MNvY@test.2qyqgfl.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      cb();
      console.log("Connected! WOW!");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBD = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getBD = getBD;
