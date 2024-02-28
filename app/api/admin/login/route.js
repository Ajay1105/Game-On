import { NextResponse } from "next/server";
import StadiumAdmin from "@/models/transaction.js";
import connectDB from "../mongodb/connectDB.js";

export async function GET(req, res) {
    const body = await req.json();

    try {
        await connectDB();
        const foundAdmin = await StadiumAdmin.find({email:body.email});
        if(!foundAdmin) {
            return NextResponse.json(
                {
                    message: "Admin not found",
                },
                { status: 404 }
            );
        }
        if(foundAdmin.password === body.password) {
            return NextResponse.json(
                {
                    message: "Admin found",
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    message: "Password incorrect",
                },
                { status: 401 }
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