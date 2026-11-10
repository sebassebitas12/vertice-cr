# 2026-11-10 — Express: middleware, validación y manejo de errores

## Contexto
Resumen del material de clase *Middleware, validación y errores* (14 diapositivas). Registra lo explicado en el PDF; la práctica adicional de API de tareas se documenta aparte.

## Middleware
Un middleware es una función que procesa una solicitud durante el recorrido entre el cliente y la respuesta. Recibe `req`, `res` y `next`; puede modificar la solicitud, responder y terminar el recorrido, continuar con `next()` o pasar un error con `next(err)`.

Express permite registrar middleware para toda la aplicación, para un router o para una ruta. También hay middleware integrado, como `express.json()`, middleware de terceros y middleware de errores. El orden de registro importa porque determina qué funciones atraviesa cada solicitud.

Un orden general visto en clase es: seguridad y configuración de cabeceras, parseo del cuerpo, autenticación, validación, controlador y servicio; después de las rutas se responde a recursos no encontrados y, al final, se centralizan los errores.

## Validación de solicitudes
Los valores de `req.params`, `req.query` y `req.body` provienen del cliente y deben tratarse como datos no confiables. Se revisan tipo y formato; las reglas propias del negocio, como existencia previa o stock disponible, se verifican donde corresponde en la lógica del servicio.

La validación manual puede repetir lógica, mezclar responsabilidades con el controlador y dejar pasar campos no permitidos. Un esquema permite describir las reglas una vez y validarlas mediante un middleware. El material menciona Zod, Joi y express-validator. El cliente no debe poder asignarse propiedades sensibles como su rol enviándolas en el cuerpo.

Los errores de validación pueden responderse con HTTP 400 o 422; el equipo debe elegir una política y aplicarla de forma consistente. La respuesta puede incluir una lista de campos y mensajes para que la interfaz señale cada problema.

## Errores y respuesta centralizada
El material distingue errores operacionales esperados —por ejemplo, recurso inexistente, datos inválidos, credenciales incorrectas o un conflicto por duplicación— de errores de programación, como un acceso a una propiedad indefinida o una promesa sin manejar.

Los errores esperados pueden representarse con un error de aplicación que conserve el código HTTP y el mensaje público apropiado. El middleware central recibe cuatro parámetros (`err, req, res, next`) y se registra después de las rutas y de la respuesta 404. Los errores inesperados se registran para diagnóstico y responden como un fallo interno genérico, sin exponer detalles del servidor al cliente.

Códigos revisados: 400/422 para validación según la política elegida, 401 para falta de credenciales válidas, 403 para falta de permiso, 404 para recurso o ruta inexistente, 409 para conflicto y 500 para fallo interno inesperado.

## Registro de solicitudes
Un logger puede anotar método, ruta, código de respuesta y duración. El evento `finish` permite medir el tiempo cuando la respuesta ya terminó. El material cita Morgan, Pino HTTP y Winston como opciones de registro, y muestra Helmet, CORS, express-rate-limit y compression como middleware de terceros con propósitos distintos.

## Relación con lo anterior
Los middlewares amplían el flujo de rutas y respuestas de Express estudiado previamente. La autenticación y autorización con JWT ya se registraron en el mini proyecto, pero esta nota documenta la explicación general de middleware, validación y errores presentada hoy.

## Aplicación a Vértice
Registro académico únicamente: no se modificó el código del producto ni se eligieron nuevas dependencias para Vértice.

## Práctica
La práctica adicional de API de tareas se implementó por separado con asistencia de IA y se verificaron los ocho casos del enunciado. Las capturas de pantalla solicitadas siguen pendientes. Consultá el [registro de la práctica](../practicas/17-middlewares-nodejs.md).

## Fuente
archivo de clase compartido *Middleware_Validacion_Errores.pptx.pdf* (14 diapositivas).
