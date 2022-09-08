import React from 'react';
import Alert from '@mui/material/Alert';

const Success = ({ message }) => {
  return (
    <div>
      <Alert variant="outlined" severity="success">
        {message}
      </Alert>
    </div>
  );
};

export default Success;
