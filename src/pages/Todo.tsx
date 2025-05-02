import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type TodoInput = {
  task: string;
};

type TodoItem = {
  id: number;
  task: string;
  completed: boolean;
};

const Todo: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<TodoInput>();
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const onSubmit: SubmitHandler<TodoInput> = (data) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      task: data.task,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    reset();
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex mb-6">
          <input
            type="text"
            {...register("task", { required: true })}
            placeholder="Add a new task"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between">
              <div
                className={`flex items-center space-x-2 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="accent-blue-600"
                />
                <span>{todo.task}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
