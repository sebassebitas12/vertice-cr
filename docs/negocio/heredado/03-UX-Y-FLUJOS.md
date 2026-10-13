# VÃ©rtice CR â€” UX, navegaciÃ³n y estados

## CotizaciÃ³n conversacional y continuidad â€” 2026-10-06

Visitante puede preparar su idea con IA; antes de enviar ve acceso explÃ­cito a
login con retorno al borrador. En navegador se comprobÃ³ conservaciÃ³n de uso,
medidas, material, cantidad y diseÃ±o tras login. EnvÃ­o evita doble clic. Ã‰xito
oculta composer y muestra revisiÃ³nâ†’ofertaâ†’aprobaciÃ³n en Cuentaâ†’checkout comÃºn
del carrito. Chat fallido ofrece reintentar la misma pregunta, sin duplicarla
en el hilo. En la UI real, despuÃ©s de una idea el agente pregunta faltantes; una
acciÃ³n visible Â«Preparar resumen para revisarÂ» produce el borrador estructurado
editable y permite pasar a adjuntar referencias sin enviar automÃ¡ticamente.
Se cuenta con una barra de navegaciÃ³n por pestaÃ±as (`quote-mode-switcher`) que permite
alternar entre el formulario directo (`/solicitud/archivo`) y la ayuda con bot
(`/solicitud/ayuda-diseno`) preservando 100% de los datos del borrador. Asimismo,
el chatbot soporta ediciÃ³n y correcciÃ³n conversacional (material, cantidad, medidas,
descripciÃ³n o borrado de campos) actualizando el formulario sin quedar bloqueado por
modificaciones manuales previas, y el botÃ³n de revisiÃ³n ofrece pulso visual interactivo.
Esto fue verificado con el workflow n8n publicado. La entrega de correo de pago
continÃºa pendiente de captura Sandbox y acuse Gmail real.

## R-H85 â€” Recorridos visitante/cliente/Admin (2026-10-05)

El detalle de pedido no es una pasarela: ofrece volver/continuar al checkout
central en `/carrito?orderId=...`. El pedido sigue `PENDING` hasta una captura
PayPal Sandbox validada o una confirmaciÃ³n manual del comprobante SINPE. Los
pedidos vinculados a cotizaciÃ³n solo se crean despuÃ©s de aprobar la oferta en
Cuenta y llevan al mismo checkout.

### RevisiÃ³n de coherencia actual (2026-10-05)

El catÃ¡logo se puede explorar sin cuenta. Para agregar piezas y abrir el carrito
se requiere sesiÃ³n customer; login conserva el destino de retorno. El pedido solo
se crea tras autenticar. El carrito crea `PENDING`/`UNPAID`, y el cliente elige
PayPal Sandbox, tarjeta mediante PayPal (si el SDK la habilita) o reporta SINPE
DEMO para revisiÃ³n manual. Una cotizaciÃ³n personalizada
no depende del catÃ¡logo: Admin registra y envÃ­a monto/alcance, el cliente
aprueba en la app y continÃºa al checkout comÃºn. Admin no paga por el cliente,
pero sÃ­ revisa comprobantes SINPE. BÃºsqueda y filtros del catÃ¡logo se conservan
al abrir la ficha y volver. La rama de correo de pago se dispara despuÃ©s de las
confirmaciones; su acuse estÃ¡ probado con proveedor mock, no con Gmail real.

Las rutas FAQ, Materiales, Requisitos, TÃ©rminos, Privacidad y EnvÃ­os tienen
contenido ES/EN con lÃ­mites acadÃ©micos y acciones hacia flujos reales. Las rutas
heredadas `/checkout/productos` y `/checkout/solicitud` redirigen al carrito y a
las cotizaciones de cuenta, respectivamente; no exponen checkout vacÃ­o. El
detalle `/pedidos/:id` requiere rol `customer` y lee `/orders/mine`, por lo que
solo presenta pedidos que devuelve el servicio del usuario. Admin que abre
`/cuenta` recibe una derivaciÃ³n clara a AdministraciÃ³n; Perfil se declara de
consulta, no de ediciÃ³n.

PayPal Sandbox usa fondos de prueba; no es un cobro real. Reportar SINPE tampoco
confirma una transferencia: Admin revisa datos e imagen antes de marcar el pago.
Una integraciÃ³n bancaria real queda fuera del alcance.
El acceso de visitante queda en el control Â«Mi espacioÂ» del navbar; su nombre
accesible ahora anuncia el destino y el panel ofrece Iniciar sesiÃ³n/Crear cuenta.
No se duplica un CTA de login que compita con Cotizar en el header.

Admin puede confirmar o rechazar el comprobante SINPE reportado; el rechazo deja
el pedido pendiente para que el cliente corrija. No hay validaciÃ³n bancaria ni
anÃ¡lisis automÃ¡tico del comprobante con IA.

La ficha Admin conserva la publicaciÃ³n de cotizaciones por el flujo n8n/Gmail
dirigida al correo de la cuenta customer y con copia al taller. El export local
incluye una rama para recibo de pago, pero la app aÃºn no la invoca ni se ha
confirmado entrega. No reintentar un correo con estado `UNKNOWN` sin reconciliarlo.

R-H83: Contacto deriva a rutas ejecutables segÃºn pieza/idea/seguimiento; la
redacciÃ³n evita insinuar un equipo grande y asigna al admin su propia acciÃ³n.

