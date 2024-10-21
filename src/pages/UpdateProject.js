// src/pages/UpdateProject.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

const UpdateProject = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/update/${id}/`);
        setFormData(response.data);
      } catch (error) {
        setError('Error fetching project details.');
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

    try {
      await axios.put(`${API_BASE_URL}/project/projects/update/${id}/`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
      }); 
        
      setSuccess('Project updated successfully!');
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error updating project.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">Update Project</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Project Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select className="form-select" id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Project</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
