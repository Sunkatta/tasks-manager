import React from 'react';
import { getLoggedUser } from '../api/users.api';
import { Redirect } from 'react-router-dom';

export function AdminRoute(props) {
    const loggedUser = getLoggedUser();

    if (loggedUser.isAdmin) {
        return <props.component { ...props }></props.component>;
    }

    return <Redirect to='/users'></Redirect>;
}