import React from 'react';
import { useState } from 'react';

import { PulseLoader } from 'react-spinners';

const Loader = () => {
  let [loading, setLoading] = useState(true);
  return (
    <div style={{ marginTop: '150px' }}>
      <div className="sweet-loading text-center ">
        <PulseLoader color="#d0021b" loading={loading} css="" size={40} />
      </div>
    </div>
  );
};

export default Loader;
