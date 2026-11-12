---
name: diseno-frontend-sebastian
description: Sistema y dirección de arte universal de Sebastián para construir frontends limpios, modernos y con profundidad real en cualquier proyecto (entregas de backend, hackathons, SaaS o apps), evitando el aspecto genérico de IA ("efecto Luna"), los huecos hundidos y la saturación de tarjetas.
---

# Diseño Frontend Universal — Estándar de Sebastián (Anti-"Luna")

Usa esta skill **siempre** que vayas a crear, rediseñar o pulir el frontend de cualquier proyecto de Sebastián (en la PC principal de casa o en la laptop del curso). El objetivo es que nunca parezca una plantilla genérica generada por IA ("lo que entrega Luna").

---

## 1. Arquitectura Multipágina Real y Equilibrio Espacial (Anti-"One-Page IA")

Dos síntomas clásicos de un frontend básico hecho por IA son:
1. Meter toda la aplicación en una sola página larga donde el Navbar solo baja con `#anclas` (`#catalogo`, `#contacto`).
2. Encerrar absolutamente todo en tarjetas flotantes (`card` dentro de `card`).

### Reglas obligatorias de arquitectura y navegación:
- **PROHIBIDO que los botones del Navbar bajen en la misma página (`#hash`):** Cada botón del Navbar debe navegar a **una página/ruta diferente e independiente** (`/`, `/catalogo`, `/catalogo/:id`, `/herramientas`, `/solicitar`, `/mis-solicitudes`, `/taller`, etc.).
- **La Main Page (`/`) es un recorrido editorial curado, NO la tienda entera:**
  - En la portada nunca se mete el catálogo completo con todos sus filtros ni el formulario entero de trabajo.
  - En su lugar, la Main Page muestra una selección curada (por ejemplo: **3 tarjetas limpias de productos destacados** con foto grande arriba y texto abajo que al tocarlas **navegan a la página del producto `/catalogo/:id`**, más un enlace discreto `"Ver todos los diseños"` que lleva a `/catalogo`).
- **Equilibrio 70/30 en cada pantalla (No todo es una tarjeta):**
  - El **Navbar general**: el logo a la izquierda y el botón principal a la derecha van libres sobre el fondo; **solo** la cápsula central de navegación lleva superficie mate.
  - **Encabezados de sección, historias y citas**: van libres directamente sobre el fondo plano/satinado (`— Eyebrow corto`, titular grande con palabras clave en color acento, párrafo limpio).
  - **Cuándo SÍ usar tarjetas sobrias**: para las 3 piezas destacadas que llevan a su ficha, la fila de materiales/aliados, la grilla de 4 herramientas o las 3 modalidades de servicio.

---

## 2. Superficies Mates de Estudio (Cero Bordes de Color, Cero Huecos Hundidos, Cero Ladrillos Pesados)

Evolución aprobada por Sebastián:
- **Prohibidas las siluetas/bordes de línea (`border`) para separar tarjetas o botones:** No usar `border-white/15` ni bordes de color de `1px` alrededor de tarjetas, badges o botones.
- **Prohibidos los "huecos hundidos" (`inset` oscuros) y las sombras duras tipo ladrillo (`0 4px 0` / `0 6px 0`):**
  - Los contenedores internos negros hundidos y las bases 3D gruesas debajo de los botones hacen que la interfaz se sienta pesada o desconectada del fondo.
- **Acabado Mate de Estudio (`#1e1e22` y `#25252b` sobre fondo `#161618`):**
  - Las tarjetas, botones e inputs usan superficies mates limpias (`background: #1e1e22`, hover `#25252b`) que combinan de forma orgánica con el fondo `#161618`, con sombra ambiental muy sutil o nula y transición suave (`hover:-translate-y-0.5` o cambio de tono mate).
- **Cero esquinas rectas a 90°:** Usar siempre curvas amables (`rounded-xl`, `rounded-2xl` o `rounded-full` en botones/píldoras).

---

## 3. Fondos con Ritmo Visual: Onda 3D WebGL estilo PlayStation 3 XMB en el Hero

