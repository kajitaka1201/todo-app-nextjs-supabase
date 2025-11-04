import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/types/todo";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      set({ todos: data || [], loading: false });
    } catch (error) {
      console.error("Error fetching todos:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch todos",
        loading: false,
      });
    }
  },

  addTodo: async (title: string) => {
    if (!title.trim()) return;

    try {
      const { data, error } = await supabase.from("todos").insert({ title: title.trim(), completed: false }).select().single();

      if (error) throw error;

      set({ todos: [data, ...get().todos] });
    } catch (error) {
      console.error("Error adding todo:", error);
      set({ error: error instanceof Error ? error.message : "Failed to add todo" });
    }
  },

  toggleTodo: async (id: string) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const { error } = await supabase.from("todos").update({ completed: !todo.completed }).eq("id", id);

      if (error) throw error;

      set({
        todos: get().todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
      set({ error: error instanceof Error ? error.message : "Failed to update todo" });
    }
  },

  deleteTodo: async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      set({ todos: get().todos.filter((t) => t.id !== id) });
    } catch (error) {
      console.error("Error deleting todo:", error);
      set({ error: error instanceof Error ? error.message : "Failed to delete todo" });
    }
  },
}));
