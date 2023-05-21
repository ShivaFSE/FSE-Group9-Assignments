const path = require("path")
const Datastore = require("nedb")

//for simplicity using json, but db file can also be used
var orders_db = new Datastore({ filename: 'orders.json' });

orders_db.loadDatabase(function (err) {
  console.log(`Orders Datastore:loadDatabase error: ${err}`)
});

function insert(doc, callback) {
  orders_db.insert(doc, function (err, newDoc) {
    console.log(`Datastore:insert error: ${err}`)
    callback(err, newDoc);
  });
}

function find(doc, callback) {
  orders_db.find(doc, function (err, docs) {
    console.log(`Datastore:find error: ${err}, ${docs.length}`)
    callback(err, docs);
  });
}

function remove(doc, callback) {
  orders_db.remove(doc, { multi: true }, function (err, numRemoved) {
    console.log(`Datastore:remove error: ${err}`)
    callback(err, numRemoved);
  });
}

module.exports = orders_db;