import axios from "axios";
import { useContext, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import Swal from "sweetalert2";
import { AuthContext } from "./../providers/AuthProvider";

const AddTaskForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newTask = {
      title,
      description,
      dueDate,
      category,
      email: user?.email,
    };

    try {
      axios.post(`${import.meta.env.VITE_URL}/tasks`, newTask).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Task added successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          setTitle("");
          setDescription("");
          setCategory("To-Do");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 my-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
        <BiCalendar className="text-blue-500" /> Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700">
              Category
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="To-Do">📌 To-Do</option>
              <option value="In Progress">🚴‍♂️ In Progress</option>
              <option value="Done">✅ Done</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">
              Task Completion Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="w-full text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
