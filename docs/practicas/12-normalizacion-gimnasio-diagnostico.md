# Práctica de normalización #2 — Diagnóstico del gimnasio

**Fecha de registro:** 2026-11-02. **Fuente:** `Norm_Practica2_Diagnostico_Gimnasio(1).pdf` (dos páginas). **Herramienta:** MySQL Workbench.

**Política académica:** ejercicio individual sin asistencia de IA. Este registro es **memoria de aprendizaje y de las verificaciones compartidas**, no una propuesta de entrega ni una sustitución del análisis individual exigido.

## Encargo

Inspeccionar el esquema de **seis tablas** (`membresias`, `miembros`, `instructores`, `clases`, `inscripciones_clases`, `pagos`), encontrar seis defectos de diseño, repararlos **exclusivamente con ALTER TABLE** y verificar que los datos de ejemplo permanezcan válidos.

## Aprendizajes y verificaciones observadas

- `miembros.telefono`: se cambió de `INT` a `VARCHAR(20)`. `DESCRIBE miembros` compartido mostró `varchar(20)`.
- `clases.instructor_nombre`: columna redundante cuando `instructor_id` ya referencia a `instructores`. `DESCRIBE clases` compartido confirmó la ausencia de esa columna y la permanencia de `instructor_id`.
- `inscripciones_clases`: se agregaron dos restricciones de FK para `miembro_id` y `clase_id`. `SHOW CREATE TABLE` compartido confirmó `fk_inscripcion_miembro` y `fk_inscripcion_clase`.
- `pagos.membresia`: se relacionó con `membresias(tipo)`; `SHOW CREATE TABLE pagos` confirmó `fk_pagos_membresia`.
- `pagos.monto`: `DECIMAL(10,2) NOT NULL` y restricción `chk_monto_positivo` (`monto > 0`), confirmadas por `SHOW CREATE TABLE pagos`.

**Nota de precisión:** estos son cambios confirmados; **no prueban de forma independiente** que su agrupación coincida exactamente con los seis defectos previstos por el docente. En particular, las dos FKs de inscripciones pueden contarse como dos ausencias o como un único problema de relación. Además, las FKs permiten `NULL` si las columnas no tienen `NOT NULL`, y no impiden por sí solas una inscripción duplicada: son decisiones adicionales que se deben evaluar con las reglas de negocio.

## Herramientas de diagnóstico aprendidas

- `DESCRIBE tabla`: verificar tipo, nulabilidad e índices de columnas.
- `SHOW CREATE TABLE tabla`: verificar texto completo de PK, FK, CHECK y otras restricciones.
- `ALTER TABLE`: modificar una base existente preservando datos; cuidar el orden de dependencias.
- Una PK textual como `membresias.tipo` **es válida en MySQL**; no se debe declararla errónea solo por usar `VARCHAR`. Puede evaluarse si conviene un ID sustituto dependiendo de cambios futuros del nombre.

**Alcance verificado:** estructura final de cuatro tablas mediante capturas/salida en la conversación. No se documenta una aprobación académica ni una validación exhaustiva de todas las filas.

[Nota de aprendizaje](../aprendizaje/2026-11-02-normalizacion-3fn-diseno-negocio.md).
