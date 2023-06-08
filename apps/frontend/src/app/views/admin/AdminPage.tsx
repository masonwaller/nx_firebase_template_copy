import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../app';
import { getUsersFromSearch, updateUserData } from '../../api-client/apiModules/users';


export default function AdminPage() {
    const [search, setSearch] = useState('')
    const [users, setUsers]: any = useState([])

    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        if(!user.roles.includes('Admin')){
            window.location.href = '/home'
        } else {
            searchUsers()
        }
    }, [])


    const searchUsers = async () => {
        const response: any = await getUsersFromSearch(search)
        setUsers(response)
    }

    const activateDeactivateUser = async (user: any) => {
        user.active = !user.active
        await updateUserData(user)
        const usersCopy = [...users]
        const index = usersCopy.findIndex((u) => u.id === user.id)
        usersCopy[index] = user
        setUsers(usersCopy)
    }



    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-5">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users on the site
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    name="search"
                    id="search"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-3"
                    placeholder="Type Name"
                />
              <button
                type="button"
                onClick={() => searchUsers()}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search Users
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Roles
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Activate</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((person: any) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.userType}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.roles?.length ? person.roles?.reduce((str: any, b: any)=> str + ', ' + b) : 'N/A'}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button  className="text-indigo-600 hover:text-indigo-900" onClick={() => activateDeactivateUser(person)}>
                            {person.active ? 'Deactivate' : 'Activate'}<span className="sr-only">, {person.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    }