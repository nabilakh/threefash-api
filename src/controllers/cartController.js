const Cart = require("../models/Cart");

class cartController {
  static create(req, res, next) {
    const cart = new Cart({
      UserId: req.UserId,
    });
    cart
      .save()
      .then((result) => {
        res.status(201).json({
          msg: "Success " + result.UserId + " has been created !",
          data: result,
        });
      })
      .catch(next);
  }

  static all(req, res, next) {
    Cart.find({})
      .then((result) => {
        res.status(200).json({
          result,
        });
      })
      .catch(next);
  }

  static update(req, res) {
    const {
      id
    } = req.params;
    const updatedData = {
      UserId: req.UserId,
    };
    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
    Cart.findByIdAndUpdate(id, updatedData, {
        new: true
      })
      .then((result) => {
        res
          .status(200)
          .json({
            message: "Success Update Data Cart !",
            data: result
          });
      })
      .catch((err) => ({
        name: "Update_Cart_Fail"
      }));
  }

  static delete(req, res, next) {
   Cart.findOne({ _id: req.params.id })
      .then((result) => {
        return result.remove();
      })
      .then((result) => {
        res.status(200).json({ data: { deleted: result } });
      })
      .catch(next);
  }


}

module.exports = cartController;
