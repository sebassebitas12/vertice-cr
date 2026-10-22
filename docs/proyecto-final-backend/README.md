# Anteproyecto académico — MVP de Vértice CR

> Este documento define una propuesta para el proyecto final del curso de backend y una posible demo de hackathon. No reemplaza la visión del startup ni aprueba su lanzamiento comercial.

## Dos horizontes, dos decisiones

| Horizonte | Propósito | Estado |
|---|---|---|
| **MVP académico profesional** | Resolver un flujo real y demostrable con el backend del curso, dentro del calendario del proyecto final/hackathon. | En investigación; falta validar el problema y confirmar requisitos del curso. |
| **Startup Vértice CR** | Evolucionar a un negocio lanzable después de graduarse, con procesos, precios, fabricación, atención y operación reales. | Visión de largo plazo; fuera de las decisiones de este anteproyecto. |

La decisión de stack del startup en [ADR 0001](../decisiones/0001-stack.md) permanece independiente y abierta. Este anteproyecto no la modifica. Tampoco convierte Supabase, el laboratorio del gimnasio, la interfaz de la referencia australiana ni la aplicación académica anterior en decisiones del startup.

## Punto de partida y fuentes

- La guía **Proyecto Final Full Stack — Ideas / Business Solutions** pide partir de un problema real, observar el proceso actual, realizar 3–5 entrevistas sobre hechos, cuantificar el problema, comparar 2–3 alternativas y seleccionar 3–5 funciones mínimas. La propuesta debe cubrir problema, usuarios, alternativas, solución, MVP, stack, arquitectura, datos, métricas, cronograma y riesgos.
- Sebastián describe como hipótesis que una persona o negocio puede necesitar una pieza o repuesto que no logra encontrar fácilmente y requiere una forma clara de pedirlo y dar seguimiento al pedido. La investigación debe confirmar si ese caso sucede, a quién y con qué impacto.
- [N3D Melbourne](https://www.n3dmelbourne.com/) es una referencia visual elegida por Sebastián, no un diseño que se copiará. La página devolvió acceso 403 al navegador de investigación; no afirmo haber revisado sus pantallas o flujos. La referencia visual queda pendiente de inspección directa.
- [Tienda-de-Impresion3D, rama Pruebas](https://github.com/sebassebitas12/Tienda-de-Impresion3D/tree/Pruebas) sirve como referencia de experiencia, reglas e historial de aprendizaje. Su README describe React 19, Vite 8 y JavaScript/JSX. La rama predeterminada no representa esa aplicación. La nueva app del curso se construirá desde cero; no copiará su interfaz ni código.
- Los documentos heredados de [producto y alcance](../negocio/heredado/01-PRODUCTO-Y-ALCANCE.md), [reglas y estados](../negocio/heredado/02-NEGOCIO-Y-ESTADOS.md) y [flujos](../negocio/heredado/03-UX-Y-FLUJOS.md) aportan antecedentes, pero advierten que varios requisitos nacieron de una entrega académica anterior. No se asumirán como evidencia de demanda, precios o capacidad operativa.
- El PDF **FWD — Temas Complementarios IA** es un banco de temas para investigar y exponer, no una lista de funcionalidades obligatorias. Sus afirmaciones de actualidad deben verificarse con fuentes primarias antes de incluirlas en una propuesta.

## Hipótesis de problema

> **Hipótesis, aún no validada:** cuando una persona o un pequeño negocio necesita una pieza funcional, repuesto o prototipo que no encuentra con facilidad, no tiene un canal claro para explicar qué necesita, saber qué información aportar y dar seguimiento a la revisión y cotización de una posible impresión 3D.

La hipótesis todavía no decide si el mejor segmento son negocios, talleres, emprendedores o consumidores. Las entrevistas deben identificar quién tiene el problema con mayor frecuencia y si la impresión FDM es viable para esos casos.

### Investigación que falta

1. Entrevistar a 3–5 usuarios potenciales y, si es posible, a quien atiende solicitudes en Vértice.
2. Preguntar por casos recientes: qué pieza necesitaban, dónde la buscaron, cómo resolvieron el problema, cuánto tardaron, qué información tenían y qué ocurrió al pedir ayuda.
3. Registrar frecuencia, tiempo de atención, solicitudes incompletas, cotizaciones que no avanzaron y costos solo cuando la persona pueda aportar datos reales.
4. Comparar 2–3 alternativas usadas hoy, incluyendo proveedores, catálogos/modelos descargables y el proceso manual existente. No asumir que una alternativa falla sin evidencia.
5. Elegir un segmento concreto y reformular el problema con la evidencia antes de congelar el MVP.

No preguntar si alguien “usaría una app” como prueba de demanda. Buscar hechos y comportamiento pasado.

## Alcance candidato para el MVP del curso

Si las entrevistas confirman la hipótesis, demostrar un solo flujo vertical: **encontrar una opción o pedir una pieza no listada → enviar la solicitud → revisión del taller → recibir y responder a una cotización → consultar el estado del pedido resultante**.

Funciones candidatas, dentro del límite de 3–5:

1. Catálogo pequeño y buscable de modelos fabricados bajo pedido, sin prometer stock inmediato.
2. Solicitud personalizada con descripción, uso, cantidad y referencias disponibles.
3. Bandeja de administración para revisar solicitudes, pedir aclaraciones y preparar una cotización manual.
4. Vista del cliente para consultar la cotización, aceptarla o rechazarla y seguir el estado correspondiente.

La autenticación cliente/admin y el registro de estados respaldan este flujo. Solo se crea un pedido después de que el cliente acepta una cotización válida. El proyecto puede usar datos demostrativos etiquetados; no publicará precios, plazos o capacidades como si estuvieran aprobados.

### Fuera del primer alcance

- Cobros reales, facturación fiscal y logística.
- Cotización automática o promesa de precio/entrega generada por IA.
- Análisis automático de fabricabilidad desde una foto o cálculo de precio desde un STL sin herramienta técnica validada.
- Marketplace, chat omnicanal, dashboard avanzado y agentes autónomos.
- Funciones del gimnasio de la extensión académica.

La carga de STL o imágenes aporta valor a una solicitud real, pero aumenta el trabajo y los riesgos de almacenamiento y acceso. Se incluirá solo si el curso y el tiempo permiten hacerla con validación de formato/tamaño y acceso privado. De lo contrario, la demo podrá registrar una descripción y referencias no sensibles, dejando la carga para una etapa posterior.

## Propuesta inicial de stack para el MVP

| Capa | Propuesta académica | Motivo / condición |
|---|---|---|
| Frontend | **React + Vite + JavaScript** | Es la opción más familiar por el repositorio anterior, permite avanzar rápido y consume una API REST. Se programa desde cero. |
| Navegación | React Router, si el flujo requiere varias pantallas | Ya se conoce; mantener rutas mínimas para catálogo, solicitud, cuenta y administración. |
| Backend | **Node.js + Express**, si coincide con el stack del curso | Mantiene reglas y validaciones en una API separada para que el backend sea evaluable y reutilizable. |
| Base de datos | **PostgreSQL** | Adecuada para usuarios, solicitudes, cotizaciones, pedidos y sus relaciones. |
| Alojamiento de BD | Supabase puede considerarse como PostgreSQL administrado, si el profesor lo permite | Usar un proyecto nuevo para Vértice; no conectar la base del gimnasio. Las credenciales quedan solo en el servidor y fuera de Git. |
| Archivos | Pendiente del alcance | Si se implementa carga, usar almacenamiento privado y acceso autorizado; no exponer archivos de clientes en un bucket público. |

Esta propuesta es para el curso, no una decisión del producto real. Antes de fijar Express, PostgreSQL, Supabase o el despliegue, confirmar qué tecnologías exige el curso y qué entorno puede usarse en el hackathon. El cliente web se mantiene separado de la API; no se ponen secretos ni reglas de precios en el navegador.

## Uso prudente de IA

La IA puede ser una mejora demostrable cuando el flujo manual básico ya funcione: convertir una descripción cotidiana en un borrador estructurado de solicitud y señalar datos faltantes. El cliente revisa y confirma ese borrador; la IA no define el precio, acepta la cotización ni promete fabricación.

Del PDF complementario:

- **Spec-driven development** es útil como método de trabajo: especificaciones verificables, criterios de aceptación y documentación antes de implementar.
- **Seguridad y contención de agentes** sirve como criterio transversal si después se conecta IA a archivos o herramientas.
- Los modelos de decisión podrían ayudar a clasificar o enrutar solicitudes cuando existan categorías y casos reales.
- MCP, agentes persistentes, headless AI, voz, modelos autoalojados/en dispositivo y WhatsApp con IA quedan para investigación futura; no son requisitos del MVP por aparecer en el banco temático.

## Métricas a definir con evidencia

No asignar metas inventadas. Tras investigar, escoger métricas posibles como:

- tiempo entre recibir una solicitud y enviar una respuesta/cotización;
- proporción de solicitudes que llegan con información suficiente;
- solicitudes que reciben cotización y que el cliente acepta;
- puntos del proceso donde se abandona o se necesita aclaración.

Primero se necesita una línea base del proceso actual. La demo puede mostrar métricas derivadas de datos de prueba, etiquetados como demostrativos, pero no presentarlas como resultados de negocio.

## Orden de trabajo

1. **Validar problema y permisos:** entrevistas, mapa del proceso actual, alternativas y confirmación con el profesor del backend permitido y del uso de Vértice.
2. **Cerrar propuesta:** usuario objetivo, problema probado, 3–5 funciones, exclusiones, datos, métricas, riesgos y cronograma.
3. **Diseñar el backend:** modelo relacional preliminar, roles, estados, endpoints y errores; criterios de aceptación por flujo.
4. **Construir una rebanada vertical:** solicitud → revisión admin → cotización → decisión del cliente.
5. **Añadir frontend sencillo:** React + Vite consume la API; priorizar claridad y accesibilidad. Revisar N3D directamente cuando sea posible.
6. **Preparar hackathon:** demo guiada con datos demostrativos, caso validado, límites honestos y documentación para ejecutar.
7. **Reevaluar después:** un lanzamiento real requiere validar operación, precios, materiales, tiempos, seguridad de archivos, privacidad, pagos y soporte. Eso pertenece al horizonte del startup.

## Decisiones y preguntas pendientes

- [ ] ¿Qué problema y segmento confirman las entrevistas?
- [ ] ¿Quién puede facilitar acceso a solicitudes reales sin divulgar datos privados?
- [ ] ¿Qué backend, base de datos y despliegue exige o permite el curso?
- [ ] ¿El profesor acepta este producto como proyecto final y qué debe mostrar la demo/hackathon?
- [ ] ¿La carga de archivos es esencial para el caso validado o puede esperar?
- [ ] ¿Qué pantallas y patrones concretos de N3D son los que Sebastián quiere tomar como inspiración visual?
- [ ] ¿React + Vite + JavaScript es el frontend que resulta más cómodo tras un prototipo pequeño?

## Límite entre este anteproyecto y el startup

Este documento solo organiza el proyecto académico profesional. No cambia [ADR 0001 del startup](../decisiones/0001-stack.md), no actualiza promesas de negocio, no declara a Vértice listo para producción y no toma las métricas demostrativas de la aplicación anterior como evidencia comercial.
