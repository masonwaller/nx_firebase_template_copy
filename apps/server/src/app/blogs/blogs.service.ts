/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { createData, deleteData, getCollectionData, updateData } from '@nx-template/firebase'

@Injectable()
export class BlogsService {

  getBlogs(): Promise<any> {
    return getCollectionData({
      collection: 'blogs',
      options: {
        orderBy: ['date', 'desc'],
        limit: 20
      }
    })
  }

  async createBlog(body): Promise<any> {
    try{
        const date = new Date().toISOString().slice(0, 10);
        body['date'] = date
        const blogIdObj = await createData({
            collection: 'blogs',
            params: body
        })

        body['id'] = blogIdObj.id
        return body
    } catch (error) {
        console.log(error)
        return error
    }
  }

    async updateBlog(id, body): Promise<any> { 
        try {
            await updateData({
                collection: 'blogs',
                docId: id,
                params: body
            })
            return body
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async deleteBlog(id): Promise<any> {
        try {
            await deleteData({
                collection: 'blogs',
                docId: id,
            })
            return {success: true}
        } catch (error) {
            console.log(error)
            return error
        }
    }
}