# 2026-11-02 — Normalización 1FN, 2FN y 3FN aplicada a Business Solutions

## Contexto y fuentes

Materiales de clase aportados por Sebastián:
- **Formas Normales — 1FN · 2FN · 3FN** (16 páginas): definiciones, ejemplos de estudiantes y teléfonos, matrículas y departamentos.
- **Normalización y Diseño de Bases de Datos — Aplicado a contextos reales de Business Solutions** (17 páginas): inventarios, recursos humanos, ventas, efectos sobre confiabilidad, costo y escalabilidad.
- Prácticas #1, #2 y #3 de normalización (noviembre de 2026): diagnóstico de ocho casos, diagnóstico de gimnasio y propuesta de back office.

**Estado:** teoría revisada y ejercicios abordados durante la conversación. La práctica #3 permite expresamente FULL IA; las prácticas #1 y #2 prohíben IA en su realización/entrega. Estas notas registran conocimientos y experiencia conversada, no sustituyen entregables individuales.

## Fundamentos: no se trata solo de dividir tablas

Normalización: organizar entidades y dependencias para reducir **redundancia** y **anomalías de inserción, actualización y eliminación**. El objetivo del negocio es que un cambio de un dato se haga una sola vez, los reportes sean consistentes y el sistema pueda crecer.

| Forma | Pregunta práctica | Regla | Ejemplo del material |
|---|---|---|---|
| 1FN | ¿Hay listas o grupos repetidos en celdas/columnas? | Atributos atómicos, sin grupos repetidos y filas identificables. | `estudiantes.telefonos = '8888-1111, 8888-2222'` se separa en una tabla `telefonos`, con una fila por número. |
| 2FN | ¿Todo atributo no clave depende de **toda** una clave compuesta? | Cumple 1FN y no hay dependencias parciales. | En `matriculas(estudiante_id, curso_id)`, `estudiante_nombre` depende solo de `estudiante_id`; el nombre va en `estudiantes`. |
| 3FN | ¿Un atributo no clave depende de otro atributo no clave? | Cumple 2FN y no hay dependencias transitivas. | `empleados.departamento_id → departamentos.nombre`: no repetir `departamento_nombre` en cada empleado. |

**Matices:**
- Una PK simple elimina el caso de dependencia parcial respecto de una PK compuesta, pero **no demuestra 3FN**.
- No toda repetición implica por sí sola un incumplimiento; hay que identificar dependencias funcionales y el significado de los atributos.
- Un `VARCHAR` puede ser PK si sus valores son únicos y no nulos: elegir una PK numérica sustituta es una decisión de estabilidad e identidad de negocio, no una ley de MySQL.
- Para relaciones N:M, la tabla intermedia lleva las dos FK. Si una inscripción debe ser única, las dos FK **no bastan**: considerar `UNIQUE(miembro_id, clase_id)` o una PK compuesta, según las reglas de negocio.

## Tres casos del material de Business Solutions

1. **Inventarios:** nombre y país del proveedor deben vivir en `proveedores`, no repetirse en `productos`. Una FK en el producto permite corregir un cambio de proveedor una sola vez.
2. **Recursos humanos:** nombre y gerente del departamento dependen de `departamento_id`; se separan de `empleados` para evitar versiones contradictorias del organigrama.
3. **Ventas:** `clientes` almacena una identidad y un correo único; `ventas.cliente_id` referencia esa identidad. Así los reportes no separan un mismo cliente por variantes de su nombre.

La decisión no es puramente técnica: afecta costos de corrección, credibilidad de reportes y decisiones operativas.

## Modelo conceptual: del negocio al DER

Proceso recomendado por las diapositivas:
1. Entender el proceso real conversando con quien lo conoce.
2. Identificar entidades y atributos.
3. Dibujar relaciones y cardinalidades (1:1, 1:N, N:M).
4. Revisar dependencias y aplicar 1FN, 2FN, 3FN.
5. Validar con el negocio que el DER describe los procesos reales **antes** de crear las tablas.

