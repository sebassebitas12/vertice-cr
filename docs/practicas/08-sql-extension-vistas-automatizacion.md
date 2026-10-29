# Extensión de tienda: vistas y automatización

Clase: 2026-10-28. Registro: 2026-10-29. MySQL Workbench sobre tienda_online existente.

**Modalidad informada:** trabajo en clase; Sebastián indicó pasar al tema nuevo sin continuar esta actividad ahora.

Fuente: SQL_Practica2_Extension_Tienda.pdf. El documento propone dos vistas, dos procedimientos y dos triggers. Se registra el alcance y el aprendizaje sin importar una solución completa.

## Avance observado

- Tres vistas previas visibles en Workbench: vista_productos_disponibles, vista_pedidos_pendientes y vista_clientes_correo.
- JOIN productos/categorias ejecutado con 12 filas.
- productos_catalogo construido y resultado de 12 filas mostrado con categoría, producto y precio.
- Corrección observada del borrador: CREATE VIEW debe ir antes del SELECT y AS no se cierra con punto y coma separado.

## Alcance restante del material

pedidos_resumen con total agregado; registrar_pedido; actualizar_stock sin resultado negativo; trigger de descuento de stock al insertar detalle; historial de precios al actualizar producto. No hay evidencia de ejecución propia de esos cinco objetos. No se impone su finalización como requisito para registrar el aprendizaje.

Los procedimientos y triggers mostrados antes fueron ejemplos del profesor. Su CALL exitoso y error de trigger duplicado no son pruebas locales de Sebastián.

Conceptos y posibles aplicaciones: [nota de aprendizaje](../aprendizaje/2026-10-28-sql-vistas-join-automatizacion.md).
