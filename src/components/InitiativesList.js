// src/components/InitiativesList.js

import React from 'react';
import { useInitiative } from '../context/InitiativeContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const InitiativesList = () => {
    const { initiatives, joinInitiative, leaveInitiative } = useInitiative();
    const { user } = useAuth();

    const isParticipant = (initiative) => {
        return initiative.participants.includes(user._id);
    };

    return (
        <div className="container mt-5">
            <h2>Environmental Initiatives</h2>
            <ul className="list-group">
                {initiatives.map(initiative => (
                    <li key={initiative._id} className="list-group-item">
                        <h4>{initiative.name}</h4>
                        <p>{initiative.description}</p>
                        {isParticipant(initiative) ? (
                            <button 
                                className="btn btn-danger mr-2"
                                onClick={() => leaveInitiative(initiative._id)}
                            >
                                Leave
                            </button>
                        ) : (
                            <button 
                                className="btn btn-primary mr-2"
                                onClick={() => joinInitiative(initiative._id)}
                            >
                                Join
                            </button>
                        )}
                        <Link to={`/initiatives/${initiative._id}`} className="btn btn-secondary">
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InitiativesList;