El DER no es solo para programadores: puede revelar supuestos falsos, por ejemplo que un producto solo tenga un proveedor cuando en realidad puede tener varios. MySQL Workbench permite corroborar el diseño con `DESCRIBE`, `SHOW CREATE TABLE` y diagramas EER.

## Restricciones que sostienen la calidad

- `PRIMARY KEY`: identificación única y no nula.
- `FOREIGN KEY`: integridad referencial. La FK se define en la tabla que **referencia** a la otra.
- `NOT NULL`: valor obligatorio.
- `CHECK (monto > 0)`: impide cero y negativos; combinarlo con `NOT NULL` porque `CHECK` por sí solo no rechaza todos los NULL.
- `UNIQUE`: evita duplicados en la(s) columna(s) definidas, **no** reemplaza una FK.
- `VARCHAR` es apropiado para teléfonos: no son cantidades aritméticas, pueden incluir prefijos, guiones, `+` y ceros iniciales.
- `DECIMAL(10,2)` es apropiado para importes exactos; `TIME` para horarios, `DATE` para fechas.

### Qué se practicó con ALTER TABLE

Sobre la práctica académica de un gimnasio se trabajaron cambios **sin reconstruir** la base: ajustar el tipo de `telefono`, eliminar un nombre duplicado del instructor, agregar relaciones entre inscripciones y entidades referenciadas, relacionar pagos con tipos de membresía y restringir montos. La evidencia en la conversación confirmó las definiciones finales de `miembros`, `clases`, `inscripciones_clases` y `pagos`.

Lección de sintaxis: `MODIFY COLUMN` necesita repetir el **tipo** de columna, `DROP COLUMN` no acepta el tipo detrás del nombre, y una FK necesita `FOREIGN KEY (columna_local) REFERENCES tabla_destino(columna_destino)`. Los nombres de `CONSTRAINT` los puede elegir quien diseña.

## 3FN no significa normalizar sin límites

La segunda presentación advierte contra la **sobrenormalización** que multiplica JOIN sin necesidad. También contempla **desnormalizar deliberadamente** por motivos medidos de rendimiento (p. ej. ciertos dashboards), después de diseñar inicialmente hasta 3FN y dejando documentado el motivo.

## Más allá de las tablas: back office SQL

La práctica FULL IA propuso un back office administrativo: DER con cardinalidad, datos de ejemplo, vistas para responder preguntas reales, procedimientos para operaciones completas y triggers que reaccionan automáticamente a cambios.

- **Vista:** `CREATE VIEW` conserva una consulta para reportes.
- **Stored procedure:** secuencia invocable con `CALL` y parámetros, útil para encapsular reglas.
- **Trigger:** lógica `BEFORE`/`AFTER` ligada a `INSERT`/`UPDATE`/`DELETE`; depende de `OLD` o `NEW` según el evento.
- **Verificación:** comprobar datos y efectos, no dar por hecho que crear un objeto demuestra que funciona. Los documentos y el SQL preparados para la práctica #3 **no acreditan por sí solos ejecución exitosa en MySQL Server**.

## Aplicación futura a Vértice

Estas son **posibilidades**, no implementaciones ni cambios de stack:
- Distinguir cliente, orden, ítems, cotización y materiales en un DER validado con el proceso real.
- Evitar nombres de categorías o clientes repetidos en cada orden cuando corresponda usar FK.
- Preservar snapshots históricos de precio/descripción **por necesidad del negocio**, diferenciando un dato histórico deliberado de redundancia accidental.
- Establecer validaciones de montos, cantidades e integridad de órdenes y cotizaciones antes de diseñar dashboards.

No se modifica el software del startup ni se decide aquí entre MySQL y PostgreSQL.

## Referencias cruzadas

- [Hospital: 1FN/2FN](2026-10-30-normalizacion-hospital.md).
- [Práctica #1: ocho casos](../practicas/11-normalizacion-ocho-casos.md).
- [Práctica #2: gimnasio](../practicas/12-normalizacion-gimnasio-diagnostico.md).
- [Práctica #3: back office](../practicas/13-normalizacion-back-office-full-ia.md).
