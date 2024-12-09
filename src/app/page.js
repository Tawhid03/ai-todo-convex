// Full Next.js page setup for ai-convex-todo

"use client";

import Head from 'next/head';
import { useState } from 'react';
import NewTodoForm from './_component/new-todo-form';

export default function Home() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTitle, newDescription) => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    setTodos([{ id: Date.now(), title: newTitle, description: newDescription, completed: false }, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <Head>
        <title>AI Convex Todo</title>
        <meta name="description" content="A simple todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>AI Convex Todo</h1>

        <NewTodoForm addTodo={addTodo} />

        <div style={{ marginTop: '2rem', textAlign: 'left', margin: '0 auto', width: '80%' }}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                border: '1px solid black',
                padding: '0.5rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ marginRight: '1rem', width: '1rem', height: '1rem' }}
                />
                <div style={{ width: '100%' }}>
                  <div style={{ fontWeight: 'bold', color: 'black' }}>{todo.title}</div>
                  <div style={{ color: 'grey', fontSize: '0.9rem' }}>{todo.description}</div>
                </div>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'red',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 2rem;
          text-align: center;
        }
        input, textarea {
          width: 100%;
        }
        button {
          cursor: pointer;
        }
        div {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
