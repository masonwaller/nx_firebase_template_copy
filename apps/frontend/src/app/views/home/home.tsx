import React from 'react';
import { UserContext } from '../../app';

export const Home = () => {
    const {user, setUser} = React.useContext(UserContext);
    return (
        <div className='bg-gray-200'>
        <h1>Home</h1>
        </div>
    )
}