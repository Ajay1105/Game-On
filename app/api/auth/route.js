import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import User from "@/models/user.js";
import connectDB from "../mongodb/connectDB";

export async function POST(req, res) {
  try {
    await connectDB();
    
    const user = await currentUser();
    const { firstName } = user;
    const email = user.emailAddresses[0].emailAddress;
    const foundUser = await User.findOne({ email });
    
    if (!foundUser) {
      const newUser = new User({
        email: email,
        name: firstName,
      });
      await newUser.save();
      return NextResponse.json(
        {
          message: "User added to database",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User already saved in database",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}


export async function GET(req, res) {
  return NextResponse.json(
    {
      message: "User added to database",
    },
    { status: 200 }
  );
}