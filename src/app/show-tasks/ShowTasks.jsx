"use client";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import UserContext from "../context/userContext";
import {
  deleteTaskById,
  getTasksByUser,
  updateTaskById,
} from "@/services/taskService";
const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Add this line
  const context = useContext(UserContext);
  async function loadTasks(userId) {
    try {
      const data = await getTasksByUser(userId);
      setTasks([...data].reverse());
      console.log(data);
      toast.success("Fetched all tasks");
    } catch (error) {
      console.log(error);
      toast.error("Couldn't fetch all tasks");
    }
  }

  useEffect(() => {
    console.log(context.user);
    if (context.user) {
      loadTasks(context.user?._id);
    }
  }, [context.user]);

  async function deleteTaskParent(tasksId) {
    try {
      const result = await deleteTaskById(tasksId);
      console.log(result);
      const newTasks = tasks.filter((item) => item._id != tasksId);
      setTasks(newTasks);
      toast.success("Your task is deleted ");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting task !!");
    }
  }
  async function updateTaskParent(update) {
    try {
      const result = await updateTaskById(update);
      console.log(result);
      await loadTasks(context?.user?._id);
      toast.success("Your task is updated ");
    } catch (error) {
      console.log(error);
      toast.error("Error in updating task !!");
    }
  }

  function getFilteredTasks() {
    if (filter === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === filter);
  }
  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4 flex flex-col gap-3">
        <h1 className="text-3xl mb-3 ">Your tasks ( {tasks?.length} )</h1>

        <div className="flex flex-row gap-2">
          <input
            type="radio"
            id="all"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="all">Show all</label>

          <input
            type="radio"
            id="completed"
            name="filter"
            value="completed"
            checked={filter === "completed"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="completed">Completed</label>

          <input
            type="radio"
            id="in_progress"
            name="filter"
            value="in_progress"
            checked={filter === "in_progress"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="in_progress">In Progress</label>

          <input
            type="radio"
            id="pending"
            name="filter"
            value="pending"
            checked={filter === "pending"}
            onChange={(e) => setFilter(e.target.value)}
          />
          <label htmlFor="pending">Pending</label>
        </div>

        {getFilteredTasks().map((task) => (
          <Task
            task={task}
            key={task._id}
            deleteTaskParent={deleteTaskParent}
            updateTaskParent={updateTaskParent}
            load={loadTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
