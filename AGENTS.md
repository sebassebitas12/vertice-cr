# AGENTS.md â€” VÃ©rtice CR

Instrucciones para cualquier agente (Codex, Antigravity u otro) que trabaje en este repo.

## 1. Antes de tocar nada

Lee, en este orden:

1. Este archivo.
2. `docs/negocio/` (producto, estados, reglas).
3. `docs/decisiones/` (quÃ© ya estÃ¡ decidido y por quÃ©).
4. Si la tarea es visual: `docs/diseno/direccion-de-arte.md`.
5. Si la tarea es una prÃ¡ctica de clase: la skill `aprender-vertice`.
6. El archivo exacto que vas a modificar.

No edites por intuiciÃ³n. Inspecciona el estado real del repo primero.

## 2. Naturaleza del proyecto

- Es un startup real y a la vez el medio de aprendizaje de SebastiÃ¡n. **Entender importa tanto como terminar.**
- SebastiÃ¡n es quien va a mantener este cÃ³digo. Prefiere aprender a recibir todo hecho, sobre todo en el front end.
- No inventes reglas de negocio. Si falta una, pregunta o mÃ¡rcala como pendiente en `docs/negocio/`.

## 3. Reglas de negocio que no se rompen

- Capacidad de fabricaciÃ³n: solo **FDM**; filamentos **ASA, PLA, PETG, ABS y TPU**.
- No prometer plazos, tolerancias ni disponibilidad inmediata hasta tener datos de operaciÃ³n aprobados.
- Una solicitud personalizada sin cotizar es `PENDING_QUOTE`, nunca un precio de `0`.
- Sin secretos en Git. Variables sensibles en `.env` (ignorado) y un `.env.example` documentado.

## 4. Forma de trabajar

**Entender â†’ Inspeccionar â†’ Planificar â†’ Implementar â†’ Verificar â†’ Documentar.**

- Una tarea pequeÃ±a por sesiÃ³n; commit al terminar.
- Cada prÃ¡ctica de clase va en su rama `practica/NN-nombre`; no se toca `main` directamente.
- Cambios definitivos, no parches temporales ni cÃ³digo de prueba dentro del producto.
- En autenticaciÃ³n, subida de archivos y pagos: seÃ±ala los riesgos de seguridad explÃ­citamente.

## 5. DocumentaciÃ³n obligatoria

Al terminar cada sesiÃ³n de trabajo:

- Deja una nota en `docs/aprendizaje/` (plantilla en la skill).
- Si hubo una decisiÃ³n importante, un archivo nuevo en `docs/decisiones/`.
- Si fue una prÃ¡ctica de clase, `docs/practicas/NN-nombre.md`.

## 6. Autoridad en caso de conflicto

1. InstrucciÃ³n explÃ­cita y actual de SebastiÃ¡n.
2. Este archivo.
3. `docs/decisiones/` y `docs/negocio/`.
4. `docs/negocio/heredado/` es material de origen: Ãºtil, pero puede estar desactualizado o atado al stack anterior. Si choca con una decisiÃ³n nueva, gana la decisiÃ³n nueva.

Si un conflicto no se resuelve con esta jerarquÃ­a, detente y seÃ±Ã¡lalo; no lo normalices en silencio.

