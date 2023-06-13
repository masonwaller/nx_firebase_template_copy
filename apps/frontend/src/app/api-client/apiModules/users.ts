/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClientWithAuth, apiEndpoints } from ".."


export const updateUserData = async (data: any) => {
    const userData = await apiClientWithAuth.put(apiEndpoints.users, data)
    return userData.data
}

export const createUserData = async (data: any) => {
    const userData = await apiClientWithAuth.post(apiEndpoints.users, data)
    return userData.data
}

export const getUsersFromSearch = async (search: string) => {
    const userData = await apiClientWithAuth.get(apiEndpoints.users + `/search`, {params: {search}})
    return userData.data
}