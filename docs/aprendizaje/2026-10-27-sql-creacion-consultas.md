# SQL: creación y consultas básicas

Fecha: 2026-10-27. Fuente: presentación de clase `sql-creacion-consultas-basicas.pdf` (17 diapositivas), práctica #1 y avances comunicados durante la sesión.

## Estructura y datos

DDL define la estructura: CREATE crea bases y tablas, ALTER modifica su definición y DROP elimina objetos. La presentación agrupa SELECT, INSERT, UPDATE y DELETE como DML; también es habitual distinguir SELECT como DQL, dedicado a consultas.

CREATE DATABASE crea la base; USE selecciona dónde trabajar. CREATE TABLE declara columnas, tipos y restricciones. NOT NULL impide NULL, pero no impide por sí solo una cadena vacía. UNIQUE evita valores repetidos; en MySQL una columna nullable con UNIQUE puede admitir varios NULL. DEFAULT aporta un valor cuando corresponde omitirlo y CHECK expresa una condición sobre los datos.

## Modificar una estructura existente

- ADD COLUMN agrega una columna.
- MODIFY COLUMN redefine tipo y atributos; hay que revisar compatibilidad con los datos y conservar los atributos que se necesiten.
- DROP COLUMN elimina la columna y sus datos.
- RENAME TO cambia el nombre de una tabla; las consultas posteriores deben usar el nombre nuevo.
- DROP TABLE elimina estructura y filas; DROP DATABASE elimina la base.
- TRUNCATE TABLE vacía una tabla conservando su definición. No equivale a un DELETE con filtro y está sujeto a restricciones de claves foráneas.

Antes de cambios destructivos se revisa la base seleccionada y se prepara un respaldo cuando corresponde. ALTER no garantiza conservar toda la información: quitar columnas o convertir tipos puede perderla.

## Consultar

SELECT elige columnas y FROM indica la tabla. WHERE filtra filas mediante comparaciones y condiciones. AND exige ambas condiciones; OR admite alternativas; NOT niega una condición. Los paréntesis ayudan a expresar agrupaciones sin ambigüedad.

| Operador | Función |
|---|---|
| BETWEEN | Rango que incluye ambos extremos. |
| IN | Coincidencia con alguno de los valores de una lista. |
| LIKE | Patrón de texto: % representa cero o más caracteres y _ uno. |
| IS NULL | Detecta ausencia de valor; no equivale a comparar con texto vacío ni se escribe = NULL. |

ORDER BY ordena el resultado: ASC es el valor predeterminado y DESC invierte el sentido. Se pueden combinar varias columnas. Sin ORDER BY no se debe asumir un orden estable. El orden de escritura trabajado es SELECT → FROM → WHERE → ORDER BY; no describe todo el orden interno de ejecución del motor.

## Práctica y evidencia

La práctica #1 quedó realizada según lo comunicado paso a paso por Sebastián: creación, modificaciones y cambio de nombre de una tabla, consultas y eliminación final. Se observaron consultas sobre una tabla vacía; eso confirma ejecución, pero no demuestra el filtrado de datos variados. Tras renombrar una tabla, seguir usando el nombre anterior produjo el error 1146 y se corrigió la referencia.

La práctica #2 de tienda completa está en curso: Sebastián está construyendo las tablas del DER en draw.io. Aún no se registra creación ni carga de sus siete tablas en MySQL.

Estos apuntes documentan el aprendizaje de clase. No incorporan una solución SQL de las entregas ni cambian el stack de Vértice CR.

Véase el [registro de prácticas](../practicas/07-sql-creacion-consultas.md).
