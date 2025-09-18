import React from "react";

export default function TaskModal({ task, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-red-500 font-bold"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="mb-2">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="mb-2">
          <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
      </div>
    </div>
  );
}
