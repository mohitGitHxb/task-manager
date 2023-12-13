import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connectDb()
  .then(() => {
    console.log("Connection established!!! can start server");
  })
  .catch((err) => {
    console.log("Connection error,error: " + err);
  });

export async function GET() {
  try {
    const users = await User.find();
    if (!users) {
      console.log("There are no users");
    }
    return NextResponse.json(users, {
      status: 200,
      statusText: "fetched users successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 404,
      statusText: "Failed to fetch users",
    });
  }
}
export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    about,
    profileURL,
  });
  try {
    const createdUser = await user.save();
    const response = NextResponse.json(createdUser, {
      status: 201,
      statusText: "Created user successfully",
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create user !!",
      },
      { status: 403, statusText: "Failed to create user" }
    );
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
