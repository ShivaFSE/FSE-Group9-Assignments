const express = require('express')
const app = express()
const port = 3002
const orders_db = require("./orders_db.js");
const cart_db = require("./cart_db.js");
const IP = require("ip");


app.get('/', (req, res) => {
  //res.send('Hello Users!')
  res.json({description:"Orders Service!"});
})

app.get('/api/core/cart', (req, res) => {
  console.log(`get cart: ${req.query.customer_id}`);
  cart_db.find({ customer_id: req.query.customer_id }, function (err, docs) {
    console.log(`get: cart error ${err}`)
    console.log(`get: cart result ${JSON.stringify(docs)}`)

    if (err == null) {
      console.log("cart sending success respnose");
      res.json(JSON.parse(JSON.stringify(docs)));
    }
    else {
      console.log("cart sending failure respnose");
      res.json({description:"Cart Service!"});
    }
  })
})

//This is important, with out parsing of body will fail. Order also important
app.use(express.json());
app.post('/api/core/cart', (req, res) => {
  console.log(`post: cart ${JSON.stringify(req.body)}`);
  const { menu_item_id, restaurant_id, customer_id } = req.body;
  cart_db.insert({"menu_item_id":menu_item_id,"restaurant_id":restaurant_id,"customer_id":customer_id}, function (err, newDoc) {
      console.log(`app:insert error: ${err}`)
      if (err == null) {
        res.json({description:"Orders Service!"});
      }
    });
})

app.delete('/api/core/cart', (req, res) => {
  console.log(`delete: cart ${req.query.id}`);
  cart_db.remove({ "_id": req.query.id }, function (err, newDoc) {
      console.log(`app:remove error: ${err}`)
      if (err == null) {
        res.json({description:"Orders Service!"});
      }
    });
})


app.get('/api/core/orders', (req, res) => {
  console.log(`get orders: ${req.query.customer_id}`);
  orders_db.find({ customer_id: req.query.customer_id }, function (err, docs) {
    console.log(`get: orders error ${err}`)
    console.log(`get: orders result ${JSON.stringify(docs)}`)

    if (err == null) {
      console.log("orders sending success respnose");
      res.json(JSON.parse(JSON.stringify(docs)));
    }
    else {
      console.log("orders sending failure respnose");
      res.json({description:"Orders Service!"});
    }
  })
})

app.post('/api/core/orders', (req, res) => {
  console.log(`post: orders ${JSON.stringify(req.body)}`);
  console.log(`post: orders ${req.body.toString()}`);
  //console.log(`post: orders ${req.body.toJSON()}`);

  if (JSON.stringify(req.body) != null) {
    orders_db.insert(req.body, function (err, newDoc) {
      console.log(`app:insert error: ${err}`)
      if (err == null) {
        res.json({description:"Orders Service!"});
      }
    });
  }
  else {
    console.log("order details error");
  }
  
})

app.listen(port, () => {
  const ipAddresses = IP.address();
  console.log(`Orders app listening on port ${ipAddresses}:${port}`)
})