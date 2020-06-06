import axios from 'axios';
import { deleteTasksForAuthor, getTasksByAuthorId } from './tasks.api';

const apiUrl = 'http://localhost:3005/';

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export function getAllUsers() {
    return axios.get(`${apiUrl}users`);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}users/${id}`);
}

export async function register(userData) {
    const users = (await getAllUsers()).data;

    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already exists!');
    }

    userData = {
        ...userData,
        picture: 'https://picsum.photos/200/300?random=1'
    }

    return axios.post(`${apiUrl}users`, userData);
}

export async function login(userData) {
    const users = (await getAllUsers()).data;
    const loggedUser = users.find(u => u.email === userData.email && u.password.toString() === userData.password);

    if (loggedUser && !loggedUser.isActive) {
        throw new Error('This user account has been blocked!');
    }

    if (loggedUser) {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        
        getTasksByAuthorId(loggedUser.id).then((tasks) => {
            localStorage.setItem('userTasks', JSON.stringify(tasks));
        }, (error) => {
            console.log(error);
        });

        return;
    }

    throw new Error('Incorrect username/password!');
}

export function logout() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('userTasks');
}

export function saveUser(userData) {
    if (userData.id) {
        return axios.put(`${apiUrl}users/${userData.id}`, userData);
    } else {
        return register(userData);
    }
}

export function deleteUser(id) {
    deleteTasksForAuthor(id);
    return axios.delete(`${apiUrl}users/${id}`);
}
