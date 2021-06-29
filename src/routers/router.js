const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order')
const authentication = require('../middlewares/authJWT');
const errorHandler = require("../middlewares/errorHandler");


router.get("/", (req, res, next) => {
    res.send("Welcome to ThreeFash - Ecommerce Website");
  });

router.use('/user', userRouter); 
router.use('/category', categoryRouter);
router.use('/products', productRouter);
router.use(authentication);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);


router.use(errorHandler);

module.exports = router;