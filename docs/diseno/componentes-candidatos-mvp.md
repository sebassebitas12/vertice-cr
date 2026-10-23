# Catálogo de candidatos para Vértice

Fecha: 2026-10-23. Estado: **candidatos investigados, ninguno aprobado ni instalado**.

Contexto y fuentes generales: [investigación del documento 04](investigacion-referencias-04.md). Objetivo: mantener claridad de producto y una identidad industrial cálida, con momentos visuales expresivos que puedan modificarse sin rehacer toda la página.

SvelteKit se está probando en otro chat. Next/React queda como alternativa. “Reutilizable” significa técnicamente apropiado para estudiar/adaptar; todavía hay que comprobar la implementación local, licencia y resultado.

## Primera selección para mostrar a Sebastián

1. **Dos botones en el mismo contexto:** CTA-01 (relleno + flecha) frente a CTA-02 (luz de borde). Mismo texto “Nueva solicitud”, mismo tamaño y colores; así se compara el movimiento.
2. **Dos navegaciones:** NAV-01 (cápsula con indicador) frente a NAV-02 (menú de tarjetas) solo si sus grupos de contenido lo justifican.
3. **Una tarjeta de producto:** CARD-01 (luz localizada) y variante fotográfica sin efecto como comparación.
4. **El formulario:** ACTION-01 con envío real/simulado etiquetado, error recuperable y preservación de campos.

No construir de golpe todo el catálogo. Después de elegir, llevar los componentes aprobados a las demás pantallas. La investigación permite que el agente avance sin volver a buscar una referencia vaga.

## Botones

### CTA-01 — Relleno que crece y flecha de entrada

