import { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(   
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    // set dark mode default 
    useEffect(() => {
        window.localStorage.setItem('theme', 'dark')
        setIsDarkMode(true)
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme يجب أن يكون داخل ThemeProvider");
    return context;
};
