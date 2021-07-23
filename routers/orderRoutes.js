const express = require("express");
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

const {
  userById,
  addOrderToUserHistory,
} = require("../controllers/userController");

const {
  create,
  listOrders,
  getStatusValues,
} = require("../controllers/orderController");

const { decreaseQuantity } = require("../controllers/productController");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
// list all the orders to give to the frontend
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);

// To update shipping status
router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

router.param("userId", userById);

module.exports = router;
