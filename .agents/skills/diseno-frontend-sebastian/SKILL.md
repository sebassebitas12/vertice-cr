---
name: diseno-frontend-sebastian
description: Sistema y dirección de arte universal de Sebastián para construir frontends limpios, modernos y con profundidad real en cualquier proyecto (entregas de backend, hackathons, SaaS o apps), evitando el aspecto genérico de plantilla hecha por IA, los huecos hundidos y la saturación de tarjetas. No es la identidad de ningún proyecto concreto; si el proyecto tiene su propia skill de diseño, esa manda en identidad visual.
---

# Diseño Frontend Universal — Estándar de Sebastián (Anti-plantilla IA)

Usa esta skill **siempre** que vayas a crear, rediseñar o pulir el frontend de cualquier proyecto de Sebastián. El objetivo es que nunca parezca una plantilla genérica generada por IA.

> Esta skill define **criterios**, no una marca. Colores, tipografías, efectos y contenidos concretos salen del proyecto (su brief, su libro de marca o su propia skill de diseño). No copies la identidad visual de otro proyecto.

---

## 1. Arquitectura Multipágina Real y Equilibrio Espacial (Anti-"One-Page IA")

Dos síntomas clásicos de un frontend básico hecho por IA son:
1. Meter toda la aplicación en una sola página larga donde el Navbar solo baja con `#anclas` (`#servicios`, `#contacto`).
2. Encerrar absolutamente todo en tarjetas flotantes (`card` dentro de `card`).

### Reglas obligatorias de arquitectura y navegación:
- **PROHIBIDO que los botones del Navbar bajen en la misma página (`#hash`):** Cada botón del Navbar debe navegar a **una página/ruta diferente e independiente** según las secciones reales del proyecto (por ejemplo `/`, `/listado`, `/listado/:id`, `/contacto`, `/cuenta`).
- **La Main Page (`/`) es un recorrido editorial curado, NO la aplicación entera:**
  - En la portada nunca se mete el listado completo con todos sus filtros ni formularios largos.
  - En su lugar, muestra una selección curada (por ejemplo: **3 tarjetas limpias de elementos destacados** que al tocarlas **navegan a su página de detalle**, más un enlace discreto tipo `"Ver todos"` que lleva al listado completo).
- **Equilibrio 70/30 en cada pantalla (No todo es una tarjeta):**
  - El **Navbar general**: el logo a la izquierda y el botón principal a la derecha van libres sobre el fondo; **solo** la cápsula central de navegación lleva superficie.
  - **Encabezados de sección, historias y citas**: van libres directamente sobre el fondo (`— Eyebrow corto`, titular grande con palabras clave en color acento, párrafo limpio).
  - **Cuándo SÍ usar tarjetas sobrias**: para colecciones de elementos navegables o comparables (destacados, planes, servicios, herramientas).

---

## 2. Superficies Mates (Cero Bordes de Color, Cero Huecos Hundidos, Cero Ladrillos Pesados)

- **Prohibidas las siluetas/bordes de línea (`border`) para separar tarjetas o botones:** No usar `border-white/15` ni bordes de color de `1px` alrededor de tarjetas, badges o botones.
- **Prohibidos los "huecos hundidos" (`inset` oscuros) y las sombras duras tipo ladrillo (`0 4px 0` / `0 6px 0`):** hacen que la interfaz se sienta pesada o desconectada del fondo.
- **Acabado mate:** tarjetas, botones e inputs usan superficies apenas más claras (en tema oscuro) o más oscuras (en tema claro) que el fondo, con un tono de hover ligeramente distinto, sombra ambiental muy sutil o nula y transición suave (`hover:-translate-y-0.5` o cambio de tono). La paleta concreta la define el proyecto.
- **Cero esquinas rectas a 90°:** Usar siempre curvas amables (`rounded-xl`, `rounded-2xl` o `rounded-full` en botones/píldoras).

---

