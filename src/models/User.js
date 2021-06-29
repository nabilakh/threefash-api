const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [
        {
          validator: validator.isEmail,
        },
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: (e) => {
          e.toLowerCase() !== "password";
        },
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", function (next) {
  User.findOne({ email: this.email  })
    .then((user) => {
      if (user) next({ name: "Email_Already_Exists" });
      else {
        this.password= bcrypt.hashSync(this.password, 10);
        next();
      }
    })
    .catch((err) => next({ name: "Database_Error" }));
});

userSchema.pre("save", function (next) {
  User.findOne({ username: this.username  })
    .then((user) => {
      if (user) next({ name: "Username_Already_Exists" });
      else {
        next();
      }
    })
    .catch((err) => next({ name: "Database_Error" }));
});

const User = mongoose.model("User", userSchema);

module.exports = User;
