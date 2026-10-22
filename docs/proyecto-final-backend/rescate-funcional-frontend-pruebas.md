# Rescate funcional del frontend anterior

Fecha: 2026-10-22. Estado: recomendaciones para el MVP, pendientes de validación en prototipo. No es una migración de código ni una aprobación del diseño anterior.

## Encargo y método

Sebastián quiere conservar las mejores ideas de la entrega de frontend y reconstruir una experiencia mucho mejor. Trabajará como orquestador de IA con Codex y posiblemente Antigravity. La composición anterior no es la referencia visual que se debe reproducir.

Repositorio fuente: `sebassebitas12/Tienda-de-Impresion3D`, rama `Pruebas`, commit [`1d1f9a2`](https://github.com/sebassebitas12/Tienda-de-Impresion3D/commit/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722). Se obtuvo el inventario completo de `src/`: 134 archivos JS/JSX y 19 CSS. Se recuperaron esos archivos y se revisaron en detalle los recorridos y componentes centrales de preferencias, navegación, acceso, catálogo, solicitud asistida, cuenta, cotización y administración; el resto sirvió como inventario y rastreo de relaciones.

Revisión estática del código, sin ejecutar la aplicación, pruebas, proveedores ni workflows de n8n. Que una pantalla invoque un endpoint demuestra intención e integración en el frontend, no que el servidor o el servicio externo funcionen. No es una auditoría exhaustiva de seguridad, accesibilidad o rendimiento.

Relación: [anteproyecto](README.md), [decisión de frontend](../decisiones/0002-frontend-mvp.md) y [referencia N3D](referencia-n3d-y-demo-ia.md).

## Conclusión

Hay una base de ideas valiosa: continuidad del trabajo del cliente, preferencias persistentes, catálogo explorable, solicitud que admite incógnitas, revisión humana y siguiente acción según el estado. La nueva interfaz debe mostrar menos información simultánea, con mejores fotografías, jerarquía y separación entre resumen y detalle.

La recomendación de Next.js/TypeScript/Tailwind sigue siendo de trabajo. El código anterior ya tiene layouts, servicios y componentes; no sería correcto afirmar que todo estaba mal estructurado o que Vite impidió el diseño. Las dificultades observables incluyen responsabilidades acumuladas en pantallas grandes, estilos compartidos extensos y reglas repetidas. Cambiar de framework por sí solo no las corrige.

## Inventario y selección

| Idea anterior y evidencia | Recomendación para Vértice nuevo | Prioridad |
|---|---|---|
| [Preferencias ES/EN](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/providers/PreferencesProvider.jsx) y [mensajes](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/providers/messages.js) | Conservar idioma elegido y definir traducciones por función, con un único acceso al catálogo de textos. | Base de arquitectura; ES/EN público como objetivo, ampliar taller después si hace falta. |
| [Tema claro/oscuro](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/providers/ThemeProvider.jsx) | Conservar ambos con colores semánticos, preferencia guardada y opción de seguir el sistema. | Base compartida propuesta. |
| [Lectura, contraste y movimiento](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/layout/FloatingTools.jsx) | Mantener teclado, foco, zoom/reflujo y menos movimiento desde el inicio. Ajustes adicionales en un panel discreto. | Accesibilidad esencial en el MVP. |
| [Búsqueda global](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/layout/Navbar.jsx) y [filtros en URL](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/Shop.jsx#L36) | Buscar por uso/nombre; filtros mínimos según catálogo real; conservar filtros al volver de la ficha y permitir compartir URL. | MVP. |
| [Galería, color y cantidad](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/Shop.jsx#L22) | Ficha fotográfica clara; opciones de fabricación confirmadas; personalizar transmite producto y selección a la solicitud. | MVP con catálogo curado. |
| [Dos puntos de partida](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/QuoteRequestPage.jsx) | “Tengo una referencia” y “Necesito ayuda”. Mismo expediente y formulario subyacente; IA opcional para completar manualmente si falla. | MVP; adjuntos por decidir. |
| [Recuperación del borrador](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/QuoteRequestPage.jsx#L14) | Restaurar tras navegación/acceso; borradores por usuario y solicitud, versión y fecha, con acción para descartar. | MVP. |
| [Asistente integrado](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/chatbot/AssistantPanel.jsx) | Consultar catálogo y proponer campos con procedencia, diferencias, aceptar/rechazar y deshacer. | Función central del MVP. |
| [Cuenta y cotizaciones](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/CustomerQuotesPage.jsx) | Lista breve con estado, última actualización y siguiente acción; detalle separado para condiciones y respuesta. | MVP. |
| [Siguiente acción del taller](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/admin/RequestNextAction.jsx) | Mostrar qué corresponde hacer: revisar, pedir aclaración, guardar oferta, compartirla. | MVP. |
| [Versiones y decisiones](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/CustomerQuotesPage.jsx#L70) | Conservar versión, vigencia, aceptación y petición de cambios; impedir actuar sobre oferta obsoleta. | Con la cotización del MVP. |
| [Resumen de trabajo](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/admin/AdminDashboard.jsx) | Priorizar solicitudes pendientes y antiguas; números calculados de registros reales, sin gráficos decorativos. | Bandeja mínima primero. |
| [Propuestas IA con vista previa administrativa](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/admin/AdminCatalogActionPreview.jsx) | Rescatar el patrón de revisar diferencias y confirmar; autocompletar descripciones podría añadirse tras cerrar el recorrido principal. | Ampliación. |
| [Imágenes y compresión](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/utils/compressProductImage.js) | Galería con portada/orden y optimización; almacenar archivos con referencias en vez de grandes cadenas dentro de fichas. | Catálogo mínimo; editor completo después. |
| [Actividad](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/admin/AdminActivity.jsx) | Historial breve de quién cambió estado, fecha y motivo. | MVP, en detalle. |
| [Carrito por cliente](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/providers/CartProvider.jsx) | Conservar la idea de selección persistente si el curso exige compra de catálogo. El recorrido central puede terminar en solicitud/cotización sin carrito. | Condicional. |
| [Pagos PayPal/SINPE](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/services/commerceService.js) | Reconocer lo aprendido, mantener fuera de la primera entrega salvo requisito explícito. | Posterior; cobros reales excluidos. |
| [Opiniones](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/products/ProductReviews.jsx) | Reconsiderar cuando exista uso real, moderación y vínculo con un pedido. | Posterior. |
| [Contacto y FAQ](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/ContactPage.jsx) | Ayuda breve y contactos verificados; formulario solo si guarda o entrega realmente el mensaje. | Información básica en MVP. |

Las prioridades son propuestas, no una ampliación automática del alcance. Para terminar el MVP primero se completa solicitud → confirmación → taller → respuesta.

## 1. Idiomas: rescatar, ordenar y completar

**Implementado en el código anterior:** ES/EN en preferencias, persistencia local, actualización de `document.documentElement.lang`, diccionario compartido y textos bilingües dentro de numerosas páginas. El asistente recibe el idioma.

**Límites observados:**

- Mezcla de diccionario central, objetos locales y condicionales `es ? ... : ...`; las IAs tienen varios sitios donde añadir traducciones.
- [AuthLayout](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/app/layout/AuthLayout.jsx) conserva “Volver al taller” literal y [ProductCard](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/components/ui/ProductCard.jsx) conserva “Bajo pedido”; también hay errores literales en FileDropzone. El selector no demuestra traducción completa.
- Nombres/descripciones del producto y nombres de colores provienen de los datos sin una estrategia general de localización. [formatCRC](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/utils/money.js) usa es-CR; no hay que cambiar la moneda por cambiar el idioma.
- No se observa detección automática del idioma en PreferencesProvider; inicia en español salvo preferencia inglesa guardada.

**Propuesta:** español por defecto; selector ES/EN en preferencias, con acceso visible pero compacto. Textos de interfaz por módulo: navegación, acceso, catálogo, solicitud y taller; mismo juego de claves para cada idioma. Mantener material/ID/estado canónicos separados de sus etiquetas. Definir qué contenido del catálogo tendrá traducción editorial y usar español como respaldo identificado si falta. El texto original del cliente se conserva, aunque cambie el idioma; traducción de conversación es una función distinta.

Aceptar que todas las pantallas incluidas en la demo, sus errores y sus correos relevantes deben ser coherentes. Si no alcanza el calendario, publicar español completo y mantener la arquitectura preparada; no mostrar un selector que prometa una traducción incompleta.

## 2. Tema y colores: dos asuntos distintos

El sitio anterior ofrece **claro/oscuro**, no un selector libre de color de marca. `index.css` cambia variables de superficie, texto, bordes, acento y estados; ThemeProvider persiste dark/light y arranca oscuro por defecto. La opción “Sistema” sería una mejora nueva.

Propuesta: oscuro como dirección de marca inicial y alternativa clara diseñada con igual cuidado, ambas con el mismo naranja de identidad ajustado para legibilidad. Nombrar colores por función: fondo, superficie, texto principal/secundario, borde, acción y estados. Evitar colores arbitrarios en cada componente. El alto contraste no sustituye un buen contraste normal.

El **color del filamento** es otra propiedad: se elige solo entre opciones aprobadas de una pieza/material. Una muestra de color debe tener nombre y selección perceptible sin depender solo del color. No implica que una foto cambie realmente de color o que ese filamento esté disponible; eso requiere datos y recursos específicos.

Criterios: preferencias no alteran datos ni borran el borrador; se mantienen al recargar; estados y fotografías siguen siendo legibles en ambos temas; se evita un destello de tema incorrecto al abrir el frontend nuevo.

## 3. Accesibilidad: conservar lo esencial y simplificar herramientas

Hay buenas ideas: salto al contenido, foco después de navegar, Escape y devolución de foco en paneles, estados anunciados, escala de lectura, alto contraste y movimiento reducido. La voz usa la síntesis del navegador para selección, página y hover/foco; no requiere un modelo de IA.

Recomendación:

- Priorizar estructura semántica, etiquetas, errores asociados al campo, teclado, foco visible, controles táctiles y zoom/reflujo hasta 200%.
- Menos movimiento debe obedecer el sistema y poder activarse en preferencias. El cambio debe detener también animaciones JavaScript/3D ya iniciadas.
- No llenar el borde de la pantalla con herramientas flotantes. Usar “Preferencias” para idioma/tema/lectura y ayuda contextual para cada tarea.
- Lectura por voz explícita puede evaluarse después. Leer automáticamente al pasar el cursor aumenta complejidad y puede interferir con otras herramientas; no es imprescindible para esta demo y no reemplaza un lector de pantalla.

Límite concreto: [RevealOnScroll](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/components/ui/RevealOnScroll.jsx) observa la preferencia del sistema pero lee el ajuste manual solo al montar; [Home](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/Home.jsx) instala el parallax con una comprobación inicial. Esto no garantiza que el interruptor manual detenga sus listeners ya instalados. CSS por sí solo no resuelve toda animación JavaScript.

## 4. Continuidad y autocompletado: lo mejor, con correcciones

**Qué conservar:** explorar antes de registrarse, preparar datos sin iniciar sesión, volver al contexto tras acceder, recuperar texto, anunciar adjuntos que deben volver a elegirse, reintentar una consulta y confirmar antes de enviar. El frontend ya distingue algunas respuestas locales de las del proveedor y utiliza claves de idempotencia al enviar.

**Problemas del código que no se deben trasladar:**

1. [applyAssistantDraft](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/QuoteRequestPage.jsx#L100) acepta un valor entrante no vacío y elimina su marca de edición manual; también limpia campos no editados cuando faltan en la nueva respuesta. Una sugerencia puede sobreescribir trabajo o eliminar datos. Se necesita una propuesta parcial por campo, nunca sustituir todo el formulario.
2. El borrador y la conversación usan claves globales del navegador, sin usuario ni solicitud. No se observa expiración de ese borrador. Pueden quedar datos de otra sesión en el mismo dispositivo. Separar borrador visitante y borrador autenticado; ofrecer importación explícita y limpiar/aislar al cambiar cuenta.
3. En la ruta asistida se bloquea el envío hasta tener resumen listo. Hay recuperación local, pero no debe convertirse en dependencia obligatoria del proveedor para terminar manualmente.
4. El analizador local de [quoteConversation](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/utils/quoteConversation.js) usa expresiones regulares para interpretar frases. Puede servir para recuperación identificada, pero no demuestra comprensión general ni debe presentarse como validación técnica.
5. La idempotencia del frontend se guarda en una referencia en memoria. Evitar duplicados tras recarga requiere una operación estable validada y persistida por el backend.

**Contrato nuevo:** cada campo tiene valor, origen, revisión y versión. La respuesta incluye versión base y campos propuestos. Si el cliente cambió el campo mientras esperaba, se muestra conflicto. “Aplicar sugerencia” y “Deshacer” son acciones visibles. Lo desconocido queda vacío. “Guardar borrador” y “Enviar al taller” tienen consecuencias y mensajes distintos.

La IA explica coincidencias del catálogo con referencias reales. No mide STL/fotos ni determina viabilidad o precio firme por el nombre de una pieza.

## 5. Cuenta y taller: menos densidad, mejor orientación

La cuenta anterior agrupa solicitudes, ofertas, desglose de costos, pedidos, comprobantes, pago y perfil en un mismo componente. Hay buenos mensajes de estado, pero demasiados detalles pueden competir a la vez.

Propuesta:

- **Mis solicitudes:** título breve, referencia, estado, fecha de actualización y acción principal. Filtros sencillos; vacío con “Nueva solicitud”.
- **Detalle:** descripción original, datos confirmados, preguntas del taller, historial y oferta vigente. Desglose solo donde aporte a la decisión.
- **Taller:** bandeja ordenada por pendientes/antigüedad y detalle con el siguiente paso. No traer a la primera versión todos los módulos del admin anterior.
- **Oferta:** separar borrador privado del taller de propuesta compartida con el cliente. El frontend anterior muestra importe y notas del estado QUOTED antes del envío; conviene decidir explícitamente qué se publica y cuándo.
- Centralizar el vocabulario de estados y sus transiciones en la API; traducir etiquetas sin cambiar el estado interno. Por ejemplo, la cuenta contempla COMPLETED pero el resumen usa otro conjunto de estados, lo que evidencia el costo de duplicar reglas.

## 6. Lo demostrativo que hay que reemplazar

- [jsonServerAuthAdapter](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/services/jsonServerAuthAdapter.js) consulta usuarios, compara una contraseña demo y construye un token simulado en el cliente. Es una solución académica, no la autenticación que se trasladará. Conservar el flujo de acceso/retorno y reconstruir identidad/autorización con el backend elegido; evaluar Supabase Auth según requisitos del curso. Base Supabase no obliga a una estrategia específica de autenticación.
- [adminCatalogService](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/services/adminCatalogService.js) contiene mutaciones directas a colecciones sin adjuntar credencial en ese servicio. En el producto nuevo las escrituras necesitan autorización real en servidor; ocultar un enlace en React no la proporciona.
- [ContactPage.handleSubmit](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/pages/ContactPage.jsx#L213) solo cambia estado local y limpia campos; no realiza una petición. El mensaje de “recibido” y respuesta en 24 horas no demuestra entrega. No heredar números, dirección, horarios ni cobertura de envío de muestra como datos reales.
- [quoteAutomation](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/utils/quoteAutomation.js) usa perfiles análogos y costos DEMO. [AdminCatalogManagement](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/1d1f9a22cbd82b50210eb4ce7b6e6730badf6722/src/features/admin/AdminCatalogManagement.jsx#L87) permite completar peso/tiempo y sugerir precio desde el nombre mediante IA. Rescatar ayuda editorial; los datos de producción requieren laminado o medición verificable antes de ser base de una cotización.
- Reseñas: el propio frontend avisa que no verifica compra. Posponerlas evita un módulo adicional de moderación que no demuestra el recorrido principal.
- No asumir que un estado “correo enviado”, un importe mostrado o un flujo de PayPal en el código prueba entrega, cobro o conciliación. Esta revisión no ejecutó esos servicios.

## 7. Base compartida propuesta

### Estructura y navegación

| Contexto | Estructura estable | Cambia |
|---|---|---|
| Visitante | Logo, Explorar piezas, Cómo funciona, Materiales; acceso a preferencias, cuenta y Nueva solicitud. Footer de ayuda/contacto verificado. | Página activa y contenido. |
| Cliente | Misma familia de navbar/footer y controles. | Acceso a Mis solicitudes y perfil; continuar borrador. |
| Acceso | Logo, volver al sitio, preferencias y pie compacto de ayuda/privacidad. | Formulario de ingreso/registro/recuperación. |
| Taller | Marco operativo propio, misma marca, controles y estados. | Bandeja y detalle; footer compacto si aporta. |

“Compartido” no obliga a usar un footer comercial enorme dentro del taller o del login. Las variantes deben definirse, no improvisarse por página. El navbar debe poder abrir menú y preferencias con teclado, y caber en móvil sin acumular todos los controles de escritorio.

### Componentes que se especifican antes de programar

- Navbar, menú móvil, menú de cuenta, panel de preferencias y footer.
- Button con variantes, Input/Select/Textarea con errores, Dialog/Drawer, pestañas y avisos.
- Tarjeta de producto, galería, filtros y estados vacío/carga/error.
- Lista y detalle de solicitud, badge de estado, historial y siguiente acción.
- Formulario, sugerencia por campo, comparación, deshacer y revisión final.
- Estilos compartidos: colores por función, fuentes, tamaños, espacios, anchos, radios y foco. Cambiar un detalle local no debe requerir cambiar el sitio completo.

Dar más espacio vertical y revelar detalles progresivamente. El mockup de “Mis solicitudes” gustó como dirección, pero Sebastián lo encontró comprimido al reunir todo en una imagen. No convertir ese encuadre en una obligación de que toda la página quepa en una pantalla.

## 8. Movimiento previsto, no añadido al final

La revisión posterior de N3D mostró navbar persistente, indicador de sección y una pieza 3D que se separa al avanzar por About. El frontend viejo solo aporta revelado al entrar, inclinación/parallax al apuntar y transiciones; no equivale a esa experiencia 3D.

Propuesta para Vértice: una sección protagonista explica pieza → detalles → uso → solicitud. Cada efecto tendrá una ficha con propósito, inicio/fin al desplazarse, recurso necesario, comportamiento en móvil, teclado, menos movimiento y alternativa estática. No hay que obligar al usuario a completar una animación para leer o enviar.

- Navegación: persistencia si ayuda, sin cubrir títulos o formularios.
- Catálogo y cuenta: respuestas breves a selección/estado, sin escenas que retrasen la tarea.
- Escena de producto: decidir 3D real frente a secuencia de imágenes después de probar un recurso propio/autorizado.
- Cargar la escena solo donde se usa; detenerla fuera de vista; conservar foto/texto si no carga.
- No elegir el motor 3D por el aspecto de N3D. El recurso y el prototipo determinan esa decisión.

## 9. Cómo coordinar Codex y Antigravity

Recomendación de proceso, sin asumir capacidades específicas no verificadas de esas herramientas:

1. Una fuente de decisiones en este repositorio; registrar aprobado, propuesto y pendiente.
2. Un inventario de rutas y componentes, contratos de datos y estados compartidos.
3. Para cada tarea, indicar pantalla/componente, comportamiento esperado y criterios de aceptación. Un agente se responsabiliza del cambio en un archivo o componente a la vez para evitar ediciones incompatibles.
4. Mostrar resultado visual en escritorio y móvil antes de extenderlo a todas las pantallas; revisar temas e idioma cuando se implementen. No convertir una imagen generada en especificación funcional completa.
5. Evitar parches globales para un detalle local; revisar qué componentes consumen un token antes de cambiarlo.
6. Actualizar decisiones y pendientes al cerrar la tarea; distinguir implementación, simulación y propuesta. Sebastián dirige y acepta el resultado sin tener que reparar manualmente el código.

Evidencia de mantenimiento: Shop.jsx reúne catálogo, producto, carrito y pagos en 539 líneas; CustomerQuotesPage.jsx ocupa 485; shell.css 1343 y admin.css 1183. shell.css contiene 59 usos de !important. El tamaño o !important no son errores por sí solos; juntos con múltiples responsabilidades explican por qué conviene separar módulos y estilos. No prueban por sí solos la causa de la insatisfacción visual.

## 10. Cierre del alcance antes del backend

**Prioridad esencial:** catálogo/ficha, solicitud manual o asistida, conservación de datos, autenticación, confirmación, bandeja, respuesta y estados reales. Preferencias y accesibilidad son parte de su diseño compartido.

**Objetivos complementarios:** ES/EN coherente, claro/oscuro, escena de producto al desplazarse y cotización versionada, dimensionados con el calendario. No sacrificar el recorrido completo por acumular opciones.

**Después:** copiloto de catálogo, editor avanzado de imágenes, reseñas, carrito/pagos y paneles extensos.

Antes de construir: aprobar navegación y sus variantes, separar lista/detalle, concretar campos y acciones de IA, definir estados y permisos, y revisar un prototipo navegable de escritorio/móvil. Se puede cerrar la base sin anticipar absolutamente cada interacción; las decisiones que dependan del comportamiento real se resuelven en ese prototipo. El desarrollo de la aplicación sigue empezando por el backend.

### Criterios de aceptación propuestos

1. Cambiar idioma o tema mantiene la ruta, selección y borrador; ningún selector promete una opción incompleta.
2. El cliente recupera su borrador tras acceder; cambiar de cuenta no muestra borradores privados ajenos.
3. Un conflicto entre edición humana y respuesta tardía de IA se presenta para elegir, con deshacer.
4. La ausencia de IA permite continuar manualmente; nunca se informa envío sin respuesta válida de persistencia.
5. La confirmación repetida/reintentada no duplica registros, incluso después de recargar.
6. El taller y el cliente ven la misma versión compartida; los borradores privados del taller no se filtran.
7. Teclado, zoom, móvil y reducción de movimiento permiten terminar la tarea.
8. Una animación fallida no oculta la explicación ni bloquea navegación o envío.
9. Una nueva acción en tarjeta se implementa sin rehacer la composición global.
10. Catálogo, costos, contactos y condiciones de demo están identificados; los datos reales requieren aprobación y procedencia.

Estos criterios se documentan; no se ejecutaron pruebas ni se implementó el producto nuevo en esta revisión.
