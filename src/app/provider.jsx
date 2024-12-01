"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { api } from "../../convex/_generated/api";

// Initialize Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function Provider({ children }) {
  return (
    <ConvexProvider client={convex} api={api}>
      {children}
    </ConvexProvider>
  );
}
