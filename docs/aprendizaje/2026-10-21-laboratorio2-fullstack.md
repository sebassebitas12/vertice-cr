# 2026-10-21 — Laboratorio 2 full stack

## Contexto

Se realizó el Laboratorio #2, Caso 5: una tienda online con inventario, cupones y envíos. El ejercicio combina React con Vite, React Router, Node.js, Express, PostgreSQL y n8n. El registro completo de la práctica está en [04-laboratorio2-inventario-cupones-envios](../practicas/04-laboratorio2-inventario-cupones-envios.md).

## Qué aprendí

- Una API REST debe conservar las reglas de negocio en el servidor; el frontend solo puede anticipar validaciones y mostrar estados.
- Las relaciones y restricciones de PostgreSQL protegen la consistencia de los datos.
- Una operación que crea una orden y descuenta stock necesita una transacción para completarse o revertirse como unidad.
- `FOR UPDATE` ayuda a proteger filas involucradas en una operación concurrente.
- Los códigos `400`, `404` y `409` expresan problemas distintos: datos inválidos, recurso inexistente y conflicto con una regla de negocio.
- React Router organiza vistas y servicios como `api.js` evitan repartir llamadas HTTP por los componentes.
- Un hook como `useFetch` permite reutilizar los estados de carga, datos, error y recarga.
- Las métricas pueden calcularse con `SUM`, `COUNT`, `AVG` y `GROUP BY` en la base de datos antes de mostrarse en React.
- Un webhook de n8n necesita un contrato estable para que el frontend pueda distinguir éxito, datos y error.
- La IA puede redactar o recomendar, pero las operaciones deterministas —stock, cupones, totales y estados— deben validarse con código.

## Cómo se aplicó en este laboratorio

Se implementó una API con productos, clientes, cupones, tarifas, órdenes y artículos de orden. El frontend consumió esa API mediante una capa de servicios, mostró errores del servidor y presentó catálogo, carrito, órdenes y métricas. n8n recibió una solicitud por webhook y devolvió `{ ok, data, error }`.

El trabajo fue realizado en `Laboratorio2/`. Esta nota no copia la solución ni convierte el laboratorio en código del startup.

## Relación con Vértice CR

La aplicación de impresión 3D de `Tienda-de-Impresion3D`, rama `Pruebas`, fue revisada únicamente como referencia de un MVP anterior y no se modificó. El repositorio `vertice-cr` conserva el aprendizaje y las decisiones futuras; todavía no contiene la aplicación `app/`.

El patrón de transacciones, validación en servidor, servicios, métricas y contrato JSON puede servir más adelante. El modelo de inventario del caso no se copia: Vértice trabaja con fabricación bajo pedido y una solicitud personalizada sin cotizar no debe convertirse en un precio cero.

Para una futura integración de IA en Vértice se mantiene como dirección el workflow n8n unificado. El workflow simple del laboratorio queda como evidencia de aprendizaje, no como integración definitiva.

## Errores y límites registrados

La práctica incluyó casos negativos con `400`, `404` y `409`, además de pruebas de conflictos de negocio. No se agregan aquí fallos que no hayan sido observados o comunicados. Los prompts y correcciones del desarrollo permanecen en la bitácora del Laboratorio 2.

## Lo que todavía no me queda claro

- Cómo trasladar estas reglas a un dominio de fabricación bajo pedido sin inventar stock o precios comerciales.
- Qué contratos y herramientas tendrá el workflow unificado de Vértice cuando se inicie la aplicación.

## Preguntas de repaso

1. ¿Por qué el frontend no puede ser la fuente confiable del stock?
2. ¿Qué problema evita una transacción al crear una orden?
3. ¿Cómo distingue React un `400` de un `409`?

## Siguiente paso

Continuar la ruta frontend con TypeScript, Next.js, validación de formularios y accesibilidad cuando esos temas aparezcan en el curso. La dirección visual de Vértice se definirá en una fase aparte antes de construir su interfaz.
