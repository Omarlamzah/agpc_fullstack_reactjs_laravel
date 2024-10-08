import axios from 'axios';
import Cookies from 'js-cookie';
import { apiurl } from './var';

// Set default configurations for Axios
axios.defaults.withCredentials = true;

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: apiurl,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to handle CSRF token and Bearer token
axiosInstance.interceptors.request.use(async (config) => {
  console.log('Initial request config:', config);

  // Check if the CSRF token is already in cookies
  let xsrfToken = Cookies.get('XSRF-TOKEN');
  console.log('CSRF token in cookies:', xsrfToken);

  if (!xsrfToken) {
    console.log('CSRF token not found in cookies. Fetching from server...');
    try {
      // Fetch CSRF token from the server
      await axios.get(`${apiurl}/sanctum/csrf-cookie`, { withCredentials: true });
      
      // Update xsrfToken after fetching
      xsrfToken = Cookies.get('XSRF-TOKEN');
      console.log('Fetched CSRF token:', xsrfToken);
      
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }

  // Set CSRF token in request headers if available
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken;
  } else {
    console.warn('CSRF token is still not available.');
  }

  // Check if the Bearer token exists in the cookies
  const authToken = Cookies.get('auth_token');
  if (authToken) {
    // Set the Authorization header with the Bearer token
    config.headers['Authorization'] = `Bearer ${authToken}`;
    console.log('Authorization header set with Bearer token:', authToken);
  } else {
    console.warn('auth_token not found in cookies.');
  }

  console.log('Updated request config:', config);

  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

export default axiosInstance;
