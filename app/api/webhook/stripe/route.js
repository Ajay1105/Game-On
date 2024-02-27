/* eslint-disable camelcase */
import { createTransaction } from "@/app/actions/transaction.action";
import { NextResponse } from "next/server";
import stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import User from "@/models/user.js";
import connectDB from "../../mongodb/connectDB.js";

export async function POST(request, Response) {
  console.log("Webhook received");
  const body = await request.text();

  const sig = String(request.headers.get("stripe-signature"));
  const endpointSecret = process.env.WEBHOOK_STRIPE_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  try {
    await connectDB();
    
    const user = await currentUser();
    const email = user.emailAddresses[0].emailAddress;
    const foundUser = await User.findOne({ email });
  } catch (error) {
    return NextResponse.json({ message: "User not found", error: error });
  }
  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount, metadata } = event.data.object;

    const transaction = {
      stripeId: id,
      amount: amount ,
      stadiumId: metadata?.stadiumId || "",
      time: Date(metadata?.time) || 0,
      buyerId:  foundUser._id || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);
    
    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}