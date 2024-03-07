"use server";

import connectDB from '@/app/api/mongodb/connectDB.js';
import User from '@/models/user.js';

// CREATE
export async function createUser(user) {
  console.log("inside createUser")
  try {
    await connectDB();

    const foundUser = await User.findOne({ email: user.email });

    if(foundUser){
      return JSON.stringify("User already exists");
    }
    const newUser = await User.create(user);
    console.log("newUser", newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
