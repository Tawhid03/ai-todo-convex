"use client";

import { api } from "../../convex/_generated/api";
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
    <div>
      <h1>Todo List</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.description}
            <button onClick={() => toggleTodo({ id: todo._id })}>
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => deleteTodo({ id: todo._id })}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
