// src/pages/Logout.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        await axios.post(`${API_BASE_URL}/api/logout/`, { refresh: refresh_token });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // Redirect to login after logout
      } catch (error) {
        console.error('Logout failed');
      }
    };
    logout();
  }, [navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body text-center">
              <h2 className="card-title">Logging out...</h2>
              <p className="card-text">Please wait while we log you out.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
