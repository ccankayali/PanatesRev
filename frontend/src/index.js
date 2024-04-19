import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './templatesapp/mainpage';
import { Pure } from './templatesapp/pure';
import { Login } from './templatesapp/login';
import { SignUp } from './templatesapp/signup';
import { Dashboard } from './templatesapp/dashboard/dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/pure" element={<Pure />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();