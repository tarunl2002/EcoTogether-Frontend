// src/components/InitiativeDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InitiativeDetails = () => {
    const { id } = useParams();
    const [initiative, setInitiative] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitiative = async () => {
            try {
                const res = await axios.get(`https://ecotogether-backaend.onrender.com/api/initiatives/${id}`);
                setInitiative(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchInitiative();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{initiative.name}</h2>
            <p>{initiative.description}</p>
            <h3>Participants</h3>
            <ul>
                {initiative.participants.map(participant => (
                    <li key={participant._id}>{participant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default InitiativeDetails;
