import React, { useState } from 'react';
import './signup.css'; // Importing the CSS file

/* Consts */
const LOGO = '/ucsd-logo.png';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img src={LOGO} alt="Triton2Shop Logo" className="logo" />

        <h2 className="signup-title">SIGN UP</h2>
        <form className="signup-form">
          <div className="input-container">
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder=" " />
            <label htmlFor="username" className={`floating-label ${username ? 'active' : ''}`}>
              Username
            </label>
          </div>

          <div className="input-container">
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
            <label htmlFor="email" className={`floating-label ${email ? 'active' : ''}`}>
              UCSD Email (ucsd.edu)
            </label>
          </div>

          <div className="input-container">
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
            <label htmlFor="password" className={`floating-label ${password ? 'active' : ''}`}>
              Password
            </label>
          </div>

          <div className="input-container">
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=" " />
            <label htmlFor="confirm-password" className={`floating-label ${confirmPassword ? 'active' : ''}`}>
              Confirm Password
            </label>
          </div>

          <button type="submit" className="sign-up-button">Sign Up</button>

          <p className="existing-user">
            Already have an account? <a href="/login">Log in instead</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;