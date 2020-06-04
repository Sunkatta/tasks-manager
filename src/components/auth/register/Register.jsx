import React, { useState } from 'react';
import './Register.css';
import { register } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Register() {

    const[user, setUser] = useState({name: '', email: '', password: '', age: ''});

    const onInputChange = (event) => {
        event.persist();

        setUser((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }));
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        register(user).then(() => {
            setUser({
                ...user,
                isRegistered: true
            });
        }).catch((error) => {
            setUser({ errorMessage: error.message });
        });
    }

    return (
        <>
        { user.isRegistered && <Redirect to="/login"></Redirect>}
        <div className="register-wrapper">
            <form className="register-form" onSubmit={onFormSubmit}>
                {user.errorMessage && <span className="text-danger">{user.errorMessage}</span>}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input type="number" name="age" id="age" className="form-control" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} />
                </div>
                <button className="btn btn-primary">Register</button>
                <Link to="/login">Go to Login</Link>
            </form>
        </div>
        </>
    );
}
