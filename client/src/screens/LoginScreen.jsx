import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import axios from 'axios';
import Header from '../components/Header';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [messages, setMessages] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password,
    };
    console.log(user);
    try {
      setLoading(true);
      const { data } = await axios.post('/api/users/login', user);
      localStorage.setItem('currentUser', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <Header bg="" color="black" />
      {loading && <Loader />}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sm={12}>
          <img
            src={process.env.PUBLIC_URL + '/images/h3.jpg'}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              paddingTop: '20px',
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/images/logo_size.jpg'}
              style={{ width: '35%' }}
            />
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '50px',
              paddingTop: '10px',
            }}
          >
            <h2 className="reg-head">Login</h2>
          </div>
          {messages && <Error message={messages}></Error>}
          {error && <Error message={error} />}
          <div>
            <form className="parent" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                prefix={<i className="fa fa-user"></i>}
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="reg-div">
                <button
                  className="reg-button"
                  disabled={(!email, !password)}
                  type="submit"
                >
                  Login
                </button>
              </div>
              <p className="mt-3">
                Don't have an account?{' '}
                <Link to="/register" class="link-info">
                  Register Here
                </Link>
              </p>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginScreen;
