# Práctica de normalización #3 — Back office con FULL IA

**Fecha de registro:** 2026-11-02. **Enunciado:** `Norm_Practica3_FullIA_BackOffice.pdf`. **Herramienta objetivo:** MySQL.

## Regla académica distinta de las otras dos

Esta práctica **sí permite y espera el uso de IA** para diseñar el DER, construir SQL, vistas, procedimientos y triggers. La evaluación exige explicar cada componente y **demostrar que funciona**, no solo que existe un script.

## Requisitos de la guía

- DER con cardinalidad y al menos **6 tablas**.
- Explicación de **1FN, 2FN y 3FN**.
- SQL completo con datos de prueba.
- Mínimo **3 vistas**, **2 stored procedures** y **2 triggers**.
- Registro de al menos **4 prompts**, con pedido, respuesta y ajustes.
- Capturas de al menos **una vista, un procedimiento y un trigger funcionando**.

## Caso preparado: mantenimiento de equipos

Con IA se preparó un caso independiente de administración de mantenimiento. El SQL generado en la conversación declara **8 tablas**:

`sedes`, `categorias_equipo`, `tecnicos`, `equipos`, `ordenes_trabajo`, `repuestos`, `consumos_repuestos` y `historial_ordenes`.

También declara:
- Vistas: `vw_ordenes_pendientes`, `vw_costos_por_orden`, `vw_stock_critico`.
- Procedimientos: `sp_crear_orden`, `sp_cerrar_orden`.
- Triggers: `trg_consumo_descontar_stock`, `trg_orden_registrar_estado`.
- Datos de ejemplo, llamadas a procedimientos y consultas de verificación.
- Diagrama ER y PDF de explicación, normalización, prompts y guía de evidencias.

**Estado:** artefactos preparados y archivados para Classroom durante la conversación; **no se ejecutó el SQL contra un servidor MySQL desde el asistente**. Las capturas reales de una vista, un procedimiento y un trigger se indicaron como pendientes de obtener en Workbench. No debe presentarse como validación de ejecución completa.

## Conceptos aprendidos

El back office separa **datos maestros**, **operaciones** y **historial**. Las vistas responden preguntas administrativas; los procedimientos encapsulan acciones de negocio; los triggers automatizan consecuencias de inserciones o cambios. Es indispensable validar cardinalidades, `CHECK`, `NOT NULL`, FKs, transacciones y condiciones de stock, además de la sintaxis.

**Vértice CR:** esto es un ejercicio académico **independiente**. No se integró a la tienda ni cambia su stack ni su proceso operativo.

[Nota de aprendizaje](../aprendizaje/2026-11-02-normalizacion-3fn-diseno-negocio.md).
