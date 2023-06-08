import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountPage } from '../account/AccountsPage';
import { BlogsPage } from '../blogs/BlogsPage';
import { Home } from '../home/home';
import {Login} from '../login/Login';
import IndividualBlogPage from '../blogs/IndividualBlogPage';
import AdminPage from '../admin/AdminPage';

export default function Router() {
  
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/blogs' element={<BlogsPage/>} />
        <Route path='/blogs/blog/:id' element={<IndividualBlogPage />} />
        <Route path='/account' element={<AccountPage/>} />
        <Route path='/admin' element={<AdminPage/>} />
      </Routes>
    );
 }