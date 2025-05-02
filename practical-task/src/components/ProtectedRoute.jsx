import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userData);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      dispatch(loginUser(user));
    }
    setLoading(false);
  }, []);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.is_admin !== 1) return <Navigate to="/home" />;

  return children;
};


export default ProtectedRoute;