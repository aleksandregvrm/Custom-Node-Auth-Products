require('dotenv').config();
const Product = require('./models/Product');
const connectDB = require('./db/connect')
const populateData = require('./data.json');


const populate = async () => {
 try {
    await connectDB(process.env.MONGO_URI);
    await Product.create(populateData);
    console.log('populated');
    process.exit(0);
 } catch (error) {
    console.log(error);
 }
}
populate();
