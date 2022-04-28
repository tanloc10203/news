import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Trang chủ</h1>} />
      <Route path="/news">
        <Route index element={<h1>News</h1>} />
        <Route path="detail" element={<h1>Chi tiết</h1>} />
        <Route path="detail/:newsId" element={<h1>Chi tiết 1 bài viết có id</h1>} />
      </Route>
      <Route path="/category" element={<h1>Trang danh mục</h1>} />
      <Route path="/login" element={<h1>Trang login</h1>} />
      <Route path="/contact" element={<h1>Trang liên hệ</h1>} />
      <Route path="*" element={<h1>Không tìm thấy trang</h1>} />
    </Routes>
  );
}

export default App;