R-H81: titular del carrito sin insignia tÃ©cnica de sesiÃ³n. Cuenta prioriza
piezas del pedido antes de pago. VerificaciÃ³n del pago y comienzo de producciÃ³n
son pasos separados. Nombre histÃ³rico manda; si falta, se puede mostrar el
nombre vigente identificado como referencia del catÃ¡logo actual.

R-H80: catÃ¡logo filtra por categorÃ­a real ademÃ¡s de material; ficha usa solo
muestras de color (teclado por flechas), galerÃ­a y acceso a modificaciones por
solicitud. QUOTED/CHANGES_REQUESTED explican el siguiente paso sin habilitar
acciones impropias. Correo lleva a cuenta para decisiÃ³n; el acuse no equivale
a aprobaciÃ³n/pago. Versiones importadas y render Gmail requieren verificaciÃ³n.

## Recorrido carrito y pago â€” revisiÃ³n vigente (2026-10-05)

La compra de catÃ¡logo exige sesiÃ³n y crea `PENDING`/`UNPAID`; el checkout ofrece
PayPal Sandbox o SINPE manual. Un fallo conserva el pedido y permite retomarlo
desde carrito/detalle. Solo captura Sandbox coincidente o verificaciÃ³n Admin
SINPE puede moverlo a `CONFIRMED`/`PAID`. Para una cotizaciÃ³n, la aprobaciÃ³n en
`/cuenta` precede la creaciÃ³n del pedido y redirige al mismo checkout. La vista
distingue fondos de prueba y comprobante revisado. Entrega e impuestos no
confirmados siguen pendientes; el correo posterior al pago ya integra el
outbox con API/n8n. Falta comprobar entrega Gmail en vivo.

> Ãšltima actualizaciÃ³n: **2026-10-05**.

## Rutas pÃºblicas

/, /catalogo, /producto/:id, /solicitud, /solicitud/archivo, /solicitud/ayuda-diseno, /checkout/productos, /checkout/solicitud, /registro, /nosotros, /contacto.

`/carrito` y `/pedidos/:id` requieren una sesiÃ³n con rol `customer`; `/cuenta`
requiere sesiÃ³n autenticada y tambiÃ©n puede orientar a Admin hacia su panel.
Admin y visitantes no pueden abrir carrito ni detalle de pedido; el guard envÃ­a
al visitante a login con el destino preservado.

## Rutas administrativas

/admin, /admin/pedidos, /admin/pedidos/:id, /admin/solicitudes, /admin/solicitudes/:id, /admin/catalogo, /admin/catalogo/:id, /admin/catalogo/nuevo, /admin/catalogo/:id/editar, /admin/catalogo/categorias, /admin/clientes, /admin/clientes/:id, /admin/actividad.

## Flujos

### Compra
Home â†’ CatÃ¡logo â†’ Producto â†’ (visitante: login/registro â†’ volver al producto) â†’ Carrito customer â†’ Pagar Â· DEMO â†’ `/pedidos/:id` (recibo) â†’ seguimiento.

### Personalizada con archivo
Solicitud â†’ Archivo â†’ Requisitos â†’ RevisiÃ³n â†’ Pendiente de cotizaciÃ³n â†’ Admin define alcance/monto â†’ Cuenta â†’ Cliente aprueba â†’ Pago Â· DEMO â†’ Pedido/recibo.

### Personalizada sin archivo
Solicitud â†’ Ayuda de diseÃ±o â†’ DescripciÃ³n â†’ Requisitos â†’ RevisiÃ³n â†’ Pendiente de cotizaciÃ³n â†’ Cuenta â†’ CotizaciÃ³n.

### Dos intenciones del cotizador â€” decisiÃ³n del usuario (2026-10-02)

La entrada `/solicitud` ahora presenta dos caminos explÃ­citos y no los mezcla:

1. **Ya tengo la pieza/archivo:** el cliente solicita revisiÃ³n tÃ©cnica de su
   STL/OBJ para cotizarlo. Esta ruta debe entregar el archivo al taller; no debe
   convertirse en una conversaciÃ³n de diseÃ±o.
2. **Quiero ayuda para definirla:** el chatbot parte de lo que la persona ya
   sabe y organiza sus mensajes en un resumen de solicitud. Uso, dimensiones,
   material y cantidad pueden quedar sin definir; no se debe bloquear a quien
   solo sabe nombrar la pieza y explicar para quÃ© la necesita. El asistente no
   fija el precio final ni inicia producciÃ³n.

La implementaciÃ³n React muestra ambas opciones y separa la ruta de ayuda
(`/solicitud/ayuda-diseno`) del intake de archivo (`/solicitud/archivo`). En la
ruta de archivo el cliente puede adjuntar hasta cinco imÃ¡genes PNG/JPG/WebP/GIF
o archivos STL/OBJ de hasta 5 MiB cada uno; dimensiones, uso, material deseado
y cantidad son opcionales. En medidas, la unidad seleccionada (mm/cm/in) se
aplica a nÃºmeros sin unidad; unidades escritas explÃ­citamente se respetan. El
campo vacÃ­o es vÃ¡lido, pero texto ilegible, cero o unidades no admitidas bloquean
el envÃ­o tanto en UI como en API. Con sesiÃ³n de cliente y confirmaciÃ³n explÃ­cita,
crea una solicitud `PENDING_QUOTE`, no un pedido ni un precio. Admin puede leer
los adjuntos solo con acceso autorizado; no se laminan ni se miden
automÃ¡ticamente. El agente recibe texto, no los bytes de las fotos/STL/OBJ; por
ahora esas referencias se conservan para revisiÃ³n del taller. El asistente general estÃ¡ disponible en esta ruta;
el chat flotante se oculta Ãºnicamente en `/solicitud/ayuda-diseno`, que tiene su
asistente de cotizaciÃ³n integrado.

