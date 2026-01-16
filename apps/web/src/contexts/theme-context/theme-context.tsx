import { createContext, useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeContextType = Partial<{
    mode: ThemeMode;
    toggleTheme: () => void;
    isTransitioning: boolean;
    transitionDirection: 'light-to-dark' | 'dark-to-light' | null;
}>

export const AppThemeContext = createContext<ThemeContextType>({});

export const UIThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('dark'); // Por defecto dark
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'light-to-dark' | 'dark-to-light' | null>(null);

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        // Prevenir múltiples ejecuciones
        if (isTransitioning) return;

        setMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            const direction = prevMode === 'light' ? 'light-to-dark' : 'dark-to-light';

            setIsTransitioning(true);
            setTransitionDirection(direction);

            localStorage.setItem('themeMode', newMode);

            setTimeout(() => {
                setIsTransitioning(false);
                setTransitionDirection(null);
            }, 800); // Aumentar duración para evitar flickering

            return newMode;
        })
    }, [isTransitioning]);

    return (
        <AppThemeContext.Provider value={{
            mode,
            toggleTheme,
            isTransitioning,
            transitionDirection
        }}>
            {children}
        </AppThemeContext.Provider>
    )
}
