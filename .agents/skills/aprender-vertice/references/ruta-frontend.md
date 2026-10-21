# Ruta de dominio del front end

Stack objetivo: **TypeScript + Next.js (App Router) + Tailwind CSS v4**, con formularios validados (React Hook Form + Zod) y Supabase u otro backend según el curso.

Cómo marcar el progreso (solo cuando Sebastián lo demuestre):

- `[ ]` no visto
- `[~]` visto, lo hizo con ayuda
- `[x]` lo hizo solo **y** lo puede explicar con sus palabras

Base que ya tiene: React, componentes, hooks, React Router, pruebas con Jest y Testing Library.

## Registro del Laboratorio 2

**Estado: estudiado y practicado según declaración** · Registro: 2026-10-21

- React con Vite y React Router para separar catálogo, órdenes y dashboard.
- Capa de servicios para centralizar peticiones HTTP.
- Hook reutilizable para carga, datos, errores y recarga.
- Formularios controlados y presentación de errores `400` y `409` del backend.
- Consumo de métricas calculadas por SQL.
- Integración de React con un webhook n8n mediante `{ ok, data, error }`.

Este registro corresponde a un laboratorio académico con React + Vite. No cambia el stack frontend objetivo de Vértice hasta que exista una decisión posterior.

## 1. TypeScript básico
- [ ] Tipos primitivos, uniones y `null`/`undefined`
- [ ] `interface` y `type` para objetos
- [ ] Props de componentes tipadas
- [ ] Tipar respuestas de API y estados
- [ ] Leer un error de TypeScript sin entrar en pánico

## 2. Tailwind y sistema visual
- [ ] Clases utilitarias y responsive (`sm:`, `md:`, `lg:`)
- [ ] Tokens de diseño (colores, espaciado, tipografía) definidos una sola vez
- [ ] Sistema de superficies (niveles de fondo y cuándo usar cada uno)
- [ ] Modo claro/oscuro si la dirección de arte lo pide
- [ ] Cuándo extraer un componente en vez de repetir clases

## 3. Next.js
- [ ] Rutas por carpetas y `layout.tsx`
- [ ] Componentes de servidor vs componentes de cliente (`"use client"`)
- [ ] Carga de datos en el servidor
- [ ] Rutas dinámicas (`/productos/[slug]`)
- [ ] Metadatos y SEO básico
- [ ] Manejo de carga y errores (`loading`, `error`)
- [ ] Server Actions o rutas de API (según el curso de backend)

## 4. Formularios y validación
- [ ] Formularios controlados vs no controlados
- [ ] React Hook Form
- [ ] Esquemas con Zod, compartidos entre cliente y servidor
- [ ] Mensajes de error accesibles

## 5. Autenticación en la interfaz
- [ ] Flujo de registro y login
- [ ] Sesión y rutas protegidas
- [ ] Roles (cliente vs admin) en la interfaz
- [ ] Qué nunca se confía al cliente

## 6. Archivos y cotización
- [ ] Subida de archivos con validación de tipo y tamaño
- [ ] Mostrar progreso y errores de subida
- [ ] Visor 3D (para el archivo del cliente y las piezas del catálogo)

## 7. Calidad
- [ ] Pruebas de componentes y de flujos
- [ ] Accesibilidad: teclado, foco, contraste, etiquetas
- [ ] Rendimiento: imágenes, carga diferida, `next/image`
- [ ] Revisión visual de coherencia entre pantallas

## Registro

Anota aquí, con fecha, cada vez que un tema cambie de estado:

- (vacío)