El asistente de cotizaciÃ³n responde al flujo real y, ante la peticiÃ³n de preparar
la solicitud, devuelve un resumen estructurado editable a partir de los mensajes.
La persona lo revisa, agrega referencias y confirma el envÃ­o. La ruta no exige
que conozca medidas o material para una idea como Â«solo un brazo robÃ³tico para
una simulaciÃ³n de banda transportadoraÂ». La cotizaciÃ³n econÃ³mica y la decisiÃ³n
de fabricaciÃ³n continÃºan sujetas a revisiÃ³n del taller. La calculadora de
perfiles sigue rotulada DEMO y no envÃ­a montos como oferta.

El compositor compartido de los tres asistentes envÃ­a con `Enter`; `Shift+Enter`
inserta una nueva lÃ­nea. El botÃ³n de envÃ­o permanece disponible como alternativa
de puntero y tÃ¡ctil.

### Recorrido de compra de una pieza personalizada

1. Cliente elige archivo existente o ayuda para definir una pieza.
2. El archivo o los requisitos llegan como **solicitud pendiente**, nunca como
   pedido listo para pagar.
3. El taller revisa geometrÃ­a, uso, material, cantidad y costos; Admin guarda
   la cotizaciÃ³n final.
4. Admin envÃ­a la cotizaciÃ³n al cliente con un enlace para verla en su cuenta y
   copia oculta al taller. Solo la confirmaciÃ³n de entrega del proveedor avanza
   a `AWAITING_APPROVAL`; recibir el correo no equivale a aceptar.
5. Desde `/cuenta`, el cliente puede aprobar la versiÃ³n vigente o solicitar
   cambios/rechazar con un motivo. La app registra la decisiÃ³n; responder el
   correo no aprueba nada. Admin puede leer el motivo y preparar una versiÃ³n
   nueva. La app no debe permitir aprobar una versiÃ³n vencida o desactualizada.
6. Tras la aprobaciÃ³n, el cliente completa el pago DEMO desde su cuenta; reciÃ©n
   entonces se crea el pedido y su recibo. Admin registra despuÃ©s las etapas del
   taller. El email actual entrega la cotizaciÃ³n inicial; las notificaciones
   automÃ¡ticas de aprobaciÃ³n/cambios y los avisos de cada avance por correo no
   estÃ¡n implementados, aunque la app conserva estado/historial.

Hoy estÃ¡n implementados el intake conversacional/de archivo, la propuesta
econÃ³mica DEMO revisada por Admin, el email de cotizaciÃ³n inicial, la decisiÃ³n
del cliente en la app y el pago DEMO que crea un pedido. Siguen pendientes el
anÃ¡lisis de imÃ¡genes/archivos por IA, el procesamiento/laminado real, el pago
real y los correos transaccionales de aprobaciÃ³n y avance. Una cifra DEMO no es
un precio real ni una promesa de fabricaciÃ³n/entrega.

### PÃ¡ginas institucionales y contexto de sesiÃ³n â€” 2026-10-04

`/nosotros` explica el alcance del taller, el recorrido de una pieza de catÃ¡logo
y una solicitud personalizada, y diferencia las estimaciones iniciales de una
cotizaciÃ³n confirmada. `/contacto` funciona como enrutador de ayuda: archivo o
referencias â†’ `/solicitud/archivo`; idea por desarrollar â†’ `/solicitud/ayuda-diseno`;
seguimiento â†’ `/cuenta` para cliente, `/admin` para Admin y `/login` para
visitante con retorno a su cuenta. Desde Contacto se puede abrir el asistente
general ya presente en el chrome pÃºblico. No se publica un correo ni se afirma
un canal directo hasta contar con autorizaciÃ³n y un destino confirmado. La pÃ¡gina
explica quÃ© recibe el taller, quÃ© no ocurre al enviar y cÃ³mo se sigue la decisiÃ³n;
no simula una bandeja de contacto ni muestra una direcciÃ³n sin buzÃ³n. Un correo
corporativo real requiere dominio/buzÃ³n configurado fuera de la app. Si se necesita
contacto general por mensaje, queda pendiente implementar un formulario conectado
a un destino interno confirmado; las solicitudes de fabricaciÃ³n existentes no se
deben disfrazar como consultas generales.

La selecciÃ³n del visitante puede prepararse localmente desde una ficha de
producto, pero no se muestra ni se abre el carrito hasta iniciar sesiÃ³n como
cliente. El aviso de agregado ofrece login/registro y explica que la selecciÃ³n
queda guardada en ese navegador. Al volver a `/carrito`, la sesiÃ³n customer
combina explÃ­citamente esa selecciÃ³n con su carrito de cuenta. El icono del
navbar solo aparece para clientes autenticados; Admin no compra desde ese
chrome. El cambio de cuenta o logout no debe mostrar a otra persona las lÃ­neas
anteriores. Esto es persistencia local, no sincronizaciÃ³n entre dispositivos ni
un pedido real.

