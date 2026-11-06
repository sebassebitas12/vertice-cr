---
name: diseno-frontend-sebastian
description: Motor y sistema de diseño universal de Sebastián para construir frontends limpios, modernos y con acabado de producto comercial en cualquier dominio (hospitales, retail, gimnasios, SaaS, dashboards o startups), erradicando el "efecto Luna", las jaulas de alambre, los slashes decorativos, los garabatos SVG rotos, los emojis de IA, los logins partidos sin sentido y el AI-slop genérico.
---

# Motor de Frontend Universal — Estándar Sebastián (Anti-AI-Slop)

Usa esta skill **siempre** que vayas a diseñar, crear, rediseñar o pulir el frontend de cualquier proyecto de Sebastián (en cualquier PC, framework o modelo de IA: Codex, Antigravity, Claude o ChatGPT).

El objetivo es absoluto: **Toda entrega, incluso un MVP o primer boceto funcional, debe verse como software comercial de alto nivel (nivel Stripe, Linear, Raycast)**. Si el resultado parece una maqueta genérica de IA (cajas negras con bordes de 1px, texto con slashes `/`, garabatos vectoriales rotos, emojis infantiles, logins partidos a la mitad y dashboards vacíos), **la tarea está reprobada**.

---

## 1. Las Prohibiciones Universales (Cero Tolerancia Anti-Luna)

Estas reglas no admiten excepciones ni excusas de "es solo una prueba":

1. **PROHIBIDO el uso de Emojis en toda la interfaz (Cero 🤖, 🛒, 📦, 🚀, 💡, 🔥):**
   * ❌ *Baneado:* Poner emojis en viñetas, botones, encabezados, badges o modales de IA. Los emojis se renderizan distinto y deformes en cada sistema operativo (en Windows se ven grotescos y planos) y gritan "chat genérico de IA amateur".
   * ✅ *Correcto:* Usar **iconos vectoriales reales (SVG limpios de 16-20px con trazo de 1.5 a 2px en color mono/acento)** de librerías como Lucide, Feather o Heroicons. Si es una viñeta, usa un icono SVG de check sutil (`<CheckIcon size={16} />`) o un interpunto tipográfico (`·`).
2. **PROHIBIDO el split-screen por defecto en pantallas de autenticación (Login / Registro):**
   * ❌ *Baneado:* Partir la pantalla en dos mitades (50% izquierda para meter frases de relleno, viñetas amontonadas o ilustraciones sin sentido y 50% derecha para el formulario apretado).
   * ✅ *Correcto:* **El estándar de Sebastián es el Login de Tarjeta Central Flotante (Centered Card)**: una tarjeta limpia, moderna y contenida (`max-w-md w-full`) centrada perfecta en el viewport (`min-h-screen flex items-center justify-center`), flotando sobre un fondo atmosférico con profundidad mate o viñeta suave.
3. **PROHIBIDO clonar o heredar la identidad cromática de Vértice CR:**
   * ❌ *Baneado:* Usar el naranja técnico (`#ff6a1f`) y grafito mate en proyectos que no sean Vértice. 
   * ✅ *Correcto:* **Cada proyecto tiene su propia alma cromática según su industria**. Un minimercado o retail usa tonos comerciales propios (ej. Verde esmeralda `#10b981`, azul ultramar `#2563eb`, ámbar cálido `#d97706`); una clínica usa slate aséptico y cian médico; un gimnasio usa lima neón o rojo fuego. **No contamines proyectos ajenos con el color de Vértice**.
4. **PROHIBIDO inventar ilustraciones o garabatos vectoriales rotos (Síndrome de las "barritas verdes"):**
   * ❌ *Baneado:* Dibujar SVGs improvisados con líneas sueltas, cajas desordenadas o mallas que parecen circuitos rotos como relleno decorativo (ej. falsos estantes o cuadrículas sin sentido).
   * ✅ *Correcto:* Si se requiere isotipo o badge de marca en el login, usa un logo real en alta calidad (ubicado en `/brand/logo-badge.jpg` en squircle con sombra suave) o un Wordmark tipográfico limpio. Cero líneas SVG sueltas sin sentido.
