import { ReactNode } from 'react';
import { useAppTheme } from './hook';
import { ThemeTransitionWrapper } from './ThemeTransitionWrapper';
import { ThemeMode } from './theme-context';

interface ThemeTransitionProviderProps {
    children: ReactNode;
}

export const ThemeTransitionProvider = ({ children }: ThemeTransitionProviderProps) => {
    const { isTransitioning, transitionDirection } = useAppTheme() ?? {};

    // Si no hay transición activa, renderizar normalmente
    if (!isTransitioning || !transitionDirection) {
        return <>{children}</>;
    }

    // Determinar el modo anterior basado en la dirección de transición
    const previousMode: ThemeMode = transitionDirection === 'light-to-dark' ? 'light' : 'dark';
    const newMode: ThemeMode = transitionDirection === 'light-to-dark' ? 'dark' : 'light';

    return (
        <ThemeTransitionWrapper
            currentMode={previousMode}
            newMode={newMode}
            transitionConfig={{
                duration: 800,
                glowIntensity: 0.6,
                glowRadius: 50,
                glowColor: '#17cf54'
            }}
        >
            {children}
        </ThemeTransitionWrapper>
    );
};
