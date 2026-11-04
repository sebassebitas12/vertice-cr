# 14 — Mini proyecto de biblioteca con Sequelize

- **Estado:** en curso.
- **Carácter:** trabajo de clase, no entregable, según indicó Sebastián.
- **Fuente estudiada:** *Sequelize modelos, migraciones, controladores y rutas* (material de clase compartido el 2026-11-04).

## Alcance reportado

Se está preparando una API REST de biblioteca con Node.js, Express, Sequelize y MySQL. Sebastián reporta que el profesor planteó como escala aproximada entre 14 y 16 entidades y cerca de 95 endpoints. El DER debe ser visual. También se indicó que no se utilicen datos quemados.

Las relaciones discutidas incluyen un rol asociado a varios usuarios (1:N) y una relación N:M entre autores y libros, representada con una tabla intermedia. El diseño final y las asociaciones implementadas siguen pendientes de revisión.

## Avance comprobable en la consola compartida

- Se inicializó `package.json` y se instalaron las dependencias de Express, Sequelize, MySQL y variables de entorno; también Sequelize CLI y nodemon como dependencias de desarrollo.
- `npx sequelize-cli init` generó la configuración y las carpetas base del CLI.
- Se generaron el modelo `Usuario` y su migración con los campos `nombre`, `correo` y `edad`.
- La salida compartida informa que `npx sequelize-cli db:migrate` terminó correctamente.

Este registro conserva el avance informado; no copia la solución ni confirma la estructura final de la base, la cobertura de endpoints o pruebas del servidor.

## Requisitos y pendientes de la práctica

- Respetar la restricción del profesor de no incluir datos quemados.
- Completar y revisar visualmente el DER y las relaciones antes de dar el esquema por cerrado.
- Continuar la conexión del servidor Express y los controladores y rutas que se presenten en clase.
- El profesor mencionó pruebas con Postman; Sebastián pidió evitarlas y solicitó verificar el funcionamiento por otra vía. Este registro no transcribe esas verificaciones.
- La salida de migración acredita el cambio del esquema reportado; por sí sola no acredita la cobertura de endpoints ni el funcionamiento de la interfaz.

## Relación con Vértice CR

Se conservan los conceptos de ORM, modelos, migraciones y separación de capas para aprendizaje futuro. La biblioteca y su implementación siguen siendo un ejercicio de clase; no se incorpora su código ni su esquema al producto de Vértice CR.

## Referencia

[Nota de aprendizaje sobre ORM y Sequelize](../aprendizaje/2026-11-04-orm-sequelize.md).