### Admin
Login â†’ Dashboard â†’ bandeja â†’ detalle â†’ acciÃ³n â†’ actividad.

**Pedidos:** Dashboard â†’ `/admin/pedidos` â†’ filtro por grupo/etapa o bÃºsqueda â†’
`/admin/pedidos/:id`. La ficha relaciona cliente, piezas (`orderItems`), estado,
fechas y montos de origen. En este slice es de consulta: no permite mutar el
estado ni marca pagos. Las etapas futuras requieren confirmar la transiciÃ³n y
actor antes de sumar acciones.

**Actividad:** `/admin/actividad` muestra eventos guardados en `activityLog`; el
detalle de solicitud puede abrir el historial filtrado con `?solicitud=<id>`.

**CatÃ¡logo:** `/admin/catalogo` lista modelos de `products` enriquecidos con la
categorÃ­a, con bÃºsqueda y filtros por publicaciÃ³n/material. El formulario de
producto permite subir hasta seis fotos comprimidas, elegir la portada y ordenar
la galerÃ­a; la primera imagen es la que se muestra en listas y fichas. TambiÃ©n
conserva la biblioteca local del taller como fuente alternativa. Cada fila abre
`/admin/catalogo/:id`, desde donde se edita el modelo. `/admin/catalogo/nuevo`
crea, `/admin/catalogo/:id/editar` actualiza y `/admin/catalogo/categorias`
gestiona las categorÃ­as. `ACTIVE` publica y `INACTIVE` oculta; un modelo ligado
a pedido se oculta, no se borra. La galerÃ­a vive en el `db.json` acadÃ©mico y no
es almacenamiento de producciÃ³n. El material
fuera de ASA/PLA/PETG/ABS/TPU se seÃ±ala para revisiÃ³n.

**Slice actual de solicitudes:** `/admin` ofrece acceso directo al KPI de
solicitudes que requieren atenciÃ³n (`/admin/solicitudes?fase=workshop`). La
bandeja admite filtros de etapa/bÃºsqueda y cada fila lleva a
`/admin/solicitudes/:id`. En una solicitud `PENDING_QUOTE`, Admin puede iniciar
revisiÃ³n tÃ©cnica; el mismo comando cambia a `IN_REVIEW` y registra actor/fecha en
`activityLog`. Estado desactualizado o rol invÃ¡lido se rechazan. El intake guarda
metadatos en JSON Server y bytes fuera de `db.json`; Admin autorizado puede
consultarlos desde el almacenamiento privado local. El
registro `SUBMITTED` y estados desconocidos se revisan aparte sin recodificarlos.

En `IN_REVIEW`, el operador prepara y guarda el costeo/cotizaciÃ³n. En `QUOTED`,
Admin muestra el correo del cliente y el correo del administrador autenticado, y
ofrece **Enviar al cliente y copiarme**. Un Ãºnico correo va al cliente y lleva
copia oculta al taller; un envÃ­o confirmado por n8n cambia el estado a
`AWAITING_APPROVAL` y registra la entrega en actividad. Si no hay proveedor,
fallan las direcciones o n8n no confirma, la cotizaciÃ³n permanece `QUOTED` y la
interfaz explica el motivo. Las direcciones de ejemplo no se aceptan como reales.
En la interfaz se identifican como **Estado no reconocido**; la explicaciÃ³n
indica que el origen lo conserva, que no pertenece a las etapas vigentes y que
queda separado de sus mÃ©tricas.

### Entrada a cuenta segÃºn rol

- Invitado: `Navbar â†’ Mi cuenta â†’ /login`.
- Cliente autenticado: `Navbar â†’ Mi cuenta â†’ /cuenta`.
- Admin autenticado: `Navbar â†’ Panel de administraciÃ³n â†’ /admin`.
- Si un visitante llega a una ruta protegida, el guard conserva la ruta de origen en el estado de navegaciÃ³n; tras el login vuelve a esa ruta. Sin ruta de origen, el admin entra a `/admin` y el cliente a `/cuenta`.
- Logout del menÃº pÃºblico o del shell Admin limpia la sesiÃ³n y devuelve a Home. La ruta `/admin/*` sigue protegida por rol.

## Estados globales

Toda pantalla dependiente de datos contempla:
- loading;
- success;
- empty;
- error;
- validation;
- processing;
- disabled;
- focus;
- reduced motion.

## Upload

Idle, drag-over, processing, success, invalid format, oversized, error, remove/replace.

## Checkout

Producto: Datos â†’ Entrega â†’ RevisiÃ³n â†’ ConfirmaciÃ³n.

Solicitud: Datos â†’ Entrega â†’ RevisiÃ³n â†’ Enviar solicitud.

La solicitud no muestra CTA de pago hasta tener cotizaciÃ³n aprobada.

## Ayuda accesible

El producto tendrÃ¡ un mecanismo de ayuda consistente. Puede ofrecer explicaciÃ³n escrita, instrucciones visuales, alternativas textuales para multimedia y contacto humano.

WCAG 2.2 incorpora Consistent Help (3.2.6) y requisitos sobre texto alternativo, contraste y uso de color. 

## Responsive

375px mÃ³vil, 768px tablet, 1280px+ desktop.

Requisito de la Home en mÃ³vil (auditorÃ­a visual 2026-09-29, V-02 en `docs/05`): en 375 px el producto debe verse en la primera pantalla; la composiciÃ³n mÃ³vil se reinterpreta, no apila la de desktop.

