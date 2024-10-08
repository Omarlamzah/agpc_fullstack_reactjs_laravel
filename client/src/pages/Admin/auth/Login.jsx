import React, { useState } from 'react';
import axiosInstance from '../../../utlis/axiosInstance'; // Import axiosInstance
import cookie from 'cookiejs';
import "./css.css";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function Login() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  
    // Show a pending toast while awaiting the API response
    const toastPromise = toast.promise(
      axiosInstance.post('/login', {
        email: formData.email,
        password: formData.password,
        remember: formData.remember,
      }).then((response) => {
        const { message } = response.data;
  
        // Save the token in cookies
        cookie.set('auth_token', response.data.token);
  
        // Return response to resolve the promise
        return { message };
      }),
      {
        pending: 'Logging in...',
        success: {
          render({ data }) {
             return data.message; // Show success message
          },
          autoClose: 5000, // Duration of success toast
        },
        error: {
          render({ data }) {
            return data.message || 'Login failed. Please check the form for errors.';
          },
          autoClose: 5000, // Duration of error toast
        },
      }
    );
  
    try {
      await toastPromise; // Wait for the promise to resolve or reject
      setTimeout(() => navigate("/admin"), 500); // Default to "/admin" if no redirect provided

    } catch (error) {
      // Handle any additional errors if needed
      console.error('An unexpected error occurred:', error);
    } finally {
      setLoading(false); // Set loading to false after API call is completed
    }
  };
  

  return (
    <div className="wrapper m-auto">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <p className="form-login">Login</p>

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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  );
}
