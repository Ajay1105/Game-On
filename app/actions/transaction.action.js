"use server"

import { redirect } from 'next/navigation'
import Stripe from "stripe";
import connectDB from "../api/mongodb/connectDB.js";
import Transaction from "@/models/transaction.js";

export async function checkoutCredits(transaction) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
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
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}?success=true`,
})

redirect(session.url)
}

export async function createTransaction(transaction) {
  try {
    console.log("Creating transaction", transaction);
    await connectDB();

    const newTransaction = await Transaction.create({
        buyer:transaction.buyerId,
        amount: transaction.amount,
        stadiumId: transaction.stadiumId,
        time: transaction.time,
    });

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    
  }
};