Mobile/tablet se mockupearÃ¡n despuÃ©s de cerrar desktop, pero la estructura debe soportarlos desde el inicio.

## Regla

La interfaz nunca representa una capacidad tÃ©cnica que backend/datos no puedan sostener.


## Navbar y footer: regla global

### Navbar pÃºblico

HF-01 congelado define el lenguaje visual del navbar pÃºblico. Stitch informa Ãºnicamente el inventario funcional, rutas y contenido; no define estilo, geometrÃ­a ni chrome. No se reemplaza por otro concepto visual durante esta fase. Solo se permiten ajustes de:
- labels y rutas reales;
- estado autenticado/no autenticado;
- acceso a cuenta/carrito;
- accesibilidad, foco y teclado;
- Dark/Light;
- pequeÃ±os refinamientos de spacing, iconografÃ­a o responsive.

En HF-01 se conserva un Ãºnico disparador de tres barras y no se muestra un botÃ³n de persona separado. El usuario rechazÃ³ el panel desplegable actual y pidiÃ³ quitarlo; hasta que se defina su siguiente comportamiento, no tratar el contenido actual del panel como aprobado. El navbar central conserva `Inicio`, `Tienda`, `Sobre nosotros` y `ContÃ¡ctenos` hasta el breakpoint responsive de `820px`.

No se debe reconstruir el navbar desde cero salvo que una prueba real de usabilidad demuestre un problema.

### NavegaciÃ³n administrativa

Los dashboards y pantallas `/admin/*` usan navegaciÃ³n administrativa propia y orientada a tareas. No necesitan copiar el navbar comercial del cliente ni sus CTAs de compra.

### Footer pÃºblico

El **footer completo de marca** aplica a pÃ¡ginas pÃºblicas/cliente donde la navegaciÃ³n comercial y el contenido institucional tienen sentido: Home, CatÃ¡logo, Producto, Solicitud, FAQ, About, Contacto y pÃ¡ginas pÃºblicas equivalentes.

### PÃ¡gina de Contacto (`/contacto`) â€” Canales directos del taller y enrutamiento lÃ³gico (2026-10-06)

La pÃ¡gina de contacto no es un formulario genÃ©rico desvinculado del taller; centraliza la comunicaciÃ³n operativa y el enrutamiento segÃºn la etapa del proyecto:
1. **Canales directos del taller:**
   - **WhatsApp del Taller (Demo +506 8888-8888):** Enlace directo `wa.me` para consultas rÃ¡pidas de viabilidad tÃ©cnica, fotos de piezas y orientaciÃ³n Ã¡gil.
   - **TelÃ©fono de Taller (Demo +506 2550-0000):** Llamada directa (`tel:`) para coordinaciÃ³n tÃ©cnica urgente o retiro de piezas terminadas.
   - **Correo institucional (`taller@verticecr.com`):** Enlace `mailto:` para el envÃ­o de planos, compras corporativas o requerimientos formales.
   - **UbicaciÃ³n y Horario:** Taller en Cartago / San JosÃ©, Costa Rica; Lunes a Viernes 8:00 AM â€“ 6:00 PM y SÃ¡bados 9:00 AM â€“ 1:00 PM.
2. **Formulario de contacto directo:**
   - Permite enviar mensajes clasificados por motivo (materiales/tolerancias, estado de pedido/cotizaciÃ³n, manufactura por volumen u otra consulta).
   - Incluye validaciÃ³n de campos obligatorios (nombre, correo y mensaje) y mensaje de confirmaciÃ³n accesible (modo DEMO).
3. **Puntos de partida (enrutamiento de intake):**
   - Â«Ya tengo el modeloÂ» dirige a `/solicitud/archivo`.
   - Â«Quiero darle formaÂ» dirige a `/solicitud/ayuda-diseno`.
   - Â«SeguimientoÂ» dirige al espacio de cuenta del cliente (`/cuenta`) o login.
4. **Asistencia y preguntas frecuentes:**
   - Disparador directo del asistente general (`openGeneralAssistant`).
   - Respuestas sobre envÃ­os nacionales (Correos de Costa Rica / mensajerÃ­a GAM), retiros en taller, cotizaciones y revisiÃ³n de archivos.


### Footer en dashboards

El footer comercial completo **no es obligatorio en dashboards**. En `/admin/*` la prioridad es densidad informativa, operaciones y foco; puede existir un footer tÃ©cnico compacto (versiÃ³n, soporte, privacidad, accesibilidad) o no existir cuando la interfaz no lo necesite.

En `/cuenta` y pantallas autenticadas orientadas al cliente puede usarse un footer compacto si no interfiere con pedidos, cotizaciones y acciones principales.

### Regla de los mockups

Que los mockups de Stitch/UXMagic muestren footer en todas las pantallas **no obliga a implementarlo literalmente en todas las rutas**. El mockup es referencia visual; la implementaciÃ³n respeta el contexto de cada Ã¡rea.

### Clave de consistencia

El usuario debe sentir que pÃºblico, cuenta y admin pertenecen a VÃ©rtice CR mediante:
- misma identidad Obsidian + Lava;
- mismos tokens y estados;
- tipografÃ­a coherente;
- componentes compartidos;
- navegaciÃ³n especÃ­fica por contexto.

