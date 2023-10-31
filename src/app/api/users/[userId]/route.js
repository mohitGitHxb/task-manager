import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function DELETE(req, { params: { userId } }) {
  try {
    const user = await User.findByIdAndDelete({
      _id: userId,
    });
    return NextResponse.json(user, {
      status: 203,
      statusText: "Removed user successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting user",
      },
      {
        status: 400,
        statusText: "Error deleting user",
      }
    );
  }
}

export async function GET(req, { params: { userId } }) {
  try {
    const user = await User.findById({
      _id: req.params.userId,
    });
    return NextResponse.json(user, {
      status: 200,
      statusText: "User successfully fetched",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Couldn't fetch user  " },
      { status: 400, statusText: "Error while fetching user" }
    );
  }
}

export async function PATCH(req, { params: {userId} }) {
    let newUser = await req.json();
    try {
        const user = await User.findByIdAndUpdate({
            _id:userId
        },newUser,{new:true})

        return NextResponse.json(user,{
            status:202,
            statusText:"User updated suucessfully"
        })
    } catch (error) {
        console.table(error);
        return NextResponse.json({
            message:"USer wasn't updated"
        })
    }
}
