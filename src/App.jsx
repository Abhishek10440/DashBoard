// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainPage from './pages/MainPage';      // <-- NEW
import { UserProvider } from './context/UserContext';
import './index.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<MainPage />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}