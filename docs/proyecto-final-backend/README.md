# Anteproyecto — MVP profesional de Vértice CR

Registro de trabajo: 2026-10-22. Proyecto final de backend y posible demo de hackathon. Se prepara el problema, alcance, interfaz y arquitectura antes de programar.

## Decisiones de trabajo vigentes

- Aplicación nueva, con backend primero y Supabase como base de datos PostgreSQL administrada.
- IA con n8n como función central: consulta datos reales, propone campos del formulario y ayuda a completar una solicitud confirmada por el cliente.
- Frontend recomendado: **Next.js App Router + TypeScript + Tailwind CSS + componentes propios sobre shadcn/ui**. Formularios con React Hook Form y Zod; movimiento acotado con CSS y Motion cuando haga falta. Motivos, costos y reglas de componentes en [ADR 0002](../decisiones/0002-frontend-mvp.md).
- Dirección visual confirmada: combinar la claridad y protagonismo de producto de N3D con una reinterpretación de la identidad industrial anterior de Vértice. Se rehace la composición para el alcance actual; no hay pantallas nuevas aprobadas.
- Sebastián trabaja esencialmente mediante vibe coding y dirige a las IAs como orquestador. Los agentes deben producir cambios localizados, revisar el resultado y preguntar por vacíos de visión que afecten decisiones importantes.

La selección de frontend no promete cambios sin regresiones. La facilidad de añadir un botón depende de la composición de componentes, contratos de datos y estilos encapsulados. El ADR define cómo hacerlo.

## Dos horizontes

| Horizonte | Propósito |
|---|---|
| MVP académico profesional | Resolver un flujo real, demostrable y alcanzable en el calendario del curso/hackathon. |
| Startup comercial después de graduarse | Validar lanzamiento, operación, precios, producción, pagos, logística y soporte reales. |

El [ADR 0001](../decisiones/0001-stack.md) corresponde al startup futuro. El MVP es una base de aprendizaje y validación; sus datos de demo no prueban demanda ni resultados comerciales.

## Problema y usuario objetivo

**Hipótesis por validar:** una persona o pequeño negocio necesita una pieza funcional, repuesto o prototipo que no encuentra con facilidad; no sabe cómo especificarlo ni dónde seguir la revisión y cotización de una impresión FDM.

Usuario inicial candidato: quien tiene una necesidad concreta de pieza y puede explicar su uso, aunque no conozca terminología de impresión 3D. Usuario operativo: quien revisa y cotiza en el taller. Las entrevistas deben definir un segmento más preciso y comprobar si FDM resulta una solución adecuada.

No afirmar que este problema ocurre con cierta frecuencia, costo o gravedad sin evidencia.

## Investigación y fuentes

