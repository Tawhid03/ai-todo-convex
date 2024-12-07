import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

// Fetch todos for the authenticated user
export const getTodos = queryGeneric({
  args: {},
  handler: async (ctx) => {
    const userId = ctx.auth?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    return await ctx.db.query("todos").filter((q) => q.eq(q.field("userId"), userId)).collect();
  },
});

// Add a new todo for the authenticated user
export const addTodo = mutationGeneric({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const todo = {
      title: args.title,
      description: args.description,
      completed: false,
      userId,
    };
    await ctx.db.insert("todos", todo);
  },
});

// Toggle a todo's completed state
export const toggleTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    const userId = ctx.auth?.userId;
    if (todo.userId !== userId) throw new Error("Unauthorized action");
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Delete a todo
export const deleteTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    const userId = ctx.auth?.userId;
    if (todo.userId !== userId) throw new Error("Unauthorized action");
    await ctx.db.delete(args.id);
  },
});
