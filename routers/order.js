const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/authController");
const {
  userById,
  addOrderToUserHistory,
} = require("../controllers/userController");
const { create } = require("../controllers/orderController");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  create
);

router.param("userId", userById);

module.exports = router;
