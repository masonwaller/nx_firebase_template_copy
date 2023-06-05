import { useContext } from "react"
import { Card } from "../../components/blog-pages/Card"
import { SimpleLayout } from "../../components/blog-pages/SimpleLayout"
import { UserContext } from "../../app"

function Blog({ blog, setEditBlog, removeBlog, setCreateBlogModal }: any) {
  const {user, setUser} = useContext(UserContext)

  const editBlog = (blog: any) => {
    setEditBlog(blog);
    setCreateBlogModal(true);
}
  
  return (
    <>
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blogs/blog/${blog.id}`}>
          {blog.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={blog.date}
          className="md:hidden"
          decorate
        >
          {blog.date}
        </Card.Eyebrow>
        <Card.Description>{blog.description}</Card.Description>
        <Card.Cta>Read blog</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {blog.date}
      </Card.Eyebrow>
      {
          blog.authorId === user.id && 
            <div className='self-end'>
              <button className='p-1 bg-yellow-400 rounded-md mr-1' onClick={() => editBlog(blog)}>Edit</button>
              <button className='p-1 bg-red-400 rounded-md' onClick={() => removeBlog(blog.id)}>Delete</button>
            </div>
        }
    </article>
    <hr className="my-6 h-0.5 w-full border-t-0 bg-gray-100 opacity-100 dark:opacity-50" />
    </>
  )
}

export default function BlogsList({ list, setCreateBlogModal, setEditBlog, removeBlog }: any) {
  return (
      <SimpleLayout
        title="Blogs are a great way to share your thoughts and opinions with the world."
        intro="Check out are assortment of blogs.  We have a wide variety of topics to choose from.  If you would like to contribute to our site, create a blog."
      >
            <div className="flex justify-end">
                <button onClick={() => setCreateBlogModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Blog
                </button>
            </div>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {list.map((blog: any) => (
              <Blog key={blog.id} blog={blog} setEditBlog={setEditBlog} removeBlog={removeBlog} setCreateBlogModal={setCreateBlogModal} />
            ))}
          </div>
        </div>
      </SimpleLayout>
  )
}

// export async function getStaticProps() {
//   return {
//     props: {
//       articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
//     },
//   }
// }
