import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from './pages/Main';

const routes = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/Main', element: <Main /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={routes}/>
  </React.StrictMode>
);