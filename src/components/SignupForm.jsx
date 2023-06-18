import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';
import PropTypes from 'prop-types';
import houseImage from '../assets/house.jpg';
import { signup } from '../redux/signup/signupSlice';

const SignupForm = (props) => {
  const { authorized } = props;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/home');
    }
  }, [authorized, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup({
      name, email, password, passwordConfirmation,
    }))
      .unwrap()
      .then((token) => {
        // Handle successful login
        localStorage.setItem('token', token);
        console.log('signup successful');
        navigate('/login');
      })
      .catch((error) => {
        // Handle login error
        console.error('Signup error:', error);
      });
  };

  return (
    <div className="relative w-full bg-center bg-cover" style={{ backgroundImage: `url(${houseImage})` }}>
      <div className="z-50 hover:bg-opacity-100 shadow-lg bg-gray-100 p-6 pl-4 md:pl-12 rounded-r-full absolute top-14 md:top-10 left-0 border-2 border-t-0 border-l-0 border-white/25 backdrop-filter backdrop-blur-lg bg-opacity-70">
        <NavLink to="/">
          <BiLeftArrow size={20} className="cursor-pointer text-white" />
        </NavLink>
      </div>
      <div className="p-8 h-screen w-full flex flex-col justify-center gap-2 bg-mustard bg-opacity-80">
        <h2 className="font-black uppercase mx-auto text-center text-3xl text-white tracking-wider">Sign up</h2>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-t-0 border-l-0 border-white/25 backdrop-filter backdrop-blur-lg gap-2 bg-opacity-70 shadow-xl flex flex-col items-end container mx-auto px-6 py-6 max-w-md mt-6 bg-gray-100 rounded-md"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            required
            className="mt-2 w-full p-2 border border-slate-300 rounded text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mt-2 w-full p-2 border border-slate-300 rounded text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mt-2 w-full p-2 border border-slate-300 rounded text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Password Confirmation"
            required
            className="mt-2 w-full p-2 border border-slate-300 rounded text-sm shadow-sm
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <button className="mt-4 text-lg border-2 border-t-0 border-l-0 border-white/25 backdrop-filter backdrop-blur-lg bg-opacity-80 shadow-md hover:bg-opacity-100 bg-mustard rounded-full px-4 py-2 color text-white flex justify-evenly items-center" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};
SignupForm.propTypes = {
  authorized: PropTypes.bool.isRequired,
};
export default SignupForm;
