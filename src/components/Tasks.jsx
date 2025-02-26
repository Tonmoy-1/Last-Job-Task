import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiBoxList, CiTimer } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgress } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./../providers/AuthProvider";

const Tasks = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/tasks/${user?.email}`
      );
      return res.data;
    },
  });

  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleUpdate = (taskId) => {
    navigate(`/tasks/update/${taskId}`);
  };

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_URL}/tasks/${taskId}`)
          .then((res) => {
            refetch();
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const tasksInColumn = localTasks.filter(
        (task) => task.category === source.droppableId
      );
      const otherTasks = localTasks.filter(
        (task) => task.category !== source.droppableId
      );
      const newTasksInColumn = Array.from(tasksInColumn);
      const [movedTask] = newTasksInColumn.splice(source.index, 1);
      newTasksInColumn.splice(destination.index, 0, movedTask);
      setLocalTasks([...otherTasks, ...newTasksInColumn]);
    } else {
      const sourceTasks = localTasks.filter(
        (task) => task.category === source.droppableId
      );
      const destinationTasks = localTasks.filter(
        (task) => task.category === destination.droppableId
      );
      const otherTasks = localTasks.filter(
        (task) =>
          task.category !== source.droppableId &&
          task.category !== destination.droppableId
      );
      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.category = destination.droppableId;
      destinationTasks.splice(destination.index, 0, movedTask);
      setLocalTasks([...otherTasks, ...sourceTasks, ...destinationTasks]);

      try {
        await axios.put(`${import.meta.env.VITE_URL}/tasks/${draggableId}`, {
          category: destination.droppableId,
        });
        refetch();
      } catch (error) {
        console.error("Error updating task category:", error);
      }
    }
  };

  const categories = [
    {
      id: 1,
      name: "To-Do",
      bgClass: "bg-gradient-to-br from-gray-200 to-gray-100",
      icon: <CiBoxList className="text-xl" />,
    },
    {
      id: 2,
      name: "In Progress",
      bgClass: "bg-gradient-to-br from-blue-200 to-blue-100",
      icon: <TbProgress className="text-xl animate-spin" />,
    },
    {
      id: 3,
      name: "Done",
      bgClass: "bg-gradient-to-br from-green-200 to-green-100",
      icon: <IoCheckmarkDoneCircleOutline className="text-xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl font-bold pb-8 text-center flex items-center justify-center gap-2 text-gray-800">
          <FaTasks className="text-green-600" /> Task Board
        </h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((column) => (
              <Droppable key={column.name} droppableId={column.name}>
                {(provided) => (
                  <div
                    className={`p-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 ${column.bgClass}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-gray-800">
                      {column.icon} {column.name}
                    </h2>
                    {localTasks
                      .filter((task) => task.category === column.name)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white border-l-4 border-green-500 shadow-md p-4 rounded-lg mb-4 transition duration-300 hover:bg-green-50 transform hover:scale-105"
                            >
                              <h3 className="font-semibold text-lg text-gray-800">
                                {task?.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {task?.description}
                              </p>
                              <p className="text-gray-500 text-xs flex items-center gap-1 mt-2">
                                <CiTimer className="text-sm" />{" "}
                                {new Date(task?.dueDate).toLocaleString()}
                              </p>
                              <div className="flex justify-end gap-2 mt-3">
                                <button
                                  onClick={() => handleUpdate(task._id)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(task._id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  ✖
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Tasks;
