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

export async function GET(req, { params: { taskId } }) {
  try {
    const task = await Tasks.findById({
      _id: taskId,
    });
    return NextResponse.json(task, {
      status: 200,
      statusText: "task successfully fetched",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Couldn't fetch task  " },
      { status: 400, statusText: "Error while fetching task" }
    );
  }
}

export async function DELETE(req, { params: { taskId } }) {
  try {
    const task = await Tasks.findByIdAndDelete({
      _id: taskId,
    });
    return NextResponse.json(task, {
      status: 200,
      statusText: "Removed task successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting task",
      },
      {
        status: 400,
        statusText: "Error deleting task",
      }
    );
  }
}

export async function PATCH(req, { params: { taskId } }) {
  let newTask = await req.json();
  try {
    const task = await Tasks.findByIdAndUpdate(
      {
        _id: taskId,
      },
      newTask,
      { new: true }
    );

    return NextResponse.json(task, {
      status: 200,
      statusText: "task updated successfully",
    });
  } catch (error) {
    console.table(error);
    return NextResponse.json(
      {
        message: "task wasn't updated",
      },
      { status: 400, statusText: "Error while updating task" }
    );
  }
}
