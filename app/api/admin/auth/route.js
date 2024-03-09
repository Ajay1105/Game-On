import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const token = body.token;
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized: No token provided",
      },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json(
      { message: "Access granted to protected page", user: decoded },
      { status: 200 }
    );
  } catch (error) {
    console.log("error",error);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
