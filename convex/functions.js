import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

// Query to get todos belonging to the signed-in user
export const getTodos = queryGeneric({
  handler: async (ctx) => {
    const userId = ctx.auth?.userId; // Get userId from auth context
    if (!userId) {
      throw new Error("User not authenticated");
    }
    return await ctx.db.query("todos").filter({ userId }).collect();
  },
});

// Mutation to add a new todo
export const addTodo = mutationGeneric({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = ctx.auth?.userId; // Get userId from auth context
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const todo = {
      title: args.title,
      description: args.description,
      completed: false,
      userId, // Link todo to the user
    };

    await ctx.db.insert("todos", todo);
  },
});

// Mutation to toggle a todo's completion status
export const toggleTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");

    const userId = ctx.auth?.userId; // Ensure the todo belongs to the user
    if (todo.userId !== userId) {
      throw new Error("Not authorized to modify this todo");
    }

    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Mutation to delete a todo
export const deleteTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");

    const userId = ctx.auth?.userId; // Ensure the todo belongs to the user
    if (todo.userId !== userId) {
      throw new Error("Not authorized to delete this todo");
    }

    await ctx.db.delete(args.id);
  },
});
