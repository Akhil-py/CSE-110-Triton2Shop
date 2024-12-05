import React, { useState, useContext } from 'react';
import './login.css';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

/* Constants */
const LOGO = '/ucsd-logo.png';
const GEISELIMAGE = '/chicken.jpeg';

const Login: React.FC = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className='login-page'>
      <div className="login-container">
        <div className="login-form-container">
          <img src={LOGO} alt="Triton2Shop Logo" className="logo" />
          <h2 className="login-title">LOGIN</h2>

          <div className="google-login-container">
            <button
              type="button"
              className="google-login-button"
              onClick={handleGoogleLogin}
            >
              <img src="/google-icon.png" alt="Google Icon" className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="image-container">
          <img src={GEISELIMAGE} alt="STUDENTS EXCHANGING GOODS IN FRONT OF GEISEL" className='geisel-image' />
        </div>
      </div>
    </div>
  );
};

export default Login;
