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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
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
        sessionStorage.setItem('name', json.name || email.split('@')[0]);

        setShowSuccess(true);
        
        // Show success message and redirect
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      } else {
        // Handle errors if authentication fails
        if (json.errors) {
          const errorMessages = json.errors.map(error => error.msg).join(', ');
          setErrors({ submit: errorMessages });
        } else {
          setErrors({ submit: json.error || 'Login failed. Please check your credentials.' });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="login-page-container">
        <div className="login-frame">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Login Successful!</h2>
            <p>Welcome back! Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }} 
              type="email" 
              name="email" 
              id="email" 
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email" 
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && <span id="email-error" className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password <span className="required">*</span>
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              type="password"
              name="password"
              id="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              required
            />
            {errors.password && <span id="password-error" className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
            aria-describedby="submit-status"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
          <div id="submit-status" className="sr-only" aria-live="polite">
            {isLoading ? 'Signing in...' : 'Ready to sign in'}
          </div>
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
