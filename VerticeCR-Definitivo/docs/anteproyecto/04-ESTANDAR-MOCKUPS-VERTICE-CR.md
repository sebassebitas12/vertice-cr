# Estándar Oficial de Detalle y Sistema de Mockups — Vértice CR (Pantallas 01–18)

Este documento fija el nivel de exigencia acordado con Sebastián Flores Miranda tras cerrar la **Pantalla 01 (Portada)** para que las **17 pantallas restantes** sean el plano exacto de producción y jamás parezcan un libro de wireframes repetitivo.

---

## 1. Piezas bloqueadas compartidas (idénticas en todas las pantallas públicas)
- **Navbar central (Opción B):** `Inicio` (activo mate `#292932` + línea inferior `#ff6a1f` de `2px`) · `Tienda` (enlace directo a `/tienda`, sin flecha desplegable ni ícono extra) · `Cotizar pieza` (`100 %` naranja sólido mate `#ff6a1f`, texto `#161618`, cero brillos fantasía ni bordes luminosos).
- **Esquina superior derecha (1 botón por función, cero duplicados):**
  - Afuera: **un único botón de Carrito** `[🛒 N]` → `/checkout` + **disparador sobrio** `[SF · Mi cuenta ⌄]`.
  - Adentro del desplegable `Mi cuenta` (monocromo mate `#1b1b20` / `#141418` / `#2d2d37`, cero bordes naranjas ni colores arcoíris):
    1. Usuario y rol.
    2. `Mis pedidos y cotizaciones` (ícono caja + badge discreto solo si hay pendiente + `›`) → `/mi-cuenta`.
    3. `Mi perfil y privacidad` (ícono usuario + `›`, exactamente mismo peso/color que la fila anterior; sin `(Ley 8968)` pegado en el botón) → `/perfil`.
    4. *(Solo roles `Taller` / `Admin` / `Auditor`)* `Panel de taller / administración` → `/panel`.
    5. **Preferencias y accesibilidad globales (18 pantallas):** Tema (`Oscuro · Claro · Sistema`), Idioma (`ES · EN`), Tamaño de texto WCAG (`85 % – 200 %`), `Menos movimiento (3D)`, `Alto contraste` y `Lectura por voz` (`es-CR / en-US`).
    6. `Cerrar sesión` al pie.
- **Footer arquitectónico (`FOOTER-02` — contrastado con Bambu Lab, Prusa3D, MatterHackers y Baymard):** 3 columnas reales (`Tienda` · `Ayuda y taller` · `Legal`, sin conteos ni textos de rúbrica como *«Solicitar eliminación de cuenta»*) + wordmark `VÉRTICE` en contorno gigante + pie limpio (`© 2026 Vértice CR · Desamparados, Costa Rica` + `PayPal · SINPE Móvil · Envíos en todo CR`).

---

## 4. Deuda técnica guardada para fase de producción (Supabase Storage)
- **Auditoría y renombrado semántico del bucket `catalog-media`:** reemplazar nombres genéricos (`stock-01..22`, `supply-01..12`) por slugs descriptivos vinculados 1 a 1 con cada producto y color real en `products_3d` y `supplies` (evitando cruces como fotos de filamento asignadas a boquillas o colores distintos al título). No se toca todavía durante la fase de mockups, queda pendiente obligatorio antes de poblar el catálogo definitivo de producción.
- **Adaptación móvil real (`390 px`):** mismos bloques, barra inferior fija (`Inicio · Tienda · Cotizar · Mi cuenta`), botones `>= 44 px`, tablas convertidas en tarjetas y cero teletransportación de scroll.

---

## 2. Reglas anti-plantilla («Atención enfermiza al detalle»)
0. **Benchmark real obligatorio antes de diseñar cada pantalla o componente:** antes de proponer copys, columnas, filtros, formularios o tablas, investigar cómo lo resuelven sitios líderes reales de la industria (`Bambu Lab`, `Prusa3D`, `MatterHackers`, `Polymaker`, `Baymard Institute`, `Stripe`, `Linear`, `Shopify`) y contrastarlo con las rutas reales de Vértice CR. Prohibido inventar textos académicos o burocráticos (como conteos `(65)` o `Solicitar eliminación de cuenta` en un footer público).
1. **Cero cortes en seco entre secciones:** un único lienzo base continuo `#141417` con transiciones suaves por máscara (`mask-image: linear-gradient(...)`) entre `PS3 Wave`, `DotGrid`, `Beams` y `Squares`.
2. **Nunca apilar dos grillas de tarjetas iguales:** alternar siempre entre fotografía, tipografía editorial abierta sin cajas (`70/30`), divisores finos y paneles de trabajo.
3. **Un control por función:** jamás duplicar accesos (ej. Carrito afuera y adentro, o flechas + pills haciendo lo mismo en un carrusel).
4. **Cero fotos incoherentes ni parches blancos chillones:** cada imagen corresponde exactamente al SKU real del catálogo en Supabase Storage y se integra tonalmente sobre fondos oscuros de estudio.
5. **Cero botones decorativos:** todo elemento visible en cada mockup tiene ruta real, estado real y flujo completo documentado.
6. **Validación visual obligatoria:** cada pantalla se renderiza en Chrome Headless (`1440 px` + `390 px`) y se inspecciona píxel por píxel antes de presentarla (cero textos cortados, cero solapes, cero desalineaciones).

---

## 3. Plan de ejecución por familias visuales (Pantallas 02–18)
Para evitar que las 18 pantallas parezcan páginas idénticas de un mismo libro, se diseñan y revisan en **4 familias visuales distintas**:

| Familia | Pantallas | Lenguaje visual propio |
|---|---|---|
| **Familia 1 · Comercio y Compra** | `02` Piezas 3D · `04` Filamentos e Insumos · `05` Carrito y Checkout | Tienda unificada (`/tienda`) con barra de filtros vivos por polímero/categoría, ficha lateral/en sitio sin saltar el scroll, y Checkout limpio de 2 columnas con PayPal Sandbox + comprobante SINPE y tasa Hacienda CR discreta. |
| **Familia 2 · Taller A Medida (Cliente + Operación)** | `03` Cotizar pieza con foto · `11` Solicitudes y Cotizador interno del Taller | En `03`: mesa de subida por pasos con consejo de regla, blindaje anti-trampa (cuota 3 activas, límites FDM `1–25 cm`, filtro visual Agente 01). En `11`: banco de trabajo del Taller donde viven gramos, horas máquina, margen, Agente 03 y tasa Hacienda CR. |
| **Familia 3 · Acceso, Cuenta y Legal** | `06` Acceso (Login / Registro / MFA) · `07` Legal · `08` Mis pedidos y cotizaciones · `09` Mi perfil y privacidad | `06` dividido asimétrico con onda PS3 sutil; `07` lectura editorial limpia con índice lateral; `08` pestañas en sitio + detalle sin scroll; `09` seguridad MFA + privacidad Ley N.° 8968 y Agente 08. |
| **Familia 4 · Planta, Administración y Auditoría** | `10` Inicio Taller/Admin · `12` Catálogo e Inventario · `13` Proveedores (IA Facturas) · `14` Costos y Reportes · `15` Campañas · `16` Centro de Agentes · `17` Configuración · `18` Auditoría | Menú lateral contraíble en PC, barra inferior en móvil, alta claridad de datos sin sobrecarga, controles con unidades integradas (`₡`, `g`, `cm`, `%`) y confirmación humana explícita en toda acción de IA. |
