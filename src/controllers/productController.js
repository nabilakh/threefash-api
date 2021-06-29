const Product = require("../models/Product");


class productController {
  static create(req, res, next) {
    const {
      name,
      productBrand,
      price, 
      amount,
      description,
      productPictures,
      category,
    } = req.body;
    const product = new Product({
      name,
      productBrand,
      price,
      amount,
      description,
      productPictures,
      category,
    });

    product
      .save()
      .then((product) => {
        res.status(201).json({
          msg: "Success " + product.name + " has been created !",
          data: product,
        });
      })
      .catch(next);
  }

  static all(req, res, next) {
    Product.find({})
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
    const {
      name,
      productBrand,
      price, 
      amount,
      description,
      productPictures,
      category,
    } = req.body;
    const updatedData = {
      name,
      productBrand,
      price, 
      amount,
      description,
      productPictures,
      category,
    };
    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
    Product.findByIdAndUpdate(id, updatedData, {
        new: true
      })
      .then((result) => {
        res
          .status(200)
          .json({
            message: "Success Update Data Product !",
            data: result
          });
      })
      .catch((err) => ({
        name: "Update_Product_Fail"
      }));
  }

  static delete (req, res) {
    const { id } = req.params;
  
    Product.findByIdAndDelete(id)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Product data has been success deleted !", data: result });
      })
      .catch((err) =>({
        name: "Delete_Product_Fail"
      }));
  }

  
}

module.exports = productController;
