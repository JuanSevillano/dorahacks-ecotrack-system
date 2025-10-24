import { useTransition } from '@react-spring/web';
import { useLocation } from 'react-router-dom';

export interface PageTransitionConfig {
    from?: {
        opacity?: number;
        transform?: string;
        filter?: string;
    };
    enter?: {
        opacity?: number;
        transform?: string;
        filter?: string;
    };
    leave?: {
        opacity?: number;
        transform?: string;
        filter?: string;
    };
    config?: {
        tension?: number;
        friction?: number;
        mass?: number;
    };
}

const defaultConfig: Required<PageTransitionConfig> = {
    from: {
        opacity: 0,
        transform: 'translateY(30px) scale(0.98)',
        filter: 'blur(4px)'
    },
    enter: {
        opacity: 1,
        transform: 'translateY(0px) scale(1)',
        filter: 'blur(0px)'
    },
    leave: {
        opacity: 0,
        transform: 'translateY(-30px) scale(1.02)',
        filter: 'blur(4px)'
    },
    config: {
        tension: 280,
        friction: 25,
        mass: 0.8
    }
};

export const usePageTransition = (customConfig?: PageTransitionConfig) => {
    const location = useLocation();

    const config = { ...defaultConfig, ...customConfig };

    return useTransition(location, {
        from: config.from,
        enter: config.enter,
        leave: config.leave,
        config: config.config
    });
};
