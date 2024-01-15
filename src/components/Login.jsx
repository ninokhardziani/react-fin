// src/components/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { useDarkMode } from '../context/DarkModeContext';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('isAuthenticated', 'true');
    console.log(`User logged in with email: ${data.email}`);
    navigate('/Home');
  };
  const { darkMode } = useDarkMode();

  return (
    <div className={`center-content ${darkMode ? 'dark' : 'light'}`}>
      <div className={`login-form ${darkMode ? 'dark' : 'light'}`}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email:</label>
          <input type="text" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}

          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}

          <button type="submit">Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account? <Link to="/">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;