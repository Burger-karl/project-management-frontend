import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is present

const API_BASE_URL = 'http://localhost:8000'; // Change to your actual API base URL

const CreateProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'in_progress', // Default status
        priority: 'low', // Default priority
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

        try {
            const response = await axios.post(`${API_BASE_URL}/project/projects/create/`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setSuccess('Project created successfully!');
            setError('');
            console.log('Response:', response.data);
            // Reset form after success
            setFormData({
                name: '',
                description: '',
                status: 'in_progress',
                priority: 'mid',
            });
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Error creating project.'; // Adjust error message handling
            setError(errorMessage);
            console.error('Error details:', error.response?.data || error);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Create Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
                        <option value="in_progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="abandoned">Abandoned</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority:</label>
                    <select className="form-select" name="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="low">Low</option>
                        <option value="mid">Mid</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </div>
    );
};

export default CreateProject;
