/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";


export const updateUserData = async (data: any) => {
    const userData = await axios.put(`http://localhost:3000/api/users`, data)
    return userData.data
}

export const createUserData = async (data: any) => {
    const userData = await axios.post('http://localhost:3000/api/users', data)
    return userData.data
}

export const getUsersFromSearch = async (search: string) => {
    const userData = await axios.get(`http://localhost:3000/api/users/search`, {params: {search}})
    return userData.data
}