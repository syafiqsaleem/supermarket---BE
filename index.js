require('dotenv').config()

const app = require('express')()
const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const http = require('http').Server(app)
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const port = process.env.PORT || 8000
const authRouter = require('./routers/authRoutes')
const userRouter = require('./routers/userRoutes')
const categoryRouter = require('./routers/categoryRoutes')
const productRouter = require('./routers/productRoutes')
const viewRouter = require('./routers/viewRoutes')

const expressValidator = require('express-validator')

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

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
app.use(methodOverride('_method'))

const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// Define All Route

app.use('/', viewRouter)
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)

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
