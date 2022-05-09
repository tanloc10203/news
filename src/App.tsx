import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalStyles, PrivateRoute } from './components/Common';
import { Home } from './components/Layouts';
import { Contact } from './components/Layouts/Contact';
import { Introduce } from './components/Layouts/Introduce';
import './config/firebase';
import { Login } from './features/auth/pages/Login';
import { Logout } from './features/auth/pages/Logout';
import { Register } from './features/auth/pages/Register';
import { CreatePost } from './features/post/page/CreatePost';
import { Detail } from './features/post/page/Detail';
import { UpdatePost } from './features/post/page/UpdatePost';

function App() {
  return (
    <GlobalStyles>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news">
          <Route
            path="update-post"
            element={
              <PrivateRoute>
                <UpdatePost />
              </PrivateRoute>
            }
          />
          <Route index element={<h1>News</h1>} />
          <Route path=":categoryId">
            <Route index element={<h1>Trang con</h1>} />
            <Route path=":newsId" element={<Detail />} />
          </Route>
        </Route>
        <Route path="/category" element={<h1>Trang danh mục</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h1>Không tìm thấy trang</h1>} />
      </Routes>
    </GlobalStyles>
  );
}

export default App;
