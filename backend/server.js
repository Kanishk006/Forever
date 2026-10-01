import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
dotenv.config()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

const PORT = process.env.PORT || 5000   

connectDB();
connectCloudinary();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

