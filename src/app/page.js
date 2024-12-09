// File: src/app/page.js

"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import NewTodoForm from "./_components/new-todo-form";

export default function Home() {
  const todos = useQuery(api.getTodos) || [];
  const addTodo = useMutation(api.addTodo);
  const toggleTodo = useMutation(api.toggleTodo);
  const deleteTodo = useMutation(api.deleteTodo);

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>
        AI Todo List
      </h1>

      <NewTodoForm
        addTodo={(title, description) =>
          addTodo({ title, description })
        }
      />

      <div style={{ marginTop: "2rem", textAlign: "left", margin: "0 auto", width: "80%" }}>
        {todos.map((todo) => (
          <div
            key={todo._id}
            style={{
              border: "1px solid black",
              padding: "0.5rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo({ id: todo._id })}
                style={{ marginRight: "1rem", width: "1rem", height: "1rem" }}
              />
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: todo.completed ? "grey" : "black",
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </div>
                <div
                  style={{
                    color: "grey",
                    fontSize: "0.9rem",
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </div>
              </div>
            </div>
            <button
              onClick={() => deleteTodo({ id: todo._id })}
              style={{
                backgroundColor: "transparent",
                color: "red",
                border: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
