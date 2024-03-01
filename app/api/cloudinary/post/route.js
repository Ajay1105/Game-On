import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import connectDB from "../mongodb/connectDB.js";

export async function POST(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const { stadiumId, photo } = req.json();
  
  try {
    const photoUrl = await cloudinary.uploader.upload(photo);
    const stadium = await Stadium.findById(stadiumId);
    stadium.photos.push(photoUrl);
    await stadium.save();
    return NextResponse.json(
      {
        message: "Photo added to stadium",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 404 }
    );
  }

}
