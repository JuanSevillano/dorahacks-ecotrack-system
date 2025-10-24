# Transición de Background Sincronizada

## 🎯 **Implementación de Transición de Background**

Se ha añadido una transición suave del `backgroundColor` que está perfectamente sincronizada con la animación de `opacity`.

### **Características Implementadas:**

1. **Sincronización Perfecta**: El cambio de background está sincronizado con el fade del contenido
2. **Colores del Tema**: Utiliza los colores exactos definidos en el tema (dark: `#112116`, light: `#f6f8f6`)
3. **Transición Suave**: El background cambia gradualmente durante la animación
4. **Timing Optimizado**: Misma duración y configuración que la animación de opacity

### **Configuración de Animación:**

```tsx
// Animación de fade del contenido
fadeAnimation: {
  tension: 300,
  friction: 30,
  duration: 400
}

// Animación de overlay con background
overlayAnimation: {
  tension: 200,
  friction: 25,
  duration: 600,
  backgroundColor: // Transición entre colores del tema
}
```

### **Flujo de Transición:**

1. **Inicio**: 
   - Contenido comienza a desvanecerse (opacity: 1 → 0)
   - Overlay aparece con el color del tema anterior

2. **Durante**:
   - El background del overlay transiciona del color anterior al nuevo
   - El contenido se desvanece completamente

3. **Final**:
   - El overlay se desvanece
   - El contenido reaparece con el nuevo tema aplicado

### **Colores Utilizados:**

- **Dark Mode**: `#112116` (darkBackground del tema)
- **Light Mode**: `#f6f8f6` (lightBackground del tema)

### **Beneficios:**

- ✅ **Sincronización perfecta** entre opacity y background
- ✅ **Colores consistentes** con el sistema de temas
- ✅ **Transición suave** sin cambios bruscos
- ✅ **Timing optimizado** para una experiencia fluida
- ✅ **Performance optimizada** usando React Spring

### **Resultado Visual:**

La transición ahora proporciona una experiencia visual coherente donde:
- El contenido se desvanece suavemente
- El background cambia gradualmente del color anterior al nuevo
- Todo está perfectamente sincronizado para una transición elegante
