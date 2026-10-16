# AGENTS.md — Vértice CR

Instrucciones para agentes que trabajen en este repositorio.

## Naturaleza y prioridad

Vértice CR es un startup de impresión 3D a largo plazo **y** un registro del aprendizaje del curso de backend. En las etapas iniciales no forzar cada clase o ejercicio a una implementación de negocio; primero conservar el conocimiento, luego decidir qué se aplica.

## Antes de editar

1. Leer este archivo.
2. Leer `docs/aprendizaje/` y la ruta de aprendizaje pertinente si se trata de clases.
3. Leer la skill `.agents/skills/aprender-vertice/SKILL.md` cuando se trate de aprendizaje.
4. Solo si se va a desarrollar producto, leer `docs/negocio/` y `docs/decisiones/`; para interfaz, también `docs/diseno/`.
5. Inspeccionar archivos concretos antes de modificarlos.

## Trabajo con material académico

- Si Sebastián comparte una práctica y dice haberla realizado, registrar **estudiada y practicada según su declaración**. No exigir soluciones locales ni volver a examinarlo.
- Los PDFs, enunciados y apuntes sirven para documentar conceptos, no para inventar código, capturas, calificaciones o resultados.
- Distinguir notas de aprendizaje (`docs/aprendizaje/`) de registros de prácticas (`docs/practicas/`) y de código de la aplicación.
- No generar soluciones de entregas cuando el enunciado prohíba IA.
- Mantener `.agents/skills/aprender-vertice/references/ruta-backend.md` al día con las clases.
- No forzar equivalencias con Vértice antes de que haya una necesidad concreta.

## Reglas del negocio, cuando se implemente

- Solo fabricación FDM, con ASA, PLA, PETG, ABS y TPU.
- El catálogo se fabrica bajo pedido; no asumir stock inmediato de modelos.
- No prometer plazos, tolerancias ni disponibilidad sin datos aprobados.
- Una solicitud personalizada sin cotizar permanece `PENDING_QUOTE`, nunca a precio cero.
- No subir secretos; usar `.env` ignorado y `.env.example` cuando corresponda.

## Forma de trabajar

Entender → inspeccionar → planificar → implementar → verificar → documentar.

- Crear ramas para cambios, sin editar `main` directamente. Para prácticas implementadas usar `practica/NN-nombre`; para documentación, ramas `docs/...`.
- Cambios pequeños y revisables.
- Al documentar una clase, crear nota fechada, actualizar índice, glosario y ruta correspondiente.
- Registrar decisiones relevantes en `docs/decisiones/`, no suponer decisiones de stack pendientes.
- En autenticación, subida de archivos y pagos, señalar riesgos de seguridad.

## Autoridad

1. Instrucción explícita y actual de Sebastián.
2. Este archivo.
3. Documentos vigentes de decisiones y negocio.
4. Documentación heredada de la entrega académica, que puede estar desactualizada.

Ante un conflicto importante, señalarlo sin normalizarlo.
