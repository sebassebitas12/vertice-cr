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
