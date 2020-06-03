import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

export function UserCard({ user, onDelete }) {
    const loggedUser = getLoggedUser();

    return (
        <div className="card">
            <img className="card-img-top" src={user.picture} alt="" />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: {user.age}</li>
                <li className="list-group-item">Email: {user.email}</li>
            </ul>
            <div className="card-body">
                { loggedUser.isAdmin && <Link className="btn btn-outline-secondary" to={`/users/edit/${user.id}`}>Edit</Link> }
                { loggedUser.isAdmin && <button className="btn btn-outline-danger ml-2" onClick={ () => onDelete(user.id) }>Delete</button> }
            </div>
        </div>
    )
}
