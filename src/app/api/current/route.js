import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;
  const data = jwt.verify(authToken, process.env.JWT_SECRET);
  console.log("Current user " , data);
  if (data) {
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json(user, {
      status: 200,
      statusText: "Fetched current user SUCCESSFULLY",
    });
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