La consistencia no significa que todas las Ã¡reas tengan exactamente la misma densidad ni el mismo chrome.


## HF-08 Checkout â€” propuesta histÃ³rica, reemplazada (2026-09-24)

El diseÃ±o de formularios separados de datos/entrega/SINPE descrito a
continuaciÃ³n no corresponde al MVP vigente. El flujo actual usa pago DEMO
directo y recibo; se conserva este tÃ­tulo como referencia de diseÃ±o anterior.

### Checkout de productos

`/carrito â†’ /checkout/productos â†’ Datos â†’ Entrega â†’ Pago â†’ RevisiÃ³n â†’ ConfirmaciÃ³n â†’ /pedidos/:id`

### Checkout de cotizaciÃ³n

`/carrito â†’ /checkout/solicitud â†’ Resumen tÃ©cnico â†’ Datos â†’ Entrega â†’ Pago â†’ RevisiÃ³n â†’ ConfirmaciÃ³n â†’ /pedidos/:id`

### Regla visual

Los recorridos mantienen contexto visual explÃ­cito sobre catÃ¡logo o cotizaciÃ³n,
pero no muestran un formulario de facturaciÃ³n, entrega o SINPE.

### Navbar/footer

Mantener el navbar pÃºblico derivado de HF-01 con ajustes mÃ­nimos. En checkout puede simplificarse Ãºnicamente si mejora el foco sin perder navegaciÃ³n, identidad o accesibilidad. Footer comercial completo no es necesario; puede usarse uno tÃ©cnico compacto. Stitch solo orienta estructura y contenido.

### Estados de pago anteriores

- idle;
- form invalid;
- processing;
- esperando comprobante;
- comprobante recibido;
- validando;
- pago confirmado;
- error;
- cotizaciÃ³n caducada/no disponible.

### Mobile posterior

375px: bloques del checkout en secuencia vertical, resumen colapsable/sticky y CTA accesible.

768px: una columna principal con resumen debajo o panel colapsable.

## AuditorÃ­a de experiencia de compra â€” 2026-10-01

### Hallazgo de estado actual

La Home separa modelos de catÃ¡logo fabricados bajo pedido de piezas propias que requieren revisiÃ³n y cotizaciÃ³n. El catÃ¡logo pÃºblico, ficha y carrito ya tienen una base funcional para explorar modelos, seleccionar color/cantidad y conservar la selecciÃ³n local; checkout aÃºn no estÃ¡ conectado. El flujo de solicitud personalizada, cuenta y pedidos del cliente conserva pÃ¡ginas pendientes. En Admin existen dashboard, solicitudes con preparaciÃ³n/publicaciÃ³n de cotizaciÃ³n, actividad, lectura de pedidos, CRUD de catÃ¡logo/categorÃ­as y lectura de clientes con historial asociado. Los datos acadÃ©micos y el token simulado no son controles de seguridad de producciÃ³n. Login y registro tienen pÃ¡ginas propias.

### Recorrido recomendado

1. **Home:** ofrecer dos decisiones inequÃ­vocas: explorar modelos fabricados bajo pedido o enviar un archivo propio para revisiÃ³n. Explicar que los modelos no son de entrega inmediata.
2. **CatÃ¡logo:** permitir explorar por uso/tipo de pieza y filtrar por materiales confirmados â€”ASA, PLA, PETG, ABS y TPUâ€” y FDM. No mostrar inventario, â€œdisponibleâ€ ni entrega inmediata.
3. **Ficha:** priorizar fotos reales cuando existan, uso previsto, material y variantes confirmadas; mostrar precio de catÃ¡logo solo si el contrato de datos lo respalda. La ruta personalizada explica revisiÃ³n y cotizaciÃ³n, sin presentar precio final.
4. **Carrito y encargo de catÃ¡logo:** conservar producto/color/cantidad y resumen editable. â€œConfirmar encargoâ€ registra un pedido `PENDING` con precios recalculados por servidor y lleva a `/cuenta`; no es pago ni confirma envÃ­o, stock o fecha. Esas condiciones siguen pendientes hasta que el taller las confirme.
5. **Solicitud personalizada:** explicar requisitos antes de cargar; dar feedback de formato/progreso/error y permitir revisar lo enviado. Confirmar recepciÃ³n y siguiente paso. `PENDING_QUOTE` no muestra precio final ni CTA de pago.
6. **DespuÃ©s del envÃ­o/encargo:** confirmar quÃ© ocurriÃ³ y cuÃ¡l es el paso siguiente; dar acceso al estado del pedido/cotizaciÃ³n y ayuda humana. El encargo de catÃ¡logo aÃºn no tiene pago, entrega ni fecha confirmados.

