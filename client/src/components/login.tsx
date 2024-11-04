import React, { useState } from 'react';
import './login.css'; // Import your CSS file

/* Consts */
const LOGO = '/ucsd-logo.png'
const GEISELIMAGE = '/chicken.jpeg'

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={LOGO} alt="Triton2Shop Logo" className="logo" />
        <h2 className="login-title">LOGIN</h2>
        <p className="login-instructions">
          Please login with your @ucsd.edu email address
        </p>
        <form className="login-form">
            <div className="email-input">
                <label htmlFor="email" className={`floating-label ${email ? 'active' : ''}`}>Username or Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " required />
            </div>
          
          <div className="password-input">
            <label htmlFor="password" className={`floating-label ${password ? 'active' : ''}`}>Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " required />
          </div>
          
          <button type="submit" className="sign-in-button">Sign in</button>
          
          <div className="form-footer">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot password</a>
          </div>

          <p className="new-user">
            New User? <a href="/signup">Create an account instead</a>
          </p>
        </form>
      </div>
      <div className="image-container">
        <img src={GEISELIMAGE} alt="STUDENTS EXCHANGING GOODS IN FRONT OF GEISEL" className='geisel-image' />
      </div>
    </div>
  );
};

export default Login;