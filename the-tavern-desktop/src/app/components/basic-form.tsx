import BasicButton from "./navigation/basic-button";

export function BasicForm({
    children, 
    title, 
    formStyles,
    formClasses,
    onSubmit}: {
        children: React.ReactNode; 
        title: string;
        formStyles?: {
          titleStyle?: React.CSSProperties
          formStyle?: React.CSSProperties
          buttonStyle?: React.CSSProperties
        };
        formClasses?: {
          formClass?: string
          titleClass?: string
          buttonClass?: string
        };
        onSubmit?: (e: React.FormEvent) => void}) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form className={formClasses?.formClass} style={formStyles?.formStyle} onSubmit={handleSubmit}>
        
      <h1 className={formClasses?.titleClass} style={formStyles?.titleStyle}>{title}</h1>

      {children}

      <BasicButton type="submit" className={formClasses?.buttonClass} buttonStyle={formStyles?.buttonStyle}>
        Submit
      </BasicButton>

    </form>
  );
}