import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgLogIn } from "react-icons/cg";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/'); // Redirect to Home if already logged in
      }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username || !password) {
            setError('Please fill in both fields');
            setIsLoading(false);
            return;
        }

        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.status === 200) {
            localStorage.setItem('token', data.token);
            navigate('/'); // Redirect to Home after successful login
        } else {
            setError(data.message || 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className='icon-title-container'>
                    <CgLogIn className='login-icon' />
                    <h2 className="login-title">Login</h2>
                </div>
                <div className="input-group">
                    <label className="input-label" htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field-title"
                        placeholder="Enter Username"
                    />
                </div>
                <div className="input-group">
                    <label className="input-label" htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field-title"
                        placeholder="Enter Password"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
