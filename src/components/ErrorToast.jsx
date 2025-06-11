import React from 'react';

const Toast = ({ message, type = 'error' }) => {
  if (!message) return null;
  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

export default Toast;
