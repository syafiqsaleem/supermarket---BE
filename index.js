require('dotenv').config()
const app = require('express')()

const express = require('express')
const path = require('path')
const http = require('http').Server(app)

const validator = require('express-validator')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const port = process.env.PORT || '8000'
const productRouter = require('./routers/productRoutes')
const viewRouter = require('./routers/viewRoutes')
app.use(bodyParser.json())
var urlencodeParser = bodyParser.urlencoded({ extended: true })

app.use(
  session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1200000,
    },
  })
)
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(
  cors({
    origin: '*',
  })
)

app.options('*', cors())

app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }))
app.use(flash())
app.use('/public', express.static('public'))
app.get('/layouts/', function (req, res) {
  res.render('view')
})

//For set layouts of html view
const expressLayouts = require('express-ejs-layouts')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)

const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// Define All Route
app.use('/', viewRouter)
app.use('/api/v1/products', productRouter)

mongoose
  .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    // Database connected successfully
    console.log('Database connection successful')

    app.listen(port, () => {
      console.log(
        `Siong Siong Supermart Backend app listening on port: ${port}`
      )
    })
  })
