const { Order, CartItem } = require("../models/orderModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  // console.log("CREATE ORDER: ", req.body);
  // Each order will be associated with the user, hence, we need to get the user first
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

// We will be able to send the enum values, to the frontend
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
