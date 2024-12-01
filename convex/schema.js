import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  todos: defineTable({
    title: v.string(),          // Field for the title of the todo
    description: v.string(),    // Field for the description
    completed: v.boolean(),     // Field to track if the todo is completed
  }),
});

export default schema;
