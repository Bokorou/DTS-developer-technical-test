import { Plus, Eye, Pencil, Trash2, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { CreateTaskDTO, Task } from "./Index";
import { useNavigate } from "react-router";
import {
  getUserTasks,
  handleCreateTask,
  handleDeleteTask,
  handlUpdateTask,
} from "./Handlers/TaskHandlers";

function TaskPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const userId = Number(localStorage.getItem("userId"));

  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const reloadTasks = () => getUserTasks(userId, setTasks);
  const [newTask, setNewTask] = useState<CreateTaskDTO>({
    title: "",
    description: "",
    status: "PENDING",
    dueDate: "",
    dueTime: "",
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<CreateTaskDTO | null>(null);

  const updateTask = () => {
    if (!userId || !selectedTask?.id) return;
    handlUpdateTask(userId, selectedTask?.id, updatedTask!, reloadTasks);
  };

  const deleteTask = () => {
    if (!userId || !selectedTask?.id) return;
    handleDeleteTask(userId, selectedTask?.id, reloadTasks);
    setIsViewing(false);
  };

  useEffect(() => {
    reloadTasks();

    if (selectedTask) {
      setUpdatedTask({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        dueDate: selectedTask.dueDate,
        dueTime: selectedTask.dueTime,
      });
    }
  }, [selectedTask]);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewing(true);
  };

  return (
    <div>
      <div className="fixed top-4 left-4">
        <button
          onClick={() => setIsCreating(true)}
          className="flex w-40 h-10 border-[#FAEAB1] border-4 gap-3 items-center shadow-md/20 hover:bg-gray-100 border rounded-md font-semibold px-3"
        >
          <Plus />
          Create Task
        </button>
      </div>

      <div className="fixed top-4 right-4">
        <button
          onClick={handleLogout}
          className="flex w-10 h-10 gap-3 bg-red-100 items-center shadow-xl/20 hover:bg-gray-100 border rounded-md font-semibold px-3"
        >
          <LogOut />
        </button>
      </div>

      <div className="h-dvh justify-items-center">
        <div className="fixed bg-[#E6D8C3]  mt-10 w-1/3 py-8 shadow-xl/20 min-h-3/4 justify-items-center">
          <h1 className="text-2xl font-semibold mt-4 text-[#123458]">Tasks</h1>
          <div className="mt-6  flex flex-col gap-4 max-h-[70vh] w-full overflow-y-auto ">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center rounded-md bg-[#C2A68C]/70 py-4 w-[90%] mx-auto shadow-xl "
              >
                <section className="flex items-center gap-6 w-fit ml-2">
                  <input
                    className=" w-6 h-6 accent-[#5D866C] rounded border-gray-300
                    focus:ring-2 focus:ring-[#334443] cursor-pointer transition duration-200 hover:scale-110"
                    type="checkbox"
                  />
                  <div>
                    <p className="text-lg mb-2">{task.title}</p>

                    <p className="text-[#9E9B9B] text-base">
                      {task.description?.split(" ").slice(0, 7).join(" ") ??
                        "No description"}
                      {task.description &&
                      task.description.split(" ").length > 7
                        ? "..."
                        : ""}
                    </p>

                    <p className="text-sm">due date: {task.dueDate}</p>
                  </div>
                </section>
                <div className="flex gap-1 mr-2">
                  <button
                    onClick={() => handleViewTask(task)}
                    className="bg-[#C2A68C] px-0 py-0 rounded-full
                    transform transition duration-200 hover:scale-130"
                  >
                    <Eye size={24} color="#FAF8F1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreating && (
        <div className=" absolute bg-[#E6D8C3] top-30 mt-10 ml-5 w-[30%] py-8 pl-2 shadow-xl/20  justify-center rounded-md">
          <button
            className="absolute top-2 right-2 px-1 py-1 rounded-md mb-4 hover:bg-[#E6D8C3]/70 
             transform transition duration-200 hover:scale-130 "
            onClick={() => setIsCreating(false)}
          >
            <X color="#E62727" />
          </button>
          <h1 className="text-2xl font-semibold mb-4 text-[#123458]">Add Tasks</h1>
          <form className="flex flex-col gap-4 w-3/4">
            <input
              className=" rounded bg-[#FAF8F1] px-3 py-2"
              type="text"
              placeholder="Task name"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              className=" rounded bg-[#FAF8F1] px-3 py-2"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <input
              className="bg-[#FAF8F1] rounded px-3 py-2"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <input
              className="bg-[#FAF8F1] rounded px-3 py-2"
              type="time"
              value={newTask.dueTime}
              onChange={(e) =>
                setNewTask({ ...newTask, dueTime: e.target.value })
              }
            />
            <button
              onClick={() =>
                handleCreateTask(
                  userId,
                  newTask,
                  reloadTasks,
                  setNewTask,
                  setIsCreating
                )
              }
              
                className="ml-10 bg-[#5D866C] text-white font-bold rounded py-2 w-3/4 rounded-md hover:bg-[#5D866C]/90 shadow-lg transition"
              type="button"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {isViewing && updatedTask && (
        <div className=" fixed bg-[#E6D8C3] right-4 top-30 mt-10 ml-5 w-[30%] py-8 shadow-xl/20  justify-center rounded-md">
          <button
            className="absolute top-2 right-2 px-1 py-1 rounded-md mb-4 hover:bg-[#E6D8C3]/70 
             transform transition duration-200 hover:scale-130 "
            onClick={() => setIsViewing(false)}
          >
            <X color="#E62727" />
          </button>
          <div className="flex items-center gap-8 ml-2 mb-4">
            <div className="flex flex-col gap-3">
              <input
                className="text-2xl  font-bold mb-1"
                type="text"
                value={updatedTask?.title}
                onChange={(e) => setUpdatedTask({...updatedTask, title: e.target.value})}
                disabled={isDisabled}
              />
              <textarea
                className="bg-[#FAF8F1] rounded px-3 py-2 w-full"
                disabled={isDisabled}
                value={updatedTask?.description || ""}
                onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}

              />
              <input
                className="bg-[#FAF8F1] rounded px-3 py-2 w-full"
                type="date"
                disabled={isDisabled}
                value={updatedTask?.dueDate || ""}
                onChange={(e) => setUpdatedTask({...updatedTask, dueDate: e.target.value})}
              />
              <input
                className="bg-[#FAF8F1] rounded px-3 py-2 w-full"
                type="time"
                disabled={isDisabled}
                value={updatedTask?.dueTime || ""}
                onChange={(e) => setUpdatedTask({...updatedTask, dueTime: e.target.value})}
              />
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-full ${
                    updatedTask?.status === "PENDING"
                      ? "bg-gray-200 text-gray-800"
                      : updatedTask?.status === "DONE"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {updatedTask?.status}
                </span>
              </p>
              <button
                className="ml-10 bg-[#5D866C] text-white font-bold rounded py-2 w-3/4 rounded-md hover:bg-[#5D866C]/90 shadow-lg transition"
                onClick={updateTask}
              >
                Update
              </button>
            </div>

            <div>
              <button
                className="bg-[#FAF8F1] px-2 py-1 rounded-md hover:bg-gray-100"
                onClick={() => setIsDisabled((prev) => !prev)}
              >
                <Pencil size={26} />
              </button>
            </div>
          </div>
          <button
            className="absolute bottom-1 right-2 px-1 py-1 rounded-md bg-red-600 text-white font-bold"
            onClick={deleteTask}
          >
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
