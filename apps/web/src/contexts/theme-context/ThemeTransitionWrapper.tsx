import { ReactNode, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { useThemeTransition, ThemeTransitionConfig } from './useThemeTransition';
import { ThemeMode } from './theme-context';

interface ThemeTransitionWrapperProps {
    children: ReactNode;
    currentMode: ThemeMode;
    newMode: ThemeMode;
    onTransitionComplete?: () => void;
    transitionConfig?: ThemeTransitionConfig;
}

export const ThemeTransitionWrapper = ({
    children,
    currentMode,
    newMode,
    onTransitionComplete,
    transitionConfig
}: ThemeTransitionWrapperProps) => {
    const {
        isTransitioning,
        transitionDirection,
        glowAnimation,
        contentAnimation,
        startTransition
    } = useThemeTransition(transitionConfig);

    useEffect(() => {
        if (currentMode !== newMode) {
            startTransition(newMode, currentMode);
        }
    }, [currentMode, newMode, startTransition]);

    useEffect(() => {
        if (!isTransitioning && onTransitionComplete) {
            onTransitionComplete();
        }
    }, [isTransitioning, onTransitionComplete]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Contenido principal con fade */}
            <animated.div
                style={{
                    opacity: contentAnimation.opacity,
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {children}
            </animated.div>

            {/* Efecto de transición suave sin glow central */}
            {isTransitioning && (
                <animated.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: transitionDirection === 'light-to-dark'
                            ? 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                        opacity: glowAnimation.opacity,
                        zIndex: 9999,
                        pointerEvents: 'none',
                        transform: glowAnimation.scale.to(scale => `scale(${1 + (scale * 0.1)})`),
                    }}
                />
            )}

        </div>
    );
};
