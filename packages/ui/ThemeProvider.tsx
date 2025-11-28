import { createContext, useContext, useState } from "react"
import { tavernDarkTheme, tavernLightTheme, Theme } from "../ui/useTheme"

type ThemeContextType = {
    theme: Theme;
    mode: "light" | "dark"
    toggleTheme: () => void
};

const ThemeContext = createContext<ThemeContextType | null>(null);

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
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    return context;
}