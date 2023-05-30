/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { UserContext } from '../../app';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { createUserData } from '../../api-client/apiModules/users';

export const Login = () => {
    const [ signIn, setSignIn ] = React.useState<any>([]);
    const {user, setUser} = React.useContext(UserContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setSignIn(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            const signInUser = async () => {
                if (signIn) {
                    axios
                        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${signIn.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${signIn.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                        .then(async (res) => {
                            const userData = await createUserData({name: res.data.name, email: res.data.email, picture: res.data.picture});
                            setUser(userData);
                            localStorage.setItem('user', JSON.stringify(userData));
                        })
                        .catch((err) => console.log(err));
                }
            }
            signInUser();
        },
        [ signIn ]
    );
    return (
        <div className='mt-5'>
            <h1 className="text-3xl">React Google Login</h1>
            <br />
            <p>Being signed in gives you access to create and save blogs onto our site.</p>
            <br />
            <br />
            {user.email ? (
                <div>
                    <img src={user.picture || ''} alt="Replacement" />
                    <h3>User Logged in</h3>
                    <p>Name: {user.name}</p>
                    <p>Email Address: {user.email}</p>

                </div>
            ) : (
                <button onClick={() => login()} className='border-2 rounded-md bg-blue-500 text-white p-5'>Sign in with Google </button>
            )}
        </div>
    );
}