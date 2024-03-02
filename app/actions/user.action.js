"use server";

import {connectDB} from '@/app/api/mongodb/connectDB.js';
import User from '@/middleware/user.js';

// CREATE
export async function createUser(user) {
  try {
    await connectDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}
