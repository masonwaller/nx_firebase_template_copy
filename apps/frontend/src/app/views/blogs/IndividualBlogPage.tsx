import clsx from 'clsx'

import { Container } from '../../components/blog-pages/Container'
import { useEffect, useState } from 'react'
import { getBlog } from '../../api-client/apiModules/blogs'

function SocialLink({ className, href, children, icon: Icon }: any) {
  return (
    <li className={clsx(className, 'flex')}>
      <a
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  )
}

function MailIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function IndividualBlogPage() {
  const [blog, setBlog] = useState<any>(null);

  const blogId = window.location.pathname.split('/').pop();

  useEffect(() => {
    const getBlogById = async () => {
      console.log(blogId)
      try{
        const blog = await getBlog(blogId);
        setBlog(blog);
      } catch (e) {
        console.log(e);
        alert('Error getting blog')
      }
    };
    getBlogById();
  }, [blogId]);

  return (
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <img
                src={blog?.imageUrl}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {blog?.title}
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                {blog?.blog}
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <h3 className='mt-4'>{blog?.author}</h3>
              <h3
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {blog?.date}
              </h3>
            </ul>
          </div>
        </div>
      </Container>
  )
}
