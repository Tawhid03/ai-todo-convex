// File: convex/functions.js
import { query, mutation } from "../convex/_generated/server.js";

// Query to fetch all todos
export const getTodos = query(async ({ db }) => {
  return await db.query("todos").collect();
});

// Mutation to add a new todo
export const addTodo = mutation(async ({ db }, { title, description }) => {
  await db.insert("todos", {
    title,
    description,
    completed: false,
  });
});

// Mutation to toggle a todo's completed state
export const toggleTodo = mutation(async ({ db }, { id }) => {
  const todo = await db.get(id);
  if (!todo) throw new Error("Todo not found");
  await db.patch(id, { completed: !todo.completed });
});

// Mutation to delete a todo
export const deleteTodo = mutation(async ({ db }, { id }) => {
  await db.delete(id);
});
