
import './App.css';
import { Login } from './templatesapp/login';
import { SignUp } from './templatesapp/signup';
import {Pure} from './templatesapp/pure.jsx';
import { createBrowserRouter,RouterProvider,  } from 'react-router-dom';
import { MainPage } from './templatesapp/mainpage';
import { Dashboard } from './templatesapp/dashboard/dashboard.jsx';
import { New } from './templatesapp/new/new.jsx';




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

     {
      path: "/pure",
      element: <Pure />,
      },
      {
        path: "/mainpage",
        element: <MainPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>

      },
      {
        path: "/new",
        element: <New />,
      }
    ]
  );
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
