# 2026-11-04 — ORM y Sequelize con Express

**Estado:** introducción vista; primer modelo y migración ejecutados; mini proyecto en curso.
**Fuente de clase:** *Sequelize modelos, migraciones, controladores y rutas* (PDF de 15 páginas compartido por Sebastián).

## Cómo se conecta con lo que ya sabía de SQL

Un ORM relaciona objetos del programa con tablas relacionales. El modelo describe los campos, tipos, validaciones y asociaciones de una entidad; Sequelize usa ese modelo para consultar o modificar los datos. MySQL sigue siendo el motor de la base de datos: Sequelize genera las consultas en nombre de la aplicación.

Las asociaciones representan cardinalidades que ya había estudiado en el DER. `hasMany` con `belongsTo` describe una relación uno a muchos; la clave foránea queda en la tabla del lado muchos. Para muchos a muchos se usa una tabla intermedia, que Sequelize enlaza con `belongsToMany` y la opción `through`. El ejemplo de autores y libros se discutió como relación N:M; los nombres y el esquema final pertenecen al mini proyecto.

Una migración registra un cambio del esquema con `up` para aplicarlo y `down` para revertirlo. La presentación explica que Sequelize guarda las migraciones ejecutadas en `SequelizeMeta`; en este ejercicio se aplicó una migración, sin probar su reversión.

La API se organiza por responsabilidades: la ruta recibe una URL y un verbo HTTP, el controlador interpreta la petición y arma la respuesta, el modelo interactúa con los datos y la base los persiste. Esto conecta las rutas y controladores de Express con las tablas y operaciones SQL ya conocidas.

## Trabajo observado en la clase

- Se inicializó un proyecto Node con `npm init -y`.
- Se instalaron `express`, `sequelize`, `mysql2` y `dotenv`; como dependencias de desarrollo se agregaron `sequelize-cli` y `nodemon`.
- `npx sequelize-cli init` creó `config/config.json` y las carpetas `models`, `migrations` y `seeders`.
- `npx sequelize-cli model:generate --name Usuario --attributes nombre:string,correo:string,edad:integer` generó un modelo y una migración para `Usuario`.
- La consola informó que `npx sequelize-cli db:migrate` terminó correctamente. La salida identificó Node 24.13.0, Sequelize CLI 6.6.5 y Sequelize 6.37.8.
- Se aclararon como modelos de relación un rol para varios usuarios (1:N) y varios autores para varios libros (N:M). El registro no afirma que esas asociaciones se hayan ejecutado o verificado en la base.

El PDF presenta además `DataTypes`, validaciones, asociaciones 1:1/1:N/N:M, consultas CRUD del modelo (`findAll`, `findByPk`, `findOne`, `create`, `update`, `destroy`), generación y reversión de migraciones, rutas y controladores. Esos temas quedan como contenido visto en el material; no se registran todos como implementación propia.

## Estado del mini proyecto

El mini proyecto de biblioteca sigue en curso y es trabajo de clase, no un entregable, según aclaró Sebastián. El profesor indicó una escala aproximada de 14–16 entidades y alrededor de 95 endpoints. Se solicitó un DER visual y que la aplicación no use datos quemados. Estas son condiciones reportadas para orientar el trabajo; no representan una implementación ya terminada.

La presentación también recomienda usar migraciones en vez de `sequelize.sync({ force: true })` en producción, porque esa opción puede borrar y recrear las tablas. La salida de migración por sí sola no permite dar por completo ni validado el servidor, el conjunto de endpoints o la interfaz React + Vite.

## Errores observados

Se corrigieron errores de escritura en `npm install` y la forma de invocar Sequelize CLI. El detalle está en [Errores comunes](errores-comunes.md). La instalación mostró advertencias de paquetes obsoletos y hallazgos moderados en `npm audit`; no se investigaron ni corrigieron en esta sesión.

## Relación con Vértice CR

El aprendizaje transferible es la correspondencia entre modelos y tablas, las migraciones para evolucionar el esquema y la separación entre rutas, controladores y modelos. El dominio de biblioteca queda como ejercicio académico; esta documentación no cambia el producto ni decide su ORM o motor de base de datos.

## Siguiente paso

Continuar el mini proyecto según la guía del profesor y verificar cada parte antes de registrarla como terminada.
