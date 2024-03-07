"use server";

import connectDB from '@/app/api/mongodb/connectDB.js';
import User from '@/models/user.js';

// CREATE
export async function createUser(user) {
  try {
    await connectDB();

    const foundUser = await User.findOne({ email: user.email });

    if(foundUser){
      return JSON.stringify("User already exists");
    }
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
