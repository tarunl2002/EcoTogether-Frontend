// src/context/ProfileContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get('https://ecotogether-backaend.onrender.com/api/users/profile', {
                        headers: {
                            'x-auth-token': token
                        }
                    });
                    setProfile(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    const updateProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put('https://ecotogether-backaend.onrender.com/api/users/profile', profileData, {
                headers: {
                    'x-auth-token': token
                }
            });
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileProvider, ProfileContext };
