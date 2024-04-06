import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import connectDB from "@/models/stadium.js";

export async function GET(req, context, res) {
  try {
    const { params } = context;
    const stadiumId = params.Id;
    if (!stadiumId) {
      return NextResponse.json(
        { message: "stadiumId not found" },
        { status: 404 }
      );
    }
    await connectDB();
    const stadium = await Stadium.findById(stadiumId);
    return NextResponse.json({ stadium: stadium }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