- Fuente: [Magic UI Interactive Hover Button](https://magicui.design/docs/components/interactive-hover-button).
- Rasgo que se conserva: punto de acento que se expande dentro del botón; texto sale y reaparece acompañado por flecha. No reducir la adaptación a cambiar el color de un botón común.
- Uso: “Nueva solicitud” o “Explorar piezas”; no usar el mismo tratamiento en “Cancelar” o “Eliminar”.
- Svelte: adaptación sencilla de estructura y CSS/Tailwind. El archivo consultado usa tipos React, ArrowRight y cn; no necesita un motor de animación para este efecto.
- React: reutilización del componente con adaptación de tokens.
- Evidencia: demo observada en navegador antes y después de pulsar; código original consultado, blob `6aab0d85a7869227b9602c6c0e6dcc84a15ede31`, [archivo](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/interactive-hover-button.tsx).
- Cambios necesarios: incorporar foco equivalente, pulsación táctil y movimiento reducido; una sola etiqueta accesible aunque haya texto duplicado visualmente. Mantener ancho con ES/EN y estados.
- Aceptación: el relleno y la flecha son perceptibles; no hay salto de tamaño ni contenido cortado; el contraste sirve en ambos temas. En touch la acción debe ser comprensible en reposo.
- Esfuerzo relativo: bajo. Prioridad: primera comparación.
- Licencia: MIT del repositorio consultado; conservar avisos si se adapta código.

### CTA-02 — Botón con luz especular

- Fuente: [React Bits Specular Button](https://reactbits.dev/components/specular-button).
- Rasgo: borde que recoge luz y reflejo que se desplaza hacia el puntero. Alternativa material más industrial al relleno de CTA-01.
- Uso: una acción destacada en portada o encabezado. Evaluar legibilidad frente a un CTA sólido; no asumir que brillo equivale a buena jerarquía.
- Svelte: adaptación media; el ejemplo React tiene efectos/listeners y CSS asociado. No pegar JSX.
- Evidencia: vista de demo observada; fuente consultada, blob `b5f3511a275b540eee327d1efe032b2d200380ba`, [archivo](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpecularButton/SpecularButton.tsx).
- Propuesta Vértice: borde cálido/naranja, superficie oscura o clara según tema y reflejo contenido; evitar transparencia que debilite el texto.
- Móvil/teclado: brillo fijo o respuesta breve al foco/pulsación; no depender de seguir el cursor.
- Aceptación: se distingue la acción principal sin hover; efecto se detiene con menos movimiento y no invade botones vecinos.
- Esfuerzo: medio. Prioridad: comparar con CTA-01.
- Licencia: MIT + Commons Clause de React Bits; revisar condiciones antes de distribuir adaptación.

### CTA-03 — Alternativa de CSS puro

- Fuentes: [Codrops Button Hover Styles](https://tympanus.net/Development/ButtonHoverStyles/), [artículo](https://tympanus.net/codrops/2021/02/17/ideas-for-css-button-hover-animations/) y [repo](https://github.com/codrops/ButtonHoverStyles).
- Rasgo: rellenos/máscaras y desplazamientos de etiqueta construidos con CSS, sin runtime React.
- Uso: alternativa si las dos anteriores no convencen. La colección tiene varias variantes; todavía no se aprobó una concreta.
- Svelte/React: adaptar el HTML/CSS elegido y encapsularlo.
- Aceptación previa a integrar: registrar nombre/clase exacta de la variante y mostrarla; no entregar “estilo Codrops” indeterminado.
- Prioridad: reserva. MIT según repo consultado.

### ACTION-01 — Botón que comunica una operación

- Fuente: [Aceternity Stateful Button](https://ui.aceternity.com/components/stateful-button).
- Rasgo: cambio de carga a éxito ligado a la operación.
- Uso: “Enviar al taller”, “Guardar borrador” o “Aplicar sugerencia”.
- Svelte: implementar el patrón con estados propios; la documentación de la pieza usa props React y función asíncrona. No se verificó todo el código de esa pieza ni su licencia individual.
- Regla de negocio: éxito solo tras respuesta válida; un rechazo, error o timeout no muestra guardado. En el prototipo, identificar el resultado como simulado.
- Aceptación: conserva texto comprensible, impide repetición accidental mientras envía y presenta recuperación sin perder datos.
- Prioridad: primera prueba funcional. No reemplaza el mecanismo de idempotencia del backend.
- Licencia: pendiente para copiar fuente; se selecciona por ahora como patrón.

## Navegación

### NAV-01 — Cápsula y marcador activo

- Fuente: [React Bits Pill Nav](https://reactbits.dev/components/pill-nav).
- Rasgo: barra agrupada, relleno de interacción e indicador que viaja entre opciones.
- Uso: Explorar piezas / Cómo funciona / Materiales; cuenta y Nueva solicitud permanecen con su jerarquía propia.
- Evidencia: demo vista en navegador y fuente consultada, blob `1a3f3ae6d306a0078c793cb2b42ae49e2d2c4bef`, [archivo](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/PillNav/PillNav.tsx).
- Svelte: adaptar el patrón sobre enlaces reales; el ejemplo actual es amplio. Conviene conservar solo el comportamiento elegido, sin portar todas las opciones.
- Propuesta: cápsula sobria, marcador naranja; sin giro del logo ni introducción obligatoria. El estado activo procede de la ruta, no de una selección temporal independiente.
- Móvil: NAV-03; sin apretar enlaces o esconder preferencias para mantener la cápsula.
- Aceptación: ruta, foco y selección se distinguen; textos largos ES/EN caben; la cabecera no tapa títulos.
- Prioridad: primera comparación; licencia React Bits.

### NAV-02 — Desplegable de tarjetas

- Fuente: [React Bits Card Nav](https://reactbits.dev/components/card-nav).
- Rasgo: el menú se abre en grupos de enlaces con superficies diferenciadas.
- Uso candidato: explorar por tipo de necesidad o acceder a ayuda/materiales. Solo si hay suficientes destinos reales.
- Evidencia: documentación descriptiva, no interacción auditada en esta pasada.
- Svelte: adaptar sobre Navigation Menu/Dialog según comportamiento; costo medio/alto.
- Aceptación: cada tarjeta tiene contenido real; funciona con teclado/touch, Escape y devolución de foco. Si hay solo tres enlaces, una barra simple puede resolver mejor la tarea.
- Prioridad: alternativa expresiva, no obligación. Licencia React Bits.

### NAV-03 — Menú móvil y cuenta

- Fuentes nativas Svelte: [Sheet](https://www.shadcn-svelte.com/docs/components/sheet), [Dropdown Menu](https://www.shadcn-svelte.com/docs/components/dropdown-menu) y [Navigation Menu](https://www.shadcn-svelte.com/docs/components/navigation-menu).
- Uso: Sheet para navegación móvil/panel amplio; Dropdown para acciones de cuenta; Navigation Menu solo cuando haya enlaces agrupados.
- Rasgo: estructura previsible; se viste con la identidad Vértice. El aspecto por defecto no es el diseño terminado.
- Aceptación: foco, Escape, cierre al navegar, tamaño táctil y scroll del panel sin perder acceso a cerrar sesión.
- Prioridad: base. Dependencias y licencia de la versión a instalar deben registrarse.

## Productos y contenido

### CARD-01 — Luz localizada en tarjeta

- Fuente: [React Bits Spotlight Card](https://reactbits.dev/components/spotlight-card).
- Rasgo: iluminación suave que sigue el puntero sobre superficie/borde.
- Uso: una pieza destacada o una tarjeta de inicio de solicitud. No lo necesita cada fila operativa.
- Evidencia: documentación y código, blob `1a2b2fdb2a8627fa3551af987a6a9b4600ab27d1`, [archivo](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx).
- Svelte: adaptación media con posición del puntero/CSS; limpiar listeners y respetar menos movimiento.
- Propuesta: luz cálida tenue; fotografía con exposición propia, sin oscurecerla para que se note el efecto.
- Aceptación: producto y acción se entienden sin hover; texto no cambia de contraste; foco recibe un estado equivalente.
- Prioridad: primera tarjeta comparativa; licencia React Bits.

### CARD-02 — Fotografía con inclinación y profundidad

- Fuente: [React Bits Tilted Card](https://reactbits.dev/components/tilted-card).
- Rasgo: inclinación con sombra/reflejo y sensación de capas.
- Uso: una imagen editorial de pieza, no tablas, formularios o una grilla entera en movimiento.
- Evidencia: documentación y fuente, blob `a961b6b9604340860913d8b0ac266cc92259480a`, [archivo](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/TiltedCard/TiltedCard.tsx).
- Svelte: adaptación media. La fuente consulta puntero grueso y preferencia de movimiento; aun así debe integrarse con preferencias locales.
- Aceptación: la pieza no queda cortada, el efecto no simula inspección 3D real y en touch queda una foto usable.
- Prioridad: exploración posterior; no combinar automáticamente con CARD-01.

### MOTION-01 — Entrada al desplazarse

- Fuente: [React Bits Animated Content](https://reactbits.dev/animations/animated-content).
- Rasgo: aparición escalonada de bloques al entrar en vista.
- Evidencia: fuente consultada, blob `50c252d6c74e0218504d019df9d06aa02e471f30`; importa GSAP y ScrollTrigger.
- Svelte: para un fade/desplazamiento sencillo, usar transiciones nativas y observación de entrada; no portar el wrapper completo solo por ese caso.
- Aceptación: el contenido nunca depende de que la animación arranque para poder leerse; sin desapariciones al retroceder ni cascadas largas en cada navegación.
- Prioridad: después de aprobar composición.

### THEME-01 — Cambio de tema con transición

- Fuente: [Magic UI Animated Theme Toggler](https://magicui.design/docs/components/animated-theme-toggler).
- Rasgo: transición visual del tema desde el control.
- Evidencia: [fuente](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-theme-toggler.tsx), blob `a4185ec5c7d33f56d38c7269a7439ede7cd081b8`; usa startViewTransition y comprueba su disponibilidad.
- Svelte: adaptación media; no copiar flushSync ni hooks React.
- Aceptación: si no hay soporte o hay movimiento reducido, el tema cambia de inmediato; nunca se pierde ruta/draft. Un icono animado simple también es una alternativa válida.
- Prioridad: posterior al funcionamiento claro/oscuro; MIT del repo.

## Interfaz funcional nativa de la prueba

| ID | Fuente exacta | Uso / aceptación |
|---|---|---|
| SEARCH-01 | [Command](https://www.shadcn-svelte.com/docs/components/command) | Panel de búsqueda con resultados reales de demo y teclado. No convertir el catálogo en una paleta con comandos irrelevantes. |
| FILTER-01 | [Tabs](https://www.shadcn-svelte.com/docs/components/tabs) | Cambiar paneles. Si “Todas / En revisión” solo filtra una lista, preferir controles de filtro con semántica adecuada; no fingir tabs por apariencia. |
| FIELD-01 | [Bits UI](https://www.bits-ui.com/docs/introduction) + controles de shadcn-svelte | Etiqueta, ayuda y error asociados; inputs estables y contraste suficiente. Añadir estilo no debe modificar el dato. |
| AI-01 | [Contrato de Vértice](../proyecto-final-backend/README.md#contrato-de-autocompletado-ia) | Propuesta por campo con origen, aceptar/rechazar y deshacer. Es un componente propio; una biblioteca de chat no resuelve este contrato. |
| FOOTER-01 | Composición propia según navegación aprobada | Grupos reales, contacto verificado y variante compacta. No necesita una animación comprada ni un footer enorme en el taller. |

## Escena de producto ligada al desplazamiento

La referencia es N3D y su pieza que se separa en About, revisada previamente. El candidato no es un “scroll reveal” de texto.

Plan: elegir una pieza propia/autorizada, definir 3–4 momentos narrativos y probar modelo 3D o secuencia de imágenes. Evaluar [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) o [Motion para Svelte](https://motion.dev/docs/svelte) cuando exista el recurso. No instalar ambos para la misma escena por anticipado.

Aprobación: el cliente entiende la pieza y su uso; el desplazamiento sigue siendo natural; hay foto/texto de respaldo; móvil y movimiento reducido conservan toda la información. Coste alto frente a botones; no bloquea el recorrido del MVP.

## No priorizar para la primera prueba

- Gooey Nav, cursores personalizados y partículas en cada clic: reservar para exploración si Sebastián los quiere comparar; hoy no resuelven el recorrido.
- Shaders, galaxias y fondos de neón en todas las páginas: pueden desplazar el protagonismo de las piezas.
- Carruseles 3D como única forma de encontrar productos: primero una lista/grilla fácil de explorar.
- Texto que desaparece o tarda en revelarse en formularios: no perder lectura ni datos.
- Una combinación de todas las bibliotecas: añade adaptación sin garantizar coherencia.

Estos son juicios de diseño para este MVP, no afirmaciones de que los componentes sean malos. La elección debe compararse visualmente antes de cerrarse.

## Instrucción de trabajo para Codex/Luna

1. Leer esta selección y la dirección aprobada; localizar el componente actual.
2. Elegir ID y explicar el rasgo que se va a preservar.
3. Mostrar dos variantes en el mismo contexto cuando falte aprobación visual.
4. Mantener estados, temas, idioma y accesibilidad; etiquetar simulaciones.
5. Comparar el resultado con la referencia y señalar cualquier diferencia intencional.
6. Registrar elegido/rechazado/pendiente y razón. Si se rechaza, no volver silenciosamente a esa variante.
7. Mantener pendiente la tarea original hasta demostrar su criterio de aceptación; no desviarse a rediseñar otra pantalla.

Plantilla de tarea: objetivo de producto; ID/URL; rasgo visual; alcance; qué se conserva; variantes; aceptación; siguiente paso. Si falla una dependencia, proponer adaptación explícita sin cambiar el objetivo visual por defecto.

## Límites de la evidencia

Se observaron en navegador Magic UI Interactive Hover Button (antes/después de pulsar), Pill Nav y la vista de Specular Button. Los demás se seleccionaron por documentación y, donde se indica, lectura de fuente. No se auditaron todos sus gestos, accesibilidad, rendimiento o comportamiento móvil. No se ejecutaron componentes dentro del proyecto.

Nada de esta lista está aprobado todavía. La próxima decisión es visual: comparar CTA-01 y CTA-02 en la página de prueba que ya está construyendo el otro Codex.
