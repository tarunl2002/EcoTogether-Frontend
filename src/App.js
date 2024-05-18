import React from 'react';
import { BrowserRouter as Router, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { InitiativeProvider } from './context/InitiativeContext';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import { useContext } from 'react';
import InitiativeForm from './components/InitiativeForm';
import InitiativeDetails from './components/InitiativeDetails';
import InitiativesList from './components/InitiativesList';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
                <Route path="/profile" element={
                            <ProtectedRoute>
                                <ProfileProvider>
                                    <Profile />
                                </ProfileProvider>
                            </ProtectedRoute>
                        } />
                        <Route path="/initiatives" element={
                            <ProtectedRoute>
                                <InitiativeProvider>
                                    <InitiativesList />
                                </InitiativeProvider>
                            </ProtectedRoute>
                        } />
                         <Route path="/initiatives/:id" element={
                            <ProtectedRoute>
                                <InitiativeProvider>
                                    <InitiativeDetails />
                                </InitiativeProvider>
                            </ProtectedRoute>
                        } />
                        <Route path="/create-initiative" element={
                            <ProtectedRoute>
                                <InitiativeProvider>
                                    <InitiativeForm />
                                </InitiativeProvider>
                            </ProtectedRoute>
                        } />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
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
