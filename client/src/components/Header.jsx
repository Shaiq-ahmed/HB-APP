import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Header = ({ bg, color, bs }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }

  return (
    <>
      <Navbar
        bg={bg}
        style={{
          boxShadow: { bs },
        }}
      >
        <Container>
          <Navbar.Brand>
            <NavLink
              to="/"
              style={{ color: `${color}`, textDecoration: 'none' }}
            >
              <i class="fa-solid fa-magnifying-glass-location"></i>{' '}
              <b> BINGSBOOKING</b>
            </NavLink>
          </Navbar.Brand>
          <Nav className="mr-auto justify-content-center">
            {user ? (
              <>
                <style type="text/css">
                  {`
        .super-colors:hover {
          background: #d0021b;
          color:white ;
          font-weight:bold;

        }
      `}
                </style>
                <Dropdown align="end" id="dropdown-menu-align-end">
                  <Dropdown.Toggle
                    variant="danger"
                    style={{
                      color: 'white',
                      background: '#d0021b',
                      borderRadius: '20px',
                      boxShadow: 'none',
                    }}
                  >
                    <i class="fa-solid fa-user"></i> {user.user.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" className="super-colors">
                      <Link
                        to="/profile"
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {' '}
                        <i class="fa-solid fa-hotel"></i> My Profile{' '}
                      </Link>
                    </Dropdown.Item>

                    {/* <Dropdown.Divider /> */}
                    <Dropdown.Item
                      eventKey="2"
                      onClick={logout}
                      className="super-colors"
                    >
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>{' '}
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <NavLink to="/register">
                  <button
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '20px',
                      padding: '3px 6px',
                      border: 'none',

                      backgroundColor: '#d0021b',
                    }}
                  >
                    Register
                  </button>
                </NavLink>
                &nbsp; &nbsp;
                <NavLink to="/login">
                  <button
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '20px',
                      padding: '3px 6px',
                      border: 'none',

                      backgroundColor: '#d0021b',
                    }}
                  >
                    Sign In
                  </button>
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
