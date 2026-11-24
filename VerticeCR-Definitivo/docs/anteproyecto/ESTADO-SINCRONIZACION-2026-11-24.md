# Estado de Avance y Sincronización — Vértice CR (24 nov 2026)

Este archivo resume el punto exacto donde pausamos para continuar sin fricción desde la PC de casa.

## 1. Ya cerrado y listo
- **Anteproyecto oficial v2.0:** `docs/anteproyecto/Anteproyecto-Vertice-CR.pdf`
- **Libro de Marca oficial v2.0:** `docs/anteproyecto/Libro-de-Marca-Vertice-CR.pdf`
- **Base de datos y catálogo inicial:** `backend/db/schema.sql` y `backend/db/seed.sql` (21 tablas 3FN + RLS + 110 productos en proyecto Supabase `vertice-cr`).
- **Seguridad Avanzada + Gobernanza:** `docs/SEGURIDAD-Y-HACKATON-VERTICE-CR.md` (incluye 100 % del taller «Seguridad completa en Express», capa de seguridad avanzada para pruebas de seguridad y requisitos del `governance-pack-template`).
- **Estándar de Mockups (Regla 0 + QA píxel por píxel):** `docs/anteproyecto/04-ESTANDAR-MOCKUPS-VERTICE-CR.md`.
- **Pantalla 01 — Portada (CERRADA):** `docs/anteproyecto/mockups/mockup-01-portada.html` y `mockup-01-portada.png` (Navbar Opción B mate, desplegable `Mi cuenta` simétrico con accesibilidad global `85–200 %`, Hero `TiltedCard` auto-rotativo cada `5.5 s` con las 3 líneas de negocio, bloque editorial abierto sin tarjetas repetidas, transiciones continuas sin cortes y footer real contrastado con Bambu Lab / Prusa3D / MatterHackers / Baymard).

## 2. Punto exacto donde pausamos (Familia 1)
- **Pantalla 02 — Tienda Unificada (`/tienda`):** `docs/anteproyecto/mockups/mockup-02-tienda.html` y `mockup-02-tienda.png`.
  - Filtros Pro aprobados (chips de uso, polímeros, swatches de color, slider `₡`, acordeón contextual).
  - Disparador del asesor integrado en la barra del buscador (`[V] Preguntar al asesor`, sin botón flotante incómodo).
  - **Pendiente de decisión de Sebastián para cerrar Pantalla 02:** elegir entre los 3 formatos visuales del Asesor Vértice en `docs/anteproyecto/mockups/comparativa-asesor-a-b-c.png`:
    - **Formato A:** Command Studio panorámico (Raycast / Linear).
    - **Formato B:** Franja inteligente integrada inline encima de la grilla (sin popup).
    - **Formato C:** Panel lateral arquitectónico `100vh` sin tarjetas anidadas.

## 3. Siguientes pantallas acordadas
1. **Pantalla 04 — Vista completa dedicada de producto (`/tienda/:slug`):** estilo Amazon + Bambu Lab (galería con zoom, selectores táctiles, especificaciones técnicas sin tabs escondidos, histograma y reseñas verificadas con estrellas, preguntas y respuestas, y variante de Filamento en stock).
2. **Pantalla 05 — Checkout profesional (`/checkout`):** estilo Stripe / Shopify sin distracciones, **únicamente** *Retiro en taller (Desamparados)* o *Correos de Costa Rica*, pago PayPal / SINPE Móvil y **cero tablas bancarias de tipo de cambio** expuestas al cliente.
3. **Familia 2 — Cotizador a medida (`03` cliente con blindaje anti-trampa + `11` mesa interna del taller con tasa Hacienda CR).**
4. **Familia 3 y 4 — Acceso (`06` con NIST SP 800-63B-4 + Passkeys/TOTP), Legal (`07`), Mis pedidos (`08`), Perfil/Privacidad (`09`), y Panel Operativo/Admin/Auditoría (`10`, `12`–`18`).**
5. **Deuda técnica guardada para producción:** renombrar semánticamente las imágenes del bucket `catalog-media` en Supabase Storage (`stock-XX` / `supply-XX`) para garantizar concordancia 1 a 1 por SKU y color.
