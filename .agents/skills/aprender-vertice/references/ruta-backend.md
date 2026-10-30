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

## 06 — Fundamentos relacionales con MySQL y DER

**Estado: estudiado y practicado según declaración y capturas** · Sesiones: 2026-10-26/27

- MySQL Server y Workbench; SQL, tablas, campos, registros y tipos.
- DER en draw.io; PK/FK; relaciones 1:N y tabla intermedia N:M.
- NOT NULL, UNIQUE, AUTO_INCREMENT, NULL e integridad referencial.
- CREATE DATABASE, USE, CREATE TABLE, INSERT, SELECT, ALTER TABLE y DELETE con selección de ID.
- Biblioteca practicada con cuatro tablas, cuatro autores, seis libros, tres clientes y cinco préstamos.
- JOIN y relación 1:1 presentados en el material; no se registra ejecución de JOIN.
- No implica adoptar MySQL para Vértice ni sustituir las prácticas anteriores de PostgreSQL o n8n.

Consulta la [nota](../../../../docs/aprendizaje/2026-10-27-mysql-relacional.md) y el [registro](../../../../docs/practicas/06-mysql-biblioteca.md).

## 07 — SQL: creación y consultas básicas

**Estado: estudiado y practicado según declaración y capturas** · Sesiones: 2026-10-27/28

- CREATE, ALTER (ADD, MODIFY, DROP COLUMN, RENAME), DROP y TRUNCATE.
- Restricciones NOT NULL, UNIQUE, DEFAULT y CHECK.
- SELECT/FROM, WHERE, comparaciones, AND/OR/NOT, BETWEEN, IN, LIKE e IS NULL.
- ORDER BY con ASC/DESC y varias columnas.
- Práctica #1 completada paso a paso; consultas observadas sin filas, sin afirmar validación de filtros con datos variados.
- Práctica #2 terminada según declaración: DER, siete tablas relacionadas, carga de datos, ALTER y DROP de tabla de prueba, filtros y ordenamiento.
- Resultados observados: 7 precios filtrados, 2 coincidencias LIKE y 6 productos en rango inclusivo. Consultas finales confirmadas por declaración.
- DECIMAL para precios, INT para unidades y LIMIT para acotar resultados. IS NULL sin coincidencias en proveedor_id por NOT NULL.
- Aclaración del estudiante: trabajo en clase, no entrega formal.

Consulta la [nota](../../../../docs/aprendizaje/2026-10-27-sql-creacion-consultas.md) y el [registro](../../../../docs/practicas/07-sql-creacion-consultas.md).

## 08 — Vistas, JOIN, procedimientos y triggers

**Estado: teoría estudiada; vistas y JOIN practicados parcialmente con resultados observados** · Clase: 2026-10-28 · Registro: 2026-10-29

- Presentación de manipulación y automatización, Guía Rápida SQL y ejemplos del profesor.
- Tres vistas simples visibles; JOIN productos/categorias y catálogo con 12 filas demostrados.
- Procedimientos, CALL, IN, DELIMITER, triggers BEFORE/AFTER y OLD/NEW explicados desde ejemplos del profesor; sin ejecución propia de rutinas/triggers registrada.
- Extensión tratada como trabajo en clase; no declarar implementación de los cinco objetos restantes ni exigir terminarla para seguir.
- Objetivo: fundamentos para dirigir agentes y revisar futuras decisiones de Vértice; aplicaciones candidatas, sin cambios de stack.
- El 29 de octubre Sebastián cambió a Business Solutions; el contenido y el avance parcial quedaron documentados el 30 de octubre en el tema 09.

Consulta la [nota](../../../../docs/aprendizaje/2026-10-28-sql-vistas-join-automatizacion.md) y el [registro](../../../../docs/practicas/08-sql-extension-vistas-automatizacion.md).

## 09 — Business Solutions: mercadeo, datos y agentes

**Estado: teoría estudiada y práctica parcial** · Sesiones: 2026-10-29/30

- Caso independiente Merma Cero: necesidad, nicho, servicio, recorrido, embudo, canales y contenido.
- Responsabilidades de equipos, traspaso con contexto, plazo de contacto y aprobación de versiones.
- EER y 22 tablas creadas en MySQL; carga verificada hasta 17 tablas, con traspasos e interacciones.
- Métricas y arquitectura de agentes tratadas conceptualmente; consultas finales, fichas de agentes y entrega final sin completar.
- El 30 de octubre Sebastián informó que no pudo terminar la práctica y priorizó mercadeo. El resumen del resultado previsto no se registra como ejecución.
- Aprendizajes conservados para consulta; aplicaciones a Vértice candidatas, sin cambios de producto ni stack.

Consulta la [nota](../../../../docs/aprendizaje/2026-10-30-business-solutions-mercadeo-datos-agentes.md) y el [registro](../../../../docs/practicas/09-business-solutions-merma-cero.md).

## Próximos temas

No se asignan tecnologías, secuencias ni fechas hasta que aparezcan en el curso.

## Registro

- **2026-10-16:** teoría y prácticas de POO documentadas; sin importar soluciones locales.
- **2026-10-19:** integración de servicios, parsing, persistencia e historial documentados desde LAB1; aprobación informada por el estudiante.
- **2026-10-20:** orquestación IA y Data Tables documentadas con resultados observados; sin convertir el laboratorio en aplicación del startup.
- **2026-10-21:** API full stack, transacciones, migración FDM y snapshots practicados; inventario y precios del caso siguen siendo simulados.
- **2026-10-22:** se registró la extensión de gimnasio en Supabase como práctica académica independiente; no se incorporó al producto Vértice.

- **2026-10-27:** se documentaron las sesiones de MySQL del 26–27, el DER y la práctica de biblioteca; revisión final del archivo SQL pendiente, sin importar la solución.

- **2026-10-30:** Business Solutions documentado como teoría estudiada y práctica parcial, con separación entre resultados observados, diseño previsto y aplicaciones candidatas a Vértice.
