const errorHandler = (err, req, res, next) => {
  console.log(err);

  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "Email_Already_Exists":
      code = 409;
      message = "Email is already Exists !";
      break;
    case "Username_Already_Exists":
      code = 409;
      message = "Username is already Exists !";
      break;
    case "Database_Error":
      code = 500;
      message = "Database Mongoose Error !";
      break;
    case "SignIn_Fail":
      code = 409;
      message = "Signin fail !";
      break;
    case "Missing_Token":
      code = 401;
      message = "Access Token is Missing";
      break;
    case "Combination_Not_Found":
      code = 401;
      success = false;
      message = "Combination Email and Password doesn't match !";
      break;
    case "All_User_Not_Found":
      code = 404;
      message = "not found all data User";
      break;
    case "Fail_Found_All_User":
      code = 500;
      message = "Fail find all data User";
      break;
    case "Update_User_Fail":
      code = 500;
      message = "Fail update data User";
      break;
    case "Forbidden":
      code = 403;
      message = "Forbidden Access to this !";
      break;
    case "Delete_User_Fail":
      code = 500;
      message = "User data failed to delete";
      break;
    case "Name_Already_Exists":
      code = 409;
      message = "The name of category is already exists!";
      break;
    case "Update_Category_Fail":
      code = 500;
      message = "Fail update data Category";
      break;
    case "Delete_Category_Fail":
      code = 500;
      message = "Category data failed to delete";
      break;
    case "Update_Product_Fail":
      code = 500;
      message = "Fail update data Product";
      break;
    case "Delete_Product_Fail":
      code = 500;
      message = "Product data failed to delete";
      break;
    case "Update_Address_Fail":
      code = 500;
      message = "Fail update data Address";
      break;
    case "Update_Cart_Fail":
      code = 500;
      message = "Fail update data Cart";
      break;
    case "Delete_Order_Fail":
      code = 500;
      message = "Order data failed to delete";
      break;


    default:
      code = 500;
      message = "Internal server error!";
  }

  return res.status(code).json({
    message
  });
};

module.exports = errorHandler;