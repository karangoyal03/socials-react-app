import React from 'react';
import fetchGenres from './client';

const DisplayData: React.FC = () => {
  return (
    <>
      <button onClick={fetchGenres}>Click to display</button>
    </>
  );
};

export default DisplayData;