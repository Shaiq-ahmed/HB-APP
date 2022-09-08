import React from 'react';
import Alert from '@mui/material/Alert';

const Error = ({ message }) => {
  return (
    <div>
      {/* <Alert
        style={{
          color: 'white',
          width: 'auto',
          fontSize: '17px',
          backgroundColor: '#d0021b',
          borderColor: 'none',
          borderRadius: '5px ',
          boxShadow:
            ' rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
          margin: '20px',
        }}
      >
        {message}
      </Alert> */}
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </div>
  );
};

export default Error;