## 3. Fondos con Ritmo Visual en el Hero

- **El Hero necesita profundidad y movimiento con intención**, elegidos según el proyecto: gradiente animado, shader WebGL, video, ilustración o fotografía con capas.
- **PROHIBIDO lo tieso y genérico:** ondas 2D dibujadas en `<canvas>` con `bezierCurveTo`, blobs de gradiente por defecto o fondos de cuadrícula/ruido sin propósito.
- **Transición a calma al hacer scroll:** el efecto vive **solo en el Hero**; el resto de la página usa un fondo limpio para que la vista descanse.
- Respetar `prefers-reduced-motion` y no penalizar el rendimiento (LCP/INP).

---

## 4. Elementos 3D (solo si el proyecto los pide)

- No agregar 3D por defecto. Úsalo cuando aporte (productos físicos, piezas, espacios).
- **PROHIBIDO fingir 3D con 2D/SVG o cargar mallas crudas llenas de triángulos ruidosos**; preferir geometría limpia y aristas nítidas.
- **Regla de oro de selección de modelo:** lo exhibido debe ser **algo deseable o útil, ligado al contenido real del proyecto**, nunca cajas vacías ni formas abstractas sin contexto.

---

## 5. Tipografía con Personalidad y Honestidad Funcional

- **Tipografía:** Cargar siempre fuentes web reales con carácter, acordes a la marca del proyecto, y verificar que ningún reset CSS las pise.
- **Jerarquía de títulos:** Usar palabras clave coloreadas con el acento dentro del mismo titular y un guion corto en color acento arriba (`— Eyebrow`), sin sombras negras duras detrás del texto.
- **Prohibidos los puntos/LEDs decorativos o textos falsos de "Conectado / Online":** Todo estado o indicador en pantalla debe corresponder a datos reales del backend.

---

## 6. Continuidad entre PCs (PC Principal de Casa ↔ Laptop del Curso)

Sebastián trabaja entre dos equipos (PC principal en casa y laptop en el curso):
1. Mantener siempre las skills en `.agents/skills/` dentro del repositorio actualizadas y sincronizadas con git.
2. Documentar cualquier cambio de esquema de base de datos, variables de entorno (`.env.example`) y estado de fases del proyecto en `docs/` antes de cerrar sesión y hacer `git push`.

## 7. Integridad visual de iconos, catálogos y menús

La revisión debe cubrir los datos reales del catálogo completo, no solo la primera tarjeta o una muestra pequeña.

- **Iconografía completa y reconocible:** cada producto, categoría, marca o entidad que se represente visualmente debe tener un icono o imagen intencional y coherente con su identidad. No dejar espacios vacíos, iconos rotos ni repetir un glifo genérico como sustituto para toda la colección. Cuando el catálogo crezca, asignar recursos usando una clave estable del registro; para elementos futuros sin imagen, usar una alternativa diseñada por categoría y mantenerla reconocible. Revisar todos los elementos disponibles y sus variantes.
- **Selectores terminados:** no dejar desplegables nativos con la presentación por defecto del navegador o del sistema operativo cuando rompan la identidad visual (por ejemplo, lista blanca/azul de Windows dentro de una aplicación oscura). El menú cerrado, abierto, la opción seleccionada, deshabilitada, vacía y filtrada deben tener estilos coherentes y legibles.
- **Accesibilidad del menú:** todo selector personalizado debe conservar etiqueta visible, foco perceptible, operación con teclado, cierre con Escape, selección entendible para lectores de pantalla y áreas de interacción cómodas. Su lista no debe quedar recortada por modales, contenedores con scroll o capas de la interfaz.
- **Inspección antes de entregar:** recorrer el catálogo completo o verificarlo con una auditoría automatizada, abrir los desplegables reales y revisar estados normal, abierto, búsqueda sin resultados y selección. Comprobar también formularios, diálogos y tamaños de pantalla representativos. Una compilación exitosa no sustituye esta revisión.
