import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';
import './Login.css'; // Import CSS file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const validateFields = () => {
    let hasError = false;
    
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!email) {
      setEmailError('Please enter your email');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Please enter your password');
      hasError = true;
    }

    if (hasError) {
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const url = 'http://192.168.1.20:3002/login';
    try {
      setLoading(true);
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await result.json();
      setLoading(false);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setSuccessMessage('Login successful! Redirecting to your profile...');
        setTimeout(() => navigate('/profiles'), 2000);
      } else {
        setGeneralError(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setGeneralError('An error occurred during login');
    }
  };

  return (
    <div className='app-background'>
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="light" />
          <div className="loading-text">Loading...</div>
        </div>
      )}
      
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
        
        <div className="input-container">
          <input
            className={`login-input ${emailError ? 'error' : ''}`}
            placeholder='Enter your email'
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
            }}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div className="input-container">
          <input
            className={`login-input ${passwordError ? 'error' : ''}`}
            placeholder='Enter your password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>

        <Button
          variant='dark'
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </Button>

        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <div className="signup-container">
          <span className="signup-text">Don't have an account? </span>
          <Link className='signup-link' to='/signup'>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