La incertidumbre se resuelve con estados vacÃ­os, errores y una explicaciÃ³n clara, no con informaciÃ³n ficticia. Fuente de checkout: [Baymard, costos de envÃ­o en pÃ¡ginas de producto](https://baymard.com/research-articles/show-shipping-costs-on-product-pages). PatrÃ³n: aclarar temprano los costos que determinan el total; adaptaciÃ³n: VÃ©rtice los mostrarÃ¡ antes del checkout solo cuando tenga condiciones confirmadas.

### DecisiÃ³n del cliente sobre una cotizaciÃ³n â€” C-P5 (2026-10-04)

En `/cuenta`, `AWAITING_APPROVAL` muestra monto, vigencia, notas y desglose de
la versiÃ³n enviada. El cliente puede aprobar (solo si sigue vigente), o elegir
â€œSolicitar cambiosâ€/â€œRechazarâ€ con motivo obligatorio. La cuenta propia y la
versiÃ³n son validadas por el servidor; la respuesta no se ejecuta desde el email.

### Encargo desde el carrito â€” C-P4 (2026-10-04)

La pÃ¡gina y el acceso del navbar requieren una cuenta `customer`; visitantes son
llevados a login/registro y vuelven a la ficha del producto. El CTA aparece
cuando las lÃ­neas son vÃ¡lidas. El servidor recalcula el subtotal y registra
pago DEMO; el Ã©xito limpia el carrito y navega al recibo. Si el API falla, el
carrito se conserva para corregir o reintentar. El recibo explica que no hubo
cobro real y que entrega/impuestos siguen por coordinar.

### TipografÃ­a de chrome global

La auditorÃ­a del instructor encontrÃ³ textos ilegibles por defecto, en especial navbar y footer. El shell React sube navegaciÃ³n pÃºblica a 14 px en escritorio y 13 px en tablet; copy/enlaces del footer a 14 px y tÃ­tulos/metadata secundaria a 12 px. Revisar a escala 100% y 150/200%, ademÃ¡s de conservar las explicaciones en lenguaje natural y no reemplazarlas por etiquetas tÃ©cnicas pequeÃ±as. En viewport estrecho deben conservarse idioma y menÃº para cualquier visitante; el acceso al carrito solo aparece con sesiÃ³n customer. El buscador puede vivir en el menÃº cuando no quepa como control de primer nivel.

**ActualizaciÃ³n R-H46 (2026-10-01; supersedida en R-H48):** navbar/CTA a 16/15 px, footer a 16 px y colapso de navegaciÃ³n a 1000 px se revirtieron cuando el usuario aclarÃ³ que la captura se observÃ³ con zoom al 75%. Se restaura la primera iteraciÃ³n R-H45: navbar 14/13 px, CTA 13/12 px, idioma 12 px, footer 14 px con secundarios a 12 px y menÃº a partir de 820 px. La revisiÃ³n de otros breakpoints y escalas sigue pendiente.

## Solicitud/cotizaciÃ³n DEMO y asistentes por contexto (2026-10-02)

`/solicitud` deja a cualquier visitante calcular una estimaciÃ³n desde un perfil
anÃ¡logo. La cuenta customer la puede guardar, consultar en `/cuenta` y aprobar
por versiÃ³n vigente. Admin tambiÃ©n puede generar la simulaciÃ³n y enviarla al
cliente con copia al taller; solo respuesta Gmail confirmada registra envÃ­o.
Errores y direcciones no entregables no se presentan como Ã©xito.

TP vive en el shell pÃºblico; el asistente operativo aparece en Admin, y la
orientaciÃ³n de cotizaciÃ³n en `/solicitud`. Cada uno usa prompt y herramientas
permitidas del backend. No se mezclan cuentas, no se autoriza al modelo a cambiar
estados y el monto sale del motor reproducible.

La conexiÃ³n tÃ©cnica mantiene esos tres puntos de entrada: el botÃ³n flotante
pÃºblico manda `mode: general`, Admin muestra su botÃ³n solo dentro de la ruta
protegida y manda `mode: admin`, y el botÃ³n de `/solicitud` manda `mode: quote`.
Cada webhook llega a su propio AI Agent nativo en n8n, con prompt y herramienta
HTTP aislados. Comparten OpenRouter como proveedor, no la identidad ni las
herramientas disponibles. La selecciÃ³n vigente del usuario excluye DeepSeek.

## CorrecciÃ³n de recorridos y referencias â€” 2026-10-02

Las cuatro anotaciones del usuario se aplican como reglas de recorrido: /solicitud solo elige intenciÃ³n; /archivo tiene requisitos y comunica recepciÃ³n pendiente sin mezclar un estimador de otra pieza; /ayuda-diseno integra la conversaciÃ³n en la pÃ¡gina, sin modal. La simulaciÃ³n opcional tiene referencias visuales buscables y ninguna preseleccionada. Admin comparte ese selector. Home enlaza directamente al camino de archivo y no promete una carga disponible. No sustituir una funciÃ³n ausente por un enlace a Contacto, que sigue en construcciÃ³n. Pendiente: recepciÃ³n/mediciÃ³n del archivo y envÃ­o transaccional del brief a Admin.

## CotizaciÃ³n como preparaciÃ³n de solicitud â€” 2026-10-03

El flujo actual ofrece dos caminos: enviar modelo/fotos/referencias o describir
una idea con ayuda del asistente. En el segundo, el chat vive dentro de la ruta y
completa un formulario de revisiÃ³n; no comparte el drawer del asistente general,
no estima precio y no envÃ­a hasta que el cliente confirme el resumen. Un mismo
formulario permite adjuntar imÃ¡genes y STL/OBJ, dar dimensiones/unidades,
material/cantidad/uso, pedir diseÃ±o y agregar referencia HTTPS. La solicitud
recibida queda identificada como pendiente de cotizaciÃ³n.

El asistente Admin es una pantalla completa bajo `/admin/asistente`, no una
ventana flotante ni el bot de Home. Es de consulta/orientaciÃ³n y no ejecuta
mutaciones. Si el backend devuelve `ROLE_REQUIRED`, la UI lo explica, ofrece
volver a iniciar sesiÃ³n y conserva la guarda: el diseÃ±o no oculta ni resuelve
por sÃ­ mismo un rechazo de sesiÃ³n.

Cuando la ayuda de cotizaciÃ³n recibe un `requestDraft`, muestra Â«Revisar el
resumen y adjuntar referenciasÂ». El control desplaza y enfoca el tÃ­tulo del
formulario para que el cliente llegue directamente a editar la ficha, subir
imÃ¡genes/modelos y enviar; respeta movimiento reducido.

La orden explÃ­cita de preparar/enviar detiene las preguntas opcionales. â€œTamaÃ±o
promedioâ€ permanece como aproximaciÃ³n textual, y â€œlargo 15, ancho 3â€ conserva
ambos ejes exactamente como fueron declarados; el asistente no lo convierte en
diÃ¡metro ni interpola lÃ­mites. Si la conversaciÃ³n devuelve un lÃ­mite de
iteraciones de n8n, la UI debe anunciar fallo recuperable y mantener el resumen,
no presentar el texto tÃ©cnico como respuesta normal.

### R-H72 â€” MensajerÃ­a e intake de cotizaciÃ³n â€” 2026-10-03

Una intenciÃ³n antigua de preparar no debe interceptar una pregunta nueva. La
misma intenciÃ³n sÃ­ permite que el siguiente mensaje sin interrogaciÃ³n y con
detalles estructurados complete el borrador. La respuesta confirma que no se
enviÃ³ nada. Las respuestas del asistente presentan pÃ¡rrafos, Ã©nfasis y listas
como contenido legible, no como asteriscos Markdown literales.

El camino Admin es `/admin/asistente`, una pÃ¡gina con composiciÃ³n, navegaciÃ³n y
alcance propios, fuera de `PublicLayout` y del widget flotante. Ante
`ROLE_REQUIRED` permanece en esa superficie, explica el rechazo y solo cierra
sesiÃ³n si el operador elige volver a autenticarse; no elimina la protecciÃ³n por
rol. El CatÃ¡logo Admin ofrece Â«Cotizar DEMOÂ» en cada ficha y lleva al calculador
de esa pieza. Sigue siendo una sugerencia local: no mide imÃ¡genes ni cambia un
precio publicado por sÃ­ sola. La validaciÃ³n estÃ¡tica y los tests pasaron; la
inspecciÃ³n visual del copiloto requiere una sesiÃ³n Admin en el mismo origen.

### ReauditorÃ­a R-H89 â€” decisiÃ³n de cotizaciÃ³n y checkout â€” 2026-10-06

En `/cuenta`, `QUOTED` significa que Admin guardÃ³ el importe pero aÃºn no lo
entregÃ³ al cliente. La vista lo etiqueta **Lista para enviar** y explica que la
persona no puede aprobar ni pagar hasta que el correo se entregue y el estado
pase a `AWAITING_APPROVAL`. La acciÃ³n de decisiÃ³n solo aparece en ese Ãºltimo
estado.

En `/carrito?orderId=...`, el resumen muestra los conceptos financieros que el
pedido realmente registra (piezas, entrega, descuento, impuestos) antes de
abrir PayPal o recibir un comprobante SINPE. Si entrega/impuestos faltan, el
monto se llama **Importe registrado** y se advierte que no los incluye ni los
considera gratuitos. El precio cotizado de una pieza personalizada sigue
separado de la decisiÃ³n de aprobaciÃ³n: solo una solicitud aprobada crea el
pedido pendiente que se paga desde este checkout. El comprobante SINPE requiere
referencia, telÃ©fono e imagen, y espera revisiÃ³n del taller; PayPal Sandbox no
se iniciÃ³ en esta pasada.

La entrada `/solicitud` separa dos necesidades: enviar un modelo/referencia o
conversar para definir una idea. `/solicitud/archivo` permite dejar medidas y
material sin definir; las referencias se envÃ­an al taller y la pantalla
advierte que no genera precio automÃ¡tico. No se completaron ni adjuntaron datos
en esta inspecciÃ³n.

Las variantes elegidas por una persona visitante (producto, color y cantidad)
se transportan al login/registro y vuelven a la ficha para que el cliente
confirme Â«Agregar al carritoÂ»; no se agrega ni se crea un pedido antes de esa
confirmaciÃ³n. El test de integraciÃ³n cubre el retorno autenticado simulado, pero
no se usaron credenciales en el navegador.

En pedidos antiguos sin metadatos de pago, la Cuenta no debe inventar un pago ni
mostrar una segunda acciÃ³n de cobro. Se informa **Pago sin conciliar / Historial
de pago incompleto** y se deriva a soporte; un pedido que sÃ­ tiene entrega e
importe registrado mantiene su estado de taller independiente del pago.

Evidencia limitada a navegador local Dark escritorio 1265Ã—704 en R-H89 y tests
Jest. No se iniciÃ³ PayPal, no se enviÃ³ SINPE, correo ni solicitud; tampoco se
verificaron las vistas Light y 375/768 px, el retorno real de login, el correo
posterior al pago ni las pantallas Admin autenticadas. `/solicitud/ayuda-diseno`
confirma que las referencias llegan al taller pero no se entregan al modelo de
IA: anÃ¡lisis visual de imÃ¡genes y mediciÃ³n de STL/OBJ siguen pendientes, no son
capacidades que deba prometer la interfaz.

