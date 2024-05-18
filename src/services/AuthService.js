import axios from 'axios';

const API_URL = 'https://ecotogether-backaend.onrender.com/api/users';

const register = (email, password) => {
    return axios.post(`${API_URL}/register`, { email, password });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
};

const getUser = (token) => {
    return axios.get(API_URL, {
        headers: {
            'x-auth-token': token
        }
    });
};

export default {
    register,
    login,
    getUser
};
