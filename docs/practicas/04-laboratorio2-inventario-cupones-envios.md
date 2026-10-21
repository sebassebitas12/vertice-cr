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

### Agente de IA

- Workflow local con `Webhook → AI Agent → Respond to Webhook`.
- Generación de descripción comercial y recomendaciones relacionadas con el carrito.
- Respuesta normalizada mediante `{ ok, data, error }`.
- Prueba compartida en Postman con respuesta exitosa y sin credenciales exportadas.

## Evidencia informada

- Checkpoint del Día 1 completado.
- Colección de Postman con casos válidos y negativos.
- Frontend levantado localmente y conectado a la API.
- Workflow n8n publicado en la instancia local.

Este registro no certifica el dominio individual de cada tema ni reemplaza la defensa académica. Solo conserva lo realizado y comunicado por el estudiante.

## Relación con Vértice CR

El laboratorio aporta práctica reutilizable sobre APIs, validación en servidor, transacciones, servicios React, métricas y contratos de automatización. No se traslada literalmente el modelo de inventario: Vértice fabrica modelos bajo pedido y no debe presentar stock inmediato sin datos aprobados.

La rama `Pruebas` de `Tienda-de-Impresion3D` se revisó como referencia histórica del frontend, pero no se modifica ni se usa como base de código para esta práctica. El workflow simple de este laboratorio se conserva como ejercicio; una futura integración de Vértice deberá seguir un workflow n8n unificado y sus contratos propios.

## Límites

- Los datos, precios, tarifas y reglas son académicos o de demostración.
- El workflow no constituye una integración de producción.
- No se incorporan credenciales, secretos ni datos privados.
- No se crea todavía `app/` ni se implementa una funcionalidad de producto en este repositorio.
