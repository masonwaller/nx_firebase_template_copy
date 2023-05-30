/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { createData, getCollectionData, getDataByField, updateData } from '@nx-template/firebase'

@Injectable()
export class UsersService {

  getUsers(): Promise<any> {
    console.log('getUsers')
    return getCollectionData({
      collection: 'users'
    })
  }

  async signInUser(body): Promise<any> {
    try{
        const user = await getDataByField({
            collection: 'users',
            field: 'email',
            matches: body['email']
        })

        if(user.length > 0) {
            return user[0]
        }

        body['joinDate'] = new Date()
        body['userType'] = 'Reader'
        const nameArr = body['name'].split(' ')
        body['firstName'] = nameArr[0]
        body['lastName'] = nameArr[1]

        const userIdObj = await createData({
            collection: 'users',
            params: body
        })

        body['id'] = userIdObj.id
        return body
    } catch (error) {
        console.log(error)
        return error
    }
  }

  async updateUserData(body): Promise<any> {
    try {
        await updateData({
            collection: 'users',
            docId: body['id'],
            params: body
        })
        return body
    } catch (error) {
        console.log(error)
        return error
    }
  }
}