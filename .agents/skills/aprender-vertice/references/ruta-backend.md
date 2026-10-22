# Ruta de aprendizaje — Backend

Esta ruta registra **temas de clase**, no tareas pendientes de la tienda. Se actualiza cuando el estudiante comparte materiales o comunica avances. No exigir archivos de prácticas ni evaluarlo de nuevo por defecto.

## Estados

- **Estudiado y practicado:** el estudiante indica haber visto y realizado ejercicios.
- **En curso:** indica que lo está estudiando.
- **Pendiente:** todavía no lo ha visto o no se ha registrado.

El estado describe el aprendizaje reportado; no pretende certificar el nivel de dominio ni la calidad del código.

## 01 — POO en JavaScript

**Estado: estudiado y practicado** · Registro: 2026-10-16

- Clases y objetos; instancias con `new`.
- Constructor, `this` y métodos.
- Encapsulamiento, campos privados `#`, getters/setters.
- Herencia, `extends`, `super` y herencia multinivel (padre, hijo, nieto).
- Polimorfismo y abstracción.
- Prácticas informadas como realizadas: #2 (zoológico) y #3 (carrito).
- Buenas prácticas: composición cuando conviene; evitar herencia profunda y clases demasiado grandes.

Consulta [nota de POO](../../../../docs/aprendizaje/2026-10-16-poo-javascript.md).

## 02 — Integración de servicios y workflows con n8n (LAB1)

**Estado: práctica realizada y demostrada; aprobación informada por el estudiante** · Registro: 2026-10-19

- Integración de Gmail con OAuth 2.0 y un trigger de revisión periódica.
- Consumo de una API REST con nodos HTTP Request para consultar catálogo e historial y persistir solicitudes.
- Separación entre JavaScript local, lógica de nodos Code y workflow exportable/importable.
- Extracción y validación de datos desde correos cotidianos; solicitar aclaración ante datos incompletos o ambiguos.
- Reglas deterministas para disponibilidad y totales; DeepSeek se usó solo para sugerencias internas.
- Consulta del historial para describir tendencias, sin alterar el precio ni el estado de una solicitud.

Consulta la [nota de aprendizaje](../../../../docs/aprendizaje/2026-10-19-automatizacion-cotizaciones-n8n.md) y el [registro de LAB1](../../../../docs/practicas/lab1-gestion-cotizaciones-n8n.md). Es una práctica académica, no una funcionalidad de Vértice.

## 03 — Orquestación IA, n8n y persistencia

**Estado: estudiado y practicado** · Registro: 2026-10-20

- Trigger → AI Agent (Chat Model, Memory, Tools) → respuesta.
- Orquestación supervisor/especialistas; contratos `{ok,data,error}` y analogías POO.
- n8n Data Tables: catálogo de tarifas y cotizaciones persistidas.
- Consultas, validación, cálculo determinista, escritura `upsert` y control de duplicados de la misma solicitud/sesión.
- Errores observados: material inexistente, datos incompletos, repetición de filas por múltiples ítems; medidas de corrección.
- Práctica aplicada a una **simulación académica** de impresión 3D, sin adoptar ese backend como stack del startup.

Consulta [nota de orquestación](../../../../docs/aprendizaje/2026-10-20-agente-orquestador-n8n.md) y [registro de práctica](../../../../docs/practicas/2026-10-20-orquestador-cotizaciones-n8n.md).

## 04 — API REST, PostgreSQL y transacciones

**Estado: estudiado y practicado según declaración** · Registro: 2026-10-21

- Modelo relacional con llaves foráneas, restricciones y datos de ejemplo.
- API REST con Express, servicios, códigos HTTP y errores de negocio.
- Transacciones `BEGIN`/`COMMIT`/`ROLLBACK` para operaciones que afectan varias tablas.
- Bloqueo de filas con `FOR UPDATE` y validación de stock, cupones, envíos y estados.
- Métricas SQL con agregaciones y agrupaciones.
- Migración no destructiva de catálogo y snapshots para preservar el historial de órdenes.

Consulta la [nota del Laboratorio 2](../../../../docs/aprendizaje/2026-10-21-laboratorio2-fullstack.md) y el [registro de práctica](../../../../docs/practicas/04-laboratorio2-inventario-cupones-envios.md).

## 05 — Extensión de modelado de datos con Supabase

**Estado: práctica realizada y artefactos preparados según declaración y capturas** · Registro: 2026-10-22

- Caso académico independiente: gestión de un gimnasio.
- Supabase proporciona el proyecto administrado y herramientas de gestión; PostgreSQL sigue siendo el motor de base de datos.
- Preparación de un modelo relacional con nueve tablas, diagrama ER y script SQL.
- Inspección de registros de ejemplo con Table Editor y revisión de resultados en SQL Editor.
- Evidencia organizada en investigación, diagrama, script y captura de ejecución.
- Se documenta como aprendizaje, sin agregar el dominio del gimnasio ni sus datos a Vértice CR.

Consulta la [nota de aprendizaje](../../../../docs/aprendizaje/2026-10-22-extension-base-datos-gimnasio.md) y el [registro de práctica](../../../../docs/practicas/05-extension-base-datos-gimnasio.md).

## Próximos temas

No se asignan tecnologías, secuencias ni fechas hasta que aparezcan en el curso.

## Registro

- **2026-10-16:** teoría y prácticas de POO documentadas; sin importar soluciones locales.
- **2026-10-19:** integración de servicios, parsing, persistencia e historial documentados desde LAB1; aprobación informada por el estudiante.
- **2026-10-20:** orquestación IA y Data Tables documentadas con resultados observados; sin convertir el laboratorio en aplicación del startup.
- **2026-10-21:** API full stack, transacciones, migración FDM y snapshots practicados; inventario y precios del caso siguen siendo simulados.
- **2026-10-22:** se registró la extensión de gimnasio en Supabase como práctica académica independiente; no se incorporó al producto Vértice.
