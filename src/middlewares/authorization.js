const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");


class authorization {
    static userAutho (req,res,next){
        const {id} = req.params;
        User.findById(req.UserId)
        .then((result)=>{
            if(result.id === id){ 
                next()
            } else { name: "Forbidden" }
        })
        .catch(next)    
    }

    static categoryAutho (req,res,next){
        Category.findOne({ _id: req.params.id })
        .then((data) => {
          if (data) {
            if (data.UserId === req.UserId) next();
            else throw { name: "Forbidden" };
          }
        })
        .catch(next);   
    }

    static productAutho (req,res,next){
        Product.findOne({ _id: req.params.id })
        .then((data) => {
          if (data) {
            if (data.UserId === req.UserId) next();
            else throw { name: "Forbidden" };
          }
        })
        .catch(next);   
    }


   
}

module.exports = authorization;