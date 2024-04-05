import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res){
    const secret = process.env.WEBHOOK_RAZORPAY_SECRET;
    const body = await req.json();
    const headersList= headers()

    //console.log(headersList.get('x-razorpay-signature'));
    const hashedSign = crypto.createHmac('sha256', secret)
    hashedSign.update(JSON.stringify(body))
    const generatedSignature = hashedSign.digest('hex')
    
    if(headersList.get('x-razorpay-signature') !== generatedSignature){
        return NextResponse.json({status:400});
    }
    console.log("Razorpay Webhook received");

    return NextResponse.json({status:200});
}

export async function GET(req, res){
    return NextResponse.json({message: "Hello World"});
}