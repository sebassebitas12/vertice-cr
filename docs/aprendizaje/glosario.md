# Glosario de aprendizaje

Conceptos vistos en clase, explicados de forma breve. Referencias: [automatización con n8n](2026-10-19-automatizacion-cotizaciones-n8n.md), [Laboratorio 2](2026-10-21-laboratorio2-fullstack.md) y [extensión de base de datos para un gimnasio](2026-10-22-extension-base-datos-gimnasio.md).

| Término | Significado | Dónde se estudió |
|---|---|---|
| Abstracción | Exponer operaciones esenciales sin obligar a conocer los pasos internos. | POO, práctica #2 |
| Agente orquestador | Coordina la selección de especialistas y reúne sus resultados. | n8n, 2026-10-20 |
| API REST | Interfaz HTTP que expone recursos mediante rutas y métodos como GET, POST, PATCH y DELETE; se practicó con JSON Server y Express. | LAB1 y Laboratorio 2 |
| BIGINT de PostgreSQL | Entero de 64 bits; el driver `pg` puede entregarlo como texto para evitar pérdida de precisión en JavaScript. | Laboratorio 2, 2026-10-21 |
| Campo privado | Atributo `#nombre` accesible solo desde su clase. | POO, práctica #2 |
| Clase | Plantilla que agrupa atributos y métodos. | POO |
| Código HTTP 409 | Respuesta que indica un conflicto con el estado o una regla de negocio. | Laboratorio 2, 2026-10-21 |
| Constructor | Método que inicializa una instancia con `new`. | POO |
| Contrato JSON | Estructura estable de entrada/salida; p. ej., `{ok,data,error}`. | n8n, 2026-10-20 |
| Data Tables | Almacenamiento persistente estructurado integrado en n8n. | n8n, 2026-10-20 |
| Encapsulamiento | Restringir el acceso directo al estado y ofrecer una interfaz controlada. | POO, práctica #2 |
| Endpoint | Ruta de una API que permite consultar o modificar un recurso, como `/solicitudes`. | LAB1 |
| Entero seguro | Entero que JavaScript representa exactamente; validar con `Number.isSafeInteger` antes de usarlo como ID numérico. | Laboratorio 2, 2026-10-21 |
| `FOR UPDATE` | Cláusula SQL que bloquea filas seleccionadas durante una transacción. | Laboratorio 2, 2026-10-21 |
| Getter | Forma controlada de leer una propiedad. | POO |
| Herencia | Una clase extiende comportamientos de otra mediante `extends`. | POO, práctica #2 |
| Herencia multinivel | Cadena de clases padre, hijo y nieto. | Prácticas locales comentadas |
| Historial de solicitudes | Registros persistidos que permiten consultar operaciones anteriores. | LAB1, extensión |
| Hook personalizado | Función de React que reutiliza lógica de estado o efectos entre componentes. | Laboratorio 2, 2026-10-21 |
| Idempotencia | Repetir una operación sin crear efectos adicionales no deseados; en clase se observó un upsert para la misma solicitud/sesión. | n8n, 2026-10-20 |
| Instancia u objeto | Ejemplar concreto de una clase. | POO |
| JSON Server | Servidor de ejemplo que expone un archivo JSON mediante una API REST. | LAB1 |
| Método | Función que pertenece a una clase. | POO |
| Migración conservadora | Cambio de esquema o datos que conserva registros históricos en lugar de reemplazar o borrar el estado existente. | Laboratorio 2, 2026-10-21 |
| n8n | Plataforma que conecta nodos para automatizar un flujo de trabajo. | LAB1 |
| Nodo Code | Nodo de n8n que ejecuta JavaScript dentro del workflow. | LAB1 |
| OAuth 2.0 | Protocolo para autorizar una integración, como Gmail, sin compartir la contraseña con el workflow. | LAB1 |
| Parser de texto | Lógica que extrae datos estructurados de un mensaje escrito en lenguaje cotidiano. | LAB1 |
| Persistencia | Guardado de datos para que puedan consultarse después de la ejecución actual. | LAB1 |
| Polimorfismo | Clases diferentes responden a un mismo método de forma distinta. | POO, práctica #2 |
| Polling | Consulta periódica a un servicio para detectar elementos nuevos, como correos entrantes. | LAB1 |
| Setter | Forma controlada de cambiar una propiedad, con posible validación. | POO |
| Snapshot de orden | Copia de los datos relevantes del artículo al momento de comprar, para que el historial no dependa del catálogo actual. | Laboratorio 2, 2026-10-21 |
| Subagente | Especialista que el orquestador invoca para una responsabilidad concreta. | n8n, 2026-10-20 |
| Supabase | Plataforma que ofrece proyectos administrados con base de datos PostgreSQL y herramientas como Table Editor y SQL Editor. | Extensión de base de datos, 2026-10-22 |
| `super` | Permite usar constructor o métodos de la clase padre. | POO |
| `this` | Referencia al objeto actual dentro de métodos de instancia. | POO |
| Tool | Herramienta que permite al agente ejecutar acciones o recuperar/verificar datos. | n8n, 2026-10-20 |
| Transacción | Grupo de operaciones de base de datos que se confirma completo o se revierte. | Laboratorio 2, 2026-10-21 |
| Upsert | Insertar si no existe un registro coincidente, o actualizarlo si existe. | n8n, 2026-10-20 |
| Webhook | URL que recibe una solicitud de otro sistema para iniciar o continuar un flujo. | Laboratorio 2, 2026-10-21 |
| Workflow | Secuencia de nodos y conexiones que ejecuta una automatización. | LAB1 |

