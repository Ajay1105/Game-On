import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import connectDB from "../../mongodb/connectDB";
import Stadium from "@/models/stadium.js";
import User from "@/models/user.js";
import Slot from "@/models/slot.js";

export async function PATCH(req, res) {
  try {
    await connectDB();
    const body = await req.json();
    const user = await currentUser();
    const email = "erajayky@gmail.com"//user.emailAddresses[0].emailAddress;

    const stadium = await Stadium.findById(body.id);
    
    if (!stadium) {
      return NextResponse.json({message: "stadium not found!"}, { status: 404 });
    }

    stadium.bookedSlots.push({ startTime:body.startTime, endTime:body.endTime });
    await stadium.save();

    const foundUser = await User.findOne({email:email});
    if(!foundUser){
      return NextResponse.json({message: "user not found!"}, { status: 404 });
    }
       
    const newSlot = new Slot({
      stadiumId: body.id,
      startTime: body.startTime,
      endTime: body.endTime,
      bookedBy: foundUser._id,
    });
    const savedSlot = await newSlot.save();
    
    foundUser.bookedSlot.push(savedSlot._id);
    await foundUser.save();

    return NextResponse.json(
      {
        message: "stadium booked successfully!",
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