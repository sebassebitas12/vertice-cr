# Vértice — contexto vigente de la prueba de stack

**Actualizado:** 2026-10-25 (America/Mexico_City)
**Rama:** `experimento/visual-taller-limpio`
**Base de seguridad observada:** `d22284a chore: guardar prueba stack-mvp y docs previos al rediseño visual` (commit existente antes de esta pasada; no atribuirlo a esta implementación).
**Alcance:** prueba Next.js para Vértice. Lab 3 está cerrado y fuera de alcance.

## Objetivo

Preparar una aplicación recorrible como cliente y como taller para evaluar acabado visual, funcionamiento y facilidad de cambios con GPT-6 Luna. La portada pública toma de N3D Melbourne jerarquía, composición de producto, catálogo y movimiento; no debe copiar su marca ni repetir la dirección visual rechazada. Tailwind Admin es el referente de calidad para el área de trabajo. Next.js sigue siendo una prueba de stack, no una decisión definitiva para Vértice.

## Decisiones vigentes

- Frontend de la prueba: Next.js App Router, React, TypeScript y Tailwind.
- API de negocio separada: Express; actualmente el servicio demo está en JavaScript y guarda solicitudes en memoria. La migración a TypeScript es una fase posterior.
- PostgreSQL/Auth/Storage: Supabase solo en un entorno nuevo de prueba. No reutilizar ni modificar el proyecto de Lab 3.
- n8n se integrará mediante la API cuando exista un workflow exportado y credenciales disponibles.
- Fabricación FDM bajo pedido. Los materiales listados son referencias; la pertinencia y disponibilidad se confirman por solicitud.
- No inventar precios, existencias, plazos ni capacidades técnicas. Solicitudes sin cotización conservan `PENDING_QUOTE` y precio nulo.
- No contratar servicios nuevos ni eliminar/actualizar recursos existentes.
- La evidencia visual (390, 768, 1440 px y ambos temas) es parte de aceptación; compilar por sí solo no cierra el trabajo.

## Estado de la experiencia pública

- La base visual oscura sigue en prueba. El lockup oficial provisional es la V naranja ancha con pliegue interior, seguida por “értice”; referencia aprobada en `experimentos/brand/logo-exploration/approved-reference/vertice-lockup-approved.png`. El tema claro continúa disponible.
- La portada presenta una pieza fotografiada, acceso al catálogo y el recorrido de materiales/proceso ya existente.
- `/piezas` muestra las 12 piezas acordadas con búsqueda y filtros; `/piezas/[slug]` presenta ficha, galería y autor/licencia/fuente. `/solicitud?producto=<id>` carga el producto y permite confirmar una solicitud con estado `PENDING_QUOTE`.
- Se copiaron y optimizaron fotos físicas del repo anterior con atribución. Las fuentes disponibles de carcasa Raspberry Pi, soporte de celular y soporte de laptop eran renders/diagramas, así que esas fichas usan el marcador neutral.
- La API Express demo sirve el catálogo desde `experimentos/stack-mvp/api/catalog-data.json` y guarda solicitudes solo en memoria. No hay base de datos, login, precios, stock, plazos ni reseñas inventadas en esta etapa.
- Pasaron ESLint, TypeScript y un build de producción aislado. También se verificaron los 12 slugs, búsqueda, detalle, imagen, fallback y creación/idempotencia de solicitud.
- Falta revisar el render visual real en 390, 768 y 1440 px y los dos temas. Edge no pudo iniciar una captura headless en esta sesión por un error del proceso GPU; no se archivaron capturas.

## Referencias

- N3D Melbourne: <https://www.n3dmelbourne.com/> y <https://www.n3dmelbourne.com/designs> — composición pública, catálogo y movimiento.
- Tailwind Admin React: <https://react.tailwind-admin.com/> — benchmark de acabado para el dashboard.
- Tailwind Admin gratis para Next: <https://github.com/Tailwind-Admin/free-tailwind-admin-dashboard-template> — descargado y ejecutado como referencia aislada. Las capturas comparativas aún no están archivadas.
- Candidatos por pantalla: `docs/diseno/componentes-candidatos-mvp.md`, `docs/diseno/seleccion-ampliada-por-pantalla.md` e `docs/diseno/investigacion-referencias-04.md`.
- Evidencia y estado de referencia: `docs/diseno/referencias-prueba-vertice.md`.

## Recorrido objetivo del producto

Explorar catálogo → describir la pieza → adjuntar referencia → revisar sugerencias del asistente → confirmar solicitud → taller revisa/pide información/cotiza/cancela → cliente acepta una versión concreta → seguimiento demostrativo de producción.

## Siguiente trabajo

1. Revisar manualmente el preview en 390/768/1440 px y tema oscuro/claro; hacer ajustes según la revisión de Sebastián.
2. Ampliar la experiencia pública solo después de esa revisión; el acceso/registro/recuperación queda para una siguiente fase.
3. Continuar después con cliente/taller, base Supabase nueva, API TypeScript/persistencia, archivos privados y n8n, respetando cuotas gratuitas y credenciales disponibles.
4. Desplegar un preview de prueba y evaluar Next con resultados del recorrido y cambios reales.

El tablero con criterios de cierre y bloqueos está en `docs/desarrollo/plan-luna.md`.
