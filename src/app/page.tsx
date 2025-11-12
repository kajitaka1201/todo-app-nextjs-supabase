"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useTodoStore } from "@/store/todoStore";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import AuthForm from "@/components/AuthForm";

export default function Home() {
  const { user, initialized, initialize, signOut } = useAuthStore();
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (user) {
      fetchTodos(user.id);
    }
  }, [user, fetchTodos]);

  if (!initialized) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent" />
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">📝 Todoアプリ</h1>
          <p className="text-gray-600 text-center mb-8">Next.js + Supabase + Zustand</p>
          <AuthForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Todoアプリ</h1>
              <p className="text-gray-600">Next.js + Supabase + Zustand</p>
            </div>
            <button onClick={signOut} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition font-medium">
              ログアウト
            </button>
          </div>

          <div className="mb-4 text-sm text-gray-600">ログイン中: {user.email}</div>

          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  );
}
