import BasicButton from "./navigation/basic-button";

export function BasicForm({
    children, 
    title, 
    formStyles,
    onSubmit}: {
        children: React.ReactNode; 
        title: string;
        formStyles?: {
          titleStyle?: React.CSSProperties
          formStyle?: React.CSSProperties
          buttonStyle?: React.CSSProperties
        };
        onSubmit?: (e: React.FormEvent) => void}) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form style={formStyles?.formStyle} onSubmit={handleSubmit}>
        
      <h1 style={formStyles?.titleStyle}>{title}</h1>

      {children}

      <BasicButton type="submit" buttonStyle={formStyles?.buttonStyle}>
        Submit
      </BasicButton>

    </form>
  );
}