# Errores comunes

Errores que ya aparecieron, para no repetirlos.

| Fecha | Error observado | Causa o riesgo identificado | Corrección aplicada o aprendizaje |
|---|---|---|---|
| 2026-10-21 | Crear una orden desde React devolvía `400`: `producto_id` debía ser entero positivo. | `pg` serializó IDs `BIGINT` como texto y el formulario los envió sin conversión. | Normalizar IDs a enteros seguros en el payload; probar IDs fuera de rango y cantidades inválidas, manteniendo la validación estricta en la API. |
| 2026-10-20 | Una cotización se mostró repetida seis veces en una consulta. | El nodo de lectura se ejecutaba por cada ítem procedente del catálogo de seis materiales. | Ejecutar la segunda lectura una sola vez y distinguir conteos totales de coincidencias filtradas; consulta posterior mostró una coincidencia. |
| 2026-10-20 | Al reemplazar nodos en el editor se confundieron referencias entre el orquestador y un sub-workflow. | La identidad/URL del workflow no equivale al nombre importado, y una herramienta podía apuntar a un ID equivocado. | Verificar los destinos antes de integrar y simplificar el laboratorio a un workflow principal cuando resultó más práctico. |
| 2026-10-20 | Una captura de una consulta se interpretó inicialmente como fallo de guardado. | Se estaba inspeccionando la ejecución equivocada. | Confirmar el mensaje exacto y la ejecución correspondiente antes de diagnosticar un error. |
| 2026-10-19 | El workflow de la extensión no generaba ejecuciones al probar un correo. | Seguía publicada la versión original, no la exportación actualizada. | Publicar la versión de extensión y probar con un correo entrante nuevo. |
| 2026-10-19 | Un correo cotidiano sin campos fijos no se interpretaba como solicitud válida. | El parser dependía de un formato rígido para producto y cantidad. | Aceptar lenguaje cotidiano y pedir aclaración si los datos siguen ambiguos. |

| 2026-10-26 | Error de sintaxis al cerrar CREATE TABLE. | Coma después de la última columna. | Quitar la coma final. |
| 2026-10-26 | INSERT en tabla intermedia falló por ID sin valor predeterminado. | ID obligatorio sin generación automática. | Configurar AUTO_INCREMENT manteniendo una clave primaria. |
| 2026-10-26 | Pedidos repetidos y DELETE sin borrar filas. | INSERT repetido y condición id = 6 AND id = 7 imposible. | Ejecutar solo el bloque necesario; revisar los ID y usar IN u OR para alternativas. |
| 2026-10-27 | libros se creó sin titulo. | Columna omitida aunque la sintaxis restante era válida. | Agregar mediante ALTER TABLE y corregir la definición guardada. |
| 2026-10-27 | fecha_prestamos difería del DER. | Nombre en plural en el script. | Renombrar a fecha_prestamo y mantener consistencia. |
| 2026-10-27 | Error 1146 al usar clientes después de renombrarla a compradores. | Las consultas seguían apuntando al nombre anterior. | Usar el nuevo nombre en las consultas y cambios posteriores. |
