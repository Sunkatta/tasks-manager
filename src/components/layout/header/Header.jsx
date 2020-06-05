import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../../core/api/users.api';

export function Header() {
    const [isLoggedOut, setLogoutFlag] = useState(false);

    const onLogout = () => {
        logout();
        setLogoutFlag(true);
    }

    return (
        <>
        { isLoggedOut && <Redirect to="/login"></Redirect> }
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <li className="navbar-brand" to="/">Task Manager</li>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>
                </ul>
                <button className="btn btn-outline-secondary" onClick={onLogout}>Logout</button>
            </div>
        </nav>
        </>
    );
}
