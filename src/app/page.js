"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { NewToDoForm } from "./_component/new-todo-form";
import ToDoList from "./_component/to-do-list";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  // Fetch todos using Convex
  const todos = useQuery(api.functions.getTodos) || [];
  const addTodoMutation = useMutation(api.functions.addTodo);

  // Function to handle adding a new todo
  const handleAddTodo = async (todo) => {
    try {
      await addTodoMutation(todo);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">To-Do List</h1>

      {/* Authenticated View */}
      <Authenticated>
        <ToDoList todos={todos} />
        <NewToDoForm onAddTodo={handleAddTodo} />
      </Authenticated>

      {/* Unauthenticated View */}
      <Unauthenticated>
        <div className="text-center space-y-4">
          <p className="text-gray-700">Please sign in to manage your tasks.</p>
          <SignInButton />
        </div>
      </Unauthenticated>
    </div>
  );
}
