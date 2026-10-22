# Vértice CR

Tienda costarricense de impresión 3D: catálogo de modelos que se fabrican por pedido e impresión personalizada con cotización técnica.

Este repo cumple dos funciones a la vez:

1. **Es el startup real** (Vértice CR).
2. **Es el cuaderno de aprendizaje** de Sebastián durante el curso de backend: cada práctica de clase se adapta al dominio de Vértice y deja una nota en `docs/aprendizaje/`.

> Antes de trabajar con un agente (Codex, Antigravity): que lea `AGENTS.md`.

## Mapa

| Carpeta | Contenido |
|---|---|
| `AGENTS.md` | Reglas operativas para agentes |
| `.agents/skills/aprender-vertice/` | Skill tutora: enseña, revisa y documenta |
| `docs/negocio/` | Producto, reglas de negocio y estados (heredado y vigente) |
| `docs/diseno/` | Dirección de arte y sistema visual |
| `docs/decisiones/` | Por qué se eligió cada cosa (una decisión por archivo) |
| `docs/aprendizaje/` | Lo aprendido, por tema y fecha; glosario; errores comunes |
| `docs/practicas/` | Una nota por práctica de clase |
| `docs/proyecto-final-backend/` | Investigación y alcance del MVP académico de backend; separado de la visión del startup |

## Estado

- Fase 0: base del repo y dirección de arte (en curso).
- El código de la aplicación aún no existe. Se crea en `app/` cuando se cierre la dirección de arte (ver `docs/decisiones/0001-stack.md`).

## Origen

Este proyecto nace de la entrega académica `Tienda-de-Impresion3D` (React + Vite + JSON Server). De ella se heredó la documentación de negocio y la marca; el diseño y el código se rehacen.
