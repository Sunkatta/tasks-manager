import React from 'react';
import { getLoggedUser } from '../api/users.api';
import { Redirect } from 'react-router-dom';

export function EditTaskRoute(props) {
    const loggedUser = getLoggedUser();
    const loggedUserTasks = localStorage.getItem('userTasks');

    if (loggedUser && loggedUserTasks && props.computedMatch.params.id) {
        const task = JSON.parse(loggedUserTasks).find(t => t.id === props.computedMatch.params.id);

        if (task) {
            return <props.component { ...props }></props.component>;
        }
    }

    if (loggedUser.isAdmin) {
        return <props.component { ...props }></props.component>;
    }

    return <Redirect to='/tasks'></Redirect>;
}