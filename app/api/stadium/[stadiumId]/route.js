import { NextResponse } from "next/server";
import Stadium from "@/models/stadium.js";
import connectDB from "../mongodb/connectDB";

export async function GET(req, res) {
    const { stadiumId } = req.params;
    await connectDB();
    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) {
        return NextResponse.error(new Error("Not found"), 404);
    }
    return NextResponse.json(stadium);
}