import axios from "axios";
import { getLoggedUser } from "./users.api";

const apiUrl = 'http://localhost:3005';

export const taskStatus = {
    ToDo: 'ToDo',
    InProgress: 'InProgress',
    Done: 'Done'
}

export async function getAllTasks(searchParams) {
    const allTasks = (await axios.get(`${apiUrl}/tasks`)).data;

    if (!searchParams) {
        return allTasks;
    }

    const lowerParam = searchParams.toLowerCase();

    return allTasks.filter(n => n.title.toLowerCase().includes(lowerParam) || n.content.toLowerCase().includes(lowerParam));
}

export function saveTask(taskData) {
    const loggedUser = getLoggedUser();
    
    if(taskData.id) {
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData)
    }

    taskData.authorId = loggedUser.id;
    taskData.authorName = loggedUser.name;
    if (!taskData.status) {
        taskData.status = taskStatus.ToDo;
    }

    return axios.post(`${apiUrl}/tasks`, taskData);
}

export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}

export async function getTasksByAuthorId(authorId, searchParams) {
    const allTasks = await getAllTasks(searchParams);

    return allTasks.filter(task => task.authorId === authorId);
}

export function getUserTasks(searchParams) {
    const loggedUserId = getLoggedUser().id;

    return getTasksByAuthorId(loggedUserId, searchParams);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}

export async function deleteTasksForAuthor(authorId) {
    const tasks = await getTasksByAuthorId(authorId);

    tasks.forEach(task => {
        deleteTask(task.id);
    });
}
