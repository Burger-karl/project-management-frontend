// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after successful registration
import { API_BASE_URL } from '../config';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    user_type: 'client', // default selection
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/register/`, formData);
      setSuccess('Registration successful');
      setError('');
      // Redirect to login page after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error("Error response:", error.response);
      const errorMessage = error.response?.data?.detail || error.response?.data?.error || "Unknown error";
      setError(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user_type" className="form-label">User Type</label>
                  <select
                    className="form-select"
                    id="user_type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
