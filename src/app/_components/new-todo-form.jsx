// File: new-todo-form.jsx

"use client";

import { useState } from "react";

export default function NewTodoForm({ addTodo }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTitle, newDescription);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left", margin: "0 auto", width: "80%" }}>
      <h2 style={{ fontWeight: "bold" }}>Title</h2>
      <div style={{ border: "1px solid black", padding: "0.5rem", marginBottom: "1rem", minHeight: "2rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "100%", border: "none", outline: "none" }}
        />
      </div>

      <h2 style={{ fontWeight: "bold" }}>Description</h2>
      <div style={{ border: "1px solid black", padding: "0.5rem", marginBottom: "1rem", minHeight: "4rem" }}>
        <textarea
          placeholder="Enter description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ width: "100%", border: "none", outline: "none", resize: "none" }}
        ></textarea>
      </div>

      <button
        type="submit"
        style={{ backgroundColor: "blue", color: "white", padding: "0.5rem 1rem", marginBottom: "1rem" }}
      >
        Add Item
      </button>
    </form>
  );
}
