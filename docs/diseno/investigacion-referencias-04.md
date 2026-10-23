# Referencias del documento 04: selección para el MVP

Fecha: 2026-10-23. Investigación, no instalación ni aprobación de componentes.

## Encargo y evidencia

Sebastián pidió recuperar lo mejor de sus repositorios y enlaces del [documento 04, Pruebas](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/Pruebas/docs/04-DISENO-VISUAL-Y-ACCESIBILIDAD.md), y buscar componentes concretos para evitar que “hazlo atractivo” termine en controles genéricos. Fuente recuperada con blob `ef85f3adb93c83e688f8804c13f3310c507d43e7`: 112 URL únicas tras retirar duplicados exactos y marcas de cita.

Se revisó su directorio maestro y sus apartados de microinteracciones, acceso, navegación y animación. Se contrastaron repositorios originales, documentación actual y ejemplos seleccionados. No se validó cada uno de los 112 enlaces ni todas las afirmaciones históricas. Las antiguas auditorías, restricciones de HF-01 y comparaciones de competidores no se convierten en reglas del nuevo producto.

La prueba en curso elegida por Sebastián es **SvelteKit**, en otro chat. Next.js sigue como alternativa recomendada anterior, no como implementación definitiva. Esta investigación no cambia archivos de esa prueba ni instala skills o paquetes.

## Selección principal

1. **shadcn-svelte / Bits UI**: comportamiento y controles de la prueba Svelte.
2. **React Bits**: referencias concretas de identidad y movimiento; requiere adaptación, no pegar JSX.
3. **Magic UI**: candidato de CTA con comportamiento bien definido.
4. **Codrops**: efectos CSS que se pueden estudiar sin depender de React.
5. **DESIGN.md + Impeccable + Emil Kowalski**: memoria de decisiones, criterio visual y revisión de movimiento, con roles separados.
6. **N3D + Navbar Gallery + Siteinspire**: composición, presentación de producto y navegación. La referencia principal de identidad sigue siendo la combinación elegida para Vértice.

Selección ejecutable de candidatos: [catálogo de componentes](componentes-candidatos-mvp.md).

## 1. Repositorios de criterio y continuidad

