import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = ({ room, fromDate, toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs h-100">
      <div className="col-md-4">
        <img src={room.imageUrls[0]} className="small-img" />
      </div>
      <div className="col-md-7">
        <h2 style={{ color: '#ff8100' }}>
          <b>{room.name}</b>
        </h2>
        <b>
          <p>
            <span style={{ fontSize: '18px' }}> Facilities</span>:{' '}
            <i class="fas fa-utensils" style={{ color: '#003153' }}></i>
            {' ' + room.facilities}{' '}
          </p>
          <p>
            <span style={{ fontSize: '18px' }}>Location </span>:{' '}
            <i className="fa fa-location" style={{ color: '#800000' }}></i>{' '}
            {room.location}
          </p>
          <p>
            <span style={{ fontSize: '18px' }}> Max Count</span>:{' '}
            <i className="fa fa-users" style={{ color: '#19c2ed' }}></i>{' '}
            {room.maxCount}
          </p>
          <p>
            <span style={{ fontSize: '18px' }}> Phone Number</span> :
            <i className="fa fa-phone " style={{ color: 'green' }}></i>{' '}
            {room.phoneNumber}
          </p>
          <p>
            <span style={{ fontSize: '18px' }}>Type</span>: {room.type}
          </p>
        </b>
        <div style={{ float: 'right' }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary styled-button">
                Book Now
              </button>
            </Link>
          )}
          &nbsp;
          <button
            className="btn btn-primary styled-button"
            onClick={handleShow}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="md" scrollable={true}>
        <Modal.Header>
          <Modal.Title style={{ color: '#f2810c', fontWeight: 'bold' }}>
            {room.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '18px' }}>
          <Carousel>
            {room.imageUrls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 carousel-img" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          {room.description}
        </Modal.Body>
        <Modal.Footer style={{}}>
          <Button
            style={{ background: '#d0021b', border: 'none' }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
