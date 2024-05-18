import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('https://ecotogether-backaend.onrender.com/api/users', {
                        headers: {
                            'x-auth-token': token
                        }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const register = async (email, password) => {
        try {
            const res = await axios.post('https://ecotogether-backaend.onrender.com/api/users/register', { email, password });
            localStorage.setItem('token', res.data.token);
            const userRes = await axios.get('https://ecotogether-backaend.onrender.com/api/users', {
                headers: {
                    'x-auth-token': res.data.token
                }
            });
            setUser(userRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post('https://ecotogether-backaend.onrender.com/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            const userRes = await axios.get('https://ecotogether-backaend.onrender.com/api/users', {
                headers: {
                    'x-auth-token': res.data.token
                }
            });
            setUser(userRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth, AuthContext };
