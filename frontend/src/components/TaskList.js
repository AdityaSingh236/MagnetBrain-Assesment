import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import { fetchTask } from "../services/api";

export default function TaskList({ tasks, onTaskUpdated }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTitleClick = async (taskId) => {
    setLoading(true);
    try {
      const task = await fetchTask(taskId); 
      setSelectedTask(task);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch task:", err.message);
      alert("Failed to fetch task details");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTitleClick={handleTitleClick}
        />
      ))}

      {isModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 text-white text-lg">
          Loading...
        </div>
      )}
    </div>
  );
}