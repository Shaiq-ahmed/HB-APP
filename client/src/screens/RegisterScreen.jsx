import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios, { AxiosError } from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import Header from '../components/Header';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [messages, setMessages] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const { data } = await axios.post('/api/users/register', user);
        setSuccess(true);
        setLoading(false);
        localStorage.setItem('currentUser', JSON.stringify(data));
        navigate('/');
      } catch (error) {
        // if (error instanceof AxiosError) {
        //   console.log(error.response.data.message);
        // }
        setLoading(false);
        setError(error);
        setError(error.response.data.message);
      }
    } else {
      setMessages('Passwords donot match');
    }
  };

  return (
    <div>
      <Header bg="DBDCDE" color="black" />
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
            className=""
            style={{
              textAlign: 'center',
              marginTop: '10px',
              paddingTop: '10px',
            }}
          >
            <h2 className="reg-head">Register</h2>
          </div>
          {messages && <Error message={messages}></Error>}
          {error && <Error message={error} />}
          <div>
            <form className="parent" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="confirm password"
                required
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                }}
              />

              <div className="reg-div">
                <button
                  className="reg-button"
                  type="submit"
                  disabled={(!name, !email, !password, !cpassword)}
                >
                  Register
                </button>
              </div>

              <p className="mt-3">
                Already have an account?{' '}
                <Link to="/login" class="link-info">
                  Login Here
                </Link>
              </p>

              {success && <Success message="Registered Successfully" />}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterScreen;
