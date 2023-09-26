const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Auth",
    required: [true, "Please provide user"],
  },
  countryOfOrigin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product',ProductSchema)