| Fuente original | Qué se comprobó | Qué rescatar | Decisión |
|---|---|---|---|
| [Google design.md](https://github.com/google-labs-code/design.md) | Define un formato con tokens y razones de diseño para agentes. | Un documento propio con valores, componentes, referencias y motivos. | Prioritario como formato; no es obligatorio instalar su CLI. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Describe instrucciones y comandos de dirección/revisión visual, con contexto de producto separado del diseño. | Preguntar por vacíos materiales, comparar con el brief, revisar jerarquía, ritmo y acabado. | Candidato principal de apoyo visual; no instalado ni evaluado ejecutándolo. |
| [Emil Kowalski / skills](https://github.com/emilkowalski/skills) | README enlaza animate, review-animations, improve-animations y animation-vocabulary, entre otros. | Expresar y revisar duración, curva, interrupción, gestos y propósito. | Prioritario para movimiento. No invocar todos los módulos a la vez. |
| [senlindesign / taste-skill](https://github.com/senlindesign/taste-skill) | Extrae tokens y explica decisiones a partir de un sitio; documenta dependencias de navegador. | Analizar por qué una referencia funciona, sin limitarse a copiar colores. | Útil en investigación de una referencia concreta; no instalado. |
| [Leonxlnx / taste-skill](https://github.com/Leonxlnx/taste-skill) | Plantea dirección de arte, imágenes y comprobación en navegador. | Una composición deliberada y comparación con el resultado real. | Alternativa de dirección visual, no segundo director simultáneo. |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Tiene un catálogo amplio de criterios y estilos para varios frameworks. | Consulta puntual de tablas, formularios o jerarquía cuando hay un problema. | Reserva; sus presets no sustituyen la identidad elegida. |
| [VoltAgent awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Colección de análisis de sistemas de otros sitios. | Ejemplos de cómo documentar patrones. | Consulta; no copiar un DESIGN.md ajeno como identidad Vértice. |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | Procesos y plantillas para llevar especificación a planificación y resultados. | Objetivo → alcance → tarea → aceptación → cierre. | Aplicar esa estructura mínima; el toolkit completo no es requisito de esta prueba. |
| [Stop Slop](https://github.com/hardikpandya/stop-slop) | Su README trata patrones de prosa generada. | Claridad de textos, etiquetas y mensajes. | Corregir la clasificación anterior: no es biblioteca ni auditor visual. |
| [Humanizer](https://github.com/blader/humanizer) | Edita prosa para lectores humanos. | Textos concretos, sin promesas o frases vacías. | Opcional para copy; no determina el diseño. |
| [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Existe como skill dentro del repositorio original. | Referencia adicional de dirección visual. | No hace falta acumularlo con varias skills equivalentes; revisar contenido y términos antes de adoptarlo. |
| [Web Interface Guidelines](https://vercel.com/design/guidelines) | Lista criterios de interacción, foco y estados, con reglas generales y algunas específicas de React. | Lista de revisión adaptada al contexto. | Usar con criterio; W3C es la fuente para patrones accesibles. |

No se instaló ni ejecutó ninguno de esos repositorios. La recomendación evalúa su enfoque documentado, no demuestra que una skill consiga mejores resultados con Luna. Un archivo DESIGN.md no garantiza que el agente lo lea: AGENTS.md y la tarea deben señalarlo.

**Propuesta de proceso:** una guía visual principal, una revisión de movimiento y una lista de aceptación. Evitar cinco instrucciones de estilo compitiendo por la misma pantalla.

## 2. Bibliotecas y compatibilidad

| Fuente | Prueba Svelte | Si después elegimos Next/React | Uso propuesto |
|---|---|---|---|
| [shadcn/ui](https://ui.shadcn.com/) | Sus componentes React no se importan directamente. Usar [shadcn-svelte](https://www.shadcn-svelte.com/docs). | Base compatible con React. | Control, estados y composición; personalizar aspecto. |
| [Bits UI](https://www.bits-ui.com/docs/introduction) | Primitivas Svelte sin imponer el estilo. | No es una biblioteca React. | Base del ecosistema shadcn-svelte; no confundir con React Bits. |
| [React Bits](https://reactbits.dev/get-started/introduction) | Referencia visual o adaptación explícita. | Variantes JS/TS y CSS/Tailwind disponibles. | Pill Nav, Specular Button, Spotlight Card y Tilted Card como candidatos. |
| [Magic UI](https://magicui.design/docs/components/interactive-hover-button) | Rehacer el patrón en Svelte conservando comportamiento y atribuciones si se adapta código. | Sus ejemplos son React. | CTA con relleno que crece y flecha que entra. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | No importar componentes React. | Referencia/implementación React según versión. | Selección animada en listas. Documentación web devolvió 403; se consultó README/licencia del repo. |
| [Aceternity UI](https://ui.aceternity.com/components/stateful-button) | Patrón y adaptación, no copia directa. | Componentes React; verificar dependencias del seleccionado. | Estados de envío y una sección narrativa como exploración posterior. |
| [Radix](https://www.radix-ui.com/primitives/docs/overview/introduction), [Base UI](https://base-ui.com/react/overview/about), [React Aria](https://react-aria.adobe.com/) | Referencias de comportamiento, no dependencias de Svelte. | Elegir una base coherente por componente, sin mezclar primitivas innecesariamente. | Diálogos, foco, menús y selección. |
| [21st.dev](https://21st.dev/) | Catálogo para descubrir; validar cada autor y stack. | También requiere validar cada pieza. | Reserva para huecos concretos; no elegí aún una pieza verificable para Vértice. |
| [Vercel AI Elements](https://github.com/vercel/ai-elements) | No asumir integración directa. | Evaluar si el frontend y contrato de IA lo justifican. | Referencia de estados de conversación; no añadir SDK ni cambiar n8n por una galería. |

Corrección importante: compartir Tailwind o TypeScript no hace que un componente React sea compatible con Svelte.

### Movimiento

- [Svelte transition](https://svelte.dev/docs/svelte/svelte-transition) y [Svelte motion](https://svelte.dev/docs/svelte/svelte-motion): primera opción para entradas, salidas y resortes sencillos.
- [Motion para Svelte](https://motion.dev/docs/svelte): documentación actual de uso mediante attachments; indica versiones mínimas para esos ejemplos. Es una vía real para gestos y scroll; no confundir con importar motion/react en Svelte.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): candidato para la futura narrativa ligada al desplazamiento, al existir escena y recurso aprobado.
- [Anime.js](https://animejs.com/documentation/): motor alternativo; no hay necesidad demostrada de añadirlo junto a otro motor.
- [React Spring](https://www.react-spring.dev/): mantener como alternativa React; no incorporarlo a la prueba Svelte.

No se decide el motor de la escena 3D hasta tener modelo o secuencia y probar su funcionamiento. Tampoco se atribuye a N3D un motor deducido de su apariencia.

## 3. Galerías: dónde buscar y dónde dejar de buscar

| Fuente del 04 | Uso en Vértice | Resultado de esta pasada |
|---|---|---|
| [Navbar Gallery](https://www.navbar.gallery/type/dropdowns) | Comparar contenido y tamaño de desplegables. | Catálogo público comprobado; fuente secundaria de navegación. |
| [Siteinspire](https://www.siteinspire.com/) | Composición de comercio, producto y fotografía. | Categorías de ecommerce, minimalismo y grillas disponibles. |
| [Godly](https://godly.design/) | Una sección protagonista con carácter. | Galería comprobada. No convertir cada efecto de portada en componente global. |
| [Land-book](https://land-book.com/) | Separación de secciones y ritmo de página. | Catálogo con filtros de producto físico, ecommerce y estilo. |
| [Refero Styles](https://styles.refero.design/) | Observar y describir sistemas visuales. | Ofrece ejemplos y DESIGN.md; no prueba funcionamiento del sitio original. |
| [Scrolltide](https://www.scrolltide.co/) | Narrativa de producto ligada al desplazamiento. | Página pública distingue contenido libre y premium; no se accedió a código privado ni se propone compra. |
| [Awwwards](https://www.awwwards.com/) | Reserva para una experiencia concreta. | Lectura automática agotó tiempo; no se validaron en esta pasada Fourmeta ni Disrupt. |
| [Codrops Button Hover Styles](https://tympanus.net/Development/ButtonHoverStyles/) | Variantes de botón con CSS. | Artículo, demo y repo original consultados. Fuente concreta en catálogo de candidatos. |
| Mobbin, Refero de flujos, Pageflows, Commerce Cream | Flujos y patrones de cuenta/tienda. | Reserva del documento anterior; no se revisaron sus colecciones cerradas. |
| CSS Design Awards, FWA, CSS Nectar, Curated, Httpster, Minimal Gallery, Lapa Ninja, One Page Love | Fuentes adicionales de descubrimiento. | No priorizadas ni revalidadas individualmente; ya hay suficientes fuentes para este prototipo. |

El benchmarking nacional del 04 —DGtalic, Impresión3DCR, 3D-ego, Acro y Factory— pertenece a investigación de mercado, no a elegir botones. No se revalidaron sus ofertas ni se reutilizan afirmaciones sobre ellos.

## 4. Licencias y código consultado

Se leyeron las licencias originales de [React Bits](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md), [Magic UI](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md) y [Motion Primitives](https://github.com/ibelick/motion-primitives/blob/main/LICENCE.md). No se copió código al producto.

- React Bits usa MIT + Commons Clause, con condiciones sobre redistribuir/vender componentes, incluidos ports. No presentarlo como MIT sin restricciones ni publicar una biblioteca Svelte derivada. Antes de integrar, conservar aviso y revisar el uso concreto.
- Magic UI y Motion Primitives publican licencia MIT en los archivos consultados; conservar sus avisos al reutilizar código.
- El [repo original de Codrops](https://github.com/codrops/ButtonHoverStyles) indica MIT.
- [Aceternity Licensing](https://ui.aceternity.com/licence) describe condiciones de Pro y advierte sobre componentes de terceros. No tratar todo el catálogo como código MIT ni extrapolar la licencia de un bloque a otro.

Antes de adoptar cualquier candidato: registrar URL, archivo/commit, licencia aplicable, dependencias y modificaciones. Una referencia estética no autoriza usar sus fotos, fuentes o recursos comerciales.

## 5. Cómo evitar el botón genérico

Para pedir un cambio no basta con enlazar un catálogo. Cada tarea usará una ficha del [catálogo](componentes-candidatos-mvp.md):

1. ID del candidato y URL exacta.
2. Acción de producto que cumple.
3. Rasgo visual que debemos preservar.
4. Variante de escritorio, móvil, teclado y menos movimiento.
5. Estados reales: reposo, foco, pulsación, carga, error y éxito.
6. Qué elementos aprobados se conservan.
7. Qué resultado falta mostrar para aprobar.

Si el agente simplifica o cambia el efecto, debe explicar la razón y mostrar comparación. No sustituir silenciosamente una referencia seleccionada por un botón estándar y llamarlo “inspirado”.

La implementación puede ser propia y más pequeña que el ejemplo, pero debe conservar la intención observable acordada. No queremos eliminar toda expresión visual: queremos elegir dónde destaca y poder comprobarla.

## Entrega y límites

Esta selección está preparada para que el otro Codex pueda consultarla, sin enviarle mensajes ni modificar su trabajo. No se hicieron instalaciones, pruebas de integración o una página comparativa nueva. Los candidatos son propuestas; Sebastián aún debe ver y elegir las variantes en el contexto de Vértice.
