
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [faceIDEnabled, setFaceIDEnabled] = useState(false);

   
  const register = async (username, email, password) => {
    try {
      console.log('Registering user:', { username, email, password }); // Log request data
      await axios.post('http://192.168.150.183:5000/auth/register', { username, email, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Error registering user');
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password }); // Log request data
      const response = await axios.post('http://192.168.150.183:5000/auth/login', { username, password });
      setIsAuthenticated(true);
      alert('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      alert('Error logging in');
    }
  };


  const logout = () => {
    setIsAuthenticated(false);
    // Clear any other session data here if needed
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,faceIDEnabled, setFaceIDEnabled, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;