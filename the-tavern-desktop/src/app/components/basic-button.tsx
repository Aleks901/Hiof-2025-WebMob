import React from 'react';

export default function BasicButton({ 
  children, 
  onClick,
  style
}: {
    children: React.ReactNode, 
    onClick?: () => void, 
    style?: object
  }) {

  return (
    <button onClick={onClick}>
        <div style={style}>
            {children}
        </div>
    </button>
    );
  };