5. **PROHIBIDO inventar isotipos o logos cuadrados genéricos de IA:**
   * ❌ *Baneado:* Dibujar una cajita cuadrada de líneas adentro o un cubo abstracto como "logo de la app".
   * ✅ *Correcto:* Usar un logo comercial en alta calidad generado por herramientas de imagen o un **Wordmark tipográfico puro** (`font-extrabold tracking-tight text-white` con subtítulo descriptivo sutil abajo).
6. **PROHIBIDO dejar el scrollbar nativo blanco del sistema operativo:**
   * ❌ *Baneado:* Dejar la barra gris/blanca ancha por defecto de Windows sobre una interfaz oscura.
   * ✅ *Correcto:* Es **obligatorio** estilizar el scrollbar en `:root` y en el CSS global con `scrollbar-color: #2e323b transparent` y `::-webkit-scrollbar` delgado (6px), track transparente y thumb oscuro redondeado.
7. **PROHIBIDO dejar al administrador perdido ("No sé qué hacer dentro"):**
   * ❌ *Baneado:* Entregar una pantalla con datos vacíos o formularios sueltos donde el usuario no tiene claro cuál es el siguiente paso.
   * ✅ *Correcto:* Incluir un **Centro de Control / Guía de Inicio Rápido (Onboarding 1-2-3)** cuando el sistema no tenga datos, y un **botón primario de acción inmediata** siempre al alcance (ej. `[ ⚡ Cobro Rápido / Nueva Venta ]` o atajo principal).
8. **PROHIBIDO usar slashes `/` decorativos:**
   * ❌ *Baneado:* `PUESTO DE OPERACIÓN / JUEVES, 5 DE NOVIEMBRE`, `COLA DE TRABAJO / 0`, `ACCESOS / ATAJOS`.
   * ✅ *Correcto:* Jerarquía real con escala tipográfica, peso (`font-bold`) y espaciado limpio (`gap-2`). Los metadatos secundarios se colocan como subtítulos breves o badges discretos sin barras de ruta de terminal. Si requieres un separador de fecha, usa un interpunto sutil (`·`).
9. **PROHIBIDAS las "jaulas de alambre" (`border-1px` gris en cada contenedor):**
   * ❌ *Baneado:* Enmarcar tarjetas, botones, inputs y secciones enteras con `border border-zinc-800` o `border-white/10` sobre negro plano.
   * ✅ *Correcto:* Separar por **capas de elevación mate** (Base → Superficie de tarjeta → Controles/inputs) o mediante divisores lineales ultradelgados con opacidad mínima (`border-b border-white/[0.04]`).
10. **PROHIBIDOS los breadcrumbs redundantes:**
    * ❌ *Baneado:* Colocar en un breadcrumb superior la misma palabra que el H1 que está inmediatamente debajo (ej: poner *"Pendientes"* en letra chiquita y abajo el título gigante *"Pendientes del día"*).
    * ✅ *Correcto:* La miga de pan indica contexto real de navegación (`Inicio › Catálogo › Producto`) o se omite por completo si estás en la vista principal del módulo.
11. **PROHIBIDO el fondo negro muerto (`#000000`):**
    * ❌ *Baneado:* `bg-black` puro sin matiz ni atmósfera.
    * ✅ *Correcto:* El fondo oscuro siempre lleva tono y profundidad (`#0e1015`, `#111317`, `#0f172a`, etc.).
12. **PROHIBIDO el copy robótico o pretencioso de IA:**
    * ❌ *Baneado:* *"Ingresá a tu operación"*, *"Lo que requiere atención"*, *"Espacio de gestión activa"*.
    * ✅ *Correcto:* Lenguaje humano, claro y directo del dominio (*"Caja y Ventas"*, *"Pacientes en Espera"*, *"Control de Inventario"*, *"Nuevo Registro"*).
13. **PROHIBIDOS los dashboards vacíos con ceros:**
    * ❌ *Baneado:* Ocupar el 70% de la pantalla con 3 números `0` gigantes y un rectángulo gigante con un checkmark verde diciendo *"Todo al día por ahora"*.
    * ✅ *Correcto:* En cualquier pantalla operativa, el 70% del espacio pertenece a la **herramienta activa** (tabla de datos viva, terminal de cobro rápido, buscador con teclado, formulario con autocompletado).
