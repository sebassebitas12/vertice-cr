# Estado del MVP de Vértice CR y Guía de Sincronización entre PCs (Casa ↔ Laptop de Curso)

**Última actualización:** 2026-11-04 (PC Principal de Casa)  
**Rama activa:** `experimento/visual-taller-limpio`  
**Ruta del Frontend MVP:** `experimentos/stack-mvp/frontend`

---

> [!IMPORTANT]
> Antes de programar, leer `docs/proyecto-final-backend/pendientes-proxima-sesion.md` (auditoría con seguridad RLS, coherencia visual y riesgo de copia del MicroDuck).

## 1. Cómo levantar el proyecto en la Laptop del Curso

Al hacer `git pull` en la laptop:

```powershell
cd "experimentos/stack-mvp/frontend"
Copy-Item .env.example .env
npm install
npm run dev
```

Abre **`http://localhost:3000/`**. El proyecto se conectará automáticamente a la base de datos de Supabase (`https://srknevopdhujjchwwkbv.supabase.co`).

---

## 2. Qué quedó construido y aprobado en esta sesión

### A. Dirección Visual y Componentes 3D ("Anti-Luna")
1. **Arquitectura Multipágina Real (`react-router-dom`)**:
   - Cada botón del Navbar lleva a su propia ruta independiente (`/` Nosotros, `/catalogo` Diseños, `/catalogo/:id` Ficha de pieza, `/herramientas` Herramientas, `/solicitar` Cotizar con IA, `/mis-solicitudes` Mis solicitudes, `/taller` Bandeja del Taller).
2. **Hero con Onda 3D WebGL estilo PlayStation 3 XMB (`src/components/Ps3HeroWave.tsx`)**:
   - Shader GLSL 3D real (`ShaderMaterial`) con iluminación Fresnel sobre cintas de seda subdivididas y partículas con profundidad.
3. **Superficies Mates de Estudio (`src/index.css`)**:
   - Se eliminaron los huecos negros hundidos (`inset`) y las sombras pesadas tipo ladrillo (`0 4px 0`). Las tarjetas y botones usan superficies mates limpias (`#1e1e22`, `#25252b`) sin bordes de color (`border`) sobre el fondo `#161618`.
4. **Visor 3D en Despiece con Scroll (`src/components/ExplodedStlViewer.tsx`)**:
   - Geometría CAD limpia por extrusión (`THREE.ExtrudeGeometry`) con 3 objetos deseables:
     1. **`1 · MicroDuck Robot`** (Réplica CAD del bípedo de escritorio de MakerWorld `#3501114`: Cabezal Domo + Visor y Lente Óptico + Cuello Servo + Torso/Pelvis + Muslos Servo + Piernas y Pies de Pato).
     2. **`2 · Cutter Retráctil F1`** (Bisturí EDC de bolsillo con botón slider y hoja trapezoidal naranja).
     3. **`3 · Estuche Técnico #A-01`** (Caja impermeable con sello TPU y broches).

### B. Fases 1 a 4 del MVP Funcional y Base de Datos en Supabase
1. **Fase 1 (`CatalogPage.tsx` y `ProductDetailPage.tsx`)**:
   - Filtros de búsqueda (`q`), categoría (`categoria`) y polímero (`material`) sincronizados en los query params de la URL.
   - Selector de color de filamento aprobado, cantidad y paso directo a `/solicitar`.
2. **Fase 2 (`RequestPage.tsx`, `requestDraftStore.ts`, `aiAssistantService.ts`)**:
   - Dos modos de entrada (*"1 · Basado en diseño del catálogo"* y *"2 · Pieza funcional nueva a medida"*).
   - Procedencia por campo (`Cliente` vs `IA aceptada`), detección de conflictos cuando el cliente edita antes de la IA, botón `Deshacer` y persistencia de borrador en `localStorage`.
3. **Fase 3 y 4 (`MyRequestsPage.tsx`, `WorkshopPage.tsx`, `requestsStore.ts`, `supabase.sql`)**:
   - Tablas `public.catalog_products` y `public.quote_requests` creadas y pobladas en Supabase (`srknevopdhujjchwwkbv`).
   - Ciclo completo de estados: `PENDING_QUOTE` → `NEEDS_INFO` (aclaración taller/cliente) → `QUOTED` (cotización formal `#v1` en `₡`) → `APPROVED`.

---

## 3. Skills sincronizadas en el repositorio

- `.agents/skills/diseno-frontend-sebastian/SKILL.md`: Reglas universales de diseño frontend de Sebastián para cualquier proyecto o clase.
- `.agents/skills/disenar-vertice/SKILL.md`: Reglas específicas de Vértice CR.
- `.agents/skills/aprender-vertice/SKILL.md`: Tutor y registrador de clases del curso de backend.

