import React, { useState, useEffect } from 'react';
import { useInitiative } from '../context/InitiativeContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const InitiativeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: null // Initialize location as null
    });
    const { createInitiative } = useInitiative();

    const { name, description, location } = formData;

    useEffect(() => {
        // Fetch user's current location when component mounts
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setFormData({ ...formData, location: { lat: latitude, lng: longitude } });
            },
            error => {
                console.error(error);
            }
        );
    }, []);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setFormData({ ...formData, location: { lat, lng } });
        console.log(lat)
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await createInitiative(formData);
        setFormData({ name: '', description: '', location: null }); // Reset location after submission
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
                <MapContainer center={[51.505, -0.09]} zoom={9} style={{ height: '400px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {location && (
                        <Marker position={[location.lat, location.lng]} onClick={handleMapClick}>
                            <Popup>Your location</Popup>
                        </Marker>
                    )}
                </MapContainer>
                <button type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
        </div>
    );
};

export default InitiativeForm;
