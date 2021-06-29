const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    productBrand: {
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    amount: {
        type: Number, 
        required: true 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    productPictures: {
        type: String 
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    updatedAt: Date,

}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

module.exports = Product;