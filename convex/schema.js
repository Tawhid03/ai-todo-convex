import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  todos: defineTable({
    userId: v.string(), // Ensure this is included during insertion
    title: v.string(),
    description: v.string(),
    completed: v.boolean(),
  }),
});
export default schema;

