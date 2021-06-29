const Category = require("../models/Category");

class categoryController {
    static create(req, res, next) {
        const {
          name
        } = req.body;
        const category = new Category({
          name
        });
        category
          .save()
          .then((result) => {
            res.status(201).json({
                msg: "Success " + result.name + " category has been created !",
                data: result,
            });
          })
          .catch(next);
      } 

      static all(req, res, next) {
        Category.find({})
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
          name
        } = req.body;
        const updatedData = {
          name
        };
        for (const key in updatedData) {
          if (!updatedData[key]) {
            delete updatedData[key];
          }
        }
        Category.findByIdAndUpdate(id, updatedData, {
            new: true
          })
          .then((result) => {
            res
              .status(200)
              .json({
                message: "Success Update Data Category !",
                data: result
              });
          })
          .catch((err) => ({
            name: "Update_Category_Fail"
          }));
      }

      static delete (req, res) {
        const { id } = req.params;
      
        Category.findByIdAndDelete(id)
          .then((result) => {
            res
              .status(200)
              .json({ message: "Category data has been successfully deleted !", data: result });
          })
          .catch((err) =>({
            name: "Delete_Category_Fail"
          }));
      }
}

module.exports = categoryController;