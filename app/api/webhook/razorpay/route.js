import { NextResponse } from "next/server";

export async function POST(req, res){
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const body = await req.json();

    console.log(body);
    return NextResponse.json({status:200});
}

export async function GET(req, res){
    return NextResponse.json({message: "Hello World"});
}