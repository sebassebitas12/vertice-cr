# Errores comunes

Errores observados, su causa y cómo se resolvieron.

| Fecha | Error | Causa | Solución |
|---|---|---|---|
| 2026-10-19 | El workflow de la extensión no generaba ejecuciones al probar un correo. | Seguía publicada la versión original, no la exportación actualizada de la extensión. | Publicar la versión de extensión y probar con un correo entrante nuevo. |
| 2026-10-19 | Un correo cotidiano sin campos fijos no se interpretaba como solicitud válida. | El primer parser dependía de un formato rígido para producto y cantidad. | Ampliar el parser para lenguaje natural y pedir aclaración cuando no puede resolver los datos sin ambigüedad. |
