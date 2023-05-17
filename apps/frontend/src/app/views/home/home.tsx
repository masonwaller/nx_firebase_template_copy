import React from 'react';
import { UserContext } from '../../app';

export const Home = () => {
    const {user, setUser} = React.useContext(UserContext);
    return (
        <h1>Home</h1>
    )
}