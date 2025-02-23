// frontend/src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <nav>
        {token ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/tasks">Tasks</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/tasks" replace /> : <Login setToken={setToken} />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/tasks" replace /> : <Register />}
        />
        <Route
          path="/tasks"
          element={token ? <Tasks token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? '/tasks' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
