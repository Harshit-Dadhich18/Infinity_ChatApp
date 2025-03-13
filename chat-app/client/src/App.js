import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Chat />}/>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="setAvatar" element={<SetAvatar />} />
    </Route>
  )
);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}