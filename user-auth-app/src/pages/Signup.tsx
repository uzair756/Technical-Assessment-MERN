import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import './Signup.css'; // Import CSS file

const Signin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [generalError, setGeneralError] = useState<string>('');
    const [emailExistsError, setEmailExistsError] = useState<string>('');
    const [accountCreated, setAccountCreated] = useState<boolean>(false);

    const validateFields = () => {
        let hasError = false;

        // Reset errors
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setGeneralError('');
        setEmailExistsError('');

        // Validate fields
        if (!name) {
            setNameError('Please enter your name');
            hasError = true;
        }
        if (!email) {
            setEmailError('Please enter your email');
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            hasError = true;
        }
        if (!password) {
            setPasswordError('Please enter a password');
            hasError = true;
        } else if (password.length <= 6) {
            setPasswordError('Password must be more than 6 characters long');
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

    const check = async () => {
        const isValid = validateFields();
        if (!isValid) {
          return;
        }
      
        const url = 'http://192.168.1.20:3002/register';
        try {
          const result = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (!result.ok) {
            const errorData = await result.json(); // Parse the error response
            if (result.status === 400) {
              setGeneralError(errorData.error); // Display the specific error message
            } else {
              setGeneralError('Error creating account');
            }
            return;
          }
      
          const data = await result.json();
          setAccountCreated(true);
          setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (error) {
          console.error('Error:', error);
          setGeneralError('Error creating account');
        }
      };
      

    return (
        <div className='app-background'>
            <div className='signup-container'>
                <h1 className='signup-heading'>Signup</h1>

                {generalError && <Alert variant="danger">{generalError}</Alert>}
                {emailExistsError && <Alert variant="danger">{emailExistsError}</Alert>} {/* Email exists error */}
                {accountCreated && <Alert variant="success" className="fade-in">Account created successfully!</Alert>} {/* Success message */}

                <div className='input-container'>
                    <input
                        className={`signup-input ${nameError ? 'error' : ''}`}
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (nameError) setNameError('');
                        }}
                    />
                    {nameError && <div className="error-message">{nameError}</div>}
                </div>

                <div className='input-container'>
                    <input
                        className={`signup-input ${emailError ? 'error' : ''}`}
                        placeholder='Enter your email'
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                            if (emailExistsError) setEmailExistsError('');
                        }}
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>

                <div className='input-container'>
                    <input
                        className={`signup-input ${passwordError ? 'error' : ''}`}
                        placeholder='Enter a strong password'
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
                    className="signup-button"
                    onClick={check}
                >
                    Signup
                </Button>

                <div className='signin-container'>
                    <span className="signin-text">Already have an account? </span>
                    <Link className='signin-link' to='/login'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;
