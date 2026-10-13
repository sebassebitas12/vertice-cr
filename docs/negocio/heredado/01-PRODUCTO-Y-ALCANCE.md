# VÃ©rtice CR â€” Producto y alcance

> Ãšltima actualizaciÃ³n: **2026-10-05**.

## Producto

Tienda costarricense de impresiÃ³n 3D con dos lÃ­neas:

1. CatÃ¡logo de modelos que se fabrican al recibir pedidos; no se ofrecen como entrega inmediata.
2. ImpresiÃ³n personalizada: archivo 3D o ayuda de diseÃ±o; revisiÃ³n y cotizaciÃ³n antes de producciÃ³n/pago.

El catÃ¡logo presenta modelos y opciones. La compra de un modelo inicia su producciÃ³n; la ficha o tarjeta no debe prometer disponibilidad inmediata ni usar etiquetas o cantidades de existencias.

### Capacidad de fabricaciÃ³n vigente

- Proceso disponible: **FDM Ãºnicamente**.
- Filamentos disponibles: **ASA, PLA, PETG, ABS y TPU**.
- No ofrecer SLA, resina, nylon u otros procesos/materiales como capacidad del taller en esta entrega.
- La selecciÃ³n final del filamento depende de la revisiÃ³n tÃ©cnica de cada pieza; no implica compatibilidad garantizada sin revisar diseÃ±o y uso.
- No publicar tolerancia dimensional garantizada ni plazos de entrega hasta contar con datos de operaciÃ³n aprobados. El `Â±0.05 mm` de HF-01 es texto del mockup congelado, no un compromiso de fabricaciÃ³n confirmado.

## Roles

### Cliente
Registro, login, sesiÃ³n, catÃ¡logo, bÃºsqueda, filtros, detalle, variantes, carrito, compra, solicitudes personalizadas, cotizaciones, pedidos, actividad y datos personales.

### Administrador
Dashboard operativo, productos, categorÃ­as, pedidos y su producciÃ³n, solicitudes/cotizaciones, clientes, actividad, mÃ©tricas y resumen operativo asistido por IA. El manejo de existencias de productos terminados no forma parte del modelo actual.

## Requisitos obligatorios

- React + Vite + JavaScript/JSX.
- React Router DOM.
- JSON Server + db.json.
- Services para API local, externa e IA.
- AutenticaciÃ³n y autorizaciÃ³n por roles.
- CRUD principal.
- Dashboard + Recharts.
- IA.
- Dos flujos N8N.
- Responsive: 375 / 768 / 1280+.
- Accesibilidad.
- Jest + Testing Library.
- Cobertura mÃ­nima objetivo 70%.

## MoSCoW

### Must
AutenticaciÃ³n, roles, catÃ¡logo, productos, carrito, pedidos, solicitudes, cotizaciÃ³n, CRUD, dashboard, mÃ©tricas, API externa, IA integrada a los flujos (incluida la preparaciÃ³n automÃ¡tica de solicitudes/cotizaciones desde referencias compatibles), N8N, responsive, accesibilidad y testing.

**Alcance operativo del requisito CRUD (aclaraciÃ³n 2026-10-01):** CRUD completo en Admin para `products` y `categories`. Productos permiten alta, lectura, ediciÃ³n, publicaciÃ³n/ocultamiento y baja definitiva solo sin referencias histÃ³ricas; si ya forman parte de un pedido, se ocultan para conservar el registro. CategorÃ­as permiten alta, lectura, ediciÃ³n y baja solo sin productos asociados. Ninguna de estas operaciones administra inventario ni carga de medios. Pedidos son registros histÃ³ricos: su creaciÃ³n ocurre en el flujo de compra y la ediciÃ³n de etapa serÃ¡ una operaciÃ³n de dominio auditada, nunca CRUD genÃ©rico ni borrado. Las solicitudes se crean en el flujo del cliente y usan el ciclo de cotizaciÃ³n de `02`; usuarios se registran desde Auth y no se crean/eliminan desde Admin. No interpretar â€œCRUDâ€ como permiso para modificar/borrar indiscriminadamente todas las entidades.

### Should
ReseÃ±as, cupones, ajuste de texto y WhatsApp.

### Could
Recomendaciones avanzadas, predicciÃ³n, comparador y analÃ­tica avanzada.

### Won't en esta entrega
Pagos reales, facturaciÃ³n fiscal real, logÃ­stica integrada y garantizar geometrÃ­a, escala o fabricabilidad a partir de una sola imagen. La generaciÃ³n/visualizaciÃ³n image-to-3D es una capacidad opcional aparte, no sustituye inspecciÃ³n ni laminado.

### Promesa de IA del producto â€” prioridad vigente (2026-10-05)

La diferencia central que se va a presentar es asistencia de IA integrada para
orientar al cliente, preparar solicitudes/cotizaciones desde la conversaciÃ³n y
ayudar al Admin a operar catÃ¡logo y solicitudes. La meta es no exigir al cliente
que conozca o escriba gramos, horas, desgaste, energÃ­a o costos; la IA y las
herramientas deben proponer esos datos a partir de archivos compatibles y
parÃ¡metros trazables, con acciones claras para continuar.

No se simularÃ¡ precisiÃ³n que la entrada no permite: una imagen no determina
escala ni interior de la pieza; un STL sÃ­ necesita inspecciÃ³n geomÃ©trica y
laminado con perfil de material/impresora para estimar tiempo y material. Si el
modelo no puede medir con evidencia suficiente, la interfaz pide solo la
aclaraciÃ³n indispensable o marca quÃ© falta, en vez de pedir al usuario datos
tÃ©cnicos arbitrarios o inventar una cotizaciÃ³n. El flujo vigente de `02` se
mantiene: solicitud del cliente â†’ propuesta asistida â†’ revisiÃ³n/validaciÃ³n del
taller con acciones concretas â†’ aprobaciÃ³n del cliente â†’ pago DEMO.

## Principios

- JavaScript/JSX; nunca TypeScript.
- No inventar mÃ©tricas, precios, capacidades o integraciones.
- UI sin reglas de negocio complejas.
- CÃ¡lculos importantes como funciones puras.
- Estados como parte del producto.
- Sin secretos en Git.

