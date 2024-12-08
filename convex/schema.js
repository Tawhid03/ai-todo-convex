import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  todos: defineTable({
    userId: v.string(),        // Link todos to a user
    title: v.string(),         // Todo title
    description: v.string(),   // Todo description
    completed: v.boolean(),    // Completed state
  }),
});

export default schema;
