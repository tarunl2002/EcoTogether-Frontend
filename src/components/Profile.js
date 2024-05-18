// src/components/Profile.js

import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';

const Profile = () => {
    const { profile, updateProfile, loading } = useContext(ProfileContext);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        interests: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                bio: profile.bio || '',
                interests: profile.interests ? profile.interests.join(', ') : ''
            });
        }
    }, [profile]);

    const { name, bio, interests } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Profile</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        className="form-control"
                        name="bio"
                        value={bio}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label>Interests</label>
                    <input
                        type="text"
                        className="form-control"
                        name="interests"
                        value={interests}
                        onChange={onChange}
                    />
                    <small className="form-text text-muted">
                        Separate interests with commas.
                    </small>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
