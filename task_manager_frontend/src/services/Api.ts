import axios from 'axios'
import type { CreateTaskDTO } from '../Index';

const USER_BASE_URL = "http://localhost:8080/api";
export const api = axios.create({
    baseURL: USER_BASE_URL,
    headers:{'Content-Type' : 'application/json'}
});

export const userService = {
    login: (data: {username:string; password: string;}) => api.post('/login', data),
    createUser: (data: {username:string; password: string}) => api.post('/create', data),
    getTasks: (userId: number) => api.get(`/${userId}/tasks`),
    createTasks: (userId: number,  newTask: CreateTaskDTO ) => api.post(`/${userId}/tasks`, newTask)
};