const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if email exists in the database
    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      // If email doesn't exist, create a new order
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
    } else {
      // If email exists, update the existing order
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error", error.message);
  }
});

router.post('/myorderData', async (req, res) => {
    try {
      let myData = await Order.findOne({ email: req.body.email });
      res.json({ orderData: myData ? myData.order_data : [] });
    } catch (error) {
      console.error('Error fetching order data:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  

module.exports = router;
