import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../app';
import { Logo } from './Logo';
import { Transition } from '@headlessui/react';


export default function Header() {
  const { user, setUser } = React.useContext(UserContext);

  const container: any = useRef(null);
  const adminContainer: any = useRef(null);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentHeader, setCurrentHeader] = useState('');

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const defaultUserPhotoURL =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000';
  const userPhotoURL = user.picture || defaultUserPhotoURL;

  const hasAdminAccess = user.roles?.includes('Admin');

  useEffect(() => {
    const currentUrl = window.location.pathname.split('/')[1];
    console.log(currentUrl);
    setCurrentHeader(currentUrl);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container?.current?.contains(event.target)) {
        if (!showUserMenu) return;
        setShowUserMenu(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showUserMenu, container]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!adminContainer?.current?.contains(event.target)) {
        if (!showAdminMenu) return;
        setShowAdminMenu(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showAdminMenu, adminContainer]);

  const handleLogout = () => {
    setUser({ firstName: null, lastName: null, id: null, joinDate: null, email: null, userType: 'Reader', roles: ['None'] });
    localStorage.clear();
  }

  const onMenuItemClick = (path: any) => {
    setShowUserMenu(false);
    setShowAdminMenu(false);
    setShowMobileMenu(false);
    setCurrentHeader(path);
  };

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
  }

    return (
        <nav
        className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref>
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContentY"
              aria-controls="navbarSupportedContentY"
              aria-expanded="false"
              aria-label="Toggle navigation">
              
              <span className="[&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-7 w-7">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </span>
            </button>
          </div>
          
    
          <Logo className="h-10 w-auto" />
          
          <div
            className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto ml-7"
            id="navbarSupportedContentY"
            data-te-collapse-item>
            <ul
              className="mr-auto flex flex-col lg:flex-row"
              data-te-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`block transition duration-150 ease-in-out lg:p-2 ${currentHeader === 'home' ? 'text-white bg-black rounded' : ''}`}
                  to='/home'
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => onMenuItemClick('home')}
                  >
                    Home
                </NavLink>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink
                  className={`block transition duration-150 ease-in-out lg:p-2 ${currentHeader === 'blogs' ? 'text-white bg-black rounded' : ''}`}
                  to='/blogs'
                  data-te-nav-link-ref
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={() => onMenuItemClick('blogs')}
                  >
                    Blogs
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='flex w-fit'>
            {hasAdminAccess && (
              <div className="relative flex-shrink-0 z-50 mr-10" ref={adminContainer}>
                  <div>
                    <button
                      onClick={() => setShowAdminMenu(!showAdminMenu)}
                      className="bg-white rounded-full flex shadow-none focus:ring-2 border-2"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open Admin Menu</span>
                      <img
                        src="https://img.icons8.com/material-two-tone/24/000000/admin-settings-male.png"
                        alt="Show Admin Menu"
                        className="h-8 w-8 rounded-full"
                      />
                    </button>
                  </div>
                  <Transition
                    show={showAdminMenu}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <NavLink
                        onClick={() => onMenuItemClick('admin')}
                        to='/admin'
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${currentHeader === 'admin' ? 'bg-gray-100' : ''}`}
                      >
                        Admin Page
                      </NavLink>
                    </div>
                  </Transition>
                </div>
            )}
            <div className="relative flex-shrink-0 z-50" ref={container}>
                  <div>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="bg-white rounded-full flex shadow-none focus:ring-2"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open User Menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userPhotoURL}
                        referrerPolicy="no-referrer"
                        alt=""
                      ></img>
                    </button>
                  </div>
                  <Transition
                    show={showUserMenu}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >

                      <NavLink
                        onClick={() => onMenuItemClick('account')}
                        to='/account'
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${currentHeader === 'account' ? 'bg-gray-100' : ''}`}
                      >
                        {user.id ? 'Your Account' : 'Sign In'}
                      </NavLink>
                      {user.id && (
                        <NavLink
                          onClick={handleLogout}
                          to="/account"
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                          role="menuitem"
                        >
                          Sign out
                        </NavLink>
                      )}
                    </div>
                  </Transition>
                </div>
              </div>
        </div>
        {showMobileMenu && (
            <div className="lg:hidden w-full" id="mobile-menu">
              <div className="pt-2 pb-3 space-y-1 w-full">
                    <NavLink
                      to={'/home'}
                      onClick={() => onMenuItemClick('home')}
                      className={classNames(
                        'home' === currentHeader
                          ? `bg-gray-200`
                          : `border-transparent`,
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={
                        'home' === currentHeader ? 'page' : undefined
                      }
                      role="menuitem"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={'/blogs'}
                      onClick={() => onMenuItemClick('blogs')}
                      className={classNames(
                        'blogs' === currentHeader
                          ? `bg-gray-200`
                          : `border-transparent`,
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full'
                      )}
                      aria-current={
                        'blogs' === currentHeader ? 'page' : undefined
                      }
                      role="menuitem"
                    >
                      Blogs
                    </NavLink>
              </div>
            </div>
            )}
      </nav>
    )
    }