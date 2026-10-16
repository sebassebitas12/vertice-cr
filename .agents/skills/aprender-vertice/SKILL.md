---
name: aprender-vertice
description: Tutor y registrador del aprendizaje en backend/frontend durante el curso, y apoyo gradual para construir Vértice CR. Úsala para materiales de clase, registrar prácticas realizadas, dudas y futuras tareas de la tienda.
---

# Aprender Vértice

El repositorio es tanto un proyecto de largo plazo como un registro de aprendizaje. **En las primeras clases de backend, aprender y documentar tiene prioridad sobre convertir ejercicios en funcionalidades de la tienda.**

## Inspección previa

1. Leer `AGENTS.md` y la documentación pertinente.
2. Leer `references/ruta-backend.md` o `references/ruta-frontend.md` según el tema.
3. Revisar notas existentes para evitar duplicados.
4. Si se aporta un material de clase, ceñirse a su alcance y restricciones. No inventar resultados.

## Modo A — Registrar clase o práctica ya realizada

Cuando Sebastián comparta teoría, diapositivas o enunciados e indique que ya realizó las prácticas:

1. Considerar el tema **estudiado y practicado, según lo informado**; no pedir las carpetas locales ni exigir una demostración.
2. Documentar definiciones, conceptos y vínculos con conocimientos anteriores de forma precisa.
3. Guardar un resumen en `docs/aprendizaje/`; si hay práctica, un registro en `docs/practicas/`, **sin copiar su solución**.
4. Actualizar `references/ruta-backend.md` para backend o su ruta correspondiente, junto con glosario e índices.
5. No inventar fallos o soluciones en `errores-comunes.md`.
6. Solo vincular con Vértice cuando sea útil. No implementar funcionalidades ni elegir tecnologías por anticipado.

Los estados «estudiado y practicado», «en curso» y «pendiente» registran lo informado, no constituyen exámenes ni certificaciones de destreza.

## Modo B — Nueva práctica que se quiere implementar

1. Revisar el enunciado completo y sus políticas académicas.
2. Proponer plan y respetar requisitos; si prohíbe IA en la entrega, limitar la ayuda a explicaciones generales compatibles con esa restricción.
3. Si se implementa en el repositorio, rama propia `practica/NN-nombre` y pruebas acordes.
4. Adaptar a Vértice solo cuando proceda y sin violar el enunciado.

## Modo C — Construcción del startup

1. Inspeccionar documentación vigente de negocio, decisiones y código.
2. Entender → planificar → implementar → verificar → documentar.
3. No forzar POO ni utilizar ejercicios escolares como componentes de producción.
4. No alterar stack, marca ni reglas aprobadas sin consulta. Señalar riesgos de seguridad en auth, archivos o pagos.

## Modo D — Tutoría

Responder dudas con ejemplos concretos y conexiones con material ya estudiado. Proponer repaso solo si Sebastián lo solicita o resulta útil en un aprendizaje nuevo; no convertir automáticamente una incorporación documental en examen.

## Registro

- Una nota por tema o sesión, con fuente y fecha; la plantilla en `references/plantilla-nota.md` es orientativa, no exige fingir errores o dudas.
- Mantener rutas, glosario e índices actualizados.
- Distinguir claramente **lo que aporta el estudiante**, **lo que consta en el material** y **lo que se implementó realmente en el repositorio**.
