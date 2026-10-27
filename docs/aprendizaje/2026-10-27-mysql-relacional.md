# 2026-10-27 — Fundamentos de bases de datos relacionales con MySQL

## Contexto y fuentes

Clase iniciada el 26 de octubre y continuada el 27 de octubre de 2026. Material aportado: “Introducción a Bases de Datos Relacionales”, 17 diapositivas (archivo bases-de-datos-relacionales-mysql (1).pdf), y “Práctica #2 — Del DER a la base de datos: sistema de biblioteca” (BD_Practica2_DER_Creacion_BD.pdf).
[Registro de práctica](../practicas/06-mysql-biblioteca.md).

Estado: **estudiado y practicado según declaración de Sebastián**. Las capturas compartidas muestran consultas de autores, libros, clientes y cinco préstamos. No se ha revisado una exportación completa del archivo SQL final ni se registra calificación o aprobación docente.

## Qué se aprendió

- MySQL Server almacena y administra los datos; Workbench es el cliente gráfico; SQL es el lenguaje para definir estructuras y consultar o modificar registros.
- Una tabla representa una entidad; sus columnas son atributos y sus filas son registros. El DER representa entidades, atributos y relaciones antes de escribir SQL.
- La clave primaria (PK) identifica una fila de forma única y no admite NULL. AUTO_INCREMENT genera identificadores: no se deben deducir por el orden de inserción ni asumir una secuencia sin huecos.
- Una clave foránea (FK) declarada con FOREIGN KEY y REFERENCES exige referencias válidas para los valores no nulos. Escribir una columna terminada en _id por sí solo no crea esa restricción.
- NOT NULL obliga a aportar un valor; UNIQUE evita valores repetidos. Para un correo obligatorio y no repetido se combinaron ambas reglas. Ninguna valida por sí sola el formato del correo.
- NULL representa ausencia de un valor; se utilizó en fechas de devolución de préstamos todavía pendientes.
- INT guarda enteros; VARCHAR(n), texto limitado; DATE, fechas. El material también presenta DECIMAL para valores decimales, TEXT, DATETIME y BOOLEAN (alias de TINYINT(1) en MySQL).
- CREATE DATABASE crea la base y USE selecciona dónde trabajar. CREATE TABLE define columnas y restricciones; INSERT agrega registros; SELECT permite inspeccionarlos; ALTER TABLE modifica una estructura existente.
- DELETE elimina filas que cumplen WHERE. Para elegir varios ID alternativos se usa IN u OR; una fila no puede tener dos valores distintos en el mismo campo a la vez.
- El material introduce JOIN y filtros WHERE; no se documenta una ejecución de JOIN en esta sesión.

## Relaciones practicadas

| Relación | Cardinalidad | Dónde queda la FK |
|---|---|---|
| Autor y libros | 1:N | libros.autor_id |
| Libro y préstamos históricos | 1:N | prestamos.libro_id |
| Cliente y préstamos | 1:N | prestamos.cliente_id |

Cada préstamo corresponde a un libro y un cliente. Clientes y libros pueden vincularse muchas veces a lo largo del tiempo mediante préstamos.
En el ejercicio previo SuperMario, usuarios y roles se conectaron mediante una tabla intermedia para representar N:M.
El material presenta también 1:1: una FK necesita además unicidad para impedir varias filas dependientes para la misma fila referenciada; la obligatoriedad de ambos lados requiere reglas adicionales.

## Cómo se practicó

Se utilizó una instancia local de MySQL ya instalada y Workbench. Se dibujó el DER en draw.io y se crearon cuatro tablas: autores, libros, clientes y prestamos. Los campos del diagrama fueron id/nombre/nacionalidad; id/titulo/anio_publicacion/autor_id; id/nombre/correo; e id/libro_id/cliente_id/fecha_prestamo/fecha_devolucion, respectivamente.

Se observaron cuatro autores, seis libros confirmados por el estudiante y la salida de consulta, tres clientes con correos distintos y cinco préstamos en la consulta final. La fecha de devolución permitió NULL. Las tablas dependientes se crearon después de sus tablas referenciadas.

## Errores y cómo se resolvieron

- Coma después de la última columna: produjo error de sintaxis; se quitó antes del cierre del CREATE TABLE.
- ID obligatorio omitido en una tabla intermedia: se corrigió con AUTO_INCREMENT, conservando PRIMARY KEY.
- INSERT de pedidos ejecutado dos veces: generó repetición de registros; se aprendió a seleccionar solo el bloque nuevo.
- DELETE con id = 6 AND id = 7: condición imposible para una fila; se sustituyó por selección de alternativas y se indicó revisar los ID reales antes de borrar.
- Columna titulo omitida al crear libros: se agregó mediante ALTER TABLE y se indicó corregir también el CREATE TABLE del archivo.
- fecha_prestamos no coincidía con fecha_prestamo del diagrama: se renombró la columna; el estudiante confirmó la corrección.
- El correo debía ser UNIQUE además de NOT NULL: se incorporó antes de crear clientes, según lo informado por Sebastián. No se observaron correos duplicados guardados.

## Relación con Vértice CR

Se conserva el aprendizaje de modelado y restricciones. Esta clase no migra Vértice a MySQL, no modifica su stack ni implementa funcionalidades del producto.

## Siguiente paso

Conservar el DER editable y su exportación, y revisar el archivo practica2.sql antes de entregar: comentarios de ejercicios en orden y definiciones finales coherentes con la base. Esa revisión completa del archivo sigue pendiente en este registro. El material indica que esta base se reutilizará en la Práctica #3.

Este documento registra aprendizaje; no reproduce la solución SQL de la entrega.
