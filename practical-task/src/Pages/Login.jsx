import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../redux/userSlice';
import { loginUser as loginUserApi } from '../api';
import Navbar from '../components/Navbar';
import { TOAST_ERROR } from '../utils/common';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);

        const res = await loginUserApi(formData);
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.data));          
          dispatch(loginUser(res.data.data));
          navigate('/home');
        } else {
          TOAST_ERROR(res.data.message)
        }
      } catch (err) {
        console.error('Login failed', err);
        TOAST_ERROR('Something went wrong. Please try again.')
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-text">{formik.errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-text">{formik.errors.password}</p>
          )}

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
