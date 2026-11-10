# 2026-11-10 — Middleware y manejo de errores en Express

## Para qué sirve esta práctica

Evitar que toda petición llegue directamente a la operación de la ruta. Los middlewares revisan o preparan la solicitud antes, y permiten continuar o responder con el código adecuado.

**Idea corta:** cada petición avanza por una cadena de controles.

## Recorrido de una petición

`logger → express.json() → controles de la ruta → operación → respuesta`

- `next()` significa «continuá con el siguiente paso».
- `res.status(...).json(...)` responde y termina esa petición.
- `next(error)` envía el error al manejador central.
- Si un middleware no responde ni llama `next`, la solicitud queda esperando.

## Los cuatro middlewares de la práctica

1. **Logger (`middlewares/logger.js`)**: corre primero para todas las rutas. Cuando la respuesta termina (`res.on('finish')`), registra fecha, método, URL, estado HTTP y duración.
2. **Autenticación y autorización (`middlewares/auth.js`)**: `authenticate` revisa el token Bearer y guarda el usuario en `req.user`. `authorize('admin')` revisa el rol. En esta práctica los tokens de ejemplo son fijos; no son JWT ni credenciales para producción.
3. **Validación (`middlewares/validateTask.js`)**: antes de crear una tarea revisa que `titulo` tenga entre 3 y 100 caracteres y que `prioridad`, si viene, sea `baja`, `media` o `alta`. Devuelve todos los errores encontrados.
4. **Errores (`middlewares/errorHandler.js`)**: `notFound` responde cuando la URL no existe. `errorHandler(err, req, res, next)` recibe errores enviados con `next(error)` y responde con `err.status`, o 500 si no hay un estado definido.

## Orden y ejemplos

En `app.js`, el orden es: logger global, `express.json()`, rutas, `notFound` y `errorHandler` al final. En las rutas protegidas también importa el orden:

- Crear: `authenticate → validateTask → crear tarea`.
- Eliminar: `authenticate → authorize('admin') → eliminar tarea`.

Resultados que conviene distinguir:

- **400**: datos enviados inválidos.
- **401**: falta un token válido.
- **403**: hay una cuenta autenticada, pero su rol no permite la acción.
- **404**: la tarea o la ruta no existe.
- **500**: error inesperado sin estado específico.

## Qué debo entender

- Un middleware puede continuar, responder o reportar un error; no debe dejar la solicitud detenida.
- `next()` avanza por la cadena; `next(error)` salta al manejador de errores.
- La autenticación identifica la cuenta; la autorización revisa sus permisos.
- La validación ocurre antes de guardar datos.
- Una tarea que no se encuentra es un error de la ruta; una URL desconocida la atiende `notFound`.

## Relación con lo ya visto

Las rutas conectan solicitudes HTTP con operaciones CRUD. El middleware prepara y controla la solicitud antes de que esa operación se ejecute. Las tareas de esta práctica viven en un arreglo de JavaScript, no en MySQL; al reiniciar el servidor se pierden.

## Práctica y validación

El proyecto de la práctica se implementó con asistencia de IA en la carpeta independiente `C:\Documentos\Practica-Backend\Middlewares en Node`; no se copió su código a Vértice. Se verificaron los ocho casos HTTP indicados por el PDF, la sintaxis de los archivos JavaScript y la auditoría de dependencias. Las capturas de pantalla que pide el enunciado todavía están pendientes.

Registro: [práctica de middlewares](../practicas/17-middlewares-nodejs.md). La explicación de rutas de Express está en [Express.js](2026-11-10-express-js.md).