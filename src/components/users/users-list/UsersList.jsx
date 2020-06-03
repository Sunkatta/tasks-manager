import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, getLoggedUser } from '../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';

const currentUser = getLoggedUser();

export function UsersList() {
    const [users, setUsers] = useState([]);

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
        <div className="users-list d-flex">
            {users.filter(u => currentUser && u.id !== currentUser.id).map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete}></UserCard>)}
        </div>
    )
}
