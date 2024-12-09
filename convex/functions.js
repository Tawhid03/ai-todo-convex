// File: convex/functions.js

import { query, mutation } from "convex/server";
import { v } from "convex/values";

// Query to fetch all todos
export const getTodos = query(async ({ db }) => {
  return await db.table("todos").collect();
});

// Mutation to add a new todo
export const addTodo = mutation(async ({ db }, { title, description }) => {
  const todo = {
    title,
    description,
    completed: false,
  };
  await db.table("todos").insert(todo);
});

// Mutation to toggle a todo's completed state
export const toggleTodo = mutation(async ({ db }, { id }) => {
  const todo = await db.table("todos").get(id);
  if (!todo) throw new Error("Todo not found");
  await db.table("todos").update(id, { completed: !todo.completed });
});

// Mutation to delete a todo
export const deleteTodo = mutation(async ({ db }, { id }) => {
  await db.table("todos").delete(id);
});
