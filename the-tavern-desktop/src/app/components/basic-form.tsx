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
        onSubmit?: () => void}) {
  return (
    <form style={formStyles?.formStyle}>
        
      <h1 style={formStyles?.titleStyle}>{title}</h1>

      {children}

      <BasicButton onClick={onSubmit} buttonStyle={formStyles?.buttonStyle}>
        Submit
      </BasicButton>

    </form>
  );
}