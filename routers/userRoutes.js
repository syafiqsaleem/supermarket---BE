// const express = require("express");
// const customerController = require('../controllers/customerController')
// const router = express.Router();

// app.post("/api/v1/customers/register", customerController.register);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/userController");
const { userSignupValidator } = require("../validator/userValidator");

router.post("/signup", userSignupValidator, signup);

module.exports = router;
