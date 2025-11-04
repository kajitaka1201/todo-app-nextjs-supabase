import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">📝 Todoアプリ</h1>
          <p className="text-gray-600 text-center mb-8">Next.js + Supabase + Zustand</p>

          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  );
}
