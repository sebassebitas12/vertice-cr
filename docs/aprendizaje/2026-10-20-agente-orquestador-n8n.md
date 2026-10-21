# Agente orquestador en n8n: herramientas, POO y persistencia

- **Fecha:** 2026-10-20
- **Área:** Backend — automatización, IA y bases de datos
- **Estado:** estudiado y practicado en clase, con ejecuciones y capturas revisadas
- **Fuentes:** material del profesor «El Agente Orquestador en n8n» (10 páginas) y «Workflows orientados a objetos en n8n con un Agente de IA» (16 páginas).
- **Alcance:** progreso de aprendizaje, **no entrega académica** ni componente aprobado para producción.

## Qué aprendimos

Un **agente orquestador** interpreta solicitudes, elige especialistas y reúne una respuesta. El flujo estudiado parte de un disparador, pasa por un `AI Agent` (Chat Model, Memory y Tools) y termina en una respuesta. Las *Tools* pueden invocar consultas, código o sub-workflows; un agente sin herramientas operativas solamente redacta o propone.

La clase relaciona POO y n8n por **analogía de diseño**:

| Concepto | Equivalencia práctica |
|---|---|
| Abstracción | Cada herramienta expone una responsabilidad sin enseñar todos los nodos |
| Encapsulamiento | Validación y operaciones de datos dentro del módulo encargado |
| Interfaz / contrato | Entrada y salida estructuradas, por ejemplo `{ok, data, error}` |
| Composición | El orquestador combina modelo, memoria y especialistas |
| Polimorfismo | Herramientas diferentes pueden atender peticiones bajo un contrato consistente |

> n8n no convierte automáticamente los subagentes en clases con herencia real. La implementación Python mostrada por el profesor fue un ejemplo de POO; no se adoptó un nuevo stack para el startup.

## Experimento de clase aplicado al dominio Vértice CR

Se construyó en n8n un **prototipo académico de cotizaciones de impresión 3D** con DeepSeek como modelo, memoria conversacional y cuatro especialistas: **Datos, Facturas/Cotizaciones, Correo y Archivos**. Los dos primeros cuentan con herramientas de código para comprobar tarifas y cálculos; Correo y Archivos permanecen en modo de borrador o propuesta.

Se usaron dos **Data Tables persistentes**:

- `catalogo_tarifas_demo`: seis materiales con importes y metadatos ficticios.
- `cotizaciones_demo`: registro de borradores con material, cantidad, consumo, desglose, total, estado e identificador.

El archivo CSV fue **semilla para importar** datos; no es la base de datos en ejecución. El profesor confirmó que Data Tables es una alternativa válida para esta práctica. El alcance de la clase es **backend**, sin front end.

### Flujo y responsabilidades

1. Chat recibe el mensaje.
2. Data Tables entrega tarifas y cotizaciones existentes.
3. Código valida las entradas, calcula en CRC y decide si una petición de guardar es válida.
4. Solo una orden **explícita** de guardar habilita el `upsert` en `cotizaciones_demo`.
5. El agente y los especialistas explican el resultado, sin modificar importes verificados por código.
6. La respuesta final comunica si hubo lectura, cálculo, error o persistencia confirmada.

La IA **no** determina los precios, los impuestos ni los gramos/horas de un STL; esos datos se basan en tarifas ficticias y consumos declarados, y los cálculos los valida el código.

## Resultados observados durante la clase

- Consulta de **PLA** (₡35/g, ₡1.200/h) y **PETG** (₡45/g, ₡1.300/h).
- Material inexistente `XYZ`: `TARIFA_INEXISTENTE`; identificador vacío: `MATERIAL_ID_REQUERIDO`.
- Cotización PLA de 3 piezas, 20 g y 1,25 h por pieza: **₡9.250 sin impuestos**.
- Cotización PETG de 2 piezas, 10 g y 1 h por pieza: **₡5.500 sin impuestos**.
- Guardado confirmado en Data Tables y lectura posterior con desglose detallado.
- Repetir la misma orden en una misma sesión **actualizó** la misma cotización en lugar de crear otra.
- Solicitud de guardar TPU sin gramos ni horas: `DATOS_INCOMPLETOS`, sin ejecutar escritura.
- Se corrigió una lectura que repetía una cotización seis veces por procesar cada ítem del catálogo; se validó una coincidencia para un ID filtrado.

**Límites de lo observado:** estas pruebas se comprobaron con respuestas y capturas compartidas durante la clase; no constituyen pruebas automatizadas de producción ni aprobación comercial. El control de duplicados está probado para la misma solicitud en la misma sesión, **no** como garantía general ante concurrencia.

## Aprendizajes técnicos para próximos proyectos

- Separar **razonamiento conversacional** de operaciones deterministas sobre datos.
- Validar un contrato estable `{ok, data, error}` y no confundir un `ok:false` de negocio con un fallo de ejecución n8n.
- Distinguir **total de registros leídos** de **coincidencias filtradas**.
- En n8n, un nodo puede ejecutarse una vez por cada ítem de entrada: controlar ese comportamiento para evitar consultas repetidas.
- La persistencia debe requerir intención explícita, validación y confirmación de la base de datos.
- Al importar JSON en el editor, conservar un respaldo y comprobar las referencias entre workflows para evitar autorreferencias accidentales.
- Preferir la evolución del flujo existente a crear workflows descartables de prueba.

## Estado respecto del startup

Este ejercicio es un **laboratorio de backend**, no una decisión para el stack definitivo de Vértice CR. Las tarifas son sintéticas y la cotización **no** equivale a facturación electrónica. No se implementó ningún front end ni integración de envío de correos, acceso a archivos reales o pago.
