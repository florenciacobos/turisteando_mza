import React from 'react';

const ErrorToast = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="error-toast">
      Error: {message}
    </div>
  );
};

export default ErrorToast;
