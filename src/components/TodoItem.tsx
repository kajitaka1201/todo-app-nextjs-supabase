"use client";

import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <li className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer" />
      <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors" aria-label="削除">
        削除
      </button>
    </li>
  );
}
