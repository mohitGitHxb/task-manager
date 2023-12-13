import { makeApiCall } from "@/helper/httpHelper";
export async function addTask(task) {
  const result = await makeApiCall
    .post("/api/tasks", task)
    .then((response) => response?.data);
  return result;
}
