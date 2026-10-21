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

## 02 — Orquestación IA, n8n y persistencia

**Estado: estudiado y practicado** · Registro: 2026-10-20

- Trigger → AI Agent (Chat Model, Memory, Tools) → respuesta.
- Orquestación supervisor/especialistas; contratos `{ok,data,error}` y analogías POO.
- n8n Data Tables: catálogo de tarifas y cotizaciones persistidas.
- Consultas, validación, cálculo determinista, escritura `upsert` y control de duplicados de la misma solicitud/sesión.
- Errores observados: material inexistente, datos incompletos, repetición de filas por múltiples ítems; medidas de corrección.
- Práctica aplicada a una **simulación académica** de impresión 3D, sin adoptar ese backend como stack del startup.

Consulta [nota de orquestación](../../../../docs/aprendizaje/2026-10-20-agente-orquestador-n8n.md) y [registro de práctica](../../../../docs/practicas/2026-10-20-orquestador-cotizaciones-n8n.md).

## Próximos temas

## 03 — API REST, PostgreSQL y transacciones

**Estado: estudiado y practicado según declaración** · Registro: 2026-10-21

- Modelo relacional con llaves foráneas, restricciones y datos de ejemplo.
- API REST con Express, servicios, códigos HTTP y errores de negocio.
- Transacciones `BEGIN`/`COMMIT`/`ROLLBACK` para operaciones que afectan varias tablas.
- Bloqueo de filas con `FOR UPDATE` y validación de stock, cupones, envíos y estados.
- Métricas SQL con agregaciones y agrupaciones.

Consulta la [nota del Laboratorio 2](../../../../docs/aprendizaje/2026-10-21-laboratorio2-fullstack.md) y el [registro de práctica](../../../../docs/practicas/04-laboratorio2-inventario-cupones-envios.md).

No se asignan tecnologías, secuencias ni fechas hasta que aparezcan en el curso.

## Registro

- **2026-10-16:** teoría y prácticas de POO documentadas; sin importar soluciones locales.
- **2026-10-20:** orquestación IA y Data Tables documentadas con resultados observados; sin convertir el laboratorio en aplicación del startup.
