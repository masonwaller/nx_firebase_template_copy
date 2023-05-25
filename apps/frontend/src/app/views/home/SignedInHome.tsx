import React from 'react';


export const SignedInHome = () => {
    return (
        <div className='bg-gray-200'>
            <div className="w-full my-20 z-50 sticky  rounded-3xl px-6 bg-zinc-900">
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                            <div className="max-w-xl mb-6">
                                <h2 className="font-sans text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none max-w-lg mb-6">
                                    You Are Signed In.
                                </h2>
                                <p className=" text-base md:text-lg"> Here is the signed in home page. Data changes by user login happens here.
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                            </div>
                        </div>
                        <img alt="logo" width={'450px'} height={'450px'} src="https://images.unsplash.com/photo-1542304074-9c8ce93b52fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                    </div>
                </div>

                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                        <img alt="logo" width={'450px'} height={'450px'} src="https://images.unsplash.com/photo-1515023677547-593d7638cbd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                            <div className="max-w-xl mb-6">
                                <h2 className="font-sans text-3xl sm:mt-0 mt-6 font-bold tracking-tight  sm:text-4xl sm:leading-none max-w-lg mb-6">
                                    Step 2 : Awesome Is Lorem Ipsum
                                </h2>
                                <p className=" text-base md:text-lg">Lorem Ipsum is so cool and awesome to act and so cool to think. And very awesome to eat and talk.
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                        <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                            <div className="max-w-xl mb-6">
                                <h2 className="font-sans text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none max-w-lg mb-6">
                                    Step 3 : Cool and awesome is lorem ipsum
                                </h2>
                                <p className=" text-base md:text-lg">Lorem Ipsum is so cool and awesome to act and so cool to think. And very awesome to eat and talk.
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                            </div>
                        </div>
                        <img alt="logo" width={'450px'} height={'450px'} src="https://images.unsplash.com/photo-1546195643-70f48f9c5b87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                    </div>
                </div>

                <div className="sm:px-4 py-16  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded-3xl shadow-sm lg:flex-row sm:mx-auto">
                        <div className="relative lg:w-1/2">
                            <img
                              width="50px"
                              height="50px"
                              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                              alt="mobile app"
                              className="object-cover w-full lg:absolute h-80 lg:h-full"
                            />
                            <svg
                              className="absolute top-0 right-0 hidden h-full  lg:inline-block"
                              viewBox="0 0 20 104"
                              fill="currentColor"
                            >
                                <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
                            </svg>
                        </div>

                        <div className="flex flex-col justify-center p-8 bg-black lg:p-16 lg:pl-10 lg:w-1/2">
                            <h5 className="mb-3 text-3xl text-white font-extrabold leading-none sm:text-4xl">
                                Need Some Help!
                            </h5>
                            <p className="mb-8 text-blue-400 font-black">
                            </p>
                            <div className="flex items-left">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}