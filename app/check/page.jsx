"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

//import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/app/actions/transaction.action.js";

//import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}) => {
  //const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert({
        "title": "Order placed!",
        "description": "You will receive an email confirmation",
        "className": "success-toast",
      });
    }

    if (query.get("canceled")) {
      alert({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan : "trail plan",
      amount : 100,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <button
          type="submit"
          role="link"
          className="w-40 rounded-full bg-purple-500"
        >
          Buy Credit
        </button>
      </section>
    </form>
  );
};

export default Checkout;