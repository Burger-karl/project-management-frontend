// src/pages/ClientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
        const accessToken = localStorage.getItem('access_token'); // Retrieve the access token

      try {
        const response = await axios.get(`${API_BASE_URL}/project/clients/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the access token
              },
        });
        setClients(response.data);
      } catch (error) {
        setError('Error fetching clients.');
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5">Client List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.username}>
              <td>{client.username}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