14. **PROHIBIDOS los sidebars kilométrica de 12 enlaces amontonados:**
    * ❌ *Baneado:* Una columna izquierda de 15 enlaces de texto con iconos genéricos de Lucide React.
    * ✅ *Correcto:* Agrupar la navegación en un máximo de **4 a 6 módulos clave**, presentados como cápsulas/píldoras (`nav-pill`), tabs superiores o menú lateral colapsable con contexto.
15. **PROHIBIDA la discordancia de género gramatical en formularios dinámicos y CRUDs:**
    * ❌ *Baneado:* Concatenaciones ciegas como `"Nuevo ${resource.singular}"` que generan textos vergonzosos en español: `"Nuevo factura"`, `"Nuevo categoría"`, `"Nuevo compra"`, `"Nuevo existencia"`.
    * ✅ *Correcto:* El schema de metadatos debe declarar el género (`gender: 'f' | 'm'`) o el título exacto de creación (`newTitle: 'Nueva factura'`), asegurando `"Nueva factura"`, `"Nueva categoría"`, `"Nueva compra"`.
16. **PROHIBIDO bloquear al cajero en retail sin un cliente predeterminado (Consumidor Final obligatorio):**
    * ❌ *Baneado:* Un botón de "Cobro Rápido / Nueva Venta" que se abre bloqueado diciendo *"No hay registros disponibles. Primero crea un cliente para continuar"*.
    * ✅ *Correcto:* En cualquier comercio, tienda o minimercado, **debe existir siempre la opción por defecto de "Consumidor Final / Mostrador"**. La venta rápida jamás debe exigir crear un cliente con cédula, correo y teléfono para cobrar una gaseosa o un paquete de galletas.
17. **PROHIBIDO perder la sesión al refrescar la página (F5):**
    * ❌ *Baneado:* Almacenar el token de autenticación exclusivamente en memoria (`useState(null)`), provocando que un F5 expulse al usuario de vuelta al login.
    * ✅ *Correcto:* La sesión (`token`, datos básicos de usuario) debe persistirse de forma segura en `localStorage` o `sessionStorage`, e hidratarse limpiamente al iniciar la app.
18. **PROHIBIDO dejar cajones o modales "fantasma" al navegar entre rutas:**
    * ❌ *Baneado:* Mantener el estado `panel` o `isModalOpen` abierto cuando el usuario hace clic en otro módulo del menú lateral, provocando que un cajón de facturación quede flotando sobre la pantalla de inventario.
    * ✅ *Correcto:* El cambio de ruta (`location.pathname` o cambio de módulo) debe resetear y cerrar forzosamente cualquier drawer o modal abierto.
19. **PROHIBIDOS los estados vacíos pasivos que conducen a callejones sin salida:**
    * ❌ *Baneado:* Decir *"Todavía no hay existencias. Crea el primer registro"* en vistas donde las existencias no se crean a mano sino que se calculan con compras; o permitir abrir "Crear producto" cuando las categorías obligatorias no existen, mostrando selects deshabilitados.
    * ✅ *Correcto:* Los estados vacíos deben ser pedagógicos y proactivos: explicar de dónde nacen los datos y ofrecer botones de atajo en cadena (ej: `[1. Crear categoría primero]` → `[2. Crear producto]`).
20. **PROHIBIDO descuidar los controles nativos del navegador (Calendarios blancos, selects azules y spinners feos):**
    * ❌ *Baneado:* Dejar que `<input type="date">` abra un calendario blanco chillón sobre un tema oscuro, que `<select>` use el azul y blanco por defecto de Windows, o que `input[type="number"]` muestre los steppers/flechitas dobles grises nativas de Windows.
    * ✅ *Correcto:* Declarar obligatoriamente `color-scheme: dark;` en `:root`, apagar los spinners nativos con `-webkit-appearance: none` e invertir el picker del calendario (`filter: invert(0.8)`).
21. **PROHIBIDO el scroll vertical en pantallas de acceso (Login y Registro estrictamente sin scrollbar):**
    * ❌ *Baneado:* Hacer tarjetas de login kilométricas con viñetas de marketing de relleno adentro, leyendas académicas al pie o paddings gigantescos que superen la altura del viewport y fuercen al navegador a mostrar barra de desplazamiento vertical. Scrollear en un login transmite desprolijidad y descuido.
    * ✅ *Correcto:* El contenedor de autenticación debe medir `height: 100svh; overflow: hidden;` y declarar forzosamente `html:has(.auth-screen), body:has(.auth-screen) { height: 100%; overflow: hidden !important; }`. La tarjeta de login debe ser ultra compacta (altura contenida de ~390px a 420px), eliminando viñetas de marketing y notas de relleno para que flote perfectamente centrada en cualquier resolución (desde 720p hasta 4K) sin mover un solo píxel de scroll.
