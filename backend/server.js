import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
dotenv.config()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

const PORT = process.env.PORT || 5000   

connectDB();
connectCloudinary();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order" , orderRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

