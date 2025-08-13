// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-frame">
        <div className="form-header">
          <h1 className="form-title">Welcome Back</h1>
          <p className="form-subtitle">
            Access your records, track your progress, and stay informed — sign in to continue.
          </p>
        </div>
        
        <form onSubmit={login} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              name="email" 
              id="email" 
              className="form-input" 
              placeholder="Enter your email" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password <span className="required">*</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        
        <div className="signup-link">
          <p>
            Don't have an account? {' '}
            <Link to="/signup">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
