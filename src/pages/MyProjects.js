// src/pages/MyProjects.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
        const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

      try {
        const response = await axios.get(`${API_BASE_URL}/project/my-projects/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the access token
              },
        });
        setProjects(response.data);
      } catch (error) {
        setError('Error fetching my projects.');
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5">My Projects</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>{project.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProjects;
