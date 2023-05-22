const express = require('express')
const app = express()
const port = 3001
const restaurants_db = require("./restaurants_db.js");
const menu_db = require("./menu_db.js");
const IP = require("ip");


app.get('/', (req, res) => {
  //res.send('Hello Users!')
  res.json({description:"Restaurants Service!"});
})

app.get('/api/core/restaurants', (req, res) => {
  console.log(`get restaurants: ${req.query.id}`);
  restaurants_db.find((req.query.id != null) ? { _id: req.query.id } : { }, function (err, docs) {
    console.log(`get: restaurants error ${err}`)
    console.log(`get: restaurants result ${JSON.stringify(docs)}`)

    if (err == null) {
      console.log("restaurants sending success respnose");
      res.json(JSON.parse(JSON.stringify(docs)));
    }
    else {
      console.log("restaurants sending failure respnose");
      res.json({description:"Restaurants Service!"});
    }
  })
})

app.get('/api/core/menu', (req, res) => {
  console.log(`get menu: ${req.query.restaurant_id}, ${req.query.id}`);
  menu_db.find((req.query.id != null) ? {restaurant_id: req.query.restaurant_id, _id: req.query.id } : { restaurant_id: req.query.restaurant_id }, function (err, docs) {
    console.log(`get: menu error ${err}`)
    console.log(`get: menu result ${JSON.stringify(docs)}`)

    if (err == null) {
      console.log("menu sending success respnose");
      res.json(JSON.parse(JSON.stringify(docs)));
    }
    else {
      console.log("menu sending failure respnose");
      res.json({description:"Restaurants Service!"});
    }
  })
})

app.listen(port, () => {
  const ipAddresses = IP.address();
  console.log(`Restaurants app listening on port ${ipAddresses}:${port}`)
})