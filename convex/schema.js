import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.string(),
    completed: v.boolean(),
    userId: v.string(), // Associate todos with a user
  }),
});

export default schema;
