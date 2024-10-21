// src/pages/DeleteProject.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

const DeleteProject = () => {
  const { id } = useParams();
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/project/projects/update/${id}/`);
        setProjectName(response.data.name);
      } catch (error) {
        setError('Error fetching project details.');
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

    try {
      await axios.delete(`${API_BASE_URL}/projects/delete/${id}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
      });
      setSuccess('Project deleted successfully!');
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error deleting project.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body text-center">
              <h2 className="card-title">Delete Project</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <p>Are you sure you want to delete the project: <strong>{projectName}</strong>?</p>
              <button onClick={handleDelete} className="btn btn-danger">Delete Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProject;
