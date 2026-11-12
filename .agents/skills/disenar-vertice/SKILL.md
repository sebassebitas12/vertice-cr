---
name: disenar-vertice
description: Director de arte y design engineer de Vértice CR. Úsala SIEMPRE antes de diseñar, rediseñar o revisar cualquier pantalla, componente, animación o estilo del frontend de Vértice. Define el concepto "La Planta", las superficies mates aprobadas, la onda 3D WebGL del Hero y el visor CAD en despiece.
---

# Diseñar Vértice — "La Planta"

Tu trabajo no es hacer una página correcta. Es hacer una página que la gente **quiera recorrer**. Correcto es el piso, no la meta. Si el resultado se parece a una landing genérica de IA, está mal aunque compile y sea accesible.

## 1. El concepto (decide todo lo demás)

Vértice es **una planta de fabricación tipo warehouse, obsesivamente ordenada**, con máquinas imprimiendo a la vista, y al fondo una **oficina de diseño** con PCs gamer donde se diseña y se descansa.

La aplicación en `experimentos/stack-mvp/frontend` es **multipágina real (`react-router-dom`)**:
- `/` (`HomePage.tsx`): Recorrido editorial curado estilo N3D Melbourne (Hero con onda 3D WebGL estilo PS3 → 3 tarjetas destacadas que llevan a `/catalogo/:id` → Visor 3D en despiece en scroll con `MicroDuck Robot`, `Cutter Retráctil F1` y `Estuche Técnico #A-01` → Polímeros en planta → 4 Herramientas → 3 Modalidades de pedido).
- `/catalogo` (`CatalogPage.tsx`): Catálogo completo con búsqueda y filtros (`q`, `categoria`, `material`) sincronizados en los query params de la URL.
- `/catalogo/:id` (`ProductDetailPage.tsx`): Ficha técnica de la pieza con selector de polímero aprobado, color de filamento, cantidad y paso directo a `/solicitar`.
- `/herramientas` (`ToolsPage.tsx`): Herramientas interactivas y matriz comparativa de polímeros FDM.
- `/solicitar` (`RequestPage.tsx`): Solicitud asistida con IA (n8n), procedencia por campo (`Cliente` vs `IA aceptada`), detección de conflictos, botón `Deshacer` y borrador persistente.
- `/mis-solicitudes` (`MyRequestsPage.tsx`): Expediente del cliente conectado a Supabase (`PENDING_QUOTE`, `NEEDS_INFO`, `QUOTED`, `APPROVED`).
- `/taller` (`WorkshopPage.tsx`): Bandeja operativa del taller para pedir aclaraciones o emitir cotizaciones formales versionadas (`#v1`).

## 2. Decisiones visuales aprobadas por Sebastián (2026-11-04)

1. **Tipografía oficial (`Chakra Petch` — F1):**
   - Fuente única en toda la interfaz (`font-family: 'Chakra Petch', sans-serif`).
2. **Fondo oscuro limpio (`#161618`) y Equilibrio 70/30:**
   - El 70% de la pantalla (encabezados, narrativa, citas, métricas) vive libre sobre el fondo `#161618`.
   - Solo el 30% (las 3 tarjetas de piezas destacadas, los bloques de polímeros, las 4 herramientas y las 3 modalidades) usa tarjetas.
3. **Superficies Mates de Estudio (`#1e1e22` y `#25252b`):**
   - **Prohibidos los huecos negros hundidos (`inset`) y las sombras gruesas tipo ladrillo (`0 4px 0`)** que desconectaban las tarjetas del fondo.
   - **Prohibidos los bordes de línea blancos o de color (`border`)** para separar tarjetas o botones.
   - Usar superficies mates limpias (`#1e1e22`, hover `#25252b`) que se integran suavemente con `#161618`.
4. **Hero con Onda 3D WebGL / GLSL Shader estilo PlayStation 3 XMB (`Ps3HeroWave.tsx`):**
   - **Prohibido dibujar líneas 2D tiesas en Canvas 2D.**
   - El Hero usa cintas de seda 3D reales en Three.js con iluminación Fresnel (`ShaderMaterial`) y partículas con profundidad. Vive **únicamente en el Hero**.
5. **Visor 3D en Despiece (`ExplodedStlViewer.tsx`):**
   - Modelado CAD limpio por extrusión (`THREE.ExtrudeGeometry` con `THREE.Shape` + `holes`) + `MeshStandardMaterial({ depthWrite: true, polygonOffset: true })` + `EdgesGeometry` (`thresholdAngle: 22`).
   - Las piezas exhibidas deben ser **objetos deseables y útiles que den ganas de tener en las manos/escritorio**:
     1. `1 · MicroDuck Robot` (Réplica CAD del bípedo de escritorio de MakerWorld `#3501114`).
     2. `2 · Cutter Retráctil F1` (Bisturí EDC de bolsillo con botón slider y hoja trapezoidal naranja).
     3. `3 · Estuche Técnico #A-01` (Caja impermeable con sello TPU y broches).

## 3. Reglas de negocio y base de datos (Supabase)

- Solo fabricación FDM con `ASA, PETG, PLA, ABS, TPU`.
- Cero stock falso; todo se fabrica bajo pedido.
- Toda solicitud sin cotizar ingresa en estado `PENDING_QUOTE`, nunca a precio `$0` ni `₡0`.
- Base de datos activa en el proyecto de Supabase `srknevopdhujjchwwkbv` (`https://srknevopdhujjchwwkbv.supabase.co`), tablas `public.catalog_products` y `public.quote_requests`.


---

## Anexo — Recetas técnicas detalladas (movidas desde `diseno-frontend-sebastian`)

### Onda 3D WebGL del Hero (`Ps3HeroWave.tsx`)
- **PROHIBIDO hacer ondas 2D tiesas con `<canvas>` 2D (`bezierCurveTo`).**
- Usar un **shader 3D real en WebGL / Three.js (`ShaderMaterial`)** sobre mallas subdivididas (`PlaneGeometry(28, 5.2, 220, 64)`).
- Desplazar vértices con ondas armónicas suaves en `Y` y `Z` y calcular iluminación **Fresnel** (`pow(1.0 - abs(dot(normal, viewDir)), 3.2)`) en el fragment shader con mezcla aditiva (`THREE.AdditiveBlending`). Así el velo es translúcido en el centro y brilla con luz sedosa en los pliegues, acompañado de micropartículas con desenfoque de profundidad.
- El efecto vive **solo en el Hero**; al bajar, el fondo es `#161618` limpio (sin cuadrículas ni ruido tipo lija).

### Visor CAD en despiece (`ExplodedStlViewer.tsx`)
- **PROHIBIDO dibujar objetos 3D falsos en 2D/SVG o cargar mallas STL crudas:** si pasas un STL teselado crudo por `EdgesGeometry`, se llena de líneas internas diagonales que parecen una telaraña sucia.
- Receta "10/10":
  1. Sub-piezas con **geometría CAD limpia por extrusión (`THREE.ExtrudeGeometry` con `THREE.Shape` y `holes`)**.
  2. `MeshStandardMaterial({ depthWrite: true, polygonOffset: true, opacity: 0.90 })` (cuerpo gris humo `#27272c` + piezas clave en naranja `#c84b12` / `#ff6a1f`) y aristas nítidas `EdgesGeometry(geo, 22)`.
  3. Exhibir objetos deseables (MicroDuck Robot, Cutter Retráctil EDC F1, Estuche Técnico Impermeable), nunca cajas vacías ni piezas abstractas.
