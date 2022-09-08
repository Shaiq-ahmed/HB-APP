import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Header from '../components/Header';
import Grid from '@mui/material/Grid';
import { border, spacing } from '@mui/system';
import moment from 'moment';

import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const HomeScreen = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [rooms, setRooms] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRoom, setDuplicateRoom] = useState();
  const [searchKey, setSearchkey] = useState('');
  const [type, setType] = useState('');

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
    setToDate(moment(dates[1]).format('DD-MM-YYYY'));

    var temRoom = [];
    var availability = false;
    for (const room of duplicateRoom) {
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          if (
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromDate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.toDate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromDate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentBookings.length == 0) {
        temRoom.push(room);
      }
      setRooms(temRoom);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api');

        setRooms(data);
        setDuplicateRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterBySearch() {
    const tempRoom = duplicateRoom.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRoom);
  }

  return (
    <div>
      <div
        style={{
          backgroundImage:
            'url(https://www.hotelphotographer.com.au/wp-content/uploads/2020/12/thumbnail_2B5A3987.jpg)',
          opacity: '0.9',
        }}
        className="fluid"
      >
        <Header bg="none" color="white" />
        <h1
          style={{
            textAlign: 'center',
            paddingTop: '90px',
            marginTop: '7%',
            fontSize: '50px',
            fontFamily: 'Comfortaa, cursive',
            fontWeight: 'bold',
            width: 'auto',
            color: 'white',
          }}
        >
          BEST HOTELS TO STAY
        </h1>
        <h3
          style={{
            textAlign: 'center',
            margin: '7% 5%',
            paddingBottom: '100px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '30px',
            color: 'white',
          }}
        >
          We have best hotels to stay, make your vaction, bussiness trip and
          honeymoon with Luxury
        </h3>
      </div>

      <Grid
        container
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // marginLeft: '5%',
        }}
        className="bs"
      >
        <Grid item xs={12} md={4}>
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </Grid>
        <Grid item xs={12} md={4}>
          <input
            type="search"
            placeholder="Search rooms"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '18px',
              borderRadius: '5px',
              borderColor: '1px solid crimson',
              outline: 'none',
              width: '100%',
              height: '40px',
              align: 'center',
            }}
            value={searchKey}
            onChange={(e) => {
              setSearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          ></input>
          {/* <i className="fa fa-search" aria-hidden="true"></i> */}
        </Grid>
        <Grid item xs={12} md={4}>
          <select
            style={{
              borderColor: 'crimson',
              height: '40px',
              width: '80%',
              border: '1px solid crimson',
              borderRadius: '5px',
              outline: '0',
            }}
            onChange={(e) => {
              const selectedOption = e.target.value;
              setType(selectedOption);
              if (e.target.value !== 'All') {
                const tempRooms = duplicateRoom.filter(
                  (room) =>
                    room.type.toLowerCase() === selectedOption.toLowerCase()
                );
                setRooms(tempRooms);
              } else {
                setRooms(duplicateRoom);
              }
            }}
            className="custom-select"
          >
            <option value="All">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
          </select>
        </Grid>
      </Grid>
      <div className="container">
        <div className="row justify-content-center mt-5">
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room) => {
              return (
                <div className="col-md-9 mt-3" key={room._id}>
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
