# Express, JWT y permisos por rol: cierre del mini proyecto

**Fecha:** 2026-11-09  
**Estado:** mini proyecto reportado como terminado y entregado; conceptos resumidos para aprendizaje.  
**Proyecto de referencia:** [Minimercado La Esquina](https://github.com/sebassebitas12/la-esquina-pos).

## Qué quedó más claro

- **Express** recibe solicitudes HTTP y permite organizar el trabajo entre rutas, controladores y middleware.
- El **CRUD** cubre crear, consultar, actualizar y eliminar recursos. El método y la ruta indican la operación; el código HTTP comunica el resultado.
- Una migración versiona cambios del esquema. Sequelize aplica los cambios a MySQL y registra cuáles ya ejecutó.
- **Autenticación** responde quién hizo la solicitud; **autorización** determina qué puede hacer esa cuenta.
- En el flujo practicado, el inicio de sesión verifica la contraseña y devuelve un JWT. El cliente lo envía como token Bearer y el middleware valida el token antes de permitir acceso a rutas privadas.
- **RBAC** aplica permisos según el rol. El administrador puede consultar y modificar; el lector puede consultar. La API debe hacer cumplir esta regla aunque la interfaz oculte acciones.
- Las contraseñas se comparan mediante hashes; el rol no se recibe libremente desde el formulario de registro. Las claves y secretos de desarrollo permanecen en variables locales y no se publican.

## Evidencia revisada en el proyecto local

El estudiante reportó el proyecto como terminado y entregado. En la copia local se revisaron el backend, la migración de roles y autenticación, y el cliente React. El 2026-11-09 se ejecutaron: migraciones pendientes, comprobación sintáctica de 82 archivos JavaScript del backend, compilación del frontend y los flujos de humo de API, clientes y dominio. Esas comprobaciones terminaron correctamente en esa copia; no equivalen a aprobación del profesor.

Los flujos verificados cubrieron registro e inicio de sesión, respuestas de acceso sin token, consultas con el rol lector y rechazo de cambios al lector. No se copiaron archivos del proyecto a Vértice.

## Para explicar en clase

1. Un `401` indica que falta una autenticación válida; un `403` indica que la cuenta autenticada no tiene permiso para esa acción.
2. Guardar un botón como oculto en React mejora la experiencia, pero no protege el servidor: la autorización también debe comprobarse en Express.
3. El JWT firmado identifica la sesión; no debe tratarse como información cifrada ni incluir contraseñas.
4. La migración describe el cambio de base de datos para que el esquema se pueda reproducir en otro entorno.

## Siguiente tema

Se revisó el enunciado del Quiz #2 de Gestión de Inventarios. La solución, la opción de negocio y el trabajo de equipo siguen pendientes; esta nota no desarrolla el quiz.
