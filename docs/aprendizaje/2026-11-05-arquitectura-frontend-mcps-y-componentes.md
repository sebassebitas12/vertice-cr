# Arquitectura Frontend: Registries de Componentes (MCPs), Resets Nativos e IA In-Situ

- **Fecha:** 2026-11-05
- **Contexto:** Pruebas de interfaces reales (La Esquina y Vértice CR), auditoría visual con agentes y estandarización del motor de diseño.
- **Autor/Orquestador:** Sebastián

---

## 1. El Nuevo Paradigma: Bancos de Componentes y Registries para Agentes

En el desarrollo asistido por IA moderna, las "referencias" ya no son solo capturas estáticas o páginas de inspiración. Son **bancos de componentes con código real extraíble** que las IAs pueden buscar, descargar o adaptar mediante el protocolo MCP (**Model Context Protocol**):

* **21st.dev (`@21st-dev`):** Banco de componentes procedentes de reels de Instagram y TikTok curados para React, Tailwind y Motion (botones magnéticos, footers minimal outline, bento grids).
* **React Bits (`reactbits.dev`):** Ecosistema de efectos interactivos (Spotlight Card, Pill Nav, Specular Button). Se consume directamente vía registry de shadcn (`@react-bits`) o se adapta en CSS puro.
* **Magic UI (`@magicui`):** Componentes para interfaces vivas y landing pages (Interactive Hover Button con flecha, ripple effect).
* **Aceternity UI:** Patrones de interacción como Resizable Navbar y Sticky Scroll Reveal.
* **Codrops:** Efectos en CSS puro (como el botón Calypso) que funcionan en cualquier stack sin dependencias pesadas.

---

## 2. Decisión de Navegación: Pill Nav Sólido (Adiós a los Sidebars Aburridos)

* **Problema:** Los sidebars laterales tradicionales de 240px ocupan espacio horizontal crítico y hacen que todas las aplicaciones parezcan la misma plantilla genérica de administración de 2018.
* **Decisión:** Adoptar el **Header Flotante en Cápsula (Pill Nav)** centrado en la parte superior.
* **Regla de estilo aprobada por Sebastián:** **Superficie Mate Sólida**. Quedan descartadas las transparencias con desenfoques lechosos o *frosted-glass* inconsistentes. La cápsula usa un fondo sólido mate (`#181b22`), borde nítido con opacidad mínima (`border border-white/[0.08]`) y resplandor esmeralda para la pestaña activa.
* **Resultado:** El 100% del ancho de pantalla queda disponible para métricas en vivo, tablas densas y la terminal de punto de venta.

---

## 3. Reseteo Obligatorio de Controles Nativos en Temas Oscuros

Durante la auditoría visual se detectaron 3 fallos comunes que delatan a maquetas de IA no revisadas:
1. Popovers de `<input type="date">` abriendo calendarios blancos cegadores.
2. Menús `<select>` con fondo blanco y azul nativo de Windows al desplegarse.
3. Spinners/flechitas dobles grises en `input[type="number"]` (`::-webkit-inner-spin-button`).

**Solución estándar de ingeniería:**
* Declarar obligatoriamente `color-scheme: dark;` en `:root` del CSS global.
* Eliminar los spinners nativos con `-webkit-appearance: none; margin: 0;`.
* Aplicar filtro invertido (`filter: invert(0.8)`) al picker del calendario nativo.

---

## 4. IA Embebida In-Situ (Por qué los Chatbots Flotantes no Funcionan en Operación)

Los chatbots flotantes en la esquina inferior derecha estorban en interfaces operativas: tapan botones de acción, colisionan con modales y obligan al usuario a "conversar" en lugar de trabajar rápido.

**El estándar de IA In-Situ de Sebastián:**
* **Magic Bar de Autocompletado:** Un campo en la cabecera de creación donde se escribe el producto o se escanea el código, y la IA prellena nombre, categoría, unidad, SKU y precios de golpe.
* **Carga por Foto / OCR:** Subir la foto de la factura del proveedor para prellenar compras en borrador en 3 segundos.
* **Cobro Asistido en Caja:** Campo de texto libre/voz en el POS (*"2 cocas 2L y medio kilo de queso"*) que agrega directamente los ítems al carrito con su total.
