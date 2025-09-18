import React, { useState } from "react";
import { createTask } from "../services/api";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function CreateTaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);
    try {
      await createTask({ title, description, dueDate, priority, status: "pending" });
      toast.success("Task created successfully!"); 
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");

      onTaskCreated(); 
    } catch (err) {
      toast.error(err.message || "Something went wrong!"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
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

      <button
        type="submit"
        className={`w-full p-2 rounded text-white font-semibold ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
