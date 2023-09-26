const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const path = require('path');
const fs = require('fs');
// const createProduct = async (req,res) => {
//     const product = await Product.create(req.body);
//     res.status(StatusCodes.CREATED).json(product);
// }
const getAllProducts = async (req,res) => {
    let {search,sort} = req.query;
    const {userId} = req.user;
    const queryObject = {
      createdBy:userId,
    };
    if(search){
      if(search.includes('_')){
        search = search.replace(/_/g, " ");
      }
        queryObject.countryOfOrigin = { $regex: search, $options: "i" };
    }
    let result = Product.find(queryObject);
    if (sort === "a-z") {
      result = result.sort("countryOfOrigin");
    }
    if (sort === "z-a") {
      result = result.sort("-countryOfOrigin");
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const totalProducts = await Product.countDocuments(queryObject);
    result = result.skip(skip).limit(limit);
    const products = await result;
    console.log('something');
    res.status(StatusCodes.OK).json({products,numberOfHits:products.length,totalProducts});
}
const getStats = async (req,res) => {
    const {userId} = req.user
    console.log(userId);
    let allProducts = await Product.aggregate([
      // {
      //   $match: {
      //     createdBy: userId,
      //   },
      // },
      {
        $group: {
          _id: "$countryOfOrigin",
          count: { $sum: 1 },
        },
      },
    ]);
    console.log(allProducts);
    const result = allProducts.reduce((acc,curr)=>{
        const {_id:country,count} = curr;
        acc[country]=count;
        return acc
    })
    res.status(StatusCodes.OK).json(result);
}



module.exports = {
    getAllProducts,getStats
}
