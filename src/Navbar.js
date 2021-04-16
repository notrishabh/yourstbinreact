import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span>Wirejoin</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to='/' className="nav-link">
              <li className="nav-item">Home</li>
            </Link>
            <Link to='/fullList' className="nav-link">
              <li className="nav-item">Full List</li>
            </Link>
            <Link to='/unpaidList' className="nav-link">
              <li className="nav-item">Unpaid List</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};