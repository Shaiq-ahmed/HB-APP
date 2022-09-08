import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Tabs } from 'antd';

import { Container } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Header from '../components/Header';
import { Tag } from 'antd';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;

const ProfileScreen = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  return (
    <Container>
      <Header bg="white" color="crimson" />

      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h2>My Profile</h2>
          <hr />
          <p>
            {' '}
            <b>Name</b>: {user.user.name}
          </p>
          <p>
            <b>Email</b>: {user.user.email}
          </p>
          <p>
            <b>isAdmin</b>: {user.user.isAdmin ? 'Yes' : 'No'}
          </p>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default ProfileScreen;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const user = JSON.parse(localStorage.getItem('currentUser'));

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/bookings/cancelBooking', {
        bookingId,
        roomId,
      });
      console.log(data);
      setLoading(false);
      Swal.fire(
        'Done!',
        'your booking has been cancelled successfully!',
        'success'
      ).then(() => window.location.reload());
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire('OOPS', 'Something went Wrong', 'error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('/api/bookings/getBookingByUserId', {
          userId: user.user._id,
        });
        setBookings(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className=" bs container pb-2">
                  <h1 style={{ color: '#ff8100' }}>
                    <b>{booking.room}</b>
                  </h1>
                  <p>
                    <b>Booking Id</b> : {booking._id}
                  </p>
                  <p>
                    <b>Check In</b> : {booking.fromDate}
                  </p>
                  <p>
                    <b>Check Out</b> : {booking.toDate}
                  </p>
                  <p>
                    <b>Total Amount</b> : {booking.totalAmount}
                  </p>
                  <p>
                    <b>Status</b> :{' '}
                    {booking.status === 'booked' ? (
                      <Tag color="green">CONFIRMED</Tag>
                    ) : (
                      <Tag color="red">CANCELLED</Tag>
                    )}
                  </p>
                  {booking.status !== 'Cancelled' && (
                    <div style={{ textAlign: 'right', paddingBottom: '20px' }}>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomId)
                        }
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
