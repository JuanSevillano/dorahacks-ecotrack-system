import { ReactNode, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useAppTheme } from './hook';
import { useMainTheme } from './create-theme';

interface SimpleThemeTransitionProps {
    children: ReactNode;
}

export const SimpleThemeTransition = ({ children }: SimpleThemeTransitionProps) => {
    const { isTransitioning, transitionDirection, mode } = useAppTheme() ?? {};
    const [showTransition, setShowTransition] = useState(false);

    const theme = useMainTheme(mode);
    const currentBackground = theme.palette.background.default;

    const previousBackground = transitionDirection === 'light-to-dark' ? '#f6f8f6' : '#112116';

    const fadeAnimation = useSpring({
        from: { opacity: 1 },
        to: {
            opacity: isTransitioning ? 0 : 1
        },
        config: {
            tension: 300,
            friction: 30,
            duration: 400
        }
    });

    const overlayAnimation = useSpring({
        from: {
            opacity: 0,
            scale: 1.1,
            backgroundColor: previousBackground
        },
        to: {
            opacity: isTransitioning ? 1 : 0,
            scale: isTransitioning ? 1 : 1.1,
            backgroundColor: isTransitioning ? currentBackground : previousBackground
        },
        config: {
            tension: 200,
            friction: 25,
            duration: 400
        }
    });

    useEffect(() => {
        if (isTransitioning) {
            setShowTransition(true);
            const timer = setTimeout(() => {
                setShowTransition(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <animated.div
                style={{
                    opacity: fadeAnimation.opacity,
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {children}
            </animated.div>
            {showTransition && (
                <animated.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: overlayAnimation.backgroundColor,
                        opacity: overlayAnimation.opacity,
                        transform: overlayAnimation.scale.to(scale => `scale(${scale})`),
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                />
            )}
        </div>
    );
};
