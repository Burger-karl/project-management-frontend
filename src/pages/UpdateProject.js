import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProject = () => {
    const { pk } = useParams(); // Use 'pk' to get the project ID from the URL
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        status: 'in_progress', // Default or fetched status
        priority: 'low', // Default or fetched priority
    });

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/project/projects/update/${pk}/`); // Ensure this matches your Django endpoint
                setProjectData(response.data);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchProjectData();
    }, [pk]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

        try {
            await axios.put(`http://localhost:8000/project/projects/update/${pk}/`, projectData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            alert('Project updated successfully!');
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div>
            <h2>Update Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={projectData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={projectData.status} onChange={handleChange} required>
                        <option value="done">Done</option>
                        <option value="in_progress">In Progress</option>
                        <option value="abandoned">Abandoned</option>
                    </select>
                </div>
                <div>
                    <label>Priority:</label>
                    <select name="priority" value={projectData.priority} onChange={handleChange} required>
                        <option value="low">Low</option>
                        <option value="mid">Mid</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button type="submit">Update Project</button>
            </form>
        </div>
    );
};

export default UpdateProject;
