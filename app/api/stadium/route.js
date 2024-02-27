import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import connectDB from "../mongodb/connectDB.js";

export async function POST(req, res) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const newStadium = new Stadium({
      name: body.name,
      location: body.location,
      capacity: body.capacity,
      information: body.information,
      price: body.price,
    });

    await newStadium.save();
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

export async function GET(req, res) {
  try {
    await connectDB();
    const stadiums = await Stadium.find({});
    return NextResponse.json(
      {
        stadiums,
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
