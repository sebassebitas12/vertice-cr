# SQL: creación y consultas básicas

Fecha: 2026-10-27. Herramientas: MySQL Server, Workbench y draw.io.

## Práctica #1 — Preguntas y situaciones

Fuente: `SQL_Practica1_Preguntas_Situaciones.pdf`.

**Estado: realizada según declaración y seguimiento de la sesión.** Se repasaron DDL/DML, restricciones, cambios de estructura, selección de columnas, patrones de texto, rangos, ordenamiento y eliminación de una tabla.

Las consultas mostradas devolvieron cero filas porque la tabla estaba vacía. No se atribuyen resultados de filtrado sobre registros que no se observaron. Se corrigió el uso del nombre anterior después de renombrar una tabla.

## Práctica #2 — Tienda completa

Fuente: `SQL_Practica2_Tienda_Completa.pdf`.

**Estado: realizada según declaración del estudiante, con seguimiento y capturas.** Sesiones: 2026-10-27/28. Sebastián aclaró que se trabajó en clase y no corresponde a una entrega formal.

### Modelo y carga observados

DER con siete entidades, PK en cada id y seis relaciones 1:N. Pedidos y productos se vinculan mediante detalle_pedidos, que permite varios productos por pedido y un producto en varios pedidos.

| Tabla | Registros observados |
|---|---:|
| categorias | 4 |
| proveedores | 3 |
| clientes | 5 |
| direcciones | 5 |
| productos | 12 |
| pedidos | 8 |
| detalle_pedidos | 15 |

Las capturas mostraron inserciones exitosas y consultas con esos conteos. El cliente 1 tiene dos direcciones. Los datos son ejemplos ficticios; los teléfonos usados no son contactos verificados. Los productos incluyen variedad de precios, categorías y stock, con dos productos sin existencias.

### Cambios de estructura

- clientes: fecha_registro DATE nullable; ejecución sin advertencias compartida.
- productos: descuento DECIMAL(10,2) DEFAULT 0; realización confirmada por el estudiante.
- categorias: descripcion TEXT; ejecución sin advertencias compartida.
- proveedores: eliminación de telefono; captura posterior muestra id, nombre y pais.
- tabla_prueba: creación indicada y eliminación practicada; el historial mostrado confirma DROP TABLE.

### Consultas

Se observaron 7 precios mayores a 15000 en orden descendente, 2 nombres que contienen Balón mediante LIKE y 6 productos con stock entre 5 y 15, incluidos los extremos.

Después se trabajaron IN para estados, IS NULL para proveedor, orden alfabético de clientes, AND para categoría con existencias, OR para categorías alternativas y LIMIT 5 con fecha descendente e ID como desempate. El estudiante comunicó que terminó; no se recibieron capturas individuales de esas seis consultas finales.

La consulta de proveedor sin asignar devuelve cero filas con el modelo actual: proveedor_id es NOT NULL y todos los productos tienen proveedor. No se registra una prueba positiva de IS NULL sobre ese campo.

### Alcance del registro

El PDF original contiene condiciones de entrega individual; el estudiante aclaró el uso como trabajo de clase. Se conservan conceptos, progreso y evidencia sin importar el script completo ni atribuir calificación o entrega. No se modifica el producto Vértice ni su stack.

## Aprendizaje

Distinguir estructura de datos, mantener nombres coherentes tras renombrar objetos y comprobar los filtros con datos que permitan observar diferencias.

Consulta la [nota de clase](../aprendizaje/2026-10-27-sql-creacion-consultas.md).
