# Pendientes para la próxima sesión (auditoría 2026-11-04)

Estado: **solo documentado, sin tocar código**. Esta es la lista de arranque para la próxima sesión (en cualquier PC y con cualquier modelo).
Rama: `experimento/visual-taller-limpio` · Frontend: `experimentos/stack-mvp/frontend`

Antes de empezar, leer `AGENTS.md`, `.agents/skills/disenar-vertice/SKILL.md` y `docs/proyecto-final-backend/estado-mvp-sincronizacion.md`.

## Orden sugerido

### 1. Seguridad (antes de mostrar el proyecto a nadie)
- [ ] Revisar las políticas RLS de `public.quote_requests` en Supabase (`srknevopdhujjchwwkbv`).
- [ ] Riesgo: hoy `/taller` cambia estados (`QUOTED`, `APPROVED`, `NEEDS_INFO`) desde el navegador con la clave pública. Si `anon` puede hacer UPDATE, **cualquier persona podría cotizar o aprobar**.
- [ ] Solución esperada: el cliente anónimo solo puede INSERT con `PENDING_QUOTE`. Los cambios de estado los hace el taller autenticado (rol/claim) o la API del backend.
- [ ] La clave de `.env.example` es la *publishable* (pública por diseño). Solo es segura si RLS está bien.

### 2. Recuperar la skill `disenar-vertice`
- [ ] En la sesión del 2026-11-04 se reescribió y se perdieron estas secciones: patrones prohibidos, ciclo de trabajo con capturas y límites que no se negocian.
- [ ] Recuperarlas del historial de git (`git log -p -- .agents/skills/disenar-vertice/SKILL.md`) y **fusionarlas** con las decisiones nuevas (superficies mates, onda WebGL PS3, visor CAD por extrusión). No reemplazar a ciegas.

### 3. Coherencia visual (estilo mate en todo)
- [ ] `/solicitar`: los campos siguen negros y hundidos (`inset`). Pasarlos a superficie mate `#1e1e22` / `#25252b`.
- [ ] Botones naranjas: quitar la sombra inferior y el brillo. Deben quedar mates, igual que las tarjetas.
- [ ] Repasar todas las páginas para que nada contradiga la regla: sin `border` de color, sin huecos hundidos, sin sombra tipo ladrillo.

### 4. Lenguaje de cara al cliente
- [ ] Quitar "n8n" del hero, de los botones y de las etiquetas visibles. Usar "Cotizar con asistente". n8n queda solo en la documentación técnica.
- [ ] Quitar la flecha ↗ de "Analizar uso con asistente IA" (no abre otra página).
- [ ] Suavizar "Cada modelo pasa por pruebas de ajuste…": es una promesa sin datos aprobados (regla de `AGENTS.md`).

### 5. Visor 3D (`ExplodedStlViewer.tsx`)
- [ ] El **MicroDuck Robot** queda solo como prueba visual. Es un diseño de ProcessoCreativo (MakerWorld #3501114, licencia estándar) y réplica del robot de Pollen Robotics. **No exhibirlo como pieza de Vértice en el MVP final** (mismo problema que la Pokéball).
- [ ] Elegir una pieza propia, o con licencia que permita uso comercial, que den ganas de tener en la mano. Sebastián la aprueba antes de modelarla.
- [ ] Dejar uno o dos objetos en el visor, no tres sin relación (hoy: robot + cutter + estuche).

### 6. Limpieza
- [ ] Borrar `public/models/gripper/*.stl` (no se usan en ninguna parte).

## Ideas de servicios gratis (de free-for.dev), para después
- Correo transaccional al cambiar el estado de una solicitud: **Resend** o Brevo.
- Publicar el frontend: Cloudflare Pages o Vercel. API/n8n: Render o Koyeb.
- Ver errores en producción: Sentry (plan gratis).
- apiverve.com: **descartado para el MVP** (200 llamadas/mes, solo uso no comercial, pide atribución).
