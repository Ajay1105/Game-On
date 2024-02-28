import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import User from "@/models/user.js";
import transaction from "@/models/transaction.js";
import connectDB from "../mongodb/connectDB.js";

export async function GET(req, res) {
  try {
    await connectDB();
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    const foundUser = await User.findOne({ email });
    
    const transactions = await transaction.find({ buyerId: foundUser._id });
    return NextResponse.json(
      {
        transactions,
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
