const User = require("../models/User");
const Address = require("../models/Address");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {

  static signup(req, res, next) {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          msg: "Sign Up Success ! "
        });
      })
      .catch(next);
  }

  static signin(req, res, next) {
    User.findOne({
        email: req.body.email
      })
      .then((result) => {
        if (!result) {
          {
            name: "Combination_Not_Found"
          };
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, result.password)
        if (!passwordIsValid) {
          {
            name: "Combination_Not_Found"
          };
        }
        let token = jwt.sign({
          id: result.id
        }, process.env.secretKey, {
          expiresIn: '1h'
        })
        res.status(200).json({
          message: "Sign In Success !",
          AccessToken: token
        })
      })
      .catch((err) => next({
        name: "SignIn_Fail"
      }));
  };

  static detail(req, res, next) {
    User.findById(req.UserId)
      .then((result) => {
        res.status(200).json({
          result,
          data: User
        });
      })
      .catch(next);
  }

  static findAllUser(req, res) {
    User.find()
      .then((result) => {
        if (result.length > 0) {
          res
            .status(200)
            .json({
              message: "Success find all data User !",
              data: result
            });
        } else {
          {
            name: "All_User_Not_Found"
          };
        }
      })
      .catch((err) => ({
        name: "Fail_Found_All_User"
      }));
  }

  static updateUser(req, res) {
    const {
      id
    } = req.params;
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;

    const updatedData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }

    User.findByIdAndUpdate(id, updatedData, {
        new: true
      })
      .then((result) => {
        res
          .status(200)
          .json({
            message: "Success Update Data User !",
            data: result
          });
      })
      .catch((err) => ({
        name: "Update_User_Fail"
      }));

  }

  static address(req, res, next) {
    const {
      mobileNumber,
      alternatePhone,
      village,
      districts,
      province,
      zipCode,
      cityDistrictTown,
      state
    } = req.body;
    const address = new Address({
      mobileNumber,
      alternatePhone,
      village,
      districts,
      province,
      zipCode,
      cityDistrictTown,
      state,
      UserId: req.UserId,
    });
    address
      .save()
      .then((result) => {
        res.status(201).json({
          msg: "Success address " + result.UserId + " has been created !",
          data: result,
        });
      })
      .catch(next);
  }

  static updateAddress(req, res) {
    const {
      id
    } = req.params;
    const {
      mobileNumber,
      alternatePhone,
      village,
      districts,
      province,
      zipCode,
      cityDistrictTown,
      state
    } = req.body;

    const updatedData = {
      mobileNumber,
      alternatePhone,
      village,
      districts,
      province,
      zipCode,
      cityDistrictTown,
      state
    };

    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }

    Address.findByIdAndUpdate(id, updatedData, {
        new: true
      })
      .then((result) => {
        res
          .status(200)
          .json({
            message: "Success Update Data Address!",
            data: result
          });
      })
      .catch((err) => ({
        name: "Update_Address_Fail"
      }));

  }

  static delete(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        const userData = user;
        Address.findOne({ UserId: user._id })
          .then((address) => {
            const addressData = address;
            userData.remove();
            addressData.remove();
            res.status(200).json({ DELETED: { user: userData, address: addressData } });
          })
          .catch((err) => {});
      })
      .catch(next);
  }

  }




module.exports = UserController;