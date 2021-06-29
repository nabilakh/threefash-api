const Order = require("../models/Order");
const Product = require("../models/Product");

class orderController {
    static create(req, res, next) {
        const {
            cartId,
            productId,
            quantity
        } = req.body;
        const order = new Order({
            cartId,
            productId,
            quantity
        });
        Product.findById( productId)
            .then((result) => {
                if (result) {
                    result.quantity -= quantity;
                    result.save();

                    order
                        .save()
                        .then((result) => {
                            res.status(201).json({
                                msg: "Success " + result.id + " Order has been created !",
                                data: result,
                            });
                        })
                        .catch(next);
                } else {
                    throw {
                        name: "Database_Error"
                    };
                }
            })
            .catch(next);
    }

    static all(req, res, next) {
        Order.find({})
          .then((result) => {
            res.status(200).json({
              result,
            });
          })
          .catch(next);
      }

      static update(req, res, next) {
        const { quantity } = req.body;
        Order.findById(req.params.id)
          .then((result) => {
            const difference = quantity - result.quantity;
            result.quantity = quantity;
            result.save();
            Product.findOneAndUpdate(
              { _id: result.productId },
              {
                $inc: {
                  quantity: -difference,
                },
              }
            )
              .then((result) => {
                result.save();
                res.status(200).json({ data: " Now quantity of product is  "+ quantity });
              })
              .catch(next);
          })
          .catch(next);
      }

      static delete (req, res) {
        const { id } = req.params;
      
        Order.findByIdAndDelete(id)
          .then((result) => {
            res
              .status(200)
              .json({ message: "Order data has been success deleted !", data: result });
          })
          .catch((err) =>({
            name: "Delete_Order_Fail"
          }));
      }
}

module.exports = orderController;