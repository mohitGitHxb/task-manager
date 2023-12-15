import { makeApiCall } from "@/helper/httpHelper";
export async function addTask(task) {
  const result = await makeApiCall
    .post("/api/tasks", task)
    .then((response) => response?.data);
  return result;
}

export async function getTasksByUser(userId) {
  const result = await makeApiCall
    .get(`/api/users/${userId}/tasks`)
    .then((res) => res?.data);
  return result;
}

export async function deleteTaskById(taskId) {
  const result = await makeApiCall
    .delete(`/api/tasks/${taskId}`)
    .then((res) => res?.data);
  return result;
}
export async function updateTaskById(update) {
  const result = await makeApiCall
    .patch(`/api/tasks/${update?.id}`, update?.patch)
    .then((res) => res?.data);
  return result;
}
export async function getTaskById(taskId) {
  const result = await makeApiCall
    .get(`/api/tasks/${taskId}`)
    .then((res) => res?.data);
  return result;
}

export async function getAllTasks() {
  const result = await makeApiCall.get(`/api/tasks`).then((res) => res?.data);
  return result;
}
