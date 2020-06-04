import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, getLoggedUser } from '../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';
import './UsersList.css'
import { Link } from 'react-router-dom';

export function UsersList() {
    const [users, setUsers] = useState([]);
    const currentUser = getLoggedUser();

    useEffect(() => {
        getAllUsers().then((response) => {
            setUsers(response.data);
        });
    }, []);

    const onUserDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(u => u.id !== id);
            });
        }).catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className="users-list">
            <>
            {currentUser.isAdmin &&
            <div className="row">
                <div className="col-md-12">
                    <div className="text-right">
                        <Link to="/users/create" className="btn btn-primary m-3">Create User</Link>
                    </div>
                </div>
            </div>
            }
            </>
            <div className="row">
                {users.filter(u => currentUser && u.id !== currentUser.id).map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete}></UserCard>)}
            </div>
        </div>
    )
}
