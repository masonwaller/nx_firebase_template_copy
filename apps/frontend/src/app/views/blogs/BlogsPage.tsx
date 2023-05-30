/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { BlogsList } from './BlogsList';
import Modal from '../../components/modal/modal';
import { CreateBlogsForm } from './CreateBlogsForm';
import { deleteBlog, getAllBlogs } from '../../api-client/apiModules/blogs';
import BlogPopUp from './BlogPopUp';

export const BlogsPage = () => {
    const [blogs, setBlogs] = React.useState<any>([]); // [{title: 'Blog 1', author: 'Author 1', description: 'Description 1'}, {title: 'Blog 2', author: 'Author 2', description: 'Description 2'}]
    const [createBlogModal, setCreateBlogModal] = React.useState(false);
    const [editBlog, setEditBlog] = React.useState<any>(null);
    const [displayBlog, setDisplayBlog] = React.useState<any>(false);
    const [selectedBlog, setSelectedBlog] = React.useState<any>(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogs = await getAllBlogs();
                setBlogs(blogs);
            } catch (e) {
                console.log(e);
            }
        }
        getBlogs();
    }, [])

    const addNewBlog = (blog: any) => {
        const oldBlogs = [...blogs]
        oldBlogs.unshift(blog);
        setBlogs(oldBlogs);
    }
    const updateBlogsList = (blogId: string, data: any) => {
        const oldBlogs: any = [...blogs];
        const blogIndex = oldBlogs.findIndex((blog: any) => blog.id === blogId);
        console.log(blogIndex, 'bi')
        oldBlogs[blogIndex] = {...oldBlogs[blogIndex], data};
        setBlogs(oldBlogs);
        setEditBlog(null);
    }

    const closeModal = () => {
        setCreateBlogModal(false);
        setEditBlog(null);
    }

    const removeBlog = async (blogId: string) => {
        await deleteBlog(blogId);
        const oldBlogs = [...blogs];
        const blogIndex = oldBlogs.findIndex((blog: any) => blog.id === blogId);
        oldBlogs.splice(blogIndex, 1);
        setBlogs(oldBlogs);
    }

    const closePopUp = () => {
        setDisplayBlog(false);
        setSelectedBlog(null);
    }

    const onBlogClick = (blog: any) => {
        setDisplayBlog(true);
        setSelectedBlog(blog);
    }

    return (
        <div className="bg-gray-200">
            {displayBlog && <BlogPopUp blog={selectedBlog} closePopUp={closePopUp} />}
            {createBlogModal && 
                <Modal
                    setShowModal={closeModal}
                    title={editBlog ? `Edit Blog` :`Create Blog`}
                >
                    <CreateBlogsForm addNewBlog={addNewBlog} setCreateBlogModal={setCreateBlogModal} editBlog={editBlog} updateBlogList={updateBlogsList} />
                </Modal>
            }
            <BlogsList list={blogs} setCreateBlogModal={setCreateBlogModal} setEditBlog={setEditBlog} removeBlog={removeBlog} onBlogClick={onBlogClick} />
        </div>

    )
}