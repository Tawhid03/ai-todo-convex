// File: convex/functions.js

import { query, mutation } from "convex/server";

// Fetch all todos from the "todos" collection
export const getTodos = query(async ({ db }) => {
  return await db.table("todos").collect();
});

// Add a new todo to the "todos" collection
export const addTodo = mutation(async ({ db }, { title, description }) => {
  return await db.table("todos").insert({
    title,
    description,
    completed: false,
  });
});

// Toggle the "completed" status of a todo
export const toggleTodo = mutation(async ({ db }, { id }) => {
  const todo = await db.table("todos").get(id);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return await db.table("todos").update(id, {
    completed: !todo.completed,
  });
});

// Delete a todo from the "todos" collection
export const deleteTodo = mutation(async ({ db }, { id }) => {
  return await db.table("todos").delete(id);
});
