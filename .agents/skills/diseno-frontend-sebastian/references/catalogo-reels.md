# Banco de Componentes y Registries para Extracción de Código (Estándar Sebastián)

> **Instrucción para IAs (Codex, Antigravity, Claude):** 
> Este documento **NO es solo una galería de inspiración visual**; es un **catálogo de bancos de código y registries reales** de donde puedes extraer, instalar (vía MCPs) o adaptar componentes vivos de frontend para los proyectos de Sebastián (React Bits, Magic UI, 21st.dev, Aceternity UI, Motion Primitives, Codrops y Bits UI).

---

## 1. Fuentes de Extracción y Registries Compatibles

| Biblioteca / Banco | Stack Base | Cómo extraer o instalar con IA | Rasgos destacados que ofrece |
|---|---|---|---|
| **21st.dev** (`@21st-dev`) | React + Tailwind + Motion | MCP `21st-dev`: `npx 21st@latest add [nombre]` o buscar componente | El mayor catálogo de reels de Instagram/TikTok: footers gigantes, botones magnéticos, bento grids. |
| **Magic UI** (`@magicui`) | React + Tailwind + Motion | MCP `magicui` o `npx shadcn@latest add @magicui/[nombre]` | Animaciones de landing page, botón con relleno expansivo (CTA-01), ripple buttons, halos de luz. |
| **React Bits** (`reactbits.dev`) | React / CSS puro | Registry `npx shadcn@latest add @react-bits/[nombre]` o adaptación CSS | Botón con luz especular (CTA-02), Spotlight Card (CARD-01), Pill Nav (NAV-01), Tilted Card 3D. |
| **Aceternity UI** | React + Tailwind + Framer | Copiar componente de `ui.aceternity.com` o vía `21st.dev` | Resizable Navbar (NAV-04), Sticky Scroll Reveal (STORY-01), Stateful Button (ACTION-01). |
| **Motion Primitives** | React + Framer Motion | Repositorio `ibelick/motion-primitives` o vía shadcn | Morphing Dialog (PHOTO-01) para ampliación fluida de fotos, Transition Panel (DETAIL-01). |
| **Codrops** | HTML + CSS puro | Código CSS directo de `codrops/ButtonHoverStyles` | Efectos CSS sin dependencias pesadas: Calypso Button (CTA-03), líneas de hover. |
| **Bits UI / shadcn-svelte** | Svelte puro | `npx shadcn-svelte@latest add [component]` | Primitivas sin estilo impuestas para adaptar en Svelte sin romper la reactividad. |

---

## 2. Catálogo de Componentes Listos para Extraer

### A. Botones y Llamados a la Acción (CTAs)

#### 1. Botón con Relleno Expansivo y Flecha Entrante (CTA-01)
* **Origen:** Magic UI (`interactive-hover-button`)
* **Comando MCP / Extracción:** `npx shadcn@latest add @magicui/interactive-hover-button`
* **Comportamiento:** Círculo de acento que se expande cubriendo el botón mientras el texto se desliza y entra una flecha en su lugar.
* **Uso:** Botón primario de venta, checkout o cobro rápido.

#### 2. Botón con Luz Especular Metálica (CTA-02)
* **Origen:** React Bits (`specular-button`)
* **Extracción:** Componente React Bits con gradiente cónico y cálculo de ángulo de puntero.
* **Comportamiento:** Reflejo tenue que viaja por el borde simulando bisel metálico industrial.

#### 3. Botón Calypso en CSS Puro (CTA-03)
* **Origen:** Codrops (`button--calypso`)
* **Extracción:** CSS puro con pseudoelemento `::before` con escala circular y texto en `span` con `clip-path`. Cero dependencias de JS.

---

### B. Navegación y Encabezados

#### 1. Header Flotante en Cápsula Sólida (Pill Nav — Opción Elegida por Sebastián)
* **Origen:** Inspirado en React Bits (`pill-nav`) y Raycast Desktop.
* **Regla de Sebastián:** **SUPERFICIE SÓLIDA MATE (Cero transparencias raras o desenfoques lechosos)**.
* **Anatomía CSS Oficial:**
  ```css
  .pill-nav-solid {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    border-radius: 9999px;
    background: #181b22; /* Sólido mate, sin transparencia */
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  }
  .pill-nav-item {
    padding: 8px 18px;
    border-radius: 9999px;
    color: #a1a1aa;
    font-size: 13px;
    font-weight: 600;
    transition: all 160ms ease;
  }
  .pill-nav-item:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.04);
  }
  .pill-nav-item--active {
    color: #052e22;
    background: #10b981; /* Verde esmeralda o acento del proyecto */
  }
  ```

#### 2. Barra Compactable al Scrollear (Resizable Navbar / NAV-04)
* **Origen:** Aceternity UI (`resizable-navbar`)
* **Comando MCP:** `npx 21st@latest add resizable-navbar`
* **Comportamiento:** Pasa de barra de página completa a cápsula flotante compacta cuando el usuario hace scroll hacia abajo.

---

### C. Tarjetas y Superficies Interactivas

#### 1. Tarjeta con Foco de Luz Suave (Spotlight Card / CARD-01)
* **Origen:** React Bits (`spotlight-card`)
* **Comando MCP:** `npx 21st@latest add spotlight-card`
* **Comportamiento:** Luz radial sutil que acompaña al cursor en el borde sin comprometer la legibilidad del texto en reposo.

#### 2. Fotografía con Profundidad 3D (Tilted Card / CARD-02)
* **Origen:** React Bits (`tilted-card`)
* **Comportamiento:** Perspectiva CSS 3D (`rotateX`, `rotateY`) para imágenes editoriales destacadas.

---

### D. Diálogos y Modales (Reemplazo Oficial de Cajones Laterales)

#### 1. Modal Centrado de Doble Columna (Command Dialog)
* **Origen:** Estándar Linear / Stripe.
* **Comportamiento:** Modal centrado flotante (`max-w-2xl w-full rounded-2xl bg-[#181b22] border border-white/[0.08] shadow-2xl`), con backdrop oscuro limpio, dividido en 2 columnas lógicas y barra fija de botones de acción al pie. Elimina el scroll apretado de los cajones laterales.

---

### E. Footers de Cierre

#### 1. Footer con Gran Marca Delineada (ScrollX Minimal Outline / FOOTER-02)
* **Origen:** ScrollX UI en 21st.dev (`footer-with-minimal-outline`)
* **Comando MCP:** `npx 21st@latest add footer-with-minimal-outline`
* **Comportamiento:** Columnas limpias y tipografía de marca gigante en trazo delineado (`stroke-only`) al final de la página.
