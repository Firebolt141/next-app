"use client";

import { useMemo, useState } from "react";

type Todo = {
  id: string;
  text: string;
};

export default function Home() {
  const [count, setCount] = useState(0);

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const remaining = useMemo(() => todos.length, [todos.length]);

  function addTodo() {
    const text = todoText.trim();
    if (text === "") {
      alert("Type something first!");
      return;
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setTodoText("");
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-6">
        <h1 className="text-2xl font-semibold">Next.js Mini App</h1>
        <p className="mt-2 text-gray-600">
          Counter + Todo built with React components and Tailwind classes.
        </p>

        <div className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-lg font-semibold">Counter</h2>
          <p className="mt-2 text-gray-600">Count: {count}</p>

          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="mt-3 inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white hover:opacity-90 active:translate-y-[1px]"
          >
            +1
          </button>
        </section>

        <div className="my-6 border-t border-gray-200" />

        <section>
          <h2 className="text-lg font-semibold">Mini Todo</h2>

          <div className="mt-3 flex gap-2">
            <input
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              placeholder="Type a todo..."
              className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900/20"
            />
            <button
              type="button"
              onClick={addTodo}
              className="rounded-xl bg-gray-900 px-4 py-2 text-white hover:opacity-90"
            >
              Add
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Items: <span className="font-medium">{remaining}</span>
          </p>

          <ul className="mt-3 space-y-2">
            {todos.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <span>{t.text}</span>
                <button
                  type="button"
                  onClick={() => removeTodo(t.id)}
                  className="text-sm text-gray-700 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
