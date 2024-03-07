/* eslint-disable camelcase */
import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser } from "@/app/actions/user.action.js";

export async function POST(req,res) {
  console.log("inside webhook clerk")
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE
  if (eventType === "user.created") {
    console.log("User created event")
    const { id, email_addresses, first_name, } = evt.data;

    const user = {
      email: email_addresses[0].email_address,
      name: first_name,
    };

    const newUser = await createUser(user);

    // Set public metadata
    // if (newUser) {
    //   await clerkClient.users.updateUserMetadata(id, {
    //     publicMetadata: {
    //       userId: newUser._id,
    //     },
    //   });
    // }
console.log("newUser", newUser);
    return NextResponse.json({ message: "OK", user: newUser });
  }

  
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}

export async function GET(req,res) {
  console.log("inside webhook clerk get method");
  return NextResponse.json({ message: "OK" });
}