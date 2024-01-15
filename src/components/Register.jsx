import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Register.css';
import { useDarkMode } from '../context/DarkModeContext';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

function Register() {
    const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    localStorage.setItem('isAuthenticated', 'true');
    console.log(`User registered with name: ${data.name}, email: ${data.email}`);
    navigate('/Home');
  };
  const { darkMode } = useDarkMode();

  return (
    <div className={`center-content ${darkMode ? 'dark' : 'light'}`}>
    <div className={`register-form ${darkMode ? 'dark' : 'light'}`}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Email:</label>
        <input type="text" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        <label>Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit">Register</button>
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </div>
  );
}

export default Register;