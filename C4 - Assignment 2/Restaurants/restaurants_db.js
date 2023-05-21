const path = require("path")
const Datastore = require("nedb")

//for simplicity using json, but db file can also be used
var restaurants_db = new Datastore({ filename: 'restaurants.json' });

restaurants_db.loadDatabase(function (err) {
  console.log(`Retaurants Datastore:loadDatabase error: ${err}`)
});

function insert(doc, callback) {
  restaurants_db.insert(doc, function (err, newDoc) {
    console.log(`Datastore:insert error: ${err}`)
    callback(err, newDoc);
  });
}

function find(doc, callback) {
  restaurants_db.find(doc, function (err, docs) {
    console.log(`Datastore:find error: ${err}, ${docs.length}`)
    callback(err, docs);
  });
}

function remove(doc, callback) {
  restaurants_db.remove(doc, { multi: true }, function (err, numRemoved) {
    console.log(`Datastore:remove error: ${err}`)
    callback(err, numRemoved);
  });
}

module.exports = restaurants_db;