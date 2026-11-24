# AGENTS.md — Vértice CR (Proyecto Definitivo)

Reglas obligatorias para cualquier IA o colaborador que trabaje en `VerticeCR-Definitivo`.

## 1. Principio rector
- **No apresurarse ni inventar el negocio:** Sebastián lleva meses dando forma a Vértice CR. Primero escuchar, alinear y cerrar decisiones en `docs/00-DESCUBRIMIENTO-Y-DECISIONES.md`; solo después redactar documentación oficial o programar.
- **Idioma y tono:** español natural y cotidiano de Costa Rica, directo, sin paredes de texto ni tecnicismos innecesarios al hablar con Sebastián o al redactar textos de la interfaz.

## 2. Qué es Vértice CR (3 líneas de negocio integradas)
1. **Catálogo de piezas 3D bajo pedido:** modelos probados en planta (sin stock inventado; se fabrican al confirmar pedido).
2. **Impresión 3D personalizada con fotos y referencias:** el cliente describe su problema en palabras normales y puede **subir fotos** (de lo que se quebró, medidas o referencias) para que la IA y el taller entiendan sin jerga técnica. Toda solicitud sin cotizar queda en `PENDING_QUOTE`, jamás a precio `₡0`.
3. **Tienda de filamentos e insumos para impresoras 3D:** venta de filamentos (`PLA`, `PETG`, `ASA`, `ABS`, `TPU`), boquillas, láminas, repuestos y accesorios — esta línea **sí maneja inventario real, stock y precios visibles**.

## 3. Reglas obligatorias de diseño y UX
Consultar siempre `docs/01-IDENTIDAD-Y-REGLAS-UX.md`. Reglas bloqueantes:
- Identidad visual base: concepto **«La Planta»** (`HomePage` aprobado en `Vertice-pruebas`: fondo `#161618`, superficies mates `#1e1e22`/`#25252b`, acento `#ff6a1f`, fuente `Chakra Petch`, equilibrio 70/30, Hero con onda 3D PS3, visor 3D en despiece).
- **PROHIBIDO** botones que teletransportan hacia abajo con anclas (`#seccion`). Usar pestañas en su mismo lugar en pantallas angostas.
- **PROHIBIDO** textos, opciones de `<select>` o placeholders cortados.
- **PROHIBIDO** casillas abiertas a texto basura (medidas en `cm`, dinero en `₡`, teléfonos, cantidades y porcentajes llevan validación estricta y unidad integrada).
- **Lenguaje cotidiano y expresivo:** cero jerga técnica en pantallas de usuario ni en el dashboard administrativo.
- **PC + celular (`390 px`) real:** menú lateral contraíble en PC, barra inferior cómoda y menú deslizable en celular, tablas convertidas en tarjetas apiladas, barras de scroll oscuras y sutiles.

## 4. Reglas técnicas y de seguridad (FWD Proyecto Final)
- Consultar `docs/02-REQUISITOS-OFICIALES-FWD.md` antes de definir arquitectura o entregar avances.
- Nunca leer, imprimir ni subir `.env` ni credenciales reales. Mantener `.env.example` limpio.
- Uso obligatorio de ramas en GitHub (`main`, `develop`, `feature/...`, `fix/...`).
- Toda regla de negocio, roles y validación se verifican en el backend, nunca solo en el frontend.
