import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const secret = process.env.WEBHOOK_RAZORPAY_SECRET;
    const body = await req.json();
    const headersSignature = headers('x-razorpay-signature')

    console.log(headersSignature);
    return NextResponse.json({status:200});
}

export async function GET(req, res){
    return NextResponse.json({message: "Hello World"});
}