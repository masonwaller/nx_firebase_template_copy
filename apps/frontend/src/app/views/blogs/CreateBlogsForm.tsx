/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UserContext } from '../../app';
import { createBlog, updateBlog } from '../../api-client/apiModules/blogs';

interface CreateBlogProps {
    addNewBlog: (value: any) => void;
    updateBlogList: (blogId: string, data: any) => void;
    setCreateBlogModal: (value: boolean) => void;
    editBlogId: string | null;
}
export const CreateBlogsForm = (props: CreateBlogProps) => {

    const {user, setUser} = React.useContext(UserContext);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [blog, setBlog] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
        const blogData = {
            title,
            description,
            blog,
            imageUrl,
            author: user.id
        }
        if(props.editBlogId){
            await updateBlog(props.editBlogId, blogData);
            props.updateBlogList(props.editBlogId, blogData)
        } else {
            const res = await createBlog(blogData);
            //have to get the new blog ID from the response once backend is set up
            props.addNewBlog(blogData);
        }

    } catch(e){
        console.log(e);
        alert('Error creating blog')
    }
 
    props.setCreateBlogModal(false);
  };

  return (
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
  );
};
