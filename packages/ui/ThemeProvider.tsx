import { createContext, useContext, useState } from "react"
import { tavernDarkTheme, tavernLightTheme, Theme } from "../ui/useTheme"

type ThemeContextType = {
    theme: Theme;
    mode: "light" | "dark"
    toggleTheme: () => void
};

const defaultThemeContext: ThemeContextType = {
    theme: tavernDarkTheme,
    mode: "dark",
    toggleTheme: () => {}
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("dark")

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"))
    }

    const theme = mode === "dark" ? tavernDarkTheme : tavernLightTheme

    return (
        <ThemeContext.Provider value={{
            theme,
            mode,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {

    try {
        return useContext(ThemeContext);
    } catch (error) {

        return defaultThemeContext;
    }
}