# Práctica 17 — Middlewares en Node.js

**Fuente:** `practica_middlewares_nodejs.pdf`, sección de API REST de tareas.
**Estado:** práctica implementada con asistencia de IA y verificada localmente; capturas de pantalla pendientes.

## Objetivo

Practicar el paso de una solicitud por middlewares de Express, continuar con `next()`, proteger rutas por token y rol, validar datos y manejar errores de forma centralizada.

## Alcance del ejercicio

- API de tareas almacenadas en memoria.
- Rutas públicas para listar tareas y consultar una por ID.
- Ruta protegida para crear tareas.
- Ruta protegida por token y rol `admin` para eliminarlas.
- Cuatro middlewares propios: logger, autenticación/autorización, validación y manejo de errores; además, respuesta 404 para rutas desconocidas.

## Estado verificado

- Los ocho casos de prueba definidos en el PDF respondieron con los estados esperados en la copia local.
- La sintaxis de los archivos JavaScript pasó la comprobación y `npm audit --omit=dev` reportó cero vulnerabilidades en la ejecución revisada.
- No se generaron capturas; deben agregarse para completar ese entregable.

Esta práctica se desarrolló en una carpeta independiente. El código de la solución no se incorpora a Vértice; aquí se conserva el aprendizaje.