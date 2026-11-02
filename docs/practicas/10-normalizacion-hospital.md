# Práctica de clase — Hospital: 1FN y 2FN

**Fecha:** 2026-10-30. **Herramienta:** MySQL Workbench. **Fuente:** `Semana 10 · Primera y Segunda Forma Normal (1).pdf`, páginas 6–7 y 12–13.

**Estado:** realizada en clase según declaración de Sebastián y capturas compartidas. Se observaron consultas y relaciones correctas; los requisitos de la guía se contrastan por separado. No hay constancia de calificación ni de entrega formal.

## Secuencia y resultados observados

- Base `hospital` con una tabla plana `registro_hospital` de **4 filas**, inicialmente con datos repetidos y listas de medicamentos.
- Cinco tablas derivadas: `paciente`, `medico`, `especialidad`, `cita`, `medicamento`.
- Las cinco PK son **simples**: `id_paciente`, `id_medico`, `id_especialidad`, `id_cita`, `id_medicamento`.
- Cuatro FK declaradas, comprobadas mediante `information_schema.KEY_COLUMN_USAGE`: médico–especialidad, cita–paciente, cita–médico, medicamento–cita.
- En 1FN se separaron los nombres de medicamentos que estaban unidos por comas; la tabla `medicamento` mostró **6 registros**. Una consulta con cuatro `JOIN` devolvió **6 filas**, con datos correspondientes de pacientes, médicos, especialidades y citas.
- Se generó y guardó localmente el diagrama EER con las cinco entidades. En MySQL se consultaron las PK: **5 tablas, 1 columna de PK por tabla**, lo que permite comprobar 2FN para las tablas en 1FN sin buscar dependencias parciales sobre claves compuestas.

## Comprobación frente al enunciado

| Requisito de clase | Lo observado |
|---|---|
| Tabla inicial sin normalizar | Sí; 4 registros. La guía solicitaba **al menos 5**. |
| Cinco entidades | Sí. |
| Cinco atributos por entidad | **No** en varias tablas; la guía solicitaba al menos 5. |
| Atributo multivaluado y corrección a 1FN | Sí; medicamentos separados en filas. |
| Relación N:M | **No modelada explícitamente**; el modelo usa `cita 1:N medicamento`. |
| Claves primarias y foráneas | Sí; 5 PK simples y 4 FK observadas. |
| Dependencias y revisión de 2FN | Analizadas a partir de las PK simples; no se descompuso una tabla con clave compuesta. |
| Diagrama final | Sí, observado en Workbench y representación explicativa durante la conversación. |

La guía también pide entregar la tabla sin normalizar, tablas en 1FN, dependencias funcionales, tablas en 2FN y diagrama final. **No se puede afirmar desde esta conversación que se haya remitido todo ese paquete.**

## Qué se aprendió

- 1FN elimina celdas con listas y requiere filas identificables; una lista como `Paracetamol, Ibuprofeno` no se vuelve atómica solo por guardar texto en `VARCHAR`.
- 2FN elimina **dependencias parciales**; una PK de una sola columna impide que exista una dependencia de una *parte* de esa PK, siempre que se cumpla 1FN.
- Declarar las columnas `id_...` no crea relaciones: hace falta una `FOREIGN KEY` real, que luego puede verificarse en metadatos de MySQL.
- Los `JOIN` permiten reconstruir una vista útil de los datos ya separados.
- El modelo practicado trata medicamentos por cita como filas con ID propio; una tabla de medicamentos de catálogo y una tabla de unión serían **otra decisión de diseño**, no algo ya implementado.

## Límites

No se incorporan SQL de solución, capturas ni archivos locales en este repositorio. La práctica fue un ejercicio de aprendizaje de backend separado del dominio comercial de Vértice.

Ver [nota de aprendizaje](../aprendizaje/2026-10-30-normalizacion-hospital.md).
