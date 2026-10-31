import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('MongoDB Connected Successfully !!');
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  await connectionPromise;
};

export default connectDB;