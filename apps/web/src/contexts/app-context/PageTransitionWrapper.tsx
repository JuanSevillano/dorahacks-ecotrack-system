import { Suspense, ReactNode } from 'react';
import { animated } from '@react-spring/web';
import * as styles from './Page.css';
import { usePageTransition, PageTransitionConfig } from './usePageTransition';
import FullpageLoading from '../../components/FullpageLoading';

interface PageTransitionWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
    transitionConfig?: PageTransitionConfig;
}

export const PageTransitionWrapper = ({
    children,
    fallback = <FullpageLoading />,
    transitionConfig
}: PageTransitionWrapperProps) => {
    const transitions = usePageTransition(transitionConfig);

    return (
        <div className={styles.pageContainer}>
            {transitions((style, item) => (
                <animated.div
                    key={item.pathname}
                    style={style}
                >
                    <Suspense fallback={fallback}>
                        {children}
                    </Suspense>
                </animated.div>
            ))}
        </div>
    );
};
