import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalStyles } from './components/Common';
import { Home } from './components/Layouts';
import { Contact } from './components/Layouts/Contact';
import { Introduce } from './components/Layouts/Introduce';
import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { PostCreate } from './features/post/page/PostCreate';

function App() {
  return (
    <GlobalStyles>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news">
          <Route index element={<h1>News</h1>} />
          <Route path="detail" element={<h1>Chi tiết</h1>} />
          <Route path="detail/:newsId" element={<h1>Chi tiết 1 bài viết có id</h1>} />
        </Route>
        <Route path="/category" element={<h1>Trang danh mục</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/create-post" element={<PostCreate />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Không tìm thấy trang</h1>} />
      </Routes>
    </GlobalStyles>
  );
}

export default App;
