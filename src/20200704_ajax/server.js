const express = require('express')
const app = express()
const port = 8000

app.use(express.static('src'));

app.get("/fruits", (req, res, next) => {
  console.log(req.method, req.url) 
  res.json(require('./src/fruits.json'))
});

app.listen(port, () => console.log(`boot server`))