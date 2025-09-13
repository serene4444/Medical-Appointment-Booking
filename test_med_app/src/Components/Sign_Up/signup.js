// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './signup.css'
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const SignUp = () => {
    // State variables using useState hook
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to validate form data
    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!role) {
            newErrors.role = 'Please select your role';
        }
        
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-()]/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        
        setShowerr(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateForm()) {
            return;
        }

        setShowerr(''); // Clear previous errors

        try {
            // API Call to register user
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role,
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const json = await response.json(); // Parse the response JSON

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("role", role);

                // Show success message
                setShowerr('Account created successfully! Redirecting...');

                // Redirect user to home page after a short delay
                setTimeout(() => {
                    navigate("/");
                    window.location.reload(); // Refresh the page
                }, 1500);
            } else {
                if (json.errors) {
                    const errorMessages = json.errors.map(error => error.msg).join(', ');
                    setShowerr(errorMessages);
                } else {
                    setShowerr(json.error || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setShowerr('Network error. Please check your connection and try again.');
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="signup-page-container">
            <div className="signup-frame">
                <div className="form-header">
                    <h2 className="form-title">Create Your Account</h2>
                    <p className="form-subtitle">Join us and start your health journey today</p>
                </div>
                
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        {showerr && <div className="err" style={{ color: '#e53e3e', marginBottom: '16px', textAlign: 'center' }}>{showerr}</div>}
                        
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name <span className="required">*</span></label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                type="text" 
                                name="name" 
                                id="name" 
                                className="form-input"
                                placeholder="Enter your full name" 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role" className="form-label">Role <span className="required">*</span></label>
                            <select 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                                name="role" 
                                id="role" 
                                className="form-input dropdown-select"
                                required
                            >
                                <option value="">Select your role</option>
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address <span className="required">*</span></label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-input" 
                                placeholder="Enter your email address" 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number <span className="required">*</span></label>
                            <input 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                className="form-input"
                                placeholder="Enter your phone number" 
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password <span className="required">*</span></label>
                            <div className="password-container">
                                <input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-input"
                                    placeholder="Create a strong password" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="submit-button">
                                Create Account
                            </button>
                        </div>
                    </form>
                    
                    <div className="signup-link">
                        <p>
                            Already have an account? {' '}
                            <Link to="/login">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp; // Export the SignUp component for use in other components