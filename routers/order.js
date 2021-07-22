const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/authController");
const { userById } = require("../controllers/userController");
const { create } = require("../controllers/orderController");

router.post("/order/create/:userId", requireSignin, isAuth, create);

router.param("userId", userById);

module.exports = router;
