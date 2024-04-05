import { NextResponse } from "next/server";

export async function POST(req, res){
    const secret = process.env.WEBHOOK_RAZORPAY_SECRET;
    const body = await req.json();

    console.log(body.payload,body.payload.payment, body.payload.payment.entity);
    return NextResponse.json({status:200});
}

export async function GET(req, res){
    return NextResponse.json({message: "Hello World"});
}