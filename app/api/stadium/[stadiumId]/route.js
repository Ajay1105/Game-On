import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import connectDB from "../../mongodb/connectDB.js";

export async function GET(req, context, res) {
  try {
    const { params } = context;
    const stadiumId = params.stadiumId;
    await connectDB();
    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) {
      return NextResponse.error(new Error("Not found"), 404);
    }
    return NextResponse.json(stadium, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
