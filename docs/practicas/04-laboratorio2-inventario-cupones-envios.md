# Laboratorio 2 — Tienda online con inventario, cupones y envíos

- **Estado:** realizado, según informó Sebastián.
- **Caso:** 5 — E-commerce / logística.
- **Fuente:** enunciado del Laboratorio #2, React + Node.js + base de datos + IA.
- **Carácter:** ejercicio académico; no es el backend ni el frontend oficial de Vértice CR.

## Objetivo

Construir una aplicación full stack con una API REST propia, PostgreSQL, un frontend React y un agente de IA en n8n. El caso exige validar reglas de inventario, cupones, envíos y estados de órdenes en el servidor.

## Alcance realizado

### Base de datos y API

- Esquema relacional con productos, clientes, cupones, usos de cupones, tarifas de envío, órdenes y artículos de orden.
- CRUD de productos y clientes.
- Consulta de órdenes con cliente, cupón y artículos relacionados.
- Creación de órdenes con transacción, validación de stock, cupón, envío y descuento de existencias.
- Cambio de estado de órdenes y reposición de stock al cancelar cuando corresponde.
- Endpoint de resumen con agregaciones SQL.
- Respuestas de éxito y error con códigos HTTP, incluidos `400`, `404` y `409`.

### Frontend

- Aplicación React creada con Vite y navegación con React Router.
- Catálogo con búsqueda, categoría y ordenamiento.
- Carrito y formulario de nueva orden.
- Historial, detalle y cambio de estado de órdenes.
- Dashboard conectado al endpoint de resumen.
- Capa de servicios y hook reutilizable para estados de carga, datos y error.
- Gestión de piezas para completar el CRUD de la práctica; sin autenticación, por lo que no es apta para publicación como sistema real.

### Agente de IA

- Workflow local con `Webhook → Validar solicitud → AI Agent → Respond to Webhook`.
- Generación de descripción y recomendaciones relacionadas con el carrito.
- Respuesta normalizada mediante `{ ok, data, error }`.
- Prueba inicial con respuesta exitosa en Postman; al cierre también se confirmó una descripción desde el catálogo web (ejecución n8n #123 exitosa) y se observaron recomendaciones en el checkout.

## Verificación de cierre

- Backend: `npm run test:smoke` pasó; comprobó errores, rollback, métricas y limpieza de la ficha temporal.
- Frontend: `npm test` pasó con 3 pruebas y `npm run build` terminó correctamente.
- Lint: sin errores; quedan 3 advertencias en `useFetch`, `CartContext` y `OrderDetailPage`.
- Catálogo: se revisó la tarjeta textual del hero y la legibilidad del tema claro y oscuro; se conservaron las fotos que corresponden como referencias académicas.
- n8n: la instancia local muestra el workflow como `Published`; el archivo exportado conserva `active: false`, por lo que su estado debe comprobarse después de importarlo. No se modificó el workflow publicado.

Este registro no certifica el dominio individual de cada tema ni reemplaza la defensa académica. Solo conserva lo realizado y comprobado durante la práctica.

## Relación con Vértice CR

El laboratorio aporta práctica reutilizable sobre APIs, validación en servidor, transacciones, servicios React, métricas, revisión visual enfocada y contratos de automatización. No se traslada literalmente el modelo de inventario: Vértice fabrica modelos bajo pedido y no debe presentar stock inmediato sin datos aprobados.

La rama `Pruebas` de `Tienda-de-Impresion3D` se revisó como referencia histórica del frontend, pero no se modifica ni se usa como base de código para esta práctica. El workflow simple de este laboratorio se conserva como ejercicio; una futura integración de Vértice deberá seguir un workflow n8n unificado y sus contratos propios.

Como criterio para una futura aplicación, catálogo público y gestión protegida son necesidades distintas. Este laboratorio no incluye login; la autenticación y autorización de administración siguen pendientes para cualquier sistema real.

## Límites

- Los datos, precios, tarifas y reglas son académicos o de demostración.
- El workflow no constituye una integración de producción.
- No se incorporan credenciales, secretos ni datos privados.
- No se crea todavía `app/` ni se implementa una funcionalidad de producto en este repositorio.
