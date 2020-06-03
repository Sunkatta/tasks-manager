import React, { useState, useEffect } from 'react';
import { getUserById, saveUser } from '../../../core/api/users.api';
import './UserEdit.css';
import { Redirect } from 'react-router-dom';

export function UserEdit(props) {

    const [editedUser, setEditedUser] = useState({name: '', age: 0, email: '', password: '', isAdmin: false, isActive: false});
    const [shouldRedirect, setShouldRedirect] = useState(false);
    let isAdmin = false;
    
    const onInputChange = (event) => {
        event.persist();
        setEditedUser((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }));
    }

    const onCheckboxChange = (event) => {
        event.persist();
        console.log(event.target.name);
        console.log(event.target.value);
        setEditedUser((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.checked
        }));
    }

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id).then((user) => {
                setEditedUser(user.data);
                isAdmin = user.data.isAdmin;
            });
        }
    }, []);

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveUser(editedUser).then(() => {
            setShouldRedirect(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        { shouldRedirect && <Redirect to="/users" /> }
        <div className="user-edit-wrapper">
            <form className="user-edit-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={onInputChange} value={editedUser.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input type="number" name="age" id="age" className="form-control" onChange={onInputChange} value={editedUser.age} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} value={editedUser.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} value={editedUser.password} />
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">Is Active: </label>
                    <input type="checkbox" name="isActive" id="isActive" className="form-control" onChange={onCheckboxChange} checked={editedUser.isActive} />
                </div>
                <div className="form-group">
                    <label htmlFor="isAdmin">Is Admin: </label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={onCheckboxChange} checked={editedUser.isAdmin} />
                </div>
                <button className="btn btn-success">Save Changes</button>
            </form>
        </div>
        </>
    )
}
