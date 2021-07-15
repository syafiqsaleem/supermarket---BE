// const express = require("express");
// const customerController = require('../controllers/customerController')
// const router = express.Router();

// app.post("/api/v1/customers/register", customerController.register);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/userController");
const { userSignupValidator } = require("../validator/userValidator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// Testing functionality of requiring user to be signed in
// requireSignin is the middleware that ensures user is signed in before receiving the data
// router.get("/hello", requireSignin, (req, res) => {
//   res.send("hello there");
// });

module.exports = router;
