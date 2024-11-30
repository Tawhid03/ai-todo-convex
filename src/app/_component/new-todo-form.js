"use client";

import { useState } from "react";

export function NewToDoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    // Pass the new todo back to the parent
    onAddTodo({ title, description });
    // Clear the input fields
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <label className="font-bold">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
      />
      <label className="font-bold">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded p-2 h-10"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}