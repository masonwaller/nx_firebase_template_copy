/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './popUpContainer.scss';

interface Props {
    blog: any;
    closePopUp: () => void;
}

const BlogPopUp: React.FC<Props> = (props) => {
console.log(props.blog)

  return (
    <div className="flex justify-center fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="flex flex-col w-full h-full overflow-auto border-0 p-2 rounded-lg shadow-lg relative bg-white">
        <header className="flex justify-between p-3">
          <h3 className="font-light text-lg m-0">
            {props.blog.title}
          </h3>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={props.closePopUp}
              className="cursor-pointer h-6 w-6 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </header>
        <div className="flex justify-between px-3">
          <div>
            <span className="text-sm font-light mr-3">
              {props.blog.author}
            </span>
          </div>
          <div>
            <span className="text-sm">
              {`Written on ${props.blog.date?.toString()}`}
            </span>
          </div>
        </div>
        <div className="mytabs p-2 h-full">
            <div className="tabBody">
                <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded object-cover object-center mb-6 mt-3" src={props.blog.imageUrl || "https://asset.kompas.com/crops/Pk_pN6vllxXy1RshYsEv74Q1BYA=/56x0:1553x998/750x500/data/photo/2021/06/16/60c8f9d68ff4a.jpg"} alt="Replacement"/>
                <strong className="text-sm font-semibold uppercase">
                    Description
                </strong>
                <p className="mb-5">{props.blog.description}</p>
                <strong className="text-sm font-semibold uppercase">
                    Full Article
                </strong>
                <p>{props.blog.blog}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPopUp;