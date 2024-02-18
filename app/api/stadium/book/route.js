import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import connectDB from "../mongodb/connectDB";
import Stadium from "@/models/stadium.js";
import User from "@/models/user.js";
import Slot from "@/models/slot.js";

export async function PATCH(req, res) {
  try {
    await connectDB();
    const { id, startTime, endTime } = req.body;
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;

    const stadium = await Stadium.findById(id);
    stadium.bookedSlots.push({ startTime, endTime });
    await stadium.save();

    const foundUser = await User.findById({email});
   
    const newSlot = new Slot({
      stadiumId: id,
      startTime,
      endTime,
      bookedBy: foundUser._id,
    });
    const savedSlot = await newSlot.save();

    await foundUser.bookedSlots.push(savedSlot._id);

    return NextResponse.json(
      {
        message: "Stadium added to database",
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