import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Badge } from 'antd';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from '../components/Header';
const { TabPane } = Tabs;

const AdminScreen = () => {
  const navigate = useNavigate();

  const checkingAdmin = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!checkingAdmin) {
      navigate('/');
    } else {
      if (!checkingAdmin.user.isAdmin) {
        navigate('/');
      }
    }
  }, []);

  return (
    <Container>
      <Header bg="white" color="crimson" />
      <h1 className="text-center mt-4">
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <AddRooms />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default AdminScreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/bookings/getAllBookings');
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
  let count1 = [];
  const hell = bookings.forEach((element) => {
    if (element.status === 'Cancelled') {
      count1.push(element);
    }
  });

  console.log(count1.length);

  let count2 = [];
  const hell1 = bookings.forEach((element) => {
    if (element.status === 'booked') {
      count2.push(element);
    }
  });

  console.log(count2.length);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        <label>
          <b>Total Bookings</b> :{' '}
          <Badge
            count={bookings.length ? bookings.length : 0}
            style={{
              backgroundColor: '#10a5e9',
            }}
          />
          &nbsp;
        </label>
        <label>
          <b>Total Cancelled Bookings</b> : <Badge count={count1.length} />
          &nbsp;
        </label>
        <label>
          <b>Total Booked</b> :{' '}
          <Badge
            count={count2.length}
            style={{
              backgroundColor: '#226807',
            }}
          />
        </label>

        {loading && <Loader />}
        <hr></hr>
        <table
          className="table table-bordered table-striped table-hover"
          style={{
            backgroundColor: '#16b2a2',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          <thead
            className="bs"
            style={{ backgroundColor: '#10796a', color: 'white' }}
          >
            <tr>
              <th>Booking ID</th>
              <th>Room</th>
              <th>User ID</th>

              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.room}</td>
                    <td>{booking.userId}</td>

                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/');
        setRooms(data);
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
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>

        {loading && <Loader />}
        <table className="table table-bordered table-striped table-dark">
          <thead
            className="bs"
            style={{ backgroundColor: '#10796a', color: 'white' }}
          >
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Type</th>

              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>

                    <td>{room.rentPerDay}</td>
                    <td>{room.maxCount}</td>
                    <td>{room.phoneNumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/users/users');
        setUsers(data);
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
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>

        {loading && <Loader />}
        <table
          className="table table-bordered table-striped "
          style={{
            fontWeight: 'bold',
          }}
        >
          <thead
            className="bs"
            style={{ backgroundColor: 'crimson', color: 'white' }}
          >
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>

              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddRooms() {
  const [addRooms, setAddRooms] = useState([]);
  const [name, setName] = useState('');
  const [rentPerDay, setRentPerDay] = useState();
  const [maxCount, setMaxCount] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [facilities, setFacilities] = useState([]);
  const [type, setType] = useState();
  const [imageurl1, setImageurl1] = useState();
  const [imageurl2, setImageurl2] = useState();
  const [imageurl3, setImageurl3] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const addRoom = async () => {
    const newRoom = {
      name,
      rentPerDay,
      location,
      description,
      facilities,
      maxCount,
      phoneNumber,
      type,
      imageUrls: [imageurl1, imageurl2, imageurl3],
    };
    try {
      setLoading(true);
      const { data } = await axios.post('api/addRoom', newRoom);

      console.log(data);
      setAddRooms(data);
      setLoading(false);
      Swal.fire('Congrats !', 'You successfully added a new Room!', 'success');
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire('OOPS !', 'Something went Wrong!', 'error');
    }
    console.log(newRoom);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        <input
          placeholder="room name"
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="location"
          className="form-control"
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          placeholder="rent per day"
          className="form-control"
          type="number"
          value={rentPerDay}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />
        <input
          placeholder="facilities"
          className="form-control"
          type="text"
          value={facilities}
          onChange={(e) => {
            setFacilities(e.target.value);
          }}
        />
        <input
          placeholder="max count"
          className="form-control"
          type="text"
          value={maxCount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />
        <br></br>
        <textarea
          placeholder="description"
          className="form-control"
          rows="5"
          cols="50"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          placeholder="phone number"
          className="form-control"
          type="number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-6">
        <input
          placeholder="type(Delux or Non-Delux)"
          className="form-control"
          type="text"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          placeholder="Image Url 1"
          className="form-control"
          type="text"
          value={imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        />
        <input
          placeholder="Image Url 2"
          className="form-control"
          type="text"
          value={imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        />
        <input
          placeholder="Image Url 3"
          className="form-control"
          type="text"
          value={imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        />
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-danger mt-2" onClick={addRoom}>
            {' '}
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
