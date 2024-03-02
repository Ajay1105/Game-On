import { NextResponse } from "next/server";
import StadiumAdmin from "@/models/stadiumAdmin.js";
import connectDB from "../../mongodb/connectDB.js";

export async function POST(req, res) {
    const body = await req.json();
    await connectDB();
    console.log(body);

    try {
        const newAdmin = new StadiumAdmin({
            name: body.name,
            email: body.email,
            password: body.password,
            stadiumId: body.stadiumId,
        });
        await newAdmin.save();
        return NextResponse.json({ message: "Admin added successfully" }, {status:201});
    } catch (error) {
        return NextResponse.json({ error: error.message }, {status:500});
    }

}