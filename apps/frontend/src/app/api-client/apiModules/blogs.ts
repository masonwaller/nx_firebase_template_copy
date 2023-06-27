/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClientWithAuth, apiEndpoints } from "..";

export const getAllBlogs = async () => {
    // return [{id: '1', title: 'Blog 1', author: 'Author 1', description: 'Description 1', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS92eisuWOx3tEjeW14mT9ACVgXDwIRBGtnww&usqp=CAU', blog: '', date: '12/31/2022'}, {id: '2', title: 'Blog 2', author: 'Author 2', description: 'Description 2', imageUrl: null, blog: '', date: '01/20/2021'}];
    const blogData = await apiClientWithAuth.get(apiEndpoints.blogs);
    return blogData.data;
    }

export const getBlog = async (id: any) => {
    const blogData = await apiClientWithAuth.get(apiEndpoints.blogs + `/blog/${id}`);
    return blogData.data;
    }

export const createBlog = async (data: any) => {
    const blogData = await apiClientWithAuth.post(apiEndpoints.blogs, data);
    return blogData.data;
    }

export const updateBlog = async (id: string, data: any) => {
    const blogData = await apiClientWithAuth.put(apiEndpoints.blogs + `/${id}`, data);
    return blogData.data;
    }

export const deleteBlog = async (id: string) => {
    const blogData = await apiClientWithAuth.delete(apiEndpoints.blogs + `/${id}`);
    return blogData.data;
    }