22. **PROHIBIDO el Navbar flotante con transparencia traslúcida que ensucie el contenido (Pill Nav con Superficie Sólida Mate):**
    * ❌ *Baneado:* Crear barras superiores flotantes con `backdrop-blur` translúcido o transparencias acuosas que hacen que las palabras y tablas que scrollean por detrás se trasluzcan, generando ruido visual, letras superpuestas e ilegibilidad.
    * ✅ *Correcto:* El estándar para navegación moderna compacta es la **Pill Nav Central de Superficie Sólida y Opaca** (`bg-[#181b22]`, `border border-white/[0.08]`, `shadow-[0_12px_36px_rgba(0,0,0,0.5)]`). El nav flota en la cabecera con esquinas redondeadas (`rounded-full` o `rounded-2xl`), pero su fondo es 100% mate y opaco, tapando limpiamente el contenido que pasa por debajo sin transparencias raras.
23. **PROHIBIDOS los chatbots flotantes de esquina en interfaces operativas (IA In-Situ Embebida en la UI):**
    * ❌ *Baneado:* Poner una burbuja flotante tipo widget de soporte en la esquina inferior derecha (`fixed bottom-6 right-6`) que tape botones de guardado, colisione con modales/drawers laterales y obligue al usuario a "conversar" en una ventanita aislada.
    * ✅ *Correcto:* La IA debe vivir **embebida silenciosamente dentro de los flujos naturales del producto**:
      * **Magic Bar de autocompletado:** Un campo inteligente en el formulario (`[ ✨ Escribe o escanea producto ]`) que autocompleta nombre, SKU, categoría y márgenes en un clic.
      * **Carga de facturas por OCR:** Botón `[ 📷 Cargar ticket / factura ]` en compras que prellena el borrador de 20 productos en 3 segundos sin digitar.
      * **Cobro por frase en caja:** Input de venta rápida (*"2 cocas de dos litros y medio kilo de queso"*) que agrega directo los ítems al carrito con su total.

---

## 2. Calibración de Atmósfera por Dominio (Paso 0)

La skill es **agnóstica del negocio**. Antes de codificar, identifica el dominio del proyecto y aplica su paleta de 3 capas + 1 acento funcional independiente:

| Dominio | Fondo Base (Capa 0) | Superficie Mate (Capa 1) | Controles / Wells (Capa 2) | Acento Propio del Dominio | Foco Operativo |
|---|---|---|---|---|---|
| **Comercio / Retail / Tienda** | `#111317` | `#181b22` | `#222631` | Esmeralda venta (`#10b981`) o Ámbar dorado (`#d97706`) | Caja rápida, tickets, escaneo, catálogo táctil, atajo `Cmd+K` |
| **Salud / Hospital / Clínica** | `#0b132b` o `#f8fafc` | `#111a33` o `#ffffff` | `#1c2541` o `#f1f5f9` | Cian médico (`#06b6d4`) o Menta clínica (`#14b8a6`) | Triaje rápido, estado de camas/turnos, alertas clínicas legibles |
| **Gimnasio / Fitness** | `#141416` | `#1e1e24` | `#282830` | Lima eléctrica (`#a3e635`) o Fuego (`#ff3d00`) | Control de accesos en tiempo real, aforo, cuotas y miembros |
| **SaaS / Backoffice / Base de Datos** | `#0d1117` | `#161b22` | `#21262d` | Azul ultramar (`#2563eb`) o Índigo (`#6366f1`) | Tablas densas con filtros combinados, exportación y edición rápida |
| **Manufactura / Taller (Vértice CR)** | `#161618` | `#1e1e22` | `#25252b` | Naranja industrial (`#ff6a1f`) | *Exclusivo de Vértice:* Visor 3D WebGL / CAD, tolerancia de capas |

---

## 3. El Estándar de Login: Tarjeta Flotante Centrada (Centered Floating Card)

