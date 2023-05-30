import { getDataById, getCollectionData, createData, updateData, deleteData } from "@nx-template/firebase";


export const getBlog = async (req, res) => {
    const { blogId } = req.params;
    const blog = await getDataById({
        collection: 'blogs',
        docId: blogId,
    });
    return res.status(200).send(blog);
}

export const getBlogs = async (req, res) => {
    const blogs = await getCollectionData({
        collection: 'blogs',
    });
    return res.status(200).send(blogs);
}

export const createBlog = async (req, res) => {
    const blogData = req.body;
    const blog = await createData({
        collection: 'blogs',
        params: blogData,
    });
    return res.status(200).send(blog);
}

export const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    const blogData = req.body;
    const blog = await updateData({
        collection: 'blogs',
        params: blogData,
        docId: blogId,
    });
    return res.status(200).send(blog);
}

export const deleteBlog = async (req, res) => {
    const { blogId } = req.params;
    const blog = await deleteData({
        collection: 'blogs',
        docId: blogId,
    });
    return res.status(200).send(blog);
}