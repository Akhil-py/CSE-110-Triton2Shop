import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Signup</h1>
        <p>Please signup with you @ucsd.edu email address</p>
      </div>  
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      <div>
        <Link to="/login">Already have an account? Login Instead</Link>
      </div>
    </form>
  );
};

export default SignupForm;