import React, { useState } from 'react';
import axiosInstance from '../../../utlis/axiosInstance'; // Import axiosInstance
import cookie from 'cookiejs';
import "./css.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function Register() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts

    try {
      const response = await axiosInstance.post('/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        remember: formData.remember,
      });

      // Save the token in cookies
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      cookie.set('auth_token', response.data.token, { expires: oneYearFromNow });

      // Show success toast notification
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Wait for the toast to finish before navigating
      setTimeout(() => navigate("/admin"), 500); // Default to "/admin" if no redirect provided

    } catch (error) {
      // Handle API errors
      if (error.response) {
        const { status, data } = error.response;

        if (status === 403 && data.message) {
          // Show error toast notification
          toast.error(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Handle other errors
          toast.error("Register failed. Please check the form for errors.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } finally {
      setLoading(false); // Set loading to false after API call is completed
    }
  };

  return (
    <div className="wrapper  m-auto">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <p className="form-login">Register</p>

        <div className="input-box">
          <input
            required
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name[0]}</span>}
        </div>

        <div className="input-box">
          <input
            required
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email[0]}</span>}
        </div>

        <div className="input-box">
          <input
            required
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password[0]}</span>}
        </div>

        <div className="input-box">
          <input
            required
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.password_confirmation && <span className="error">{errors.password_confirmation[0]}</span>}
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="register-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </form>
    </div>
  );
}
