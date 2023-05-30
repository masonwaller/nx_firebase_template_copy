import * as express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog, getBlog } from './crudBlogs';

export const blogsRouter = express.Router();

blogsRouter.get('/blogs', getBlogs);

blogsRouter.get('/blogs/:blogId', getBlog);

blogsRouter.post('/blogs', createBlog);

blogsRouter.put('/blogs/:blogId', updateBlog);

blogsRouter.delete('/blogs/:blogId', deleteBlog);