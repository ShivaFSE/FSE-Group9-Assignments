const express = require('express')
const app = express()
const port = 3000
const users_db = require("./users_db.js");


app.get('/', (req, res) => {
  //res.send('Hello Users!')
  res.json({description:"Users Service!"});
})

app.get('/api/authentication/registration', (req, res) => {
  console.log(`Query: ${req.query.email}, ${req.query.password}, ${req.query.role}`);
  users_db.find({ email: req.query.email,password: req.query.password,role: req.query.role }, function (err, docs) {
    console.log(`get: registration error ${err}`)
    console.log(`get: registration result ${JSON.stringify(docs)}`)

    if (err == null) {
      console.log("login sending success respnose");
      res.json(JSON.parse(JSON.stringify(docs)));
    }
    else {
      console.log("login sending failure respnose");
      res.json({description:"Users Service!"});
    }
  })
})

//This is important, with out parsing of body will fail. Order also important
app.use(express.json());
app.post('/api/authentication/registration', (req, res) => {
  console.log(`post: registration ${JSON.stringify(req.body)}`);
  const { address, city, email, name, password, phone, pincode, role } = req.body;
    users_db.insert({"phone":phone,"role":role,"pincode":pincode,"city":city,"email":email,"name":name,"address":address,"password":password}, function (err, newDoc) {
      console.log(`app:insert error: ${err}`)
      if (err == null) {
        res.json({description:"Users Service!"});
      }
    });
})

app.listen(port, () => {
  console.log(`Users app listening on port ${port}`)
})