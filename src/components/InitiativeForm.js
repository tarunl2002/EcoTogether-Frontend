// src/components/InitiativeForm.js

import React, { useState } from 'react';
import { useInitiative } from '../context/InitiativeContext';

const InitiativeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const { createInitiative } = useInitiative();

    const { name, description } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await createInitiative(formData);
        setFormData({ name: '', description: '' });
    };

    return (
        <div className="container mt-5">
            <h2>Create New Initiative</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
        </div>
    );
};

export default InitiativeForm;
