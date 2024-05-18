// src/context/InitiativeContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const InitiativeContext = createContext();

const InitiativeProvider = ({ children }) => {
    const [initiatives, setInitiatives] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchInitiatives = async () => {
            try {
                const res = await axios.get('https://ecotogether-backaend.onrender.com/api/initiatives');
                setInitiatives(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInitiatives();
    }, []);

    const createInitiative = async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('https://ecotogether-backaend.onrender.com/api/initiatives', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });
            setInitiatives([...initiatives, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    const joinInitiative = async (initiativeId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`https://ecotogether-backaend.onrender.com/api/initiatives/join/${initiativeId}`, null, {
                headers: {
                    'x-auth-token': token
                }
            });
            setInitiatives(initiatives.map(initiative => initiative._id === initiativeId ? res.data : initiative));
        } catch (err) {
            console.error(err);
        }
    };

    const leaveInitiative = async (initiativeId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`https://ecotogether-backaend.onrender.com/api/initiatives/leave/${initiativeId}`, null, {
                headers: {
                    'x-auth-token': token
                }
            });
            setInitiatives(initiatives.map(initiative => initiative._id === initiativeId ? res.data : initiative));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <InitiativeContext.Provider value={{ initiatives, createInitiative, joinInitiative, leaveInitiative }}>
            {children}
        </InitiativeContext.Provider>
    );
};

const useInitiative = () => {
    return useContext(InitiativeContext);
};

export { InitiativeProvider, useInitiative };
