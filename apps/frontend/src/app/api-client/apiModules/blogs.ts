/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllBlogs = async () => {
    return [{id: '1', title: 'Blog 1', author: 'Author 1', description: 'Description 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS92eisuWOx3tEjeW14mT9ACVgXDwIRBGtnww&usqp=CAU', blog: ''}, {id: '2', title: 'Blog 2', author: 'Author 2', description: 'Description 2', imageUrl: null, blog: ''}];
    }

export const createBlog = async (data: any) => {
    return {success: true};
    }

export const updateBlog = async (id: string, data: any) => {
    return {success: true};
    }

export const deleteBlog = async (id: string) => {
    return {success: true};
    }