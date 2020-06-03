import React from 'react';
import { useState } from 'react';
import { getUserTasks } from '../../../core/api/tasks.api';
import { useEffect } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { Link } from 'react-router-dom';

export function UserTasks(props) {
    const [userTasks, setUserTasks] = useState([]);
    
    useEffect(() => {
        const searchParams = props.location.search.split('=')[1];
        getUserTasks(searchParams).then((tasks) => {
            setUserTasks(tasks);
        });
    }, [props.location.search]);
    
    return (
        <div className="user-tasks-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-right">
                        <Link to="/tasks" className="btn btn-primary m-3">All Tasks</Link>
                        <Link to="/tasks/create" className="btn btn-primary m-3">Create task</Link>
                    </div>
                </div>
            </div>
            { userTasks.map(task => <TaskCard task={task} key={task.id}></TaskCard>) }
        </div>
    );
}
