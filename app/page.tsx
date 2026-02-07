"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
      toast("Nothing to add", {
        description: "Type something first 🙂",
      });
      return;
    }

    setTodos((prev) => [
      {
        id: String(Date.now()),
        text,
      },
      ...prev,
    ]);

    setTodoText("");

    toast("Todo added", {
      description: text,
    });
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));

    toast("Todo removed");
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">
            Next.js Mini App
          </CardTitle>
          <p className="text-sm text-slate-600">
            Counter + Todo using shadcn/ui and Sonner
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Counter */}
          <section className="space-y-2">
            <h2 className="font-medium">Counter</h2>
            <p className="text-slate-600">
              Count: <span className="font-semibold">{count}</span>
            </p>

            <Button onClick={() => setCount((c) => c + 1)}>
              +1
            </Button>
          </section>

          {/* Divider */}
          <div className="border-t" />

          {/* Todo */}
          <section className="space-y-3">
            <h2 className="font-medium">Mini Todo</h2>

            <div className="flex gap-2">
              <Input
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo();
                }}
                placeholder="Type a todo..."
              />

              <Button onClick={addTodo}>
                Add
              </Button>
            </div>

            <p className="text-sm text-slate-600">
              Items:{" "}
              <span className="font-medium">
                {remaining}
              </span>
            </p>

            <ul className="space-y-2">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-md border bg-white px-3 py-2"
                >
                  <span>{t.text}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTodo(t.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
