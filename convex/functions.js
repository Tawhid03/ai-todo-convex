import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

// Define a query to get todos for the authenticated user
export const getTodos = queryGeneric({
  handler: async (ctx) => {
    const user = await ctx.auth.getUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    const userId = user.id;
    return await ctx.db.query("todos").filter({ userId }).collect();
  },
});

// Define a mutation to add a new todo for the authenticated user
export const addTodo = mutationGeneric({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    const userId = user.id;
    const todo = {
      title: args.title,
      description: args.description,
      completed: false,
      userId,
    };
    await ctx.db.insert("todos", todo);
  },
});

// Define a mutation to toggle a todo's completed state
export const toggleTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== user.id) {
      throw new Error("Unauthorized access");
    }
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Define a mutation to delete a todo
export const deleteTodo = mutationGeneric({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUser();
    if (!user) {
      throw new Error("Not authenticated");
    }
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== user.id) {
      throw new Error("Unauthorized access");
    }
    await ctx.db.delete(args.id);
  },
});
