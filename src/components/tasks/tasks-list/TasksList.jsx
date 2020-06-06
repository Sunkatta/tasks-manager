import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask, taskStatus, getUserTasks } from '../../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard';
import { Link } from 'react-router-dom';
import './TasksList.css';

export function TasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then((result) => {
            setTasks(result);
        });
    }, []);

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            });

            if (localStorage.getItem('userTasks')) {
                localStorage.removeItem('userTasks');
            }

            getUserTasks().then((userTasks) => {
                localStorage.setItem('userTasks', JSON.stringify(userTasks));
            }, (error) => {
                console.log(error);
            });
        });
    }

    return (
        <div className="tasks-list-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-right">
                            <Link to="/tasks/user-tasks" className="btn btn-primary m-3">My Tasks</Link>
                            <Link to="/tasks/create" className="btn btn-primary m-3">Create task</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h3>To Do</h3>
                        { tasks.map((task) => (task.status === taskStatus.ToDo && <TaskCard task={task} key={task.id} onDeleteClick={onDelete}></TaskCard>))}
                    </div>
                    <div className="col-md-3">
                        <h3>In Progress</h3>
                        { tasks.map((task) => (task.status === taskStatus.InProgress && <TaskCard task={task} key={task.id} onDeleteClick={onDelete}></TaskCard>))}
                    </div>
                    <div className="col-md-3">
                        <h3>Done</h3>
                        { tasks.map((task) => (task.status === taskStatus.Done && <TaskCard task={task} key={task.id} onDeleteClick={onDelete}></TaskCard>))}
                    </div>
                </div>
            </div>
        </div>
    );
}
