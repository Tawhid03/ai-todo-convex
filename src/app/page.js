// File: src/app/page.js
"use client";

import { api } from "../../convex/_generated/api.js";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";

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
      <h1>AI Todo List</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo({ id: todo._id })}
            />
            {todo.title} - {todo.description}
            <button onClick={() => deleteTodo({ id: todo._id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
