const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
    },
    alternatePhone: {
        type: String,
    },
    village: {
        type: String,
    },
    districts: {
        type: String,
    },
    province: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    cityDistrictTown: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        required: true,
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});


const Address = mongoose.model("Address", addressSchema);

module.exports = Address;