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

const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://forever-frontend-two-chi.vercel.app'
])

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Origin is not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.options(/.*/, cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

const PORT = process.env.PORT || 5000   

connectCloudinary();

app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    res.status(503).json({
      success: false,
      message: 'Database is temporarily unavailable'
    });
  }
});
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order" , orderRouter);



if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app
