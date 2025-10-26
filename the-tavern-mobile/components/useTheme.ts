export type Theme = {
    background: string;
    card: string;
    highlight: string;
    hover: string;
    text: string;
    mutedText: string;
}

export const tavernTheme = (): Theme => {
    return{    
        background: "#2A1B14", //Main background color
        card: "#3B241B", //For cards and chat bubbles
        highlight : "#C6A472", //For text higlhlights and buttons
        hover: "#8C4B2D", //For hover effects
        text: "#EADFC8", //Main text color
        mutedText: "#A18B74" //For less important text
    }
}

export function useTheme(): Theme {
    return tavernTheme();
}