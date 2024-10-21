// src/pages/CreateProject.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      await axios.post(`${API_BASE_URL}/project/projects/create/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      });
      setSuccess('Project created successfully!');
      setError('');
      // Optionally, you could reset formData here if you want to clear the form after submission
      // setFormData({
      //   name: '',
      //   description: '',
      //   status: 'pending',
      //   priority: 'medium',
      // });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error creating project.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">Create Project</h2>
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
                <button type="submit" className="btn btn-primary">Create Project</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
