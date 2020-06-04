import React from 'react';
import { Switch } from 'react-router-dom';
import { UsersList } from '../../users/users-list/UsersList';
import { UserEdit } from '../../users/user-edit/UserEdit';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import { AdminRoute } from '../../../core/guards/AdminRoute';
import { TasksList } from '../../tasks/tasks-list/TasksList';
import { TaskEdit } from '../../tasks/task-edit/TaskEdit';
import { UserTasks } from '../../tasks/user-tasks/UserTasks';

export function Main() {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute exact path="/" component={UsersList}></AuthenticatedRoute>
                <AuthenticatedRoute exact path="/users" component={UsersList}></AuthenticatedRoute>
                <AdminRoute exact path="/users/create" component={UserEdit}></AdminRoute>
                <AdminRoute exact path="/users/edit/:id" component={UserEdit}></AdminRoute>

                <AuthenticatedRoute exact path="/tasks" component={TasksList}></AuthenticatedRoute>
                <AuthenticatedRoute exact path="/tasks/create" component={TaskEdit}></AuthenticatedRoute>
                <AuthenticatedRoute exact path="/tasks/user-tasks" component={ UserTasks }></AuthenticatedRoute>
                <AuthenticatedRoute exact path="/tasks/edit/:id" component={TaskEdit}></AuthenticatedRoute>
            </Switch>
        </div>
    );
}
