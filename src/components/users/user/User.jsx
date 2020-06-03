import React, { useState, useEffect } from 'react';
import { getUserById } from '../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';

export function User(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        getUserById(props.computedMatch.params.id).then((response) => {
            setUser({
                user: response.data
            });
        })
    }, {});

    return (
        <div className="single-user">
            <UserCard user={user}></UserCard>
        </div>
    );
}
