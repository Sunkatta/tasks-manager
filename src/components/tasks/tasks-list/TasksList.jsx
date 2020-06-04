import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask, taskStatus } from '../../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard';
import { Link } from 'react-router-dom';
import './TasksList.css';

export function TasksList(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const searchParams = props.location.search.split('=')[1];
        getAllTasks(searchParams).then((result) => {
            setTasks(result);
        });
    }, [props.location.search]);

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            });
        });
    }

    return (
        <div className="tasks-list-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-right">
                        <Link to="/tasks/user-tasks" className="btn btn-primary m-3">My Tasks</Link>
                        <Link to="/tasks/create" className="btn btn-primary m-3">Create task</Link>
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
