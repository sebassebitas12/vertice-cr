# SQL: vistas, JOIN y automatización

Clase: 2026-10-28. Registro: 2026-10-29.

## Fuentes y alcance

Presentación de 17 diapositivas `manipulacion-datos-vistas-procedimientos-triggers (1).pdf`, `Guia_Rapida_SQL.pdf` (5 páginas), enunciado `SQL_Practica2_Extension_Tienda.pdf`, ejemplos del profesor y capturas del trabajo local del estudiante. Sebastián aclaró el 29 de octubre que la extensión fue trabajo en clase del día anterior. No se considera tarea pendiente para continuar hoy: la clase cambió a Business Solutions, cuyo contenido aún no se ha compartido.

El objetivo general es comprender fundamentos para dirigir y revisar el futuro desarrollo de Vértice con agentes. El aprendizaje académico no constituye aprobación automática de una tecnología o implementación de negocio.

## Conceptos estudiados

| Herramienta | Función y límites |
|---|---|
| INSERT | Agrega filas; las columnas y los valores deben corresponder. INSERT con VALUES no utiliza WHERE. |
| UPDATE / DELETE | Modifica / elimina filas. Sin WHERE afecta todas las filas elegibles; revisar la condición con SELECT primero. Esa revisión no evita por sí sola cambios concurrentes ni efectos de triggers. |
| INNER JOIN y ON | Combina filas que coinciden según una condición. Una relación 1:N puede producir varias filas por entidad sin ser un error. |
| AS | Da un alias a una columna o tabla dentro de la consulta; no renombra la estructura original. |
| VIEW | Consulta guardada que refleja los datos base actuales; no es una copia materializada. Algunas vistas simples admiten escrituras bajo condiciones del motor. |
| CREATE OR REPLACE VIEW | Crea una vista o reemplaza su definición; AS debe ir seguido del SELECT dentro de la misma instrucción. |
| PROCEDURE / CALL | Guarda instrucciones y permite ejecutarlas con parámetros; crear el procedimiento no ejecuta su operación de negocio. |
| IN | Parámetro de entrada de un procedimiento. Conviene distinguir nombres de parámetros y columnas, por ejemplo con prefijo p_. |
| BEGIN / END | Delimita un bloque de instrucciones; no inicia ni confirma automáticamente una transacción. |
| DELIMITER | Instrucción del cliente para reconocer el final de bloques con puntos y coma internos; no es una regla de negocio del servidor. |
| TRIGGER | Acción asociada a una tabla que se activa por INSERT, UPDATE o DELETE. No se invoca con CALL. |
| BEFORE / AFTER | Momento anterior / posterior a la operación de fila; AFTER no significa que la transacción ya esté confirmada. |
| FOR EACH ROW | Una ejecución por cada fila afectada en MySQL. |
| OLD / NEW | Valores anteriores / nuevos: INSERT tiene NEW, DELETE tiene OLD y UPDATE tiene ambos. |
| SUM y GROUP BY | Sumar valores / agrupar filas; aparecieron en el alcance de la extensión, sin ejecución del resumen demostrada. |

## Lectura crítica de los ejemplos

El procedimiento del profesor insertó un autor mediante CALL y mostró una fila afectada. Esa ejecución pertenece al profesor, no al estudiante. Se vio un error de sintaxis durante su preparación sin mensaje completo suficiente para atribuir una causa exacta.

El trigger de historial compara OLD.precio con NEW.precio y guarda ID del producto, precio anterior y fecha. No guarda el nuevo precio ni el actor. La comparación con <> necesita considerar NULL si los precios pudieran ser nulos.

Otro trigger BEFORE INSERT de libros creaba un autor desconocido y asignaba su ID con LAST_INSERT_ID(). Sin condición crea un autor por cada libro y reemplaza cualquier autor proporcionado. El error 1359 mostrado fue del profesor: el trigger ya existía.

Un procedimiento solo impone su validación a las operaciones que pasan por él; las restricciones y permisos siguen siendo necesarios. Una vista que omite columnas no impide acceder a ellas si el usuario conserva permisos sobre la tabla base. En MySQL un trigger no puede ejecutar libremente un UPDATE sobre la misma tabla que está siendo utilizada por la instrucción que lo dispara; ajustar NEW en un BEFORE es un caso distinto.

## Tipos y reglas de la guía

DECIMAL representa cantidades decimales exactas; FLOAT es aproximado. Para dinero conviene precisión y escala explícitas. INT representa unidades enteras; VARCHAR texto variable, CHAR texto de longitud fija, TEXT texto largo y DATE/DATETIME fechas. BOOLEAN en MySQL es un alias de un tipo entero, no una garantía por sí sola de aceptar únicamente dos valores.

NOT NULL prohíbe NULL, no texto vacío. UNIQUE y obligatoriedad son reglas distintas; una PK ya implica NOT NULL. AUTO_INCREMENT puede dejar huecos. DEFAULT no debe usarse para inventar un dato histórico desconocido. Las expresiones de valores por defecto y la sintaxis de rutinas requieren revisar compatibilidad con el motor y su versión.

## Evidencia del estudiante

Se observaron las tres vistas iniciales en Workbench: productos disponibles, pedidos pendientes y clientes con correo. La captura mostró 3 pedidos pendientes y 5 clientes al consultarlas.

Se practicó INNER JOIN entre productos y categorias: 12 filas, una por producto. Después se construyó productos_catalogo; el bloque de creación se revisó y la captura posterior mostró los 12 productos con categoría, nombre y precio.

No se ha demostrado ejecución propia de pedidos_resumen, los dos procedimientos ni los dos triggers de la extensión. No atribuir al estudiante las capturas del profesor ni declarar toda la extensión implementada. Véase el [registro](../practicas/08-sql-extension-vistas-automatizacion.md).

## Utilidad futura para Vértice

- Consultas y JOIN: reunir catálogo, clientes y pedidos respetando qué representa cada fila.
- Integridad: PK/FK, restricciones y tipos que expresen las reglas acordadas.
- Historial: preservar precios utilizados en pedidos; un historial de catálogo no reemplaza el snapshot del precio de compra.
- Automatización: evaluar vistas, procedimientos o triggers cuando haya una necesidad; documentar sus efectos y evitar lógica oculta.
- Consistencia: operaciones de varias tablas requieren transacciones y atención a concurrencia. Un procedimiento no las vuelve atómicas automáticamente.
- Stock: no trasladar el inventario genérico del ejercicio al catálogo FDM bajo pedido. Evitar descontar dos veces mediante procedimiento y trigger.
- Seguridad: consultas parametrizadas, permisos mínimos y autorización del servidor; SQL no sustituye autenticación, validación de archivos ni configuración segura.
- Cotizaciones: conservar el estado pendiente de cotización sin representarlo como una compra de precio cero.

## Mapa general para continuar cuando proceda

Modelado y normalización; restricciones; CRUD y JOIN; agregaciones, subconsultas y CTE; transacciones, aislamiento y bloqueos; índices y EXPLAIN; migraciones; permisos; respaldos y restauración. Las funciones de ventana, replicación y particionado son herramientas posteriores según necesidad.

Este mapa es orientación, no una afirmación de que esos temas ya se dominaron ni un calendario impuesto al curso. SQL gestiona datos; la API, los archivos 3D y la seguridad del servidor requieren componentes adicionales.
