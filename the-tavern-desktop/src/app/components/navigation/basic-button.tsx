
export default function BasicButton({ 
  children, 
  onClick,
  buttonStyle,
  className,
  type = "button",
  }: {
    children?: React.ReactNode, 
    onClick?: () => void, 
    className?: string,
    buttonStyle?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
  }
  ) {

  return (
    <button onClick={onClick} className={className} style={buttonStyle} type={type}>
      {children}
    </button>
    );
  };