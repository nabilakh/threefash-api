const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
    Category.findOne({ name: this.name  })
      .then((data) => {
        if (data) next({ name: "Name_Already_Exists" });
        else {
          next();
        }
      })
      .catch((err) => next({ name: "Database_Error" }));
  });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;