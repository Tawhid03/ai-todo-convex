import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

// Get todos specific to the logged-in user
export const getTodos = queryGeneric({
  handler: async (ctx) => {
    const userId = ctx.auth.identity?.userId;
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    return await ctx.db.query("todos").filter({ userId }).collect();
  },
});

// Add a new todo specific to the logged-in user
export const addTodo = mutationGeneric({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth.identity?.userId;
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const todo = {
      userId,
      title: args.title,
      description: args.description,
      completed: false,
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
    const userId = ctx.auth.identity?.userId;
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) {
      throw new Error("Todo not found or unauthorized");
    }
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Delete a todo
export const deleteTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth.identity?.userId;
    if (!userId) {
      throw new Error("User is not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) {
      throw new Error("Todo not found or unauthorized");
    }
    await ctx.db.delete(args.id);
  },
});

