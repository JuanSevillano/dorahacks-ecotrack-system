# Sistema de Transiciones de Página

Este sistema proporciona transiciones suaves entre páginas usando React Spring y Suspense, optimizado para tanto la web pública como la aplicación móvil.

## Componentes Principales

### `Page`
El componente principal que envuelve todas las páginas de la aplicación.

```tsx
import { Page } from '../contexts/app-context/Page';

export const MiPagina = () => {
  return (
    <Page title="Mi Página">
      <div>Contenido de la página</div>
    </Page>
  );
};
```

### `PageTransitionWrapper`
Wrapper avanzado para transiciones personalizadas.

```tsx
import { PageTransitionWrapper } from '../contexts/app-context/PageTransitionWrapper';

export const MiPaginaConTransicion = () => {
  return (
    <PageTransitionWrapper>
      <div>Contenido con transición personalizada</div>
    </PageTransitionWrapper>
  );
};
```

### `usePageTransition`
Hook personalizado para manejar transiciones.

```tsx
import { usePageTransition } from '../contexts/app-context/usePageTransition';

const MiComponente = () => {
  const transitions = usePageTransition({
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' }
  });
  
  return (
    <div>
      {transitions((style, item) => (
        <animated.div key={item.pathname} style={style}>
          Contenido animado
        </animated.div>
      ))}
    </div>
  );
};
```

## Configuraciones de Transición Predefinidas

### Transición Suave
```tsx
import { PageWithCustomTransition } from '../contexts/app-context/PageTransitionExamples';

<PageWithCustomTransition transitionType="smooth">
  <div>Contenido con transición suave</div>
</PageWithCustomTransition>
```

### Transición Rápida
```tsx
<PageWithCustomTransition transitionType="fast">
  <div>Contenido con transición rápida</div>
</PageWithCustomTransition>
```

### Transición con Escala
```tsx
<PageWithCustomTransition transitionType="scale">
  <div>Contenido con transición de escala</div>
</PageWithCustomTransition>
```

## Configuración Personalizada

```tsx
const customConfig = {
  from: {
    opacity: 0,
    transform: 'translateX(50px) scale(0.9)',
    filter: 'blur(4px)'
  },
  enter: {
    opacity: 1,
    transform: 'translateX(0px) scale(1)',
    filter: 'blur(0px)'
  },
  leave: {
    opacity: 0,
    transform: 'translateX(-50px) scale(1.1)',
    filter: 'blur(4px)'
  },
  config: {
    tension: 300,
    friction: 25,
    mass: 0.8
  }
};

<PageTransitionWrapper transitionConfig={customConfig}>
  <div>Contenido con transición personalizada</div>
</PageTransitionWrapper>
```

## Características

- ✅ **Suspense integrado**: Manejo automático de estados de carga
- ✅ **Transiciones suaves**: Animaciones fluidas entre páginas
- ✅ **Configuración flexible**: Transiciones personalizables
- ✅ **Optimizado para móvil**: Compatible con Capacitor
- ✅ **Vanilla Extract**: Estilos optimizados y tipados
- ✅ **TypeScript**: Completamente tipado

## Estilos CSS

Los estilos están definidos en `Page.css.ts` usando Vanilla Extract:

- `pageContainer`: Contenedor principal de la página
- `pageContent`: Contenido de la página con optimizaciones de rendimiento
- `pageTransition`: Estilos para las transiciones

## Integración con Router

El sistema está optimizado para trabajar con React Router. El Suspense se maneja a nivel de página para evitar conflictos con el router principal.

## Rendimiento

- Las transiciones usan `will-change` para optimización del GPU
- Las animaciones están optimizadas para 60fps
- El sistema de Suspense evita renders innecesarios
- Compatible con lazy loading de componentes
