// File: src/app/page.js

"use client";

import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import schema from "../../convex/schema";

export default function Home() {
  const todos = useQuery(api.todos.getTodos) || [];
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both the title and description.");
      return;
    }
    await addTodo({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>
        AI Todo List
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="title" style={{ fontWeight: "bold", display: "block" }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Home, Work, or School"
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc" }}
        />
        <label htmlFor="description" style={{ fontWeight: "bold", display: "block" }}>
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your task..."
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo({ id: todo._id })}
                style={{ marginRight: "0.5rem" }}
              />
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "grey" : "black",
                  }}
                >
                  {todo.title}
                </div>
                <div
                  style={{
                    color: "grey",
                    fontSize: "0.9rem",
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteTodo({ id: todo._id })}
              style={{
                backgroundColor: "transparent",
                color: "red",
                border: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
