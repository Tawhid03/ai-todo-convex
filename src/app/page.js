
//page.js
"use client";

import { useMutation, useQuery } from "convex/react";
import { NewToDoForm } from "./_component/new-todo-form";
import { api } from "../../convex/_generated/api";

export default function Home() {
  // Using Convex to manage todos
  const todos = useQuery(api.functions.getTodos) || [];
  const addTodoMutation = useMutation(api.functions.addTodo);
  const toggleTodoMutation = useMutation(api.functions.toggleTodo);
  const deleteTodoMutation = useMutation(api.functions.deleteTodo);

  // Function that will be passed to NewToDoForm as a prop
  const handleAddTodo = async (todo) => {
    await addTodoMutation(todo);
  };

  // Function to toggle a todo's completed state
  const handleToggleTodo = async (id) => {
    await toggleTodoMutation({ id });
  };

  // Function to remove a todo
  const handleRemoveTodo = async (id) => {
    await deleteTodoMutation({ id });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">To-Do List</h1>

      {/* Display todos */}
      <ul className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks available. Add your first task!</p>
        ) : (
          todos.map(({ _id, title, description, completed }) => (
            <li
              key={_id}
              className={`flex items-start justify-between p-5 border rounded-md shadow-md ${
                completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleToggleTodo(_id)}
                  className="h-5 w-5 mt-1"
                />
                <div>
                  <p className="font-bold text-xl">{title}</p>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
              {/* Remove button */}
              <button
                onClick={() => handleRemoveTodo(_id)}
                className="text-red-500 text-sm font-bold hover:text-red-700 transition-all"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Pass handleAddTodo to NewToDoForm */}
      <NewToDoForm onAddTodo={handleAddTodo} />
    </div>
  );
}
