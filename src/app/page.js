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
    <div>
      {/* Your UI here */}
    </div>
  );
}
