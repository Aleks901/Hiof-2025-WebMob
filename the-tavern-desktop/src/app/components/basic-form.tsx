import BasicButton from "./navigation/basic-button";

"use client"

export function BasicForm({
    children, 
    title, 
    onSubmit}: {
        children: React.ReactNode; 
        title: string; 
        onSubmit: () => void}) {
  return (
    <form>
        
      <p>{title}</p>

      {children}

      <BasicButton onClick={onSubmit}> 
        Submit
      </BasicButton>

    </form>
  );
}