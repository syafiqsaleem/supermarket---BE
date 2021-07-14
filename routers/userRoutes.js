// const express = require("express");
// const customerController = require('../controllers/customerController')
// const router = express.Router();

// app.post("/api/v1/customers/register", customerController.register);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/user");

router.post("/signup", signup);

module.exports = router;