**Queda prohibido el split-screen 50/50.** El estándar oficial para pantallas de acceso es una tarjeta centrada, limpia e inmersiva:

### Anatomía del Login Centrado:
1. **Contenedor viewport:** `min-h-screen flex items-center justify-center p-6`.
2. **Fondo atmosférico:** Gradiente radial muy suave en el centro (`radial-gradient(circle at 50% 35%, #18202b 0%, #101216 100%)`) o fondo mate oscuro con sutil viñeta.
3. **Tarjeta modal contenida:** `w-full max-w-md rounded-3xl bg-[#181b22]/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl border border-white/[0.06]`.
4. **Cabecera centrada:**
   * Logo/Badge squircle centrado arriba (`h-16 w-16 mx-auto rounded-2xl shadow-lg`).
   * Nombre de la aplicación en `text-2xl font-extrabold tracking-tight text-white mt-4`.
   * Subtítulo breve y limpio (`text-sm text-zinc-400 mt-1`).
5. **Formulario compacto:**
   * Inputs ergonómicos con label claro y placeholder discreto.
   * Checkbox de *"Recordarme"* alineado con enlace *"¿Olvidaste tu contraseña?"*.
   * Botón primario de ancho completo (`w-full h-11 rounded-xl bg-[accent] font-bold text-sm`).
   * Enlace inferior discreto: *"¿No tienes cuenta? Regístrate aquí"*.

---

## 4. Ergonomía, Onboarding y Ritmo Visual

### Centro de Control y Onboarding para el Administrador (Guía 1-2-3)
Cuando el usuario administrador entra por primera vez a su sistema, la pantalla debe guiarlo activamente:
* **Banner de bienvenida con acción inmediata:**
  * Título: *"Consola de Administración · [Nombre de la App]"*
  * Botón primario prominente: **`[ ⚡ Acción Principal / Cobro Rápido ]`**.
* **Guía de 3 pasos (si el sistema no tiene registros):**
  1. *Paso 1: Estructura base* (Categorías / Parámetros iniciales) → `[ Configurar ]`
  2. *Paso 2: Cargar registros/inventario inicial* → `[ Agregar Primer Registro ]`
  3. *Paso 3: Probar operación en vivo* (Venta de prueba / Simulación) → `[ Probar Flujo ]`

### Scrollbars Oscuros Universales
Es obligatorio incluir en el CSS global (`styles.css` / `index.css`):
```css
:root {
  scrollbar-color: #2e323b transparent;
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #2e323b;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3f4450;
}
```

### Espaciado holgado en listas de acción
En listas o tarjetas de accesos rápidos (`Crear un registro`, atajos de cobro, etc.):
* **PROHIBIDO amontonar las filas:** Cada fila debe tener un padding vertical holgado (mínimo `py-3.5`).
* **Respiración entre título y subtítulo:** La descripción debe ir con `mt-1` o `mt-1.5` en un tono `text-zinc-400 text-xs`, no pegada al título.
* **Micro-interacción de fila:** `hover:bg-white/[0.04]` y una flecha discreta `→` que responde al hover con `translate-x-1`.

---

## 5. Integración de IA Contextual (Asistentes con LLMs / DeepSeek)

Cuando la aplicación cuente con asistencia inteligente (conectada al backend con DeepSeek o APIs de lenguaje):

1. **Gatillador accesible en la interfaz (CERO EMOJIS):**
   * Botón flotante o acceso en barra superior usando un icono SVG de red o destello limpio (`<SparklesIcon size={16} />`), jamás un emoji `🤖`. Texto claro: `Asistente DeepSeek` o `Asistente IA`.
2. **Drawer o ventana modal interactiva:**
   * Ventana emergente con fondo mate `#181b22`, cabecera con el modelo activo (*"Asistente Comercial · DeepSeek"*) y estado de conexión en verde.
3. **Chips de preguntas rápidas (Quick prompts):**
   * Ofrecer 3 o 4 sugerencias de preguntas que el usuario puede tocar con un click:
     * *"¿Qué productos tienen stock crítico hoy?"*
     * *"Dame un resumen de ventas de la semana"*
     * *"Sugiéreme qué proveedores contactar"*
