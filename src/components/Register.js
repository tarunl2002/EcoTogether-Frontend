import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate} from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, user } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();
        register(email, password);
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    );
};

export default Register;
