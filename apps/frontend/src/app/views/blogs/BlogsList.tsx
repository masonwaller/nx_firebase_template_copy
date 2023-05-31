/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UserContext } from '../../app';
import { NavLink } from 'react-router-dom';

interface BlogsListProps {
    list: any[];
    setCreateBlogModal: (value: boolean) => void;
    setEditBlog: (value: any) => void;
    removeBlog: (blogId: string) => void;
}

export const BlogsList = (props: BlogsListProps) => {

    const {user, setUser} = React.useContext(UserContext);

    const editBlog = (blog: any) => {
        props.setEditBlog(blog);
        props.setCreateBlogModal(true);
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
                <div className="flex flex-wrap w-full mb-4 p-4">
                    <div className="w-full mb-6 lg:mb-0 flex flex-col">
                        <h1 className="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">Recent Blogs</h1>
                        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        <button onClick={() => props.setCreateBlogModal(true)} className="w-1/10 self-end p-3 bg-blue-400 rounded-md">Create Blog</button>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {props.list.map((blog) => {
                        return (
                            <div className="xl:w-1/3 md:w-1/2 p-4">
                                <div className="bg-white p-6 rounded-lg flex flex-col">
                                    <NavLink to={`/blogs/blog/${blog.id}`}>
                                        <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={blog.imageUrl || "https://asset.kompas.com/crops/Pk_pN6vllxXy1RshYsEv74Q1BYA=/56x0:1553x998/750x500/data/photo/2021/06/16/60c8f9d68ff4a.jpg"} alt="Replacement"/>
                                        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{blog.author}</h3>
                                        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{blog.title}</h2>
                                        <p className="leading-relaxed text-base">{blog.description}</p>
                                    </NavLink>
                                    {
                                        blog.authorId === user.id && 
                                        <div className='self-end'>
                                            <button className='p-1 bg-yellow-400 rounded-md mr-1' onClick={() => editBlog(blog)}>Edit</button>
                                            <button className='p-1 bg-red-400 rounded-md' onClick={() => props.removeBlog(blog.id)}>Delete</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}