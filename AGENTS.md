# AGENTS.md — Vértice CR

Instrucciones para cualquier agente (Codex, Antigravity u otro) que trabaje en este repo.

## 1. Antes de tocar nada

Lee, en este orden:

1. Este archivo.
2. `docs/negocio/` (producto, estados, reglas).
3. `docs/decisiones/` (qué ya está decidido y por qué).
4. Si la tarea es visual: `docs/diseno/direccion-de-arte.md`.
5. Si la tarea es una práctica de clase: la skill `aprender-vertice`.
6. El archivo exacto que vas a modificar.

No edites por intuición. Inspecciona el estado real del repo primero.

## 2. Naturaleza del proyecto

- Es un startup real y a la vez el medio de aprendizaje de Sebastián. **Entender importa tanto como terminar.**
- Sebastián es quien va a mantener este código. Prefiere aprender a recibir todo hecho, sobre todo en el front end.
- No inventes reglas de negocio. Si falta una, pregunta o márcala como pendiente en `docs/negocio/`.

## 3. Reglas de negocio que no se rompen

- Capacidad de fabricación: solo **FDM**; filamentos **ASA, PLA, PETG, ABS y TPU**.
- No prometer plazos, tolerancias ni disponibilidad inmediata hasta tener datos de operación aprobados.
- Una solicitud personalizada sin cotizar es `PENDING_QUOTE`, nunca un precio de `0`.
- Sin secretos en Git. Variables sensibles en `.env` (ignorado) y un `.env.example` documentado.

## 4. Forma de trabajar

**Entender → Inspeccionar → Planificar → Implementar → Verificar → Documentar.**

- Una tarea pequeña por sesión; commit al terminar.
- Cada práctica de clase va en su rama `practica/NN-nombre`; no se toca `main` directamente.
- Cambios definitivos, no parches temporales ni código de prueba dentro del producto.
- En autenticación, subida de archivos y pagos: señala los riesgos de seguridad explícitamente.

## 5. Documentación obligatoria

Al terminar cada sesión de trabajo:

- Deja una nota en `docs/aprendizaje/` (plantilla en la skill).
- Si hubo una decisión importante, un archivo nuevo en `docs/decisiones/`.
- Si fue una práctica de clase, `docs/practicas/NN-nombre.md`.

## 6. Autoridad en caso de conflicto

1. Instrucción explícita y actual de Sebastián.
2. Este archivo.
3. `docs/decisiones/` y `docs/negocio/`.
4. `docs/negocio/heredado/` es material de origen: útil, pero puede estar desactualizado o atado al stack anterior. Si choca con una decisión nueva, gana la decisión nueva.

Si un conflicto no se resuelve con esta jerarquía, detente y señálalo; no lo normalices en silencio.

