import React from 'react';
import { UserContext } from '../../app';

export const Login = () => {
    const {user, setUser} = React.useContext(UserContext);
    return (
        <h1>Login</h1>
    )
}