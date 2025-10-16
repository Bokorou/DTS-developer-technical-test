export type TaskStatus = "TODO" | "PENDING" | "DONE";

export interface Task {
  id: number;
  userId: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string;
  dueTime: string;
}

export interface CreateTaskDTO{
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate: string;
    dueTime: string;
}