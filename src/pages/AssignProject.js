// src/pages/AssignProject.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';

const AssignProject = () => {
  const { id } = useParams();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/clients/`);
        setClients(response.data);
      } catch (error) {
        setError('Error fetching clients.');
      }
    };
    fetchClients();
  }, []);

  const handleAssign = async () => {
    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token
    
    try {
      await axios.post(`${API_BASE_URL}/project/projects/assign/${id}/`, { client_username: selectedClient }, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
      });
      setSuccess('Project assigned successfully!');
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error assigning project.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">Assign Project to Client</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <div className="mb-3">
                <label htmlFor="clients" className="form-label">Select Client</label>
                <select className="form-select" id="clients" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                  <option value="">Choose a client</option>
                  {clients.map((client) => (
                    <option key={client.username} value={client.username}>{client.username}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleAssign} className="btn btn-primary" disabled={!selectedClient}>Assign Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignProject;
