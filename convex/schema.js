import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),          // Title of the todo
    description: v.string(),    // Description of the todo
    completed: v.boolean(),     // Whether the todo is completed
  }),
});
