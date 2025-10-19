"use client"


export default function BasicButton({ 
  children, 
  onClick,
  className,
}: {
    children: React.ReactNode, 
    onClick?: () => void, 
    className?: string
  }) {

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
    );
  };