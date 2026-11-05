---
name: motion-emil
description: Reglas y estándares de animación de Emil Kowalski (ex-Vercel y Linear) para interfaces web fluidas, orgánicas y profesionales. Úsala para crear o revisar transiciones, microinteracciones, curvas cubic-bezier, aperturas de modales y evitar animaciones lentas o deformes.
---

# Reglas de Animación y Motion — Estándar Emil Kowalski

Esta skill prescribe cómo animar componentes e interfaces web para que se sientan instantáneas, táctiles y de nivel comercial (Apple, Vercel, Linear).

---

## 1. Las 4 Leyes Fundamentales

1. **Duración Máxima de 300ms para Microinteracciones:**
   - Clics, toggles, pestañas, acordeones y botones: **150ms a 220ms**.
   - Apertura de modales, drawers laterales y vistas completas: **250ms a 320ms**.
   - Toda animación que supere 400ms en una interfaz de trabajo genera sensación de lentitud y frustración.

2. **Cero `ease-in` en Elementos que Entran a Pantalla:**
   - ❌ *Prohibido:* Usar `ease-in` o `transition: all 0.3s ease` por defecto. Hace que el elemento empiece lento y choque al final.
   - ✅ *Regla:* Los elementos que entran deben arrancar rápido y frenar suavemente (**ease-out**):
     - `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo: la curva dorada de Linear).
     - `cubic-bezier(0.25, 1, 0.5, 1)` (Out-Quart: entrada ágil y elegante).

3. **Anima Exclusivamente `transform` y `opacity`:**
   - ❌ *Prohibido:* Animar `width`, `height`, `top`, `left`, `margin` o `padding` (fuerzan recálculo de geometría en CPU y provocan tirones a 30fps).
   - ✅ *Regla:* Usa `transform: translateY(...)`, `scale(...)` y `opacity`. Si requieres animar altura, usa `grid-template-rows: 0fr -> 1fr` con CSS moderno o Radix/Motion.

4. **Disciplina de Origen (`transform-origin`):**
   - Todo elemento debe emerger desde su punto de anclaje lógico:
     - Un dropdown que baja: `origin-top`.
     - Un tooltip sobre un botón: `origin-bottom`.
     - Un modal centrado: `origin-center` con escala suave (`scale-95 -> scale-100`).

---

## 2. Token de Curvas y CSS Listo

```css
:root {
  /* Curva estándar de entrada (rápida, freno orgánico) */
  --ease-out-linear: cubic-bezier(0.16, 1, 0.3, 1);
  /* Curva de rebote sutil / resorte contenido */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Modal o Drawer estándar */
.modal-enter {
  animation: modalEnter 240ms var(--ease-out-linear) forwards;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Respeto estricto a accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

