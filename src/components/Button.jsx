import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  const handleClick = (e) => {
    if (disabled) return;
    console.log(`Button clicked: ${children}`);
    if (onClick) onClick(e);
  };

  let buttonClass = 'btn';
  
  if (disabled) {
    buttonClass += ' btn-disabled';
  } else {
    buttonClass += ` btn-${variant}`;
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 