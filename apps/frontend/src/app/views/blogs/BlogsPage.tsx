/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BlogsList } from './BlogsList';
import Modal from '../../components/modal/modal';
import { CreateBlogsForm } from './CreateBlogsForm';

export const BlogsPage = () => {
    const [blogs, setBlogs] = React.useState([{id: '1', title: 'Blog 1', author: 'Author 1', description: 'Description 1', imageUrl: null, blog: ''}, {id: '2', title: 'Blog 2', author: 'Author 2', description: 'Description 2', imageUrl: null, blog: ''}]); // [{title: 'Blog 1', author: 'Author 1', description: 'Description 1'}, {title: 'Blog 2', author: 'Author 2', description: 'Description 2'}]
    const [createBlogModal, setCreateBlogModal] = React.useState(false);
    const [editBlogId, setEditBlogId] = React.useState(null);

    const addNewBlog = (blog: any) => {
        const oldBlogs = [...blogs]
        oldBlogs.unshift(blog);
        setBlogs(oldBlogs);
    }
    const updateBlogsList = (blogId: string, data: any) => {
        const oldBlogs: any = [...blogs];
        const blogIndex = oldBlogs.findIndex((blog: any) => blog.id === blogId);
        oldBlogs[blogIndex] = [...oldBlogs[blogIndex], data];
        setBlogs(oldBlogs);
    }

    return (
        <div className="bg-gray-200">
            {createBlogModal && 
                <Modal
                    setShowModal={setCreateBlogModal}
                    title={editBlogId ? `Edit Blog` :`Create Blog`}
                >
                    <CreateBlogsForm addNewBlog={addNewBlog} setCreateBlogModal={setCreateBlogModal} editBlogId={editBlogId} updateBlogList={updateBlogsList} />
                </Modal>
            }
            <BlogsList list={blogs} setCreateBlogModal={setCreateBlogModal}/>
        </div>

    )
}