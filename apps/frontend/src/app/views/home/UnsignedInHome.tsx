/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';


export const UnsignedInHome = () => {
    return (
        <div className="antialiased w-full h-full font-inter p-10 bg-gray-200">
    <div className="container px-4 mx-auto">
        <h1>You Are Currently Signed Out</h1>
      <div>
        <div id="title" className="text-center my-10">
          <h1 className="font-bold text-4xl">Pricing Plans</h1>
          <p className="text-light text-gray-500 text-xl">
            Here are our pricing plans
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-10 pt-10"
        >
          <div
            id="plan"
            className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
          >
            <div id="title" className="w-full py-5 border-b border-gray-800">
              <h2 className="font-bold text-3xl">Startup</h2>
              <h3 className="font-normal text-indigo-500 text-xl mt-2">
                $9<sup>,99</sup>/month
              </h3>
            </div>
            <div id="content" className="">
              <div id="icon" className="my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 text-sm pt-2">
                  Perfect individuals or startups
                </p>
              </div>
              <div id="contain" className="leading-8 mb-10 text-lg font-light">
                <ul>
                  <li>10 hours of support</li>
                  <li>128MB of storage</li>
                  <li>2048MB bandwith</li>
                  <li>Subdomain included</li>
                </ul>
                <div id="choose" className="w-full mt-10 px-6">
                  <a
                    className="w-full block bg-gray-900 font-medium text-xl text-white py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            id="plan"
            className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
          >
            <div id="title" className="w-full py-5 border-b border-gray-800">
              <h2 className="font-bold text-3xl">Corporate</h2>
              <h3 className="font-normal text-indigo-500 text-xl mt-2">
                $12<sup>,99</sup>/month
              </h3>
            </div>
            <div id="content" className="">
              <div id="icon" className="my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <p className="text-gray-500 text-sm pt-2">
                  Perfect for teams up to 12 people
                </p>
              </div>
              <div id="contain" className="leading-8 mb-10 text-lg font-light">
                <ul>
                  <li>10 hours of support</li>
                  <li>1024MB of storage</li>
                  <li>4GB bandwith</li>
                  <li>Domain included</li>
                </ul>
                <div id="choose" className="w-full mt-10 px-6">
                  <a
                    className="w-full block bg-gray-900 font-medium text-xl text-white py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            id="plan"
            className="rounded-lg text-center overflow-hidden w-full transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in"
          >
            <div id="title" className="w-full py-5 border-b border-gray-800">
              <h2 className="font-bold text-3xl">Enterprise</h2>
              <h3 className="font-normal text-indigo-500 text-xl mt-2">
                $19<sup>,99</sup>/month
              </h3>
            </div>
            <div id="content" className="">
              <div id="icon" className="my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto fill-stroke text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <p className="text-gray-500 text-sm pt-2">
                  Perfect large scale team
                </p>
              </div>
              <div id="contain" className="leading-8 mb-10 text-lg font-light">
                <ul>
                  <li>10 hours of support</li>
                  <li>10GB of storage</li>
                  <li>100GB bandwith</li>
                  <li>Domain included</li>
                </ul>
                <div id="choose" className="w-full mt-10 px-6">
                  <a
                    className="w-full block bg-gray-900 font-medium text-xl text-white py-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover"
                    >Choose</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}