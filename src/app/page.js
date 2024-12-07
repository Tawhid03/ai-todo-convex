"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { NewToDoForm } from "./_component/new-todo-form";
import  ToDoList  from "./_component/to-do-list";

export default function Home() {
  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-Do List</h1>

      {/* Authenticated View */}
      <Authenticated>
        <ToDoList />
        <NewToDoForm />
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
