
export default function BasicButton({ 
  children, 
  onClick,
  buttonStyle,
  type = "button",
  }: {
    children?: React.ReactNode, 
    onClick?: () => void, 
    className?: string,
    buttonStyle: React.CSSProperties | undefined;
    type?: "button" | "submit" | "reset";
  }
  ) {

  return (
    <button onClick={onClick} style={buttonStyle} type={type}>
      {children}
    </button>
    );
  };