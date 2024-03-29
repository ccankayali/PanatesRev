
import './App.css';
import { Login } from './templatesapp/login';
import { SignUp } from './templatesapp/signup';
import { createBrowserRouter, Route,RouterProvider, Routes } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    [
      {
    path: "/login",
    element: <Login />,
      },
      {
        
    path: "/signup",
    element: <SignUp />,
      },
    ]
  );
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
