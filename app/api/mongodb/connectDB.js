const URI = process.env.NEXT_PUBLIC_MONGO_URI;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;
