# Dirección visual — Vértice CR

**Estado: propuesta en implementación, todavía no aprobada por Sebastián.** La página principal y la solicitud tienen una primera adaptación en código; falta revisar capturas en los tamaños acordados y recibir la evaluación visual. Este documento no convierte la propuesta en una decisión definitiva de marca.

## Objetivo

Probar una experiencia pública de Vértice con acabado de producto desplegable: catálogo y objeto protagonista inspirados en la claridad de N3D Melbourne, con una identidad propia para el taller. El resultado debe sentirse diseñado y útil, no como un dashboard genérico ni como una copia de N3D o de Tienda-de-Impresion3D.

## Referencias y evidencia

- [N3D Melbourne](https://www.n3dmelbourne.com/): referencia principal para jerarquía de producto, composición, catálogo y movimiento. Las cifras de estilo de la tabla siguiente proceden de una auditoría CSS que Sebastián aportó en esta conversación. No se pudieron volver a comprobar en esta ejecución porque el sitio devolvió acceso denegado.
- [Tailwind Admin React](https://react.tailwind-admin.com/): estándar de acabado que Sebastián señaló para paneles; no define la identidad de la portada pública.
- [Tailwind Admin gratuito para Next](https://github.com/Tailwind-Admin/free-tailwind-admin-dashboard-template): referencia técnica independiente para el área del taller. Se descargó y arrancó de forma aislada; las capturas de esa comparación aún no están archivadas.
- Los componentes de Codrops, Aceternity y ScrollX son fuentes de patrones puntuales. La adaptación actual es CSS/React propio; no se incorporó su paquete de componentes.

| Dato de N3D según auditoría aportada | Aproximación anotada | Decisión en Vértice |
|---|---:|---|
| Fondo oscuro neutro | `oklch(23.5% 0 0)` ≈ `#1c1c1c` | `#1c1c1c` |
| Superficie/tarjeta | `oklch(27.5% 0 0)` ≈ `#262626` | `#262626` |
| Naranja de acento | `oklch(68% .2 42)` | Naranja Vértice `#ff6a1f` |
| Ritmo de entrada | 8 px / 0.3 s, según auditoría | Entrada propia, escalonada y reducida si el usuario lo pide |
| Revelado de imagen | De abajo hacia arriba | Máscara por capas en la fotografía de producto de portada |

## Sistema visual de la propuesta

Tokens actuales en `experimentos/stack-mvp/frontend/app/globals.css`:

| Token | Oscuro | Claro |
|---|---|---|
| Fondo | `#1c1c1c` | `#f4f3f0` |
| Fondo secundario | `#212121` | `#eceae6` |
| Superficie | `#262626` | `#ffffff` |
| Superficie elevada | `#303030` | `#f0eeea` |
| Texto principal | `#f5f4f1` | `#141414` |
| Texto secundario | `#c9c7c2` | `#3d3d3b` |
| Texto atenuado | `#8d8b87` | `#6f6d69` |
| Acento | `#ff6a1f` | `#b94312` |

Tipografía: Geist para lectura y titulares; Geist Mono para etiquetas de materiales y datos. Se carga con `next/font/google` desde `app/layout.tsx`, con alternativas del sistema en CSS. Tema oscuro inicial y tema claro persistido en `localStorage` mediante el control de apariencia. El claro debe conservar contraste propio; no se limita a invertir colores.

Identidad del sitio: V de cinta plegada elegida por Sebastián para la prueba local, tipografía amplia y acento naranja. La V funciona como inicial del nombre; el resto de la dirección visual continúa en evaluación. Los bordes separan zonas cuando ayudan a leer; no se enmarca cada fragmento de texto en una tarjeta.

## Patrones elegidos para esta propuesta

| ID y referencia | Rasgo conservado | Adaptación local | Estado |
|---|---|---|---|
| [CTA-03 · Codrops Calypso](https://tympanus.net/Development/ButtonHoverStyles/) | Relleno circular y etiqueta que sale/reaparece | `.button-primary` en `app/globals.css` | Propuesto; falta revisión visual y teclado/touch |
| [NAV-04 · Aceternity Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) | Barra que se compacta al desplazarse | `components/site-header.tsx`, `components/motion-observer.tsx`, CSS del header | Adaptación propia; falta revisión en móvil |
| [CARD-01 · React Bits Spotlight Card](https://reactbits.dev/components/spotlight-card) | Luz localizada suave | `.product-card` y variables del puntero en `app/globals.css` / `components/motion-observer.tsx` | Adaptación CSS; candidato, no aprobación final |
| [FOOTER-02 · ScrollX UI](https://21st.dev/@scrollxui/components/footer-with-minimal-outline) | Nombre de marca delineado grande y columnas útiles | `components/site-footer.tsx`, `.footer-word` en `app/globals.css` | Adaptación de patrón; validar enlaces y escala |
| MOTION-01 · entrada de contenido | Aparición breve al entrar a la vista | `[data-reveal]` y `animation-timeline: view()` en `app/globals.css`; `components/motion-observer.tsx` solo controla scroll/puntero | Implementado con fallback visible; falta comprobar movimiento reducido |
| Motivo propio de capas FDM | Imagen que se revela de abajo arriba y líneas sutiles | `.print-reveal`, `.print-host`, `.layer-lines` en CSS | Implementado en portada; se usan fotos físicas con atribución y marcador neutro cuando no hay foto física |

## Orden de la portada

1. Navegación de Vértice, compacta al desplazarse y utilizable en móvil.
2. Hero de titular grande, dos acciones y fotografía de producto revelada por capas.
3. Cinta de materiales: son referencias, su pertinencia y disponibilidad se confirman al revisar una pieza.
4. Catálogo con búsqueda, filtros y tarjetas; las fichas no inventan precio ni existencia.
5. Proceso de tres pasos sin contenedor de tarjetas.
6. Llamada final a describir una necesidad.
7. Footer con enlaces funcionales y marca delineada.

La ruta `/solicitud` reutiliza tokens, tipografía, controles y tono. La persistencia temporal de la API demo debe aparecer como tal; el formulario no promete que el borrador esté guardado permanentemente.

## Movimiento y accesibilidad

- Curva principal: `cubic-bezier(.2,.8,.2,1)`.
- Entrada breve con CSS Scroll-driven Animations cuando están disponibles; si no, el contenido permanece visible. No se cambian clases/atributos de nodos React durante hidratación.
- Cinta pausada al pasar el puntero y estática con `prefers-reduced-motion`.
- Reveal por capas en fotografía disponible; marcador neutral para las fichas sin foto física. El texto alternativo y la etiqueta siguen visibles sin depender de la animación.
- Calypso solo en acciones principales; navegación disponible por teclado y tacto.
- Tema claro/oscuro con botón accesible y preferencia persistente.

## No aprobado o todavía pendiente

- La dirección completa, tamaños finales, imágenes y densidad no han sido aceptados por Sebastián.
- No hay aún evidencia guardada en 390, 768 y 1440 px ni una revisión visual completa de ambos temas.
- El lockup del sitio usa variantes PNG recortadas directamente de la referencia aprobada; el simbolo del CTA y el favicon provienen de la misma imagen. La identidad comercial final sigue abierta.
- La cinta lista familias mencionadas para la prueba; la disponibilidad real por pieza la debe confirmar el taller.
- No se añade escena 3D en esta etapa. El catálogo usa fotos físicas de la fuente atribuida cuando están disponibles y no presenta renders como fotografías.

## Historial

- 2026-10-13: se abrió el documento para centralizar criterios visuales.
- 2026-10-24: Sebastián compartió una auditoría de N3D y propuso la dirección “taller limpio”. Queda como propuesta para evaluar, no como aprobación. La primera implementación de IntersectionObserver provocó mismatch de hidratación; se sustituyó por reveal CSS con fallback visible.

## Logo provisional de la prueba (2026-10-24)

Sebastián aprobó el lockup de referencia `experimentos/brand/logo-exploration/approved-reference/vertice-lockup-approved.png`: una V naranja ancha con pliegue interior, seguida por “értice”. La V grande funciona como inicial. El sitio usa lockups PNG transparentes y un simbolo aislado, derivados directamente de la imagen aprobada para no sustituirla por un dibujo aproximado. La aprobación cubre el logo provisional de esta prueba, no la dirección visual completa ni la identidad comercial final.