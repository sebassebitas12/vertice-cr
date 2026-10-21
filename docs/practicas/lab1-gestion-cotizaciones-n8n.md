# LAB1 — Gestión de solicitudes de cotización con n8n

- **Estado:** realizada y demostrada; aprobación del profesor informada por el estudiante.
- **Tipo:** práctica académica de JavaScript, POO e integración de servicios.
- **Repositorio de entrega:** [lab1-gestion-cotizaciones-n8n](https://github.com/sebassebitas12/lab1-gestion-cotizaciones-n8n).

## Objetivo

Recibir solicitudes de cotización por correo, identificar el producto y la cantidad, consultar inventario y precio, guardar cada solicitud y responder automáticamente. La extensión agrega consulta y análisis del historial para mostrar tendencias recientes de disponibilidad.

## Partes del trabajo

- `clases.js` contiene las clases de producto, cotización e historial.
- `main.js` demuestra los casos locales con `node main.js`.
- `db.json` proporciona los datos de ejemplo a JSON Server.
- `generate_workflow.js` incorpora la lógica JavaScript a nodos Code y genera el JSON que se importa en n8n.
- `n8n_workflow_escenario3.json` contiene el flujo original; `n8n_workflow_escenario3_extension.json` conserva el flujo y agrega la consulta y análisis de tendencia.
- n8n llama al servicio JSON Server por HTTP; no importa las clases locales ni abre `db.json` desde el workflow.

## Recorrido y responsabilidades

1. Gmail Trigger revisa la bandeja conectada mediante OAuth 2.0 y activa el flujo para un mensaje que coincide con la búsqueda configurada.
2. El código limpia el cuerpo y las respuestas citadas; extrae intención, producto y cantidad del lenguaje cotidiano.
3. La validación evita cotizar solicitudes incompletas o ambiguas.
4. HTTP Request consulta el catálogo en JSON Server. JavaScript compara la cantidad solicitada con las existencias y calcula el total cuando corresponde.
5. La extensión consulta `/solicitudes`, calcula la tendencia con JavaScript y agrega los campos analíticos al registro.
6. DeepSeek prepara una sugerencia interna; la lógica local mantiene el control de precios y disponibilidad.
7. HTTP Request guarda la solicitud. Gmail marca el mensaje como leído y responde en el mismo hilo.

## Casos comprobados

- Una solicitud en lenguaje natural para dos laptops recibió una respuesta con precio unitario y total estimado.
- Una solicitud por un mouse sin existencias recibió una respuesta de disponibilidad insuficiente.
- La extensión contempla el estado `datos insuficientes` hasta reunir cuatro cotizaciones válidas del mismo producto. Con cuatro, compara las dos anteriores con las dos más recientes.

## Evidencia

El [repositorio de la práctica](https://github.com/sebassebitas12/lab1-gestion-cotizaciones-n8n) conserva los dos JSON de workflow, el código local, la base de ejemplo y capturas redactadas. La aprobación de la demostración se registra según lo informado por el estudiante; no se trasladan capturas ni correos personales a este repositorio.

## Límite de aplicación a Vértice

El flujo académico utiliza productos con stock y precios de ejemplo. Vértice fabrica modelos por pedido, así que ese inventario no se reutiliza. En el futuro puede estudiarse el patrón de integración, pero una cotización personalizada de Vértice debe mantenerse en `PENDING_QUOTE` hasta que existan reglas, datos aprobados y revisión apropiada.

Consulta también la [nota de aprendizaje sobre n8n](../aprendizaje/2026-10-19-automatizacion-cotizaciones-n8n.md).
