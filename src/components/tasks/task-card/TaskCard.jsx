import React from 'react';
import { getLoggedUser } from '../../../core/api/users.api';
import { taskStatus } from '../../../core/api/tasks.api';

const taskCardStyle = {
    maxWidth: '18rem'
};

export function TaskCard({ task, onDeleteClick }) {
    const loggedUser = getLoggedUser();
    let taskClassByType = "card text-white mb-3 ";

    switch (task.status) {
        case taskStatus.ToDo:
            taskClassByType += "bg-danger";
            break;
        case taskStatus.Done:
            taskClassByType += "bg-success";
            break;
        case taskStatus.InProgress:
            taskClassByType += "bg-warning";
            break;
        default:
            taskClassByType += "bg-primary";
            break;
    }

    return (
        <div className={taskClassByType} style={taskCardStyle}>
            <div className="card-header">
                <h3>{ task.title }</h3>
                { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <a className="btn btn-outline-light mr-2" href={`http://localhost:3000/tasks/edit/${task.id}`}>Edit</a> }
                { (loggedUser.isAdmin || loggedUser.id === task.authorId) && <button className="btn btn-outline-light" onClick={ () => onDeleteClick(task.id) }>Delete</button> }
            </div>
            <div className="card-body">
                <h5 className="card-text">{ task.description }</h5>
            </div>
            <div className="card-footer">
                <div>Author: { task.authorName }</div>
                <div>Duration: { task.duration } hours</div>
            </div>
        </div>
    );
}
