export type Theme = {
    background: string;
    card: string;
    highlight: string;
    hover: string;
    text: string;
    mutedText: string;
    buttonBackground: string;
    buttonText: string;
}

export const tavernDarkTheme: Theme = {

    background: "#2A1B14", //Main background color
    card: "#3B241B", //For cards and chat bubbles
    highlight : "#C6A472", //For text higlhlights and buttons
    hover: "#8C4B2D", //For hover effects
    text: "#EADFC8", //Main text color
    mutedText: "#A18B74", //For less important text
    buttonBackground: "#B38A5A", //Main button color
    buttonText: "#2A1B14", //Readable text for button

}

export const tavernLightTheme: Theme = {
  background: "#EADFC8", //Main background color
  card: "#D6C6B1", //For cards and chat bubbles
  highlight: "#8C4B2D", //For text higlhlights and buttons
  hover: "#B38A5A", //For hover effects
  text: "#2A1B14", //Main text color
  mutedText: "#5A4638", //For less important text
  buttonBackground: "#C6A472", //Main button color
  buttonText: "#2A1B14", //Readable text for button
};
