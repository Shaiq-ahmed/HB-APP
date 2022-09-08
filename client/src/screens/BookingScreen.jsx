import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import moment from 'moment';
import Swal from 'sweetalert2';

const BookingScreen = () => {
  const params = useParams();
  const { id } = params;
  const { fromDate } = params;
  const { toDate } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  const roomId = id;
  const fromdate = moment(fromDate, 'DD-MM-YYYY');
  const todate = moment(toDate, 'DD-MM-YYYY');

  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/room/${id}`);
        setTotalAmount(data.rentPerDay * totalDays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem('currentUser')).user._id,
      fromDate: fromdate,
      toDate: todate,
      totalAmount,
      totalDays,
      token,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/bookings/bookRoom',
        bookingDetails
      );

      setLoading(false);
      Swal.fire(
        'Congratulations!',
        'Your room has been successfully booked',
        'success'
      ).then(() => {
        navigate('/profile');
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire('OOPS!', ' Something went Wrong!', 'error');
    }
  };

  return (
    <div>
      <Header bg="white" color="black" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="container mt-4">
          <div className="row justify-content center bs ">
            <div className="col-md-6 col-col-sm-12">
              <h1>{room.name}</h1>
              <img src={room.imageUrls[0]} className="img-fluid h-75" />
            </div>
            <div className="col-md-6 ">
              <div style={{ textAlign: 'center' }}>
                <h2>Booking Details</h2>
                <hr />
                <b>
                  <p>
                    Name : &nbsp;
                    {JSON.parse(localStorage.getItem('currentUser')).user.name}
                  </p>
                  <p
                    style={{
                      border: '1px solid green',
                      borderRadius: '7px',
                      backgroundColor: 'green',
                      color: 'white',
                    }}
                  >
                    From date : &nbsp; {fromDate}
                  </p>
                  <p
                    style={{
                      border: '1px solid crimson',
                      borderRadius: '7px',
                      backgroundColor: 'crimson',
                      color: 'white',
                    }}
                  >
                    To Date : &nbsp; {toDate}
                  </p>
                  <p>Max Count : {room.maxCount}</p>
                </b>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h2>Amount</h2>
                <hr />
                <b>
                  <p>Total Days : &nbsp; {totalDays}</p>
                  <p>Rent per day : &nbsp; {room.rentPerDay}</p>
                  <p>Total Amount : {totalAmount}</p>
                </b>
              </div>

              <div
                style={{
                  textAlign: 'right',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                <StripeCheckout
                  amount={totalAmount * 100}
                  currency="INR"
                  token={onToken}
                  stripeKey="pk_test_51LBuloSGnjrYRe42uPgwyhprLUfWrqLX1jOQMTNdMkIlRP8KaxneXguiLXmnwpFWcJrckJ3vzCW7b2ykwq432mG400aMQ4CBpf"
                >
                  <button className="btn btn-primary styled-button">
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;
