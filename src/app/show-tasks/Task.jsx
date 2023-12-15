import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import UserContext from "../context/userContext";
function getTaskStatusColor(status) {
  if (status === "completed") {
    return { bg: "bg-green-800", state: "Completed" };
  } else if (status === "in_progress") {
    return { bg: "bg-blue-700", state: "In Progress" };
  } else {
    return { bg: "bg-gray-800", state: "Pending" };
  }
}
const Task = ({ task, deleteTaskParent, updateTaskParent }) => {
  const { user } = useContext(UserContext);
  const [status, setStatus] = useState(task?.status);
  function deleteTask(taskId) {
    // ....
    deleteTaskParent(taskId);
  }
  async function handleStatusUpdate(e) {
    setStatus(e.target.value);
    let patch = {
      status: e.target.value,
    };
    updateTaskParent({ id: task?._id, patch: patch });
  }

  return (
    <div
      className={`shadow-lg mt-2 rounded-md ${
        getTaskStatusColor(task?.status).bg
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <span
            onClick={() => {
              deleteTask(task._id);
            }}
            className="shadow-lg hover:bg-gray-900 bg-gray-950 rounded-full w-9 h-9 flex justify-center items-center cursor-pointer "
          >
            <RxCross1 />
          </span>
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3">
          <span className="text-left flex flex-row gap-4 items-center">
            <label
              htmlFor="task_status"
              className="block text-xl font-medium mt-2.5"
            >
              Status
            </label>
            <span className="mt-4">
              <select
                id="task_status"
                className="w-full p-2 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800"
                name="task_status"
                onChange={handleStatusUpdate}
                value={status}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
              </select>
            </span>
          </span>
          <p className="text-right">
            Author: <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
