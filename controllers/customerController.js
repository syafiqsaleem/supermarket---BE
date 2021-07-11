const Customer = require('../models/customerModel')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  // validation
  const validationResult = registerValidator.validate(req.body)
  if (validationResult.error) {
    res.statusCode = 400
    return res.json(validationResult.error)
  }

  const validatedParams = validationResult.value

  // ensure password matches confirm password
  if (validatedParams.password !== validatedParams.confirm_pw) {
    res.statusCode = 400
    return res.json()
  }

  // generate hash
  let hash = ''

  try {
    hash = await bcrypt.hash(validatedParams.password, 10)
  } catch (err) {
    res.statusCode = 500
    console.log(err)
    return res.json()
  }
  if (hash === '') {
    res.statusCode = 500
    return res.json()
  }

  // verify that there is no duplicate user
  let user = null
  try {
    user = await UserModel.findOne({ email: validatedParams.email })
  } catch (err) {
    res.statusCode = 500
    console.log(err)
    return res.json()
  }
  if (user) {
    res.statusCode = 409 // status conflict
    return res.json()
  }

  // create user
  UserModel.create({
    name: validatedParams.name,
    email: validatedParams.email,
    hash: hash,
  })
    .then((response) => {
      res.statusCode = 201
      return res.json(response._id)
    })
    .catch((err) => {
      res.statusCode = 500
      console.log(err)
      return res.json(err)
    })
}
