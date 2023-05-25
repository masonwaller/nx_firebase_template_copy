/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { UserContext } from '../../app';
import { UnsignedInHome } from './UnsignedInHome';
import { SignedInHome } from './SignedInHome';

export const Home = () => {
    const {user, setUser} = React.useContext(UserContext);
    return (
        <>
        {!user.id ? <UnsignedInHome /> : <SignedInHome />}
        </>
    )
}