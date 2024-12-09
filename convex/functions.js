// File: convex/functions.js

import { defineQuery, defineMutation } from "convex/server";

export const todos = {
  // Fetch all todos
  getTodos: defineQuery(async ({ db }) => {
    return await db.table("todos").collect();
  }),

  // Add a new todo
  addTodo: defineMutation(async ({ db }, { title, description }) => {
    return await db.table("todos").insert({
      title,
      description,
      completed: false,
    });
  }),

  // Toggle the completed status of a todo
  toggleTodo: defineMutation(async ({ db }, { id }) => {
    const todo = await db.table("todos").get(id);
    if (!todo) throw new Error("Todo not found");
    return await db.table("todos").update(id, { completed: !todo.completed });
  }),

  // Delete a todo
  deleteTodo: defineMutation(async ({ db }, { id }) => {
    return await db.table("todos").delete(id);
  }),
};
