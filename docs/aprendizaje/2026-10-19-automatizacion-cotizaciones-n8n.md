# 2026-10-19 — Automatización de cotizaciones por correo con n8n

- **Área:** Backend — automatización e integración de servicios.
- **Estado:** práctica completada y demostrada; el estudiante informa que el profesor la aprobó.
- **Fuente:** [LAB1 — Escenario 3](https://github.com/sebassebitas12/lab1-gestion-cotizaciones-n8n), práctica y extensión de historial/tendencia.
- **Alcance:** registro de arquitectura y aprendizajes; no se copian credenciales ni se integra esta solución académica a la aplicación de Vértice.

## Contexto

El ejercicio automatiza solicitudes de cotización recibidas por correo. Se trabajó con clases de JavaScript, un catálogo didáctico, JSON Server y un workflow de n8n. La extensión añadió el análisis del historial de solicitudes.

## Qué aprendí

- **Los archivos locales no se cargan solos en n8n.** `clases.js` y `generate_workflow.js` viven en el proyecto local. El generador incorpora el código de las clases dentro de los nodos Code y crea el JSON importable. Para actualizar el workflow después de cambiar el código local hay que regenerar y volver a importar la exportación.
- **n8n no lee directamente `db.json`.** JSON Server publica el contenido como una API REST. Los nodos HTTP Request consultan `/productos` y `/solicitudes` mediante GET y guardan el resultado con POST.
- **Un workflow coordina servicios y lógica.** El Gmail Trigger recibe mensajes usando credenciales OAuth 2.0; el flujo procesa el correo, consulta el catálogo, calcula la respuesta y guarda la solicitud. En esta configuración el trigger revisa mensajes periódicamente.
- **La extracción del correo tiene que aceptar lenguaje real.** El parser limpia respuestas citadas, normaliza mayúsculas y tildes, reconoce alias de productos y cantidades en cifras o palabras. Si encuentra datos ambiguos o incompletos, solicita aclaración en vez de inventarlos.
- **La regla comercial es código determinista.** JavaScript decide si la solicitud es válida, compara cantidad con stock y calcula el total. DeepSeek redacta una sugerencia interna; no decide precio, disponibilidad ni estado.
- **El historial es información persistente.** La extensión consulta solicitudes anteriores del mismo producto y agrega la actual al análisis. Con cuatro cotizaciones válidas compara la disponibilidad de las dos anteriores con las dos más recientes; `rechazada` queda fuera. Con menos de cuatro, informa que faltan datos.

## Recorrido del workflow

Gmail Trigger → extracción y validación → GET del catálogo → cálculo de estado y total → GET del historial → análisis de tendencia → sugerencia interna de DeepSeek → combinación y POST de la solicitud → marcar correo como leído → responder en el hilo original.

La respuesta del cliente presenta la cotización. La tendencia se conserva como dato interno de análisis y no modifica el precio ni el estado de esa solicitud.

## Verificación reportada

Se observó una respuesta automática para una solicitud cotidiana de dos laptops, con precio unitario y total calculado a partir del catálogo de prueba. También se probó la ruta sin existencias con un mouse. El estudiante informó que el profesor aprobó la demostración del workflow.

La exportación de la extensión y las capturas con datos personales ocultos están en el [repositorio de entrega](https://github.com/sebassebitas12/lab1-gestion-cotizaciones-n8n).

## Incidencias observadas

- El parser inicial esperaba campos rígidos y no entendía bien mensajes cotidianos. Se amplió para extraer producto y cantidad del texto y pedir aclaración cuando no puede decidir con seguridad.
- Al probar la extensión, seguía publicada la versión original del workflow. Se publicó la exportación de la extensión y se confirmó su ejecución con un correo entrante.

## Qué podría servir a Vértice

La separación entre recepción, validación, consulta de datos y respuesta es un patrón útil para estudiar futuras integraciones. No se trasladan el inventario ni los precios del ejercicio: Vértice fabrica por pedido y no se deben prometer existencias, precios o plazos sin reglas y datos aprobados. Una solicitud personalizada sin cotizar continúa en `PENDING_QUOTE` y requiere revisión según las reglas del negocio.

## Artefactos y límites

El código y las exportaciones de n8n permanecen en el repositorio de la práctica. Esta nota registra lo aprendido y no certifica características de producción de Vértice.
