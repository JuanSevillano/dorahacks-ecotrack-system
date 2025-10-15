import { createContext, useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeContextType = {
    mode: ThemeMode;
    toggleTheme: () => void;
}

export const AppThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const UIThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('dark'); // Por defecto dark

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // Si no hay modo guardado, detectar la preferencia del sistema
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        })
    }, []);

    return (
        <AppThemeContext.Provider value={{ mode, toggleTheme }}>
                {children}
        </AppThemeContext.Provider>
    )
}
