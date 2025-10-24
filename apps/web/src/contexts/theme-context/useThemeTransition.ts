import { useSpring } from '@react-spring/web';
import { useCallback, useState } from 'react';
import { ThemeMode } from './theme-context';

export interface ThemeTransitionConfig {
    duration?: number;
    glowIntensity?: number;
    glowRadius?: number;
    glowColor?: string;
}

export const useThemeTransition = (config?: ThemeTransitionConfig) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'light-to-dark' | 'dark-to-light' | null>(null);

    const defaultConfig: Required<ThemeTransitionConfig> = {
        duration: 800,
        glowIntensity: 0.6,
        glowRadius: 50,
        glowColor: '#17cf54' // Color primario de la app
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Animación suave de fade para el contenido
    const contentAnimation = useSpring({
        from: {
            opacity: 1,
        },
        to: {
            opacity: isTransitioning ? 0.1 : 1,
        },
        config: {
            tension: 400,
            friction: 40,
            duration: finalConfig.duration / 3
        }
    });

    // Animación suave de overlay
    const glowAnimation = useSpring({
        from: {
            scale: 0.8,
            opacity: 0,
        },
        to: {
            scale: isTransitioning ? 1 : 0.8,
            opacity: isTransitioning ? finalConfig.glowIntensity : 0,
        },
        config: {
            tension: 300,
            friction: 35,
            duration: finalConfig.duration
        }
    });

    const startTransition = useCallback((_: ThemeMode, currentMode: ThemeMode) => {
        // Prevenir múltiples transiciones
        if (isTransitioning) return;

        const direction = currentMode === 'light' ? 'light-to-dark' : 'dark-to-light';
        setTransitionDirection(direction);
        setIsTransitioning(true);

        // Resetear la transición después de completarse
        setTimeout(() => {
            setIsTransitioning(false);
            setTransitionDirection(null);
        }, finalConfig.duration);
    }, [finalConfig.duration, isTransitioning]);

    return {
        isTransitioning,
        transitionDirection,
        glowAnimation,
        contentAnimation,
        startTransition,
        config: finalConfig
    };
};
