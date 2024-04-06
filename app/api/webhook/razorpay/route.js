import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { createTransaction } from "@/app/actions/transaction.action";
import User from "@/models/user.js";
import connectDB from "../../mongodb/connectDB";

export async function POST(req, res) {
  const secret = process.env.WEBHOOK_RAZORPAY_SECRET;
  const body = await req.json();
  const headersList = headers();

  //console.log(headersList.get('x-razorpay-signature'));
  const hashedSign = crypto.createHmac("sha256", secret);
  hashedSign.update(JSON.stringify(body));
  const generatedSignature = hashedSign.digest("hex");

  if (headersList.get("x-razorpay-signature") !== generatedSignature) {
    return NextResponse.json({ status: 400 });
  }
  console.log("Razorpay Webhook received");

  let foundUser;
  const email = body.payload.payment.entity?.email || "";
  try {
    await connectDB();
    foundUser = await User.findOne({ email });
    console.log(foundUser);
  } catch (error) {
    return NextResponse.json({ message: "User not found", error: error });
  }
  console.log("outside of User found");
  try {
    const transaction = {
      amount: body.payload.payment.entity.amount / 100,
      stadiumId: body.payload.payment.entity.notes?.stadiumId || "",
      time:
        body.payload.payment.entity.notesbody.payload.payment.entity.notes
          ?.time || 0,
      buyerId: foundUser._id || "",
      createdAt: new Date(),
      captainName: body.payload.payment.entity.notes?.captainName || "",
      phoneNumber: body.payload.payment.entity.notes?.phoneNumber || "",
      noOfPlayers: body.payload.payment.entity.notes?.noOfPlayers || "",
    };

    console.log("inside of try-catch");
    await createTransaction(transaction);
    
  } catch (error) {
    return NextResponse.json({ message: "error", err: error });
  }

  return NextResponse.json({ status: 200 });
}

export async function GET(req, res) {
  return NextResponse.json({ message: "Hello World" });
}
