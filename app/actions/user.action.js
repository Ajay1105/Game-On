"use server";

import connectDB from '@/app/api/mongodb/connectDB.js';
import User from '@/models/user.js';

// CREATE
export async function createUser(user) {
  try {
    await connectDB();

    const foundUser = await User.findOne({ email: user.email });

    if(!foundUser){
      const newUser = await User.create(user);
      return JSON.parse(JSON.stringify(newUser));
    }
    return ;
  } catch (error) {
    console.log(error);
  }
}
