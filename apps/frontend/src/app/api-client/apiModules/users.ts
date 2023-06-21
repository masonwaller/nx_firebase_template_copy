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

export const getUsersFromRealtimeDatabase = async () => {
    const userData = await apiClientWithAuth.get(apiEndpoints.users + `/realtime-database-example`)
    console.log(userData.data)
    return userData.data
}
// getUsersFromRealtimeDatabase()

export const postUsersToRealtimeDatabase = async (data: any) => {
    const userData = await apiClientWithAuth.post(apiEndpoints.users + `/realtime-database-example`, data)
    return userData.data
}
// postUsersToRealtimeDatabase({name: 'test', age: 20, random: 'test', id: 'wack'})