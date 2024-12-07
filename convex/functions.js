import { mutation, query } from "./_generated/server";

// Fetch todos for the authenticated user
export const getTodos = query(async ({ db, auth }) => {
  const user = await auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const userId = user.id;
  return await db.query("todos").filter({ userId }).collect();
});

// Add a new todo for the authenticated user
export const addTodo = mutation(async ({ db, auth }, { title, description }) => {
  const user = await auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const userId = user.id;
  await db.insert("todos", {
    title,
    description,
    completed: false,
    userId,
  });
});

// Toggle the completed state of a todo
export const toggleTodo = mutation(async ({ db, auth }, { id }) => {
  const user = await auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const todo = await db.get(id);
  if (!todo || todo.userId !== user.id) {
    throw new Error("Unauthorized access");
  }
  await db.patch(id, { completed: !todo.completed });
});

// Delete a todo for the authenticated user
export const deleteTodo = mutation(async ({ db, auth }, { id }) => {
  const user = await auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const todo = await db.get(id);
  if (!todo || todo.userId !== user.id) {
    throw new Error("Unauthorized access");
  }
  await db.delete(id);
});
