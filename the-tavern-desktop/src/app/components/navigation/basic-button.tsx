
export default function BasicButton({ 
  children, 
  onClick,
  buttonStyle,
  }: {
    children?: React.ReactNode, 
    onClick?: () => void, 
    className?: string,
    buttonStyle: React.CSSProperties | undefined; }
  ) {

  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
    );
  };