- [Revisión directa de N3D y propuesta verificable de IA](referencia-n3d-y-demo-ia.md): portada, catálogo, ficha y calculadora. Inspección visual en viewport estrecho; herramientas de miembros y compras no verificadas.
- [Documento 04 anterior](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/Pruebas/docs/04-DISENO-VISUAL-Y-ACCESIBILIDAD.md): referencias de componentes y dirección visual, evaluadas en el ADR 0002. Sus contratos académicos y mockups congelados no se heredan automáticamente al producto nuevo.
- [Repositorio anterior, rama Pruebas](https://github.com/sebassebitas12/Tienda-de-Impresion3D/tree/Pruebas): experiencia y antecedentes; no se copia el código.
- [Negocio heredado](../negocio/README.md): contexto del catálogo bajo pedido y cotización técnica; debe revisarse al migrar reglas.
- Guía compartida de Proyecto Final Full Stack / Business Solutions: investigación, entrevistas, alternativas, MVP y propuesta de 2–4 páginas con once secciones.
- PDF compartido FWD Temas Complementarios IA: banco de investigación. No impone features ni valida por sí mismo afirmaciones de actualidad.

Antes de cerrar la propuesta: realizar 3–5 entrevistas sobre casos recientes, dibujar el proceso actual, cuantificar problemas con datos aportados y comparar 2–3 alternativas. Separar el hallazgo del supuesto. No usar “¿usarías mi app?” como prueba de demanda.

## Recorrido central y alcance

**Cliente describe necesidad → IA busca opciones del catálogo → cliente elige una opción o revisa una solicitud personalizada → confirma → el taller recibe el registro.**

Cinco capacidades del MVP:

1. Catálogo pequeño, publicado y buscable de modelos fabricados bajo pedido.
2. Asistente con n8n que consulta ese catálogo y explica coincidencias respaldadas por datos.
3. Formulario editable coordinado con el asistente, con campos sugeridos y confirmados diferenciados.
4. Confirmación y guardado de la solicitud por la API en Supabase, con propietario y prevención de duplicados.
5. Bandeja del taller para revisar, pedir aclaraciones y preparar una cotización manual; cliente consulta su respuesta.

Autenticación cliente/admin y autorización respaldan el flujo. Una solicitud sin precio se conserva como pendiente de cotización. Aceptar una cotización es una decisión explícita del cliente; cualquier creación de pedido posterior debe validar la oferta y su versión.

Las capacidades del taller siguen limitadas a FDM con materiales confirmados. No prometer tolerancias, plazos, disponibilidad ni compatibilidad técnica que no estén respaldados.

## Pantallas previstas

| Pantalla | Tarea |
|---|---|
| Portada | Explicar la propuesta y dar acceso a catálogo o solicitud. |
| Catálogo y ficha | Encontrar opciones y entender sus datos aprobados. |
| Solicitud asistida | Describir, comparar sugerencias, editar y confirmar. |
| Acceso y cuenta | Identificar al cliente y recuperar sus solicitudes. |
| Bandeja y detalle del taller | Revisar el expediente y preparar la respuesta/cotización. |

En escritorio, conversación y formulario pueden convivir; en móvil deben conservar continuidad sin tapar campos ni acciones. Esta disposición aún debe diseñarse y revisarse.

## Contrato de autocompletado IA

- La IA devuelve datos estructurados y referencias a productos. No ejecuta código arbitrario en la página.
- Cada campo conserva su valor y procedencia: cliente, sugerencia IA o aceptación del cliente.
- Una respuesta tardía no sobreescribe una edición posterior. Una sugerencia conflictiva se presenta para revisión.
- El cliente puede editar y deshacer propuestas antes de confirmar.
- Las incógnitas quedan sin completar y se preguntan; no se infieren medidas o material con certeza falsa.
- La API valida permisos y datos antes de guardar. La conversación no equivale a autorización.
- Ante errores se conserva el borrador y se ofrece recuperación.
- El cálculo de precios requiere entradas verificables y código determinista. La cotización firme queda bajo revisión del taller.

n8n coordina herramientas acotadas de catálogo, información técnica y preparación de solicitud mediante la API. Las claves de Supabase y proveedores permanecen en servidor. Contratos concretos de endpoints y autenticación se definirán con el backend del curso.

## Arquitectura de referencia

Frontend Next.js → API de negocio → Supabase.
La API coordina n8n y valida cualquier escritura solicitada por el flujo.
El resultado estructurado de n8n vuelve a la página para presentar tarjetas y sugerencias de campos.

La implementación exacta de backend se ajustará a los requisitos del curso. La elección de Supabase ya está confirmada; se usará un proyecto del MVP, separado de la extensión de gimnasio.

## Exclusiones iniciales

Cobros reales, facturación fiscal, logística integrada, marketplace, agentes autónomos, generación de geometría imprimible y cotización precisa de piezas nuevas desde una foto. La carga privada de archivos es una ampliación a decidir según la necesidad validada; no es indispensable para demostrar el primer recorrido.

## Criterios de aceptación

1. Las recomendaciones remiten a IDs existentes y datos publicados; la ausencia de coincidencia se comunica.
2. Las sugerencias se reflejan en campos revisables sin perder texto ni ediciones confirmadas del cliente.
3. La solicitud solo se envía con confirmación explícita y conserva su registro al recargar.
4. Repetir la confirmación no crea duplicados.
5. El taller ve el mismo expediente; otro cliente no puede leerlo.
6. Un fallo del modelo/n8n no informa un guardado inexistente ni destruye el borrador.
7. Se completa el recorrido en móvil y con teclado; estados de carga, vacío, error y éxito son comprensibles.
8. Añadir una acción a una tarjeta modifica el componente y su acción, sin reestructurar páginas ajenas.

Son condiciones propuestas; aún no se implementó ni verificó la aplicación nueva.

## Plan y preguntas pendientes

1. Completar entrevistas y validar el problema, segmento, alternativas y métricas de base.
2. Traducir la dirección visual combinada a unas pocas composiciones y componentes; revisar con Sebastián.
3. Definir datos, estados, permisos y contrato API/n8n; confirmar requisitos del profesor y hackathon.
4. Implementar primero el backend del recorrido con un catálogo de demo curado.
5. Construir el frontend modular y conectar el autocompletado.
6. Preparar una demo con coincidencia, datos faltantes, solicitud confirmada y recuperación de fallo.

Pendiente: segmento validado, backend exigido por el curso, requisitos de entrega/hackathon, recursos visuales autorizados y diseño concreto de pantallas. El stack recomendado y el criterio de trabajo con IA están documentados; no se requiere que Sebastián revise código manualmente para dirigir decisiones de producto.
