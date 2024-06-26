"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import connectDB from "../api/mongodb/connectDB.js";
import Transaction from "@/models/transaction.js";
import Stadium from "@/models/stadium.js";
import User from "@/models/user.js";
import Razorpay from "razorpay";

export async function checkoutCredits(transaction) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: transaction.plan,
          },
          unit_amount: transaction.amount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      transactionId: transaction.id,
      stadiumId: transaction.stadiumId,
      time: transaction.time,
      email: transaction.email,
      captainName: transaction.captainName,
      phoneNumber: transaction.phoneNumber,
      noOfPlayers: transaction.noOfPlayers,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}?success=true`,
  });

  redirect(session.url);
}

export async function createTransaction(transaction) {
  console.log("Creating transaction", transaction);
  try {
    console.log("inside try-catch transaction BLOCK");
    await connectDB();

    const newTransaction = await Transaction.create({
      buyerId: transaction.buyerId,
      amount: transaction.amount,
      stadiumId: transaction.stadiumId,
      time: transaction.time,
      captainName: transaction.captainName,
      phoneNumber: transaction.phoneNumber,
      noOfPlayers: transaction.noOfPlayers,
    });

    const stadium = await Stadium.findById(transaction.stadiumId);
    stadium.bookedSlots.push({
      startTime: transaction.time,
      transactionId: newTransaction._id,
    });
    await stadium.save();

    const user = await User.findById(transaction.buyerId);
    if(!user){
      return JSON.stringify("No user found");
    }
    user.bookedSlot.push(newTransaction._id);
    await user.save();

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    console.error("Error creating transaction", error);
    return { error: error.message };
  }
}
