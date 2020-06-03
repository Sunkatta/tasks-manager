import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllTasks, deleteTask } from '../../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard';
import { Link } from 'react-router-dom';

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
            { tasks.map((task) => <TaskCard task={task} key={task.id} onDeleteClick={onDelete}></TaskCard>)}
        </div>
    );
}
