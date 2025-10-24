import React, { Suspense } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useLocation } from 'react-router-dom';
import * as styles from './Page.css';
import FullpageLoading from '../../components/FullpageLoading';

interface PageProps {
    title: string;
    children: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
    const location = useLocation();

    const transitions = useTransition(location, {
        from: {
            opacity: 0,
            transform: 'translateY(20px)',
        },
        enter: {
            opacity: 1,
            transform: 'translateY(0px)',
        },
        leave: {
            opacity: 0,
            transform: 'translateY(-20px)',
        },
        config: {
            tension: 300,
            friction: 30
        }
    });

    return (
        <div className={styles.pageContainer}>
            {transitions((style, item) => (
                <animated.div
                    key={item.pathname}
                    style={style}
                >
                    <Suspense fallback={<FullpageLoading />}>
                        {children}
                    </Suspense>
                </animated.div>
            ))}
        </div>
    );
};
