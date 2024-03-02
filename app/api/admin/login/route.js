import { NextResponse } from "next/server";
import StadiumAdmin from "@/models/stadiumAdmin.js";
import connectDB from "../../mongodb/connectDB.js";

export async function POST(req, res) {
    const body = await req.json();

    try {
        await connectDB();
        const foundAdmin = await StadiumAdmin.find({email:body.email}).exec();
        if(!foundAdmin) {
            return NextResponse.json(
                {
                    message: "Admin not found",
                },
                { status: 404 }
            );
        }
        
        if(foundAdmin[0].password === body.password) {
            return NextResponse.json(
                {
                    message: foundAdmin[0].stadiumId.toString(),
                },
                { status: 200 }
                );
            } else {
            
            return NextResponse.json(
                {
                    message: "Password incorrect",
                },
                { status: 404 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}