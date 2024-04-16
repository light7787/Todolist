"use client";
import Todo from "@/Components/Todo";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodoData(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api?mongoId=${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      const data = await response.json();
      toast.success(data.msg);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch(`/api?mongoId=${id}`, { method: 'PUT' });
      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
      const data = await response.json();
      toast.success(data.msg);
      fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const data = await response.json();
      toast.success(data.msg);
      setFormData({ title: "", description: "" });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Error adding todo');
    }
  };

  return (
    <div className="body text-white min-h-screen flex flex-col  items-center py-20">
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-4 py-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 rounded-md"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-4 py-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 rounded-md h-32 resize-none"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-6 text-white rounded-md hover:bg-orange-700 transition duration-300"
        >
          Add Todo
        </button>
      </form>
      <div className="mt-8 w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gray-200 text-gray-600 uppercase border-b border-gray-300">
            <tr>
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo
                key={index}
                id={index}
                title={item.title}
                description={item.description}
                complete={item.IsCompleted}
                mongoId={item._id}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
