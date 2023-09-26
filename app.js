require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

// const fileUpload = require('express-fileupload');
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key:process.env.CLOUD_API_KEY,
//   api_secret:process.env.CLOUD_API_SECRET
// })

// routers
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const auth = require('./middleware/authentication');


app.use(express.static('./public'));

// app.use(fileUpload({useTempFiles:true}))
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('<h1>File Upload Starter</h1>');
// });

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/products',auth,productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
