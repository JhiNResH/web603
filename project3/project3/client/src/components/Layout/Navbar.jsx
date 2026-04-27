import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-taskflow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          &#9776; TaskFlow
        </Link>

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <span className="navbar-text d-none d-sm-inline">
                Hello, <strong>{user.name}</strong>
              </span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="btn btn-outline-light btn-sm" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
