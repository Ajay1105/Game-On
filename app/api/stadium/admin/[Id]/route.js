import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import StadiumAdmin from "@/models/stadiumAdmin.js";
import connectDB from "../../../mongodb/connectDB.js";

export async function GET(req, context, res) {
  try {
    const { params } = context;
    const AdminId = params.Id;
    if (!AdminId) {
      return NextResponse.json(
        { message: "AdminId not found" },
        { status: 404 }
      );
    }
    await connectDB();
    const stadiumAdmin = await StadiumAdmin.findById(AdminId);
    if (!stadiumAdmin) {
      return NextResponse.json(
        { message: "StadiumAdmin not found", stadium:AdminId },
        { status: 404 }
      );
    }
    const stadium = await Stadium.findById(stadiumAdmin.stadiumId);
    if (!stadium) {
      return NextResponse.json(
        { message: "Stadium not found", stadiumID:stadiumAdmin.stadiumId },
        { status: 404 }
      );
    }
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
