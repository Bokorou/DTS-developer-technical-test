import type { CreateTaskDTO, Task } from "../Index";
import { userService } from "../services/Api";

export const getUserTasks = async (userId: number, setTasks: (tasks : Task[]) => void) => {
    try {
      if (!userId) return;
      const response = await userService.getTasks(userId);
      setTasks(response.data as Task[]);
    } catch (err) {
      console.error(err);
    }
  };

  export const handleCreateTask = async (userId: number, newTask : CreateTaskDTO,
    reloadTasks: () => void,
    setNewTask: (task: CreateTaskDTO) => void, 
    setIsCreating: (value:boolean) => void) => {
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
        } as CreateTaskDTO);
      } catch (err) {
        console.error(err);
      }
    };

    export const handlUpdateTask = async(userId: number, taskId: number,
        updatedTask: CreateTaskDTO,
        reloadTasks: () => void) =>{
        try{
            if(!userId || !taskId) return;
            const response = await userService.updateTask(userId, taskId, updatedTask);
            reloadTasks();
        } catch (err){
            console.error(err);
        }
    }

    export const handleDeleteTask = async( userId: number, taskId: number,
        reloadTasks: () => void
    ) => {
        try {
            if(!userId || !taskId) return;
            const reponse = await userService.deleteTask(userId, taskId);
            reloadTasks();
        } catch (err){
            console.error(err);
        }
    }