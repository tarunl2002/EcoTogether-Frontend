import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useContext } from 'react';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
                <Route path="/" render={() => (
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        )} />
              </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
      return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default App;
