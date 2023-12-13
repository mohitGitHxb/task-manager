import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import errorMessage from "@/helper/errorMessage";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
connectDb()
  .then(() => {
    console.log("Connection established!!! can start server");
  })
  .catch((err) => {
    console.log("Connection error,error: " + err);
  });
export async function POST(request) {
  const { email, password } = await request.json();
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 404,
          statusText: "User not found",
        }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        {
          status: 400,
          statusText: "Invalid credentials",
        }
      );
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the token in a cookie

    const response = NextResponse.json(user, {
      status: 200,
      statusText: "User logged in successfully",
    });
    response.cookies.set("authToken", token, {
      expiresIn: "1d",
      httpOnly: false,
    });
    return response;
  } catch (error) {
    console.log(error);
    return errorMessage("Failed to LOGIN user", false, 401, "Unauthorized");
  }
}

// Params or query parameters
/* export function DELETE(){
    console.log("Deleting...");
    return NextResponse.json({
        message:"deleted users",
    },{
        status:201,
        statusText:"nextjs is op"
    });
} */
