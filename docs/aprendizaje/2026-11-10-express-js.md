# 2026-11-10 — Express.js: rutas, solicitudes y respuestas HTTP

## Contexto
Resumen del material de clase compartido en `Express_js.pdf`. Esta nota registra conceptos explicados en el material; no afirma que se haya completado una práctica.

## Qué aprendí
- Express.js facilita la creación de servidores y rutas HTTP sobre Node.js.
- Una aplicación se crea con `express()` y se pone a escuchar solicitudes con `app.listen(...)`.
- Una ruta relaciona un método HTTP, una dirección y una función que procesa la solicitud.
- `req.params` contiene valores de segmentos dinámicos como `:id`; `req.query` contiene parámetros de consulta y `req.body` contiene datos enviados en el cuerpo.
- `express.json()` permite interpretar cuerpos JSON para que la aplicación pueda leer `req.body`.
- Desde `res` se puede establecer el código HTTP con `res.status(...)` y responder con JSON, texto o una redirección. Entre los códigos vistos para CRUD están `200`, `201`, `204` y `404`.
- Un CRUD en memoria ayuda a practicar rutas y respuestas, pero sus datos se pierden cuando el proceso se reinicia.
- `express.Router()` permite separar rutas por recurso y montarlas bajo un prefijo.
- El material propone organizar responsabilidades en archivos como rutas, controladores, servicios y modelos, y distinguir la configuración de la aplicación (`app.js`) del punto de entrada del servidor (`index.js`).
- Las variables de entorno permiten configurar valores por ambiente; los secretos de `.env` no deben compartirse en el repositorio.

## Cómo se aplicó en Vértice
No se modificó el código del producto. El contenido queda como referencia de aprendizaje para futuras clases y cambios autorizados.

## Errores y cómo se resolvieron
No se reportaron errores de la práctica de Express en el material compartido.

## Lo que todavía no me queda claro
- Cómo aplicar estas rutas y códigos HTTP en un ejercicio propio de clase.

## Preguntas de repaso
1. ¿Qué partes se combinan para definir una ruta de Express?
2. ¿Cuál es la diferencia entre `req.params`, `req.query` y `req.body`?
3. ¿Qué comunica cada código `200`, `201`, `204` y `404` en el CRUD mostrado?

## Siguiente paso
Continuar con el tema que indique el profesor y practicar las rutas según el ejercicio de clase.

## Continuación
La clase y práctica de middleware se registran en la [nota de aprendizaje](2026-11-10-express-middleware.md) y el [registro de práctica](../practicas/17-middlewares-nodejs.md).
