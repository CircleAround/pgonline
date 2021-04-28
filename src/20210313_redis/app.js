const express = require('express')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const redis = require('redis')
const app = express()
const bodyParser = require('body-parser')

const RedisStore = require('connect-redis')(session)
const client = redis.createClient()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  name: 'password',
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: client }),
  cookie: { httpOnly: true, secure: false }
}))

app.get('/', (req, res) => {
  let response
  if (req.session.password) {
    response = '<h1>Hi</h1>'
  } else {
    response = `
      <form action="/" method="post">
        <label>
          password
        </label>
        <input type="text" name="password">
        <button>送信</button>
      </form>
    `
  }
  res.send(response)
})

app.post('/', (req, res) => {
  req.session.password = req.body.password
  res.redirect('/')
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))