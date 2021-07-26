const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../controllers/userController");

//Test route
// Anytime we want to make request to this link from react or postman, we need to send secret/:userId
// requireSignin: Require user to be signed in
// isAuth: Ensure current id matches to req.profile to access this route
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.get("/orders/by/user/:userId", requireSignin, isAuth, purchaseHistory);

// We want to take the parameter
// So anytime there is a parameter called 'userId' in the route, we want to execute userById method
router.param("userId", userById);

module.exports = router;
