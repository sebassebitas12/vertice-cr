# Selección ampliada por pantalla para la prueba Svelte

Fecha: 2026-10-23. Investigación y propuestas; no aprobación ni integración.

## Qué cambia

La primera selección dio demasiado protagonismo a React Bits. Esta ampliación recupera fuentes distintas del documento 04 y asigna cada referencia a una necesidad concreta. Las galerías sirven para descubrir composiciones; los componentes requieren revisar su fuente y adaptar su comportamiento a Svelte.

La prueba local ya existe en `codex/prueba-frontend-svelte`, según el informe compartido por Sebastián. Se observaron en navegador Inicio y Mis solicitudes en http://127.0.0.1:4173/. No se modificó la aplicación ni se repitieron las pruebas de compilación del otro Codex. Su informe de check/build es evidencia aportada por ese agente, no una verificación propia.

## Selección recomendada

| Parte | Referencia concreta | Qué rescatar | Evidencia y adaptación |
|---|---|---|---|
| NAV-04: barra compartida | [Aceternity Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) | Barra amplia en reposo que se compacta al desplazarse, conservando identidad y acción principal. | Demo observada al desplazar su contenedor y documentación leída. Adaptación media en Svelte; no copiar componentes React. |
| CTA-03: botón expresivo | [Codrops Button Hover Styles](https://tympanus.net/Development/ButtonHoverStyles/), variante `button--calypso` | Relleno circular que crece y etiqueta que sale/reentra con cambio de escala. | HTML y CSS originales leídos; gesto no comprobado en navegador en esta ampliación. Adaptación baja/media; mantener etiqueta accesible estable. |
| PHOTO-01: ampliar fotografía | [Motion Primitives Morphing Dialog](https://github.com/ibelick/motion-primitives/blob/main/app/docs/morphing-dialog/morphing-dialog-image.tsx) | Continuidad entre miniatura y fotografía ampliada; cerrar y volver al mismo contexto. | Ejemplo y componente base leídos; documentación web bloqueada. Adaptación media: usar diálogo nativo Svelte/Bits UI y después añadir continuidad visual. No equivale a visor 3D. |
| DETAIL-01: cambiar panel | [Motion Primitives Transition Panel](https://github.com/ibelick/motion-primitives/blob/main/app/docs/transition-panel/transition-panel-tabs.tsx) | Transición breve entre Resumen, Propuesta e Historial, sin perder el expediente. | Ejemplo y código base leídos; usa motion/react. Adaptación baja/media mediante transiciones Svelte. No animar cada actualización de datos. |
| FOOTER-02: cierre público | [ScrollX UI — Footer With Minimal Outline](https://21st.dev/@scrollxui/components/footer-with-minimal-outline) | Columnas útiles y gran nombre delineado al final. VÉRTICE podría aportar identidad sin otro bloque de tarjetas. | Preview observada y descripción pública leída; entrada animada completa y fuente/licencia individual pendientes. Adaptación media; no copiar marca ni enlaces ficticios. |
| STORY-01: explicación del proceso | [Aceternity Sticky Scroll Reveal](https://ui.aceternity.com/components/sticky-scroll-reveal) | Imagen fija que acompaña etapas de texto: describir, revisar, fabricar. | Documentación leída, no interacción completa comprobada. Adaptación media. Primera opción narrativa antes de producir una escena compleja. |

La recomendación inicial es comparar **CTA-01 de Magic UI contra CTA-03 Calypso**, y **NAV-04 contra la barra actual**. Después trabajar fotografía y footer. React Bits conserva candidatos de reserva, con un rol específico; no dirige toda la identidad.

## Fotografía y composición: referencias de sitios reales

### Siteinspire → Fume

[Entrada de galería](https://www.siteinspire.com/website/13651-fume) → [sitio original Fume](https://fume-studio.com/).

Se observaron portada y grilla al desplazarse: ambiente fotográfico que explica el uso, seguido por fotos grandes de producto con datos discretos debajo. En Vértice esto sugiere dos clases de recurso:

- Foto editorial: una pieza en una situación que permita entender para qué sirve.
- Foto de catálogo: fondo controlado, silueta completa, escala coherente y sin accesorios que parezcan incluidos.

La mejora visual no depende de aplicar brillo a todas las tarjetas. No copiar sus imágenes, promociones ni popup comercial. Para imágenes generadas, definir primero pieza, función, dimensiones relativas, partes y accesorios. No presentarlas como fotos de una pieza ya fabricada.

### Siteinspire → Woodid

[Entrada de galería](https://www.siteinspire.com/website/13371-trophee-en-bois-personnalise-woodid) → [sitio original Woodid](https://wearewoodid.com/).

Se observó la portada y se leyó el recorrido público de personalización. Rescatar la separación entre escoger una opción existente y crear algo personalizado, además de explicar los pasos antes de empezar. No heredar su fabricación, integraciones, precios o promesas de entrega.

### Navbar Gallery → Linear

[Referencia concreta](https://www.navbar.gallery/navbar/linear) → [Linear](https://linear.app/).

La galería ofrece vistas de escritorio y móvil. Es una alternativa de organización para desplegables contenidos; no justifica añadir un mega menú con pocas rutas. Lectura de galería/sitio, sin verificación completa de gestos o móvil.

## Otras piezas útiles, con propósito

| Fuente | Patrón | Uso condicionado en Vértice |
|---|---|---|
| [Magic UI Lens](https://magicui.design/docs/components/lens) | Lupa sobre una imagen | Ver textura/capas si existe fotografía suficiente. No permite deducir tolerancias ni medidas. En touch ofrecer ampliación explícita. Documentación leída. |
| [Magic UI Hero Video Dialog](https://magicui.design/docs/components/hero-video-dialog) | Miniatura que abre vídeo | Mostrar un clip real del proceso si se dispone de él. No incorporar vídeo de stock como evidencia del taller. Documentación leída. |
| [Magic UI Ripple Button](https://magicui.design/docs/components/ripple-button) | Onda de respuesta a pulsación | Variante de feedback para comparar, sin mezclar todos los efectos en un botón. Documentación leída. |
| [Aceternity Signup Form](https://ui.aceternity.com/components/signup-form) | Composición de campos de acceso | Referencia de formulario para explorar; no se seleccionó aún una variante final ni se verificó su accesibilidad. |
| [Aceternity File Upload](https://ui.aceternity.com/components/file-upload) | Presentación de carga de archivos | Reserva si el alcance incorpora archivos privados. La apariencia no implementa validación, almacenamiento ni permisos. |
| [Refero: guía de login](https://refero.design/blog/login-ui-design-guide-creating-an-intuitive-user-experience/) | Jerarquía y claridad de acceso | Fuente de criterio, no componente para pegar. Acceso debe mostrar solo proveedores realmente implementados. |

## Movimiento parecido al referente N3D

[Scrolltide — Ora](https://www.scrolltide.co/templates/ora) describe una tienda de relojes con secuencia de imágenes ligada al desplazamiento. Es una alternativa a renderizar un modelo 3D en tiempo real. Su descripción pública menciona 240 imágenes WebP; eso describe su ejemplo, no un requisito de Vértice.

No se accedió al contenido premium ni se auditó el código. La idea recuperable es planificar fotogramas coherentes y capítulos de producto. Para una pieza propia: objeto completo → partes → detalle de función → resultado. Un conjunto de imágenes generadas por separado puede cambiar la geometría; requiere revisar continuidad antes de programar.

Prioridad: posterior a la interfaz principal y al recorrido de solicitud. Mantener desplazamiento natural, respaldo estático y toda la información disponible con movimiento reducido.

## Fuentes exploradas sin selección final

- [Godly — Proofmode](https://godly.design/website/proofmode/): entrada concreta localizada con secciones de portada/CTA/footer. Sin revisión visual suficiente para recomendar su composición como elegida.
- [Land-book](https://land-book.com/): catálogo público y filtros consultados; la lectura de secciones agotó tiempo. No se atribuye una pieza concreta que no fue inspeccionada.
- [Awwwards — Disrupt](https://www.awwwards.com/inspiration/menu-navigation-disrupt): la lectura automática agotó tiempo; queda pendiente, no validada.
- [Pageflows — acceso de Canva](https://pageflows.com/post/desktop-web/logging-in/canva/): acceso automático denegado. No se consultó contenido cerrado.
- [21st — Ember Footer CTA, Serafim](https://21st.dev/@serafimcloud/components/ember-footer-cta): descripción pública consultada. Fuego violeta, canvas y efectos de espera tienen menos relación con las piezas y el flujo actual; no priorizar frente al footer delineado. No se verificó el comportamiento completo.

Estas limitaciones no impiden comparar las seis propuestas principales. Tampoco equivalen a una revisión exhaustiva de todos los enlaces del documento 04.

## Cómo llevarlo al trabajo con IA sin perder el rumbo

Cada componente debe tener una ficha: ID, pantalla, acción del usuario, URL exacta, rasgo que conservar, estados, límites, evidencia y estado de aprobación.

1. Elegir una sola parte y comparar dos variantes en el contexto real de Vértice.
2. Mantener texto, tamaño y colores iguales durante la comparación del comportamiento.
3. Registrar elegido/rechazado/pendiente, con una razón breve. No convertir una propuesta en decisión aprobada.
4. Implementar como componente aislado y documentar sus variantes. Navbar/footer tendrán una composición pública y una compacta para trabajo.
5. La tarea siguiente referencia esa decisión y el objetivo del recorrido. Si exige modificar una decisión aprobada, señalarlo antes de sustituirla silenciosamente.
6. Mostrar diferencia con la referencia y explicar cualquier simplificación; “inspirado” no basta si desaparece el rasgo solicitado.

En la prueba local, `Componentes` sirve como laboratorio. No asumir que debe permanecer en la navegación de clientes. Los enlaces y registros simulados no demuestran aún el flujo asistido real.

## Reutilización y límites

No se instaló código de estas fuentes. Codrops y Motion Primitives publican MIT en sus repositorios consultados; conservar sus avisos si se adapta código. Para el footer de ScrollX y cada bloque de Aceternity, revisar licencia y dependencias de la pieza antes de reutilizarla. Fotografías, marcas, tipografías y recursos de sitios ajenos no quedan autorizados por aparecer en una galería.

Las estimaciones de adaptación son relativas, no presupuestos. Falta implementar y observar teclado, móvil, temas, traducciones y movimiento reducido. Esta investigación define qué comparar, no declara esas condiciones verificadas.