4. **Backend seguro y contextual:**
   * Las peticiones pasan por el backend (`/api/ai/...`) inyectando el estado real de la base de datos en el system prompt antes de invocar la API con la clave `DEEPSEEK_API_KEY`. Jamás exponer API keys en el frontend.

---

## 6. Recetas de Componentes "No Genéricos" (Código Listo para Usar)

### A. Login Centrado Oficial (Centered Floating Card)
```tsx
export function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0f1115] relative overflow-hidden">
      {/* Luz ambiental sutil detrás de la tarjeta */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -top-24" />

      <div className="w-full max-w-md rounded-3xl bg-[#181b22]/95 p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.65)] border border-white/[0.06] backdrop-blur-xl relative z-10">
        <div className="flex flex-col items-center text-center">
          <img
            src="/brand/logo-badge.jpg"
            alt="Logo"
            className="h-16 w-16 rounded-2xl object-cover shadow-md shadow-black/50"
          />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Ingresa con tu correo registrado para administrar la tienda.
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Correo electrónico</label>
            <input
              type="email"
              placeholder="admin@laesquina.com"
              className="w-full h-11 rounded-xl bg-[#222631] px-3.5 text-sm font-medium text-white placeholder-zinc-500 focus:bg-[#282d3b] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-300">Contraseña</label>
              <a href="#recuperar" className="text-[11px] font-semibold text-emerald-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 rounded-xl bg-[#222631] px-3.5 text-sm font-medium text-white placeholder-zinc-500 focus:bg-[#282d3b] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-[#0a1b12] transition-all hover:bg-emerald-400 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Entrar al sistema</span>
            <span>→</span>
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          ¿No tienes cuenta aún?{' '}
          <a href="/registro" className="font-bold text-emerald-400 hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
```

### B. Superficie Mate Elevada (Tarjeta sin jaula de alambre)
```tsx
<div className="rounded-2xl bg-[#181b22] p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] transition hover:bg-[#1e222b]">
  <div className="flex items-center justify-between gap-3">
    <h3 className="text-base font-bold text-white tracking-tight">{titulo}</h3>
    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
      {etiqueta}
    </span>
  </div>
  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{descripcion}</p>
</div>
```

### C. Barra de Navegación Pill Nav Sólida Mate (Sin desenfoques traslúcidos)
```tsx
export function PillNavBar({ modules, activeKey, onSelect }) {
  return (
    <nav className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#181b22] border border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
      {modules.map((m) => {
        const active = m.key === activeKey;
        return (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              active
                ? 'bg-emerald-500 text-[#071d13] shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </nav>
  );
}
```

### D. Formulario con Magic Bar de Autocompletado In-Situ (IA Embebida)
```tsx
export function ProductFormWithMagicBar({ onEnrichWithAI }) {
  const [magicQuery, setMagicQuery] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Magic Bar: 1 input que autocompleta 8 campos */}
      <div className="p-3.5 rounded-2xl bg-[#181b22] border border-emerald-500/20 flex items-center gap-3">
        <SparklesIcon className="w-5 h-5 text-emerald-400 flex-none" />
        <input
          type="text"
          value={magicQuery}
          onChange={(e) => setMagicQuery(e.target.value)}
          placeholder="✨ Escribe 'Coca Cola 2L' o escanea código para autocompletar todo..."
          className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          onClick={() => onEnrichWithAI(magicQuery)}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-xs font-bold text-[#071d13] hover:bg-emerald-400"
        >
          {loading ? 'Completando…' : 'Autocompletar'}
        </button>
      </div>

      {/* Los campos normales reciben la información autocompletada sin chatbots */}
    </div>
  );
}
```

---

## 7. Instrucción Contra la Ceguera Sensorial de la IA

Si estás ejecutando esta skill en un entorno donde las herramientas visuales de navegador (Chromium/Puppeteer MCP) fallan o no están disponibles:

* **QUEDA ESTRICTAMENTE PROHIBIDO asumir que el diseño está bien solo porque el comando de build terminó con código 0.**
* **QUEDA ESTRICTAMENTE PROHIBIDO usar emojis o partir la pantalla de login a la mitad.**
* **QUEDA ESTRICTAMENTE PROHIBIDO reutilizar colores de otros proyectos (como el naranja de Vértice). Elige la paleta del rubro.**
* Apégate al 100% a las recetas de este archivo.
