import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser as logoutAction } from '../redux/userSlice';
import { logoutUser } from '../api';

const Navbar = () => {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {user.is_admin === 1 && (
              <li>
                <Link to="/users">Users</Link>
              </li>
            )}
            <li className="nav-user">Hi, {user.name}</li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
