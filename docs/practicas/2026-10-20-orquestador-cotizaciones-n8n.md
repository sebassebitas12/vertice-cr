# Práctica de clase — Orquestador IA y cotizaciones en n8n

- **Fecha:** 2026-10-20
- **Estado:** realizada en clase; resultados revisados mediante capturas y mensajes de ejecución.
- **Tipo:** ejercicio de aprendizaje, **no entregable solicitado por el profesor**.
- **Ámbito:** exclusivamente backend, con n8n, DeepSeek y n8n Data Tables.
- **Documentación temática:** [Agente orquestador en n8n](../aprendizaje/2026-10-20-agente-orquestador-n8n.md).

## Objetivo

Aplicar orquestación con IA, herramientas, control de datos y conceptos de POO a un caso de negocio libre: **estimaciones académicas de impresión 3D para Vértice CR**.

## Desarrollo observado

- Orquestador con modelo, memoria y cuatro subagentes: Datos, Facturas, Correo y Archivos.
- Herramientas reales de código en Datos (tarifas) y Facturas (verificación aritmética); los otros dos especialistas solo redactan propuestas.
- Tabla `catalogo_tarifas_demo` con seis materiales sintéticos y `cotizaciones_demo` con borradores.
- Lectura y cálculo determinista de cotizaciones; persistencia con orden expresa y `upsert`.
- Versión del flujo revisada al final de clase: **v1.4.2**.

## Matriz breve de evidencia

| Escenario | Resultado observado |
|---|---|
| Consultar PLA y PETG | Datos de tarifa recuperados |
| Consultar XYZ | Error de negocio `TARIFA_INEXISTENTE` |
| Material sin ID | Error `MATERIAL_ID_REQUERIDO` |
| Cotizar 3 × PLA (20 g, 1,25 h) | ₡9.250, sin impuestos |
| Cotizar y guardar 2 × PETG (10 g, 1 h) | ₡5.500, nueva fila en Data Tables |
| Repetir el guardado en la misma sesión | Se mantuvieron dos filas totales; misma cotización actualizada |
| Consultar cotización guardada | Desglose y **una** coincidencia por ID |
| Guardar TPU sin consumos | `DATOS_INCOMPLETOS`, sin escritura |

También se observó y corrigió una repetición de filas causada por ejecutar la consulta una vez por cada ítem de entrada.

## Qué queda fuera

- No se pide front end en esta clase.
- No hay precios oficiales de Vértice CR, impuestos reales, factura electrónica, lectura efectiva de STL, correo enviado o archivos procesados.
- El workflow exportado y los PDF del profesor **no se incorporan en este registro documental**; no es una solución para entregar ni una dependencia del startup.
- La aprobación del profesor sobre Data Tables es una aclaración de requisitos, **no una revisión formal de seguridad o producción**.

## Aplicación futura

Reutilizar las ideas de validación, separación IA/código, contratos JSON y trazabilidad **solo cuando una decisión posterior del startup lo justifique**; no trasladar este prototipo a producción directamente.
