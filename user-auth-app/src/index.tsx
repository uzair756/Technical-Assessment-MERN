import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profiles" element={<Profile />} />
      <Route path="/" element={<Signup />} /> {/* Default route */}
    </Routes>
  </Router>
);
