// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Logout from './pages/logout';
import CreateProject from './pages/CreateProject';
import UpdateProject from './pages/UpdateProject';
import DeleteProject from './pages/DeleteProject';
import AssignProject from './pages/AssignProject';
import ClientList from './pages/ClientList';
import AllProjects from './pages/AllProjects';
import MyProjects from './pages/MyProjects';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/project/projects/create/" element={<CreateProject />} />
        <Route path="/project/projects/update/<int:pk>/" element={<UpdateProject />} />
        <Route path="/project/projects/delete/<int:pk>/" element={<DeleteProject />} />
        <Route path="/project/projects/assign/<int:pk>/" element={<AssignProject />} />
        <Route path="/project/clients/" element={<ClientList />} />
        <Route path="/project/projects/" element={<AllProjects />} />
        <Route path="/project/my-projects/" element={<MyProjects />} />
      </Routes>
    </Router>
  );
}

export default App;
