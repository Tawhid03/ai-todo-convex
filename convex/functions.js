import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";


// Define a query to get all todos
export const getTodos = queryGeneric({
 handler: async (ctx) => {
   return await ctx.db.query("todos").collect();
 },
});


// Define a mutation to add a new todo
export const addTodo = mutationGeneric({
 args: {
   title: v.string(),
   description: v.string(),
 },
 handler: async (ctx, args) => {
   const todo = {
     title: args.title,
     description: args.description,
     completed: false,
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
   const todo = await ctx.db.get(args.id);
   if (!todo) throw new Error("Todo not found");
   await ctx.db.patch(args.id, { completed: !todo.completed });
 },
});


// Define a mutation to delete a todo
export const deleteTodo = mutationGeneric({
 args: {
   id: v.id("todos"),
 },
 handler: async (ctx, args) => {
   await ctx.db.delete(args.id);
 },
});
