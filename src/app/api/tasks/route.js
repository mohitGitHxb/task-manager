import { connectDb } from "@/helper/db";
import { Tasks } from "@/models/task";
import { NextResponse } from "next/server";
connectDb()
  .then(() => {
    console.log("Connection established!!! can start server");
  })
  .catch((err) => {
    console.log("Connection error,error: " + err);
  });

export async function GET() {
  try {
    const tasks = await Tasks.find();
    if (!tasks) {
      console.log("There are no tasks in database");
    }
    return NextResponse.json(tasks, {
      status: 200,
      statusText: "fetched users successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 404,
      statusText: "Failed to fetch tasks",
    });
  }
}

export async function POST(request) {
  const { title, content, addedDate, status, userId } = await request.json();

  //   const user = new User({
  //     name,
  //     email,
  //     password,
  //     about,
  //     profileURL,
  //   });

  const task = new Tasks({
    title: title,
    content: content,
    addedDate: addedDate,
    status: status,
    userId: userId,
  });
  try {
    const createdUser = await task.save();
    const response = NextResponse.json(createdUser, {
      status: 201,
      statusText: "Created task successfully",
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create task !!",
      },
      { status: 401, statusText: "Failed to create task" }
    );
  }
}
