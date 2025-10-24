# Sistema de Transiciones de Tema

Este sistema proporciona transiciones suaves entre light mode y dark mode con un efecto "Growing Glow" usando React Spring.

## 🎯 **Componentes Implementados**

### **1. `useThemeTransition` Hook**
Hook personalizado para manejar las animaciones de transición de tema.

```tsx
import { useThemeTransition } from './useThemeTransition';

const MyComponent = () => {
  const {
    isTransitioning,
    transitionDirection,
    glowAnimation,
    contentAnimation,
    startTransition
  } = useThemeTransition({
    duration: 600,
    glowIntensity: 0.8,
    glowRadius: 120,
    glowColor: '#17cf54'
  });
  
  // Usar las animaciones...
};
```

### **2. `ThemeTransitionWrapper` Component**
Wrapper que proporciona el efecto visual de transición.

```tsx
import { ThemeTransitionWrapper } from './ThemeTransitionWrapper';

<ThemeTransitionWrapper
  currentMode="light"
  newMode="dark"
  transitionConfig={{
    duration: 600,
    glowIntensity: 0.8,
    glowRadius: 120,
    glowColor: '#17cf54'
  }}
>
  <YourContent />
</ThemeTransitionWrapper>
```

### **3. `ThemeTransitionProvider` Component**
Provider que integra automáticamente las transiciones en toda la aplicación.

```tsx
import { ThemeTransitionProvider } from './ThemeTransitionProvider';

<UIThemeProvider>
  <ThemeTransitionProvider>
    <YourApp />
  </ThemeTransitionProvider>
</UIThemeProvider>
```

## 🎨 **Efectos Visuales**

### **Growing Glow Effect**
- **Glow que crece**: Un efecto de resplandor que se expande desde el centro de la pantalla
- **Fade del contenido**: El contenido se desvanece suavemente durante la transición
- **Overlay de transición**: Un overlay sutil que indica el cambio de tema
- **Color personalizable**: El color del glow se puede personalizar

### **Configuración de Transición**
```tsx
interface ThemeTransitionConfig {
  duration?: number;        // Duración en ms (default: 600)
  glowIntensity?: number;   // Intensidad del glow (default: 0.8)
  glowRadius?: number;      // Radio del glow (default: 100)
  glowColor?: string;       // Color del glow (default: '#17cf54')
}
```

## 🚀 **Integración Automática**

El sistema está integrado automáticamente en `App.tsx`:

```tsx
<UIThemeProvider>
  <ThemeTransitionProvider>
    <Layout>
      <AppRoutes />
    </Layout>
  </ThemeTransitionProvider>
</UIThemeProvider>
```

## 🎯 **Uso del Theme Switch**

El `ThemeSwitch` existente ahora activa automáticamente las transiciones:

```tsx
// En AppBar.tsx - ya está integrado
<ThemeSwitch mode={mode} toggleTheme={toggleTheme} />
```

## ⚡ **Características**

- ✅ **Transición automática**: Se activa al cambiar el tema
- ✅ **Efecto Growing Glow**: Resplandor que crece desde el centro
- ✅ **Fade suave**: El contenido se desvanece durante la transición
- ✅ **Configuración flexible**: Parámetros personalizables
- ✅ **Performance optimizada**: Usando React Spring para animaciones fluidas
- ✅ **TypeScript completo**: Tipado completo para todas las configuraciones

## 🔧 **Personalización Avanzada**

### **Configuración Personalizada**
```tsx
const customConfig = {
  duration: 800,
  glowIntensity: 1.0,
  glowRadius: 150,
  glowColor: '#ff6b6b'
};

<ThemeTransitionWrapper transitionConfig={customConfig}>
  <YourContent />
</ThemeTransitionWrapper>
```

### **Hook Personalizado**
```tsx
const MyComponent = () => {
  const { isTransitioning, glowAnimation } = useThemeTransition({
    duration: 400,
    glowColor: '#your-color'
  });
  
  return (
    <animated.div style={glowAnimation}>
      {/* Tu contenido */}
    </animated.div>
  );
};
```

## 🎨 **Efectos Visuales Detallados**

1. **Inicio de Transición**:
   - El contenido comienza a desvanecerse
   - Un glow verde aparece en el centro
   - El overlay de transición se activa

2. **Durante la Transición**:
   - El glow crece desde el centro hacia afuera
   - El contenido se desvanece completamente
   - Los colores del tema cambian

3. **Final de Transición**:
   - El glow se desvanece
   - El contenido reaparece con el nuevo tema
   - El overlay se desvanece

## 🚀 **Rendimiento**

- **Optimizado para 60fps**: Animaciones fluidas usando React Spring
- **GPU acelerado**: Usando `transform` y `opacity` para mejor rendimiento
- **Memoria eficiente**: Limpieza automática de animaciones
- **Responsive**: Funciona en todos los tamaños de pantalla
