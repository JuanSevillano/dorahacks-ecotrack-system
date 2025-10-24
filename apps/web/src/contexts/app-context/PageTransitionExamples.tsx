import React from 'react';
import { PageTransitionWrapper } from './PageTransitionWrapper';
import { PageTransitionConfig } from './usePageTransition';

// Ejemplo de configuración de transición suave
const smoothTransitionConfig: PageTransitionConfig = {
    from: {
        opacity: 0,
        transform: 'translateY(20px)',
        filter: 'blur(2px)'
    },
    enter: {
        opacity: 1,
        transform: 'translateY(0px)',
        filter: 'blur(0px)'
    },
    leave: {
        opacity: 0,
        transform: 'translateY(-20px)',
        filter: 'blur(2px)'
    },
    config: {
        tension: 300,
        friction: 30,
        mass: 1
    }
};

// Ejemplo de configuración de transición rápida
const fastTransitionConfig: PageTransitionConfig = {
    from: {
        opacity: 0,
        transform: 'translateX(50px)'
    },
    enter: {
        opacity: 1,
        transform: 'translateX(0px)'
    },
    leave: {
        opacity: 0,
        transform: 'translateX(-50px)'
    },
    config: {
        tension: 400,
        friction: 20,
        mass: 0.5
    }
};

// Ejemplo de configuración de transición con escala
const scaleTransitionConfig: PageTransitionConfig = {
    from: {
        opacity: 0,
        transform: 'scale(0.9) rotate(2deg)'
    },
    enter: {
        opacity: 1,
        transform: 'scale(1) rotate(0deg)'
    },
    leave: {
        opacity: 0,
        transform: 'scale(1.1) rotate(-2deg)'
    },
    config: {
        tension: 250,
        friction: 35,
        mass: 0.8
    }
};

interface PageWithCustomTransitionProps {
    children: React.ReactNode;
    transitionType?: 'smooth' | 'fast' | 'scale' | 'default';
}

export const PageWithCustomTransition = ({
    children,
    transitionType = 'default'
}: PageWithCustomTransitionProps) => {
    const getTransitionConfig = (): PageTransitionConfig | undefined => {
        switch (transitionType) {
            case 'smooth':
                return smoothTransitionConfig;
            case 'fast':
                return fastTransitionConfig;
            case 'scale':
                return scaleTransitionConfig;
            default:
                return undefined; // Usar configuración por defecto
        }
    };

    return (
        <PageTransitionWrapper transitionConfig={getTransitionConfig()}>
            {children}
        </PageTransitionWrapper>
    );
};

// Ejemplos de uso:
/*
// Uso básico (transición por defecto)
<Page title="Mi Página">
  <div>Contenido de la página</div>
</Page>

// Uso con transición personalizada
<PageWithCustomTransition transitionType="smooth">
  <div>Contenido con transición suave</div>
</PageWithCustomTransition>

// Uso directo del wrapper con configuración personalizada
<PageTransitionWrapper 
  transitionConfig={{
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
    config: { tension: 200, friction: 25 }
  }}
>
  <div>Contenido con transición personalizada</div>
</PageTransitionWrapper>
*/
