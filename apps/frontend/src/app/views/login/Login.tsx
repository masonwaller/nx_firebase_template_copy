/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { UserContext } from '../../app';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Login = () => {
    const [ signIn, setSignIn ] = React.useState<any>([]);
    const {user, setUser} = React.useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setSignIn(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (signIn) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${signIn.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${signIn.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setUser(res.data);
                        localStorage.setItem('user', JSON.stringify(res.data));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ signIn ]
    );
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {user.email ? (
                <div>
                    <img src={user.picture || ''} alt="Replacement" />
                    <h3>User Logged in</h3>
                    <p>Name: {user.name}</p>
                    <p>Email Address: {user.email}</p>
                    <br />
                    <br />
                    {/* <button onClick={logOut}>Log out</button> */}
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google </button>
            )}
        </div>
    );
}