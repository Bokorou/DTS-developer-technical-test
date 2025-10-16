import { Plus, Eye, Pencil, Trash2, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "./services/Api";
import type { CreateTaskDTO, Task } from "./Index";
import { useNavigate } from "react-router";

function TaskPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const reloadTasks = () => getUserTasks();
  const [newTask, setNewTask] = useState<CreateTaskDTO>({
    title: "",
    description: "",
    status: "PENDING",
    dueDate: "",
    dueTime: "",
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const userId = Number(localStorage.getItem("userId"));

  const getUserTasks = async () => {
    try {
      if (!userId) return;
      const response = await userService.getTasks(userId);
      setTasks(response.data as Task[]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      if (!userId) return;
      const response = await userService.createTasks(userId, newTask);
      setIsCreating(false);
      reloadTasks();
      setNewTask({
        title: "",
        description: "",
        status: "PENDING",
        dueDate: "",
        dueTime: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewing(true);
  };

  return (
    <div>
      <div className="fixed top-4 left-4">
        <button
          onClick={() => setIsCreating(true)}
          className="flex w-40 h-10 gap-3 items-center shadow-xl/20 hover:bg-gray-100 border rounded-md font-semibold px-3"
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
        <div className="mt-10 w-1/3 py-8 shadow-xl/20 min-h-3/4 justify-items-center">
          <h1 className="text-2xl mt-4">Tasks</h1>
          <div className="mt-6 flex flex-col gap-4  w-full overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center py-4 w-[90%] mx-auto shadow-xl border-t-4"
              >
                <section className="flex items-center gap-6 w-fit ml-2">
                  <input
                    className=" w-6 h-6 accent-blue-500 rounded border-gray-300
                    focus:ring-2 focus:ring-blue-400 cursor-pointer transition duration-200 hover:scale-110"
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
                    className="bg-gray-200 px-2 py-1 hover:bg-gray-100"
                  >
                    <Eye size={20} />
                  </button>
                  <button className="bg-gray-200 px-2 py-1 hover:bg-gray-100">
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreating && (
        <div className=" absolute top-30 mt-10 ml-5 w-[30%] py-8 shadow-xl/20  justify-center border-t-4">
          <button
            className="absolute top-2 right-2 px-1 py-1 rounded-md mb-4 bg-red-700 text-white font-bold"
            onClick={() => setIsCreating(false)}
          >
            <X />
          </button>
          <h1>Add Task</h1>
          <form className="flex flex-col gap-4 w-3/4">
            <input
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Task name"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              className="border rounded px-3 py-2"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <input
              className="border rounded px-3 py-2"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
            <input
              className="border rounded px-3 py-2"
              type="time"
              value={newTask.dueTime}
              onChange={(e) =>
                setNewTask({ ...newTask, dueTime: e.target.value })
              }
            />
            <button
              onClick={handleCreateTask}
              className="flex w-40 h-10 ml-4 mt-4 gap-3 items-center shadow-xl/20 hover:bg-gray-100 border-1 rounded-md  
            font-semibold"
              type="button"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {isViewing && (
        <div className=" fixed right-0 top-30 mt-10 ml-5 w-[30%] py-8 shadow-xl/20  justify-center border-t-4">
          <button
            className="absolute top-2 right-2 px-1 py-1 rounded-md mb-4 bg-red-700 text-white font-bold"
            onClick={() => setIsViewing(false)}
          >
            <X />
          </button>
          <div className="ml-2">
            <h1 className="text-2xl font-bold mb-4">{selectedTask?.title}</h1>

            <div className="flex flex-col gap-4">
              <p>
                <strong>Description:</strong>{" "}
                {selectedTask?.description || "No Description"}
              </p>
              <p>
                <strong>Due Date:</strong> {selectedTask?.dueDate}
              </p>
              <p>
                <strong>Due Time:</strong> {selectedTask?.dueTime}
              </p>
              <p>
                <strong>Status:</strong> {selectedTask?.status}
              </p>
            </div>
          </div>
          <button
            className="absolute bottom-1 right-2 px-1 py-1 rounded-md bg-red-600 text-white font-bold"
            onClick={() => setIsViewing(false)}
          >
            <Trash2 />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
