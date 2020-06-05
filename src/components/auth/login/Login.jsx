import React, { useState } from 'react';
import './Login.css';
import { login } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login() {

    const[userData, setUserData] = useState({});
    const[isLoggedUser, setLoggedUser] = useState(false);
    const[errorMessage, setErrorMessage] = useState('');

    const onInputChange = (event) => {
        event.persist();

        setUserData((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }));
        setErrorMessage('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(userData).then(() => {
            setLoggedUser(true);
        }).catch((error) => {
            setErrorMessage(error.message);
        });
    };

    return (
        <>
        { isLoggedUser && <Redirect to="/users" /> }
        <div className="login-wrapper">
            <form className="login-form" onSubmit={onFormSubmit}>
                <span className="text-danger">{errorMessage}</span>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange}/>
                </div>
                <button className="btn btn-primary">Login</button>
                <Link to="/register">Go to register</Link>
            </form>
        </div>
        </>
    );
}
