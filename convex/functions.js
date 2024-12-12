// File: convex/functions.js
import { query, mutation } from "../convex/_generated/server.js";

// Define a module for todos
export const todos = {
  getTodos: query(async ({ db }) => {
    return await db.query("todos").collect();
  }),

  addTodo: mutation(async ({ db }, { title, description }) => {
    await db.insert("todos", { title, description, completed: false });
  }),

  toggleTodo: mutation(async ({ db }, { id }) => {
    const todo = await db.get(id);
    if (!todo) throw new Error("Todo not found");
    await db.patch(id, { completed: !todo.completed });
  }),

  deleteTodo: mutation(async ({ db }, { id }) => {
    await db.delete(id);
  }),
};
