const Product = require("../models/Product");
const path = require('path');
const { StatusCodes, REQUEST_URI_TOO_LONG } = require("http-status-codes");
const customError = require('../errors/');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
// const;

// const uploadProductImageLocal = async (req, res) => {
//   if(!req.files){
//     throw new customError.BadRequestError('No file Uploaded')
//   }

//   const productImage = req.files.image;
//   if(!productImage.mimetype.startsWith('image')){
//     throw new customError.BadRequestError('Please upload an image');
//   }
//   if(productImage.size > (1024 * 1024)){
//     throw new customError.BadRequestError('The size of the image should be less than 1kb')
//   }
//   const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`)
//   await productImage.mv(imagePath)
//   res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
// };

// const uploadProductImageLocal = async (req,res) =>{
//   const productImage = req.files.image;
//   if(!req.files){
//     throw new customError.BadRequestError('No file provided');
//   }
//   if(!productImage.mimetype.startsWith('image')){
//     throw new customError.BadRequestError('Please provide a valid image');
//   }
//   if(productImage.size > (500*1000)){
//     throw new customError.BadRequestError('image provided is too big')
//   }
//   const imagePath = path.join(__dirname,`../public/uploads/${productImage.name}`)
//   await productImage.mv(imagePath)
//   res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}});
// }
// const uploadProductImage = async (req,res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: "random-folder",
//     }
//   );
//   const filePath = req.files.image.tempFilePath;
//   fs.unlinkSync(filePath);
//   res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
// }
const uploadProduct = async (req,res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create({...req.body});
  res.status(StatusCodes.CREATED).json(product);
}
module.exports = {
  uploadProduct
};
