import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import Navbar from "../components/Navbar";
import * as Yup from "yup";
import { TOAST_ERROR, TOAST_SUCCESS } from "../utils/common";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Number must be exactly 10 digits")
    .required("Number is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  is_admin: Yup.string()
    .oneOf(["1", "0"], "Role is required")
    .required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    gender: "Male",
    is_admin: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await registerUser(formData);
      if (res.data.success) {
        navigate("/login");
        TOAST_SUCCESS("Registration Successfully..")
      } else {
        TOAST_ERROR( "Registration failed");
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="text"
              name="number"
              placeholder="Number"
              value={form.number}
              onChange={handleChange}
            />
            {errors.number && <p className="error-text">{errors.number}</p>}

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && <p className="error-text">{errors.gender}</p>}

            <select
              name="is_admin"
              value={form.is_admin}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="0">User</option>
            </select>
            {errors.is_admin && <p className="error-text">{errors.is_admin}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={handleChange}
            />
            {errors.confirm_password && (
              <p className="error-text">{errors.confirm_password}</p>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