- **PROHIBIDO hacer ondas 2D tiesas con `<canvas>` 2D (`bezierCurveTo`):** Las líneas 2D dibujadas en canvas plano se ven tiesas y hechas por IA.
- **Receta aprobada para fondos orgánicos de Hero (`Ps3HeroWave.tsx`):**
  - Usar un **shader 3D real en WebGL / Three.js (`ShaderMaterial`)** sobre mallas subdivididas (`PlaneGeometry(28, 5.2, 220, 64)`).
  - Desplazar vértices con ondas armónicas suaves en `Y` y `Z` y calcular iluminación **Fresnel** (`pow(1.0 - abs(dot(normal, viewDir)), 3.2)`) en el fragment shader con mezcla aditiva (`THREE.AdditiveBlending`). Así el velo es translúcido en el centro y brilla con luz sedosa en los pliegues, acompañado de micropartículas con desenfoque de profundidad.
- **Transición a calma al hacer scroll:** El efecto WebGL vive **solo en el Hero**; al bajar al resto de la página, el fondo es `#161618` limpio (sin cuadrículas ni ruido tipo lija) para que la vista descanse.

---

## 4. Visores 3D Interactivos: Geometría CAD Limpia y Objetos Deseables

- **PROHIBIDO dibujar objetos 3D falsos en 2D/SVG o cargar mallas STL crudas llenas de triángulos ruidosos:**
  - Si pasas un STL teselado crudo por `EdgesGeometry`, se llena de miles de líneas internas diagonales que parecen una telaraña sucia.
- **Receta técnica aprobada ("10/10"):**
  1. Construir o preparar sub-piezas con **geometría CAD limpia por extrusión (`THREE.ExtrudeGeometry` con `THREE.Shape` y `holes`)**.
  2. Renderizar cada pieza con `MeshStandardMaterial({ depthWrite: true, polygonOffset: true, opacity: 0.90 })` (cuerpo gris humo `#27272c` + piezas clave en acento naranja `#c84b12` / `#ff6a1f`) y aristas nítidas `EdgesGeometry(geo, 22)`.
  3. **Regla de oro de selección de modelo:** La pieza en exhibición debe ser **un objeto deseable o útil que den ganas de tener en las manos o en el escritorio** (como el **MicroDuck Robot**, un **Cutter Retráctil EDC F1** o un **Estuche Técnico Impermeable**), nunca cajas vacías aburridas ni piezas industriales abstractas sin contexto.

---

## 5. Tipografía con Personalidad y Honestidad Funcional

- **Tipografía:** Cargar siempre fuentes web reales con carácter (como **`Chakra Petch`** en Vértice CR) y verificar que ningún reset CSS las pise.
- **Jerarquía de títulos:** Usar palabras clave coloreadas con el acento dentro del mismo titular y un guion corto naranja arriba (`— Eyebrow`), sin sombras negras duras detrás del texto.
- **Prohibidos los puntos/LEDs decorativos o textos falsos de "Conectado / Online":** Todo estado o indicador en pantalla debe corresponder a datos reales del backend/Supabase.

---

## 6. Continuidad entre PCs (PC Principal de Casa ↔ Laptop del Curso)

Sebastián trabaja entre dos equipos (PC principal en casa y laptop en el curso):
1. Mantener siempre las skills en `.agents/skills/` dentro del repositorio actualizadas y sincronizadas con git.
2. Documentar cualquier cambio de esquema de base de datos, variables de entorno (`.env.example`) y estado de fases del proyecto en `docs/` antes de cerrar sesión y hacer `git push`.
## 7. Integridad visual de iconos, catálogos y menús

La revisión debe cubrir los datos reales del catálogo completo, no solo la primera tarjeta o una muestra pequeña.

- **Iconografía completa y reconocible:** cada producto, categoría, marca o entidad que se represente visualmente debe tener un icono o imagen intencional y coherente con su identidad. No dejar espacios vacíos, iconos rotos ni repetir un glifo genérico como sustituto para toda la colección. Cuando el catálogo crezca, asignar recursos usando una clave estable del registro; para elementos futuros sin imagen, usar una alternativa diseñada por categoría y mantenerla reconocible. Revisar todos los elementos disponibles y sus variantes.
- **Selectores terminados:** no dejar desplegables nativos con la presentación por defecto del navegador o del sistema operativo cuando rompan la identidad visual (por ejemplo, lista blanca/azul de Windows dentro de una aplicación oscura). El menú cerrado, abierto, la opción seleccionada, deshabilitada, vacía y filtrada deben tener estilos coherentes y legibles.
- **Accesibilidad del menú:** todo selector personalizado debe conservar etiqueta visible, foco perceptible, operación con teclado, cierre con Escape, selección entendible para lectores de pantalla y áreas de interacción cómodas. Su lista no debe quedar recortada por modales, contenedores con scroll o capas de la interfaz.
- **Inspección antes de entregar:** recorrer el catálogo completo o verificarlo con una auditoría automatizada, abrir los desplegables reales y revisar estados normal, abierto, búsqueda sin resultados y selección. Comprobar también formularios, diálogos y tamaños de pantalla representativos. Una compilación exitosa no sustituye esta revisión.


