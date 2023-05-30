/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { UserContext } from '../../app';
import { createBlog, updateBlog } from '../../api-client/apiModules/blogs';

interface CreateBlogProps {
    addNewBlog: (value: any) => void;
    updateBlogList: (blogId: string, data: any) => void;
    setCreateBlogModal: (value: boolean) => void;
    editBlog: any;
}
export const CreateBlogsForm = (props: CreateBlogProps) => {

    const {user, setUser} = React.useContext(UserContext);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [blog, setBlog] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    useEffect(() => {
        if(props.editBlog){
            setTitle(props.editBlog.title || '');
            setDescription(props.editBlog.description || '');
            setBlog(props.editBlog.blog || '');
            setImageUrl(props.editBlog.imageUrl || '');
        }
    }, [props.editBlog])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(props.editBlog)
    try{
        const blogData = {
            title,
            description,
            blog,
            imageUrl,
            author: user.name,
            authorId: user.id,
        }
        if(props.editBlog?.id){
            await updateBlog(props.editBlog.id, blogData);
            props.updateBlogList(props.editBlog.id, blogData)
        } else {
            const res = await createBlog(blogData);
            const newBlog = {...blogData, id: res.id, date: res.date}
            props.addNewBlog(newBlog);
        }

    } catch(e){
        console.log(e);
        alert('Error creating blog')
    }
 
    props.setCreateBlogModal(false);
  };

  return (
    <>
    {!user.id ? 
    <h3>Must Sign In to Create or Edit a Blog</h3> :
    <form onSubmit={(e) => onSubmit(e)}>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Title
      </label>
      <input
        name="title"
        id="title"
        className="w-full outline"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Description
      </label>
      <textarea
        rows={3}
        name="description"
        id="description"
        className="w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label
        htmlFor="blog"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Blog
      </label>
      <textarea
        rows={8}
        name="blog"
        id="blog"
        className="w-full"
        value={blog}
        onChange={(e) => setBlog(e.target.value)}
      />
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Image URL
      </label>
      <input
        name="image"
        id="image"
        className="w-full outline"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit" className="mt-3 p-3 bg-blue-400 rounded-md">Submit</button>
    </form>
    }
    </>
  );
};
