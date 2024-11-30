"use client";

import { useState } from "react";
import { NewToDoForm } from "./_component/new-todo-form";

export default function Home() {
  const [todos, setTodos] = useState([]);

  // Function that will be passed to NewToDoForm as a prop
  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: prevTodos.length + 1, ...todo, completed: false },
    ]);
  };

  // Function to remove a todo
  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-5">
      <h1 className="text-3xl font-bold">To-Do List</h1>

      {/* Display todos */}
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500">No tasks available. Add your first task!</p>
        ) : (
          todos.map(({ id, title, description, completed }) => (
            <li
              key={id}
              className={`flex items-center justify-between p-4 border rounded ${
                completed ? "bg-green-100" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() =>
                    setTodos((prev) =>
                      prev.map((todo) =>
                        todo.id === id
                          ? { ...todo, completed: !todo.completed }
                          : todo
                      )
                    )
                  }
                  className="h-5 w-5"
                />
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-gray-500">{description}</p>
                </div>
              </div>
              {/* Remove button */}
              <button
                onClick={() => handleRemoveTodo(id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
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
