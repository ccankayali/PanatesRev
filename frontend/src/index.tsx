import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from './pages/Main';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

const routes = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/Main', element: <Main /> },
  { path: '/LoginPage', element: <LoginPage />},
  { path: '/SignupPage', element: <SignupPage />},
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={routes}/>
  </React.StrictMode>
);