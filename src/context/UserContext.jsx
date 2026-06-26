// src/context/UserContext.jsx
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to load from localStorage on initial load
    const stored = localStorage.getItem('quantmentor_user');
    return stored ? JSON.parse(stored) : { name: '' };
  });

  const login = (name) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem('quantmentor_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ name: '' });
    localStorage.removeItem('quantmentor_user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}