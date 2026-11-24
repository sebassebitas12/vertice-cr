# Identidad Visual «La Planta» y Reglas Obligatorias de UX — Vértice CR

Este documento une la identidad visual que Sebastián ya aprobó en su portada (`HomePage.tsx`) con sus reglas explícitas de experiencia de usuario. **Aplica a todas las pantallas públicas y al dashboard administrativo.**

---

## 1. Identidad visual aprobada («La Planta»)

- **Concepto:** planta de fabricación 3D FDM tipo warehouse, obsesivamente ordenada, con oficina de diseño al fondo. Se siente producto real y diseñado, jamás plantilla genérica de IA.
- **Logotipo oficial provisional:** `assets/brand/vertice-lockup-approved.png` (V naranja ancha con pliegue interior + «értice»).
- **Tipografía oficial:** `Chakra Petch` (fuente única clara y técnica).
- **Paleta base (modo oscuro principal):**
  - Fondo principal: `#161618`
  - Superficies mates / tarjetas: `#1e1e22` (hover `#25252b`)
  - Controles / botones secundarios: `#2a2a34` (hover `#343442`)
  - Texto principal: `#f5f4f1` | Secundario: `#c9c7c2` | Atenuado: `#8d8b87`
  - Naranja Vértice (acento): `#ff6a1f`
  - Colores de familia de polímeros (solo indicadores de material): `ASA #ff6a1f`, `PETG #38bdf8`, `PLA #a3e635`, `ABS #f59e0b`, `TPU #c084fc`.
- **Equilibrio 70 / 30:** el 70 % de la pantalla respira libre sobre `#161618`; solo el 30 % usa tarjetas mates limpias (prohibidos bordes blancos/de color, huecos hundidos `inset` y sombras ladrillo `0 4px 0`).
- **Qué se conserva de `Vertice-pruebas`:** **únicamente el Hero** (onda 3D WebGL estilo PS3 XMB `Ps3HeroWave`, tono industrial limpio, logo aprobado y estilo tipográfico). **El resto de la portada y todas las demás pantallas se rediseñan desde cero** con este estándar.

---

## 2. Reglas de UX NO NEGOCIABLES (de Sebastián)

1. **PROHIBIDO teletransportar hacia abajo al tocar un botón.**
   - Nunca usar enlaces o botones con `#ancla` (`Ir abajo ↓`, `Ver pendientes ↓`).
   - En pantallas pequeñas o divididas, usar **pestañas en su mismo lugar (tabs)** que cambian la vista sin mover el scroll.
2. **PROHIBIDO dejar textos cortados o incompletos.**
   - Ningún `<select>`, placeholder, tarjeta, etiqueta o botón puede cortarse a mitad de palabra en PC ni en celular (`390 px`).
3. **PROHIBIDO casillas abiertas a texto basura.**
   - Medidas (`cm`/`mm`), montos (`₡`/`$`), teléfonos, cantidades, porcentajes y stock solo aceptan caracteres válidos mientras se escribe.
   - Integrar la unidad fija dentro de la casilla (`₡`, `cm`, `mm`, `g`, `kg`, `%`).
   - Usar listas rápidas seleccionables para datos repetitivos (tipo de material, color, diámetro, categoría).
4. **Lenguaje muy expresivo, cotidiano y fácil de interpretar (Costa Rica).**
   - Nada de palabras confusas ni jerga técnica en botones o etiquetas (evitar términos crudos como `PENDING_QUOTE`, `CTA`, `CAC`, `Bitácora`, `Seña`).
   - Cualquier persona no técnica debe entender cada pantalla y cada campo en 3 segundos.
5. **Menú y espacio limpio en PC + celular real (`390 px`).**
   - En el panel administrativo en PC: **menú lateral contraíble** para ganar espacio horizontal.
   - En celular: **menú deslizable (drawer) + barra inferior fija para el pulgar**, botones `>= 44 px`, todas las tablas convertidas en tarjetas apiladas y filtros en una sola categoría expandidos a todo el ancho.
   - Botones secundarios con contraste propio (nunca del mismo color que la tarjeta).
   - Barras de scroll oscuras y sutiles (nunca las barras claras por defecto de Windows).
   - Al cambiar de pantalla, iniciar siempre arriba.
6. **Cero estética cliché de IA:** sin LEDs verdes pulsando, sin badges presumiendo tecnología ni micro-etiquetas ilegibles en mayúsculas (`9–11 px`).
7. **Control humano visible:** la IA propone, ordena y explica, pero nunca publica, cobra ni envía nada sin confirmación explícita del usuario o del dueño.
