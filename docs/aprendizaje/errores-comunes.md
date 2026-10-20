# Errores comunes

Errores que ya aparecieron, para no repetirlos.

| Fecha | Error observado | Causa o riesgo identificado | Corrección aplicada o aprendizaje |
|---|---|---|---|
| 2026-10-20 | Una cotización se mostró repetida seis veces en una consulta. | El nodo de lectura se ejecutaba por cada ítem procedente del catálogo de seis materiales. | Ejecutar la segunda lectura una sola vez y distinguir conteos totales de coincidencias filtradas; consulta posterior mostró una coincidencia. |
| 2026-10-20 | Al reemplazar nodos en el editor se confundieron referencias entre el orquestador y un sub-workflow. | La identidad/URL del workflow no equivale al nombre importado, y una herramienta podía apuntar a un ID equivocado. | Verificar los destinos antes de integrar y simplificar el laboratorio a un workflow principal cuando resultó más práctico. |
| 2026-10-20 | Una captura de una consulta se interpretó inicialmente como fallo de guardado. | Se estaba inspeccionando la ejecución equivocada. | Confirmar el mensaje exacto y la ejecución correspondiente antes de diagnosticar un error. |
