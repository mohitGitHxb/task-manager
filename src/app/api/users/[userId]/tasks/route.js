import errorMessage from "@/helper/errorMessage";
import { Tasks } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userId = params?.userId;
  try {
    const tasks = await Tasks.find({
      userId: userId,
    });
    return NextResponse.json(tasks, {
      status: 200,
      statusText: "tasks for this user successfully fetched",
    });
  } catch (error) {
    return errorMessage(
      "Failed to find tasks for this user",
      false,
      404,
      "Nhi mila kuch"
    );
  }
}
