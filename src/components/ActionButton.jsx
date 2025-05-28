import React from 'react';

const ActionButton = ({ onClick, icon, label, className = "search-button" }) => {
  return (
    <button 
      className={className}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
};

export default ActionButton;