---

## 8. Traductor Automático del Pedido "Que no sea genérico"

Cuando Sebastián pida en el prompt *"que no sea genérico"*, *"que no sea básico"* o pida una interfaz interactiva sin dar especificaciones de diseño largas, el agente aplicará **OBLIGATORIAMENTE** estas 4 directrices de ingeniería:

### 1. Prohibidas las interfaces lineales de 2 pasos ("Formulario -> Resultado apilado"):
- Una interfaz genérica hecha por IA siempre hace lo mismo: un recuadro de subida estático y luego pone la imagen a la izquierda y un bloque de texto o JSON a la derecha en línea recta.
- En su lugar, construye una **Mesa de Trabajo Interactiva (Interactive Workbench)**:
  - **Sincronización bidireccional:** Al tocar o pasar el mouse sobre una partida o elemento de la lista, se resalta en el documento o se abre su ficha técnica detallada.
  - **Capacidad de edición y recálculo en vivo:** El usuario puede ajustar cantidades o valores y ver la matemática recalcularse en tiempo real.
  - **Botones de acción de negocio:** Botones con consecuencias reales (*"Aprobar y Registrar en BD"*, *"Rechazar por Discrepancia"*, *"Exportar Informe"*).

### 2. Restricciones físicas de paleta (Cero Maquillaje Cliché):
- **Prohibidos los degradados arcoíris o fondos de color saturados:** La estética por defecto es **Negro Estudio (#09090b / #000000)** con superficies mate grafito (#141417 y #1c1c20).
- **Una sola familia de color funcional:** Verde esmeralda para validaciones exitosas (#30d158), azul sutil para acciones primarias (#0a84ff), texto blanco de alto contraste (#ffffff).

### 3. Escala tipográfica accesible (Prohibido el texto diminuto):
- **Cuerpo de texto y datos legibles sin lentes:** Mínimo **17px–18px** con interlineado generoso (1.6).
- **Titulares con presencia:** 32px–40px bold.
- **Prohibido el texto en gris oscuro sobre fondo negro:** El texto secundario va en #d4d4d8 o #a1a1aa, nunca en grises ilegibles.

### 4. Comunicación humana del Agente (Cero JSON crudo):
- El agente emite sus dictámenes y conclusiones en **prosa ejecutiva y lenguaje natural**, explicando en español claro qué auditó, qué acciones tomó con sus herramientas y si los cálculos son correctos.

---

## 9. Prohibición Estricta del "Patrón Vibe-Coding" (La Firma Cliché de la IA)

Cualquier persona identifica una interfaz hecha por IA en medio segundo cuando detecta estos 4 vicios visuales, los cuales quedan **TERMINANTEMENTE PROHIBIDOS**:

1. **PROHIBIDO el punto verde / LED pulsante de adorno:**
   - No colocar puntos verdes (`w-2 h-2 rounded-full bg-green-500 animate-pulse` o `● ONLINE / AUDITORÍA APROBADA`) al lado de títulos, proveedores o folios. En software nativo serio (Apple Wallet, Archivos de iOS), los estados se comprenden por el flujo y la arquitectura, no con luces de discoteca.
2. **PROHIBIDOS los "eyebrows" en mayúsculas diminutas flotando arriba de títulos:**
   - No usar la fórmula cliché `text-xs uppercase tracking-wider text-green-400` encima de un encabezado (`● AUDITORÍA APROBADA`, `— SISTEMA INTELIGENTE`). El título debe sostenerse por su propio peso y presencia tipográfica.
3. **PROHIBIDOS los subtítulos grises en monospace con puntos medios (`·`):**
   - No formatear metadatos como `Folio: NV-2026-8942 · 13% IVA · Moneda: USD`. Los datos técnicos se organizan en fichas limpias, tablas estructuradas o etiquetas naturales, no en una línea gris debajo del nombre.
4. **PROHIBIDAS las píldoras flotantes que presumen tecnología:**
   - Cero insignias decorativas de *"GPT-4o"*, *"SQLite Synced"* o *"Latencia 0.8s"*. Una herramienta profesional no necesita presumir su infraestructura en la cara del usuario; simplemente ejecuta su función con excelencia.

