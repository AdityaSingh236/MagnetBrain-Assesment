import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/api";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';

export default function TaskItem({ task, onTaskUpdated, onTitleClick }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      await updateTask(task._id, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      onTaskUpdated();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteTask(task._id);
      setShowDeleteModal(false);
      onTaskUpdated();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

const handleEditSave = async () => {
  if (!title || !description || !dueDate) {
    toast.error("Please fill all the fields!");
    return;
  }

  setLoading(true);
  try {
    await updateTask(task._id, { title, description, dueDate, priority });
    toast.success("Task updated successfully!"); 
    setIsEditing(false);
    onTaskUpdated();
  } catch (err) {
    toast.error(err.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  const priorityColors = {
    high: "bg-red-200",
    medium: "bg-yellow-200",
    low: "bg-green-200",
  };

  return (
    <div className={`p-4 rounded shadow ${priorityColors[task.priority]}`}>
      <div className="flex justify-between items-center">
        <h3
          className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
          onClick={() => onTitleClick(task._id)}
        >
          {task.title}
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handleStatusToggle}
            className={`px-2 py-1 rounded ${
              task.status === "completed"
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
            disabled={loading}
          >
            {task.status === "completed" ? "Completed" : "Pending"}
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-2 py-1 rounded bg-red-500 text-white"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>

      <p className="mt-2">{task.description}</p>
      <p className="mt-1 text-sm text-gray-600">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
