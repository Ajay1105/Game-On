import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

export async function POST(req, res) {
    const body = await req.json();
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET_ID,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = body.amount;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      return NextResponse.json(
        {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        },
        { status: 200 }
      );
    //   res.status(200).json({
    //     id: response.id,
    //     currency: response.currency,
    //     amount: response.amount,
    //   });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        {
          message: err,
        },
        { status: 404 }
      );
    }
}
