/* eslint-disable camelcase */
import { createTransaction } from "@/app/actions/transaction.action";
import { NextResponse } from "next/server";
import stripe from "stripe";
import User from "@/models/user.js";
import connectDB from "../../mongodb/connectDB.js";

export async function POST(request, Response) {
  console.log("Stripe Webhook received");
  const body = await request.text();

  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.WEBHOOK_STRIPE_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  let foundUser;
  
  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
   // console.log("log", event.data.object);
    const email = metadata?.email || "";
    try {
      await connectDB();
      foundUser = await User.findOne({ email });
    } catch (error) {
      return NextResponse.json({ message: "User not found", error: error });
    }

    const transaction = {
      stripeId: id,
      amount: amount_total/100 ,
      stadiumId: metadata?.stadiumId || "",
      time: metadata?.time || 0,
      buyerId:  foundUser._id || "",
      createdAt: new Date(),
      captainName: metadata?.captainName || "",
      phoneNumber: metadata?.phoneNumber || "",
      noOfPlayers: metadata?.noOfPlayers || "",
    };

    const newTransaction = await createTransaction(transaction);
    
    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}