## MySQL y modelado relacional — 2026-10-26/27

Fuente: [nota de MySQL](2026-10-27-mysql-relacional.md).

| Término | Significado |
|---|---|
| MySQL Server / Workbench | Motor que administra la base / cliente gráfico para interactuar con él. |
| SQL | Lenguaje para definir, consultar y modificar estructuras y datos. |
| Entidad / atributo | Elemento que se modela / característica que se guarda como columna. |
| Registro / campo | Fila concreta / columna de una tabla. |
| DER | Diagrama de entidades, atributos y relaciones. |
| PK | Clave primaria: identificador único y no nulo de una fila. |
| FK | Clave foránea: restricción que conecta valores con claves de otra tabla o de la misma. |
| Integridad referencial | Impide referencias no nulas a registros inexistentes cuando la FK está declarada y activa. |
| AUTO_INCREMENT | Generación automática de ID; puede dejar huecos. |
| NOT NULL / UNIQUE | Valor obligatorio / valores no repetidos; son reglas distintas. |
| NULL | Ausencia de valor, distinta de cero o texto vacío. |
| 1:N | Una fila puede relacionarse con muchas; la FK se coloca del lado N. |
| N:M | Muchas filas en ambos lados; se representa mediante una tabla intermedia. |
| 1:1 | Como máximo una fila vinculada por lado; una FK única ayuda a imponerlo. |
| JOIN | Combina filas de tablas según una condición; presentado en teoría en esta sesión. |
| ALTER TABLE | Cambia la estructura de una tabla existente. |

## Creación y consultas básicas — 2026-10-27

Fuente: [nota de SQL](2026-10-27-sql-creacion-consultas.md).

| Término | Significado |
|---|---|
| DDL | Comandos para definir o modificar estructuras: CREATE, ALTER y DROP. |
| DML / DQL | Manipulación de datos / consulta; la presentación incluye SELECT dentro de DML. |
| DEFAULT / CHECK | Valor predeterminado / condición que deben satisfacer los datos. |
| DROP / TRUNCATE | Eliminar el objeto / vaciar sus filas conservando la tabla. |
| SELECT / FROM | Elegir columnas / indicar la tabla de origen. |
| WHERE | Filtrar filas mediante una condición. |
| AND / OR / NOT | Conjunción / alternativas / negación de condiciones. |
| BETWEEN / IN | Rango inclusivo / pertenencia a una lista. |
| LIKE | Comparación con un patrón de texto; % y _ son comodines. |
| IS NULL | Comprobar ausencia de valor. |
| ORDER BY, ASC y DESC | Ordenar resultados de forma ascendente o descendente. |

## Ampliación de SQL — 2026-10-28

| Término | Significado |
|---|---|
| DECIMAL(10,2) | Número decimal exacto: 10 dígitos totales, 2 después del separador decimal. |
| LIMIT | Limita la cantidad de filas devueltas; se combinó con ORDER BY para pedidos recientes. |
| Desempate de orden | Segunda columna de ORDER BY que define el orden cuando se repite el primer criterio. |

## Vistas y automatización — 2026-10-28

Fuente: [nota](2026-10-28-sql-vistas-join-automatizacion.md).

| Término | Significado |
|---|---|
| INNER JOIN / ON | Une filas con coincidencia / define la condición de unión. |
| Alias AS | Nombre de presentación o referencia dentro de una consulta. |
| Vista | SELECT guardado que consulta los datos base actuales. |
| Procedimiento / CALL | Instrucciones guardadas / invocación explícita de esas instrucciones. |
| Parámetro IN | Valor recibido por un procedimiento. |
| DELIMITER | Separador de instrucciones configurado por el cliente al definir bloques. |
| Trigger | Instrucciones que reaccionan automáticamente a un evento de una tabla. |
| BEFORE / AFTER | Ejecución antes / después de la operación de fila, sin implicar COMMIT. |
| OLD / NEW | Valores anteriores / nuevos disponibles según el evento del trigger. |
| SUM / GROUP BY | Agregación por suma / formación de grupos de filas. |

## Business Solutions — 2026-10-29/30

Fuente: [mercadeo, datos y agentes](2026-10-30-business-solutions-mercadeo-datos-agentes.md).

| Término | Significado |
|---|---|
| Nicho | Grupo concreto de clientes con necesidades compartidas que se decide atender. |
| Propuesta de valor | Beneficio que se ofrece a un cliente y por qué le resulta útil. |
| Recorrido del cliente | Experiencia del cliente al reconocer una necesidad, evaluar y decidir; no siempre es lineal. |
| Embudo comercial | Modelo de etapas y pérdidas desde captación hasta contratación. |
| Lead / prospecto | Contacto interesado / contacto que cumple criterios definidos para profundizar. |
| Oportunidad | Posible contratación concreta; un cliente puede tener varias. |
| Traspaso a ventas | Transferencia de responsabilidad y contexto con recepción y siguiente acción verificables. |
| Campaña / canal | Iniciativa con objetivo y período / medio utilizado para contactar al público. |
| Presupuesto / gasto | Importe planificado / costo realmente incurrido. |
| Aprobación versionada | Registro de quién aprobó qué versión y cuándo. |
| CTR / CPC | Clics sobre impresiones / gasto publicitario por clic. |
| CAC | Costos de adquisición definidos por cliente nuevo adquirido. |
| ROAS | Ingresos atribuidos a publicidad divididos entre gasto publicitario; no mide utilidad. |
| Conversión | Proporción que avanza entre estados definidos, con unidad y período coherentes. |
| Cohorte | Grupo que comparte un evento inicial o período, seguido para comparar su evolución. |
| Ticket promedio | Valor de ventas dividido entre número de ventas bajo un criterio definido. |
| Ciclo de venta | Tiempo entre inicio y cierre comercial definidos. |
| Métrica de vanidad | Indicador que puede impresionar sin demostrar por sí mismo resultados del negocio. |
| Atribución | Regla para asignar un resultado a uno o varios contactos/canales. |
| Normalización | Organización de dependencias de datos para evitar redundancias y anomalías; no equivale a crear más tablas. |

## Normalización — 2026-10-30

| Término | Significado |
|---|---|
| 1FN | Cada celda tiene un valor atómico y las filas tienen clave primaria. |
| 2FN | Estar en 1FN y no tener atributos no clave dependientes de una parte de una PK compuesta. |
| Dependencia funcional | A → B: un valor de A determina un valor único de B. |
| Clave compuesta | Clave primaria formada por más de una columna. |
| Dependencia parcial | Atributo no clave determinado por solo parte de una clave compuesta. |
| Anomalías de datos | Problemas de inserción, actualización o eliminación causados por redundancias. |
