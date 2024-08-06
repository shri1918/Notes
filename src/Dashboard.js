import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="my-4">Dashboard</h1>
      <div className="my-3">
        <button className="btn btn-primary me-2" onClick={() => navigate('/reactNotes')}>
          React Notes
        </button>
        <button className="btn btn-secondary me-2">
          Angular Notes
        </button>
        <button className="btn btn-info me-2">
          React-Native Notes
        </button>
        <button className="btn btn-light me-2">
          Add Content Section
        </button>
        <button className="btn btn-dark me-2">
          Add Sidebar
        </button>
        <button className="btn btn-danger">
          Add Footer
        </button>
      </div>
    </div>
  );
}
