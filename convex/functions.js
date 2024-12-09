// File: convex/functions.js

import { query, mutation } from "convex/server";

export const todos = {
  getTodos: query(async ({ db }) => {
    return await db.table("todos").collect();
  }),
  addTodo: mutation(async ({ db }, { title, description }) => {
    return await db.table("todos").insert({
      title,
      description,
      completed: false,
    });
  }),
  toggleTodo: mutation(async ({ db }, { id }) => {
    const todo = await db.table("todos").get(id);
    if (!todo) throw new Error("Todo not found");
    return await db.table("todos").update(id, { completed: !todo.completed });
  }),
  deleteTodo: mutation(async ({ db }, { id }) => {
    return await db.table("todos").delete(id);
  }),
};

