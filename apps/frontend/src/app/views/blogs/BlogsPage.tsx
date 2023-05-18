import React from 'react';
import { UserContext } from '../../app';

export const BlogsPage = () => {
    const {user, setUser} = React.useContext(UserContext);
    return (
        <h1>Blogs</h1>
    )
}