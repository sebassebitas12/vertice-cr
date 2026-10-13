# VÃ©rtice CR â€” Negocio, entidades y estados

> Ãšltima actualizaciÃ³n: **2026-10-06**.

> **Flujo vigente del MVP:** simulaciÃ³n acadÃ©mica con persistencia en JSON
> Server; no hay cobros reales. Las secciones antiguas de SINPE que contradigan
> el estado `DEMO` descrito aquÃ­ son historial de diseÃ±o reemplazado.

## Estado del catÃ¡logo de presentaciÃ³n (2026-10-05)

La semilla de presentaciÃ³n local conserva 25 fichas `ACTIVE` y sus imÃ¡genes;
`ACTIVE` significa visible en la demo, no que haya inventario, un producto
fabricado ni capacidad de entrega confirmada. Los precios de los 25 se marcan
`priceSource: 'DEMO'`: los seis registros iniciales no tienen fuente comercial
trazable y llevan `priceConfirmation: null`; p7â€“p25 conservan la procedencia de
benchmark ya guardada. NingÃºn monto de esta semilla debe presentarse como tarifa
vigente del taller.

En p7â€“p25, `aiProductionEstimate.source: 'DEMO'` y
`verifiedWithSlicer: false` identifican estimaciones analÃ³gicas sin laminar. En
p1â€“p6, `weightGrams` y `estimatedProductionHours` son valores heredados sin
evidencia de laminado asociada. Los campos heredados `stock` y `minStock` no son
inventario operativo y se ignoran para visibilidad y compra.

Las imÃ¡genes son referencias visuales de las fichas, no prueba fotogrÃ¡fica de
una pieza fabricada ni verificaciÃ³n de geometrÃ­a, escala, resistencia o
imprimibilidad. La tienda identifica las imÃ¡genes como ilustrativas y precios
como referenciales; el checkout DEMO permite recorrer el proceso, no cobra ni
promete fabricaciÃ³n o entrega. La diferencia intencional de la base local de
casa frente a la semilla remota estÃ¡ en `products`; no se llevan
pedidos/solicitudes/runtime a este seed.

Las descripciones basadas Ãºnicamente en imagen expresan una intenciÃ³n de
prototipo, no una garantÃ­a de compatibilidad o desempeÃ±o. En especial, p12 no
estÃ¡ certificado para contacto alimentario, p13 no es un dispositivo mÃ©dico,
p24 no estÃ¡ validado para vuelo y las escalas de p21/p25 no estÃ¡n verificadas.

El asistente de solicitud recibe texto, no imÃ¡genes/STL/OBJ. Los adjuntos se
guardan con la solicitud y quedan para revisiÃ³n del Admin; el modelo no los
analiza ni mide en el flujo actual.

## Entidades

### Pago del pedido â€” flujo vigente (2026-10-05)

El carrito crea un pedido propio `PENDING`/`UNPAID` y abre el checkout en
`/carrito?orderId=...`; crear el pedido no significa haber pagado ni reservado
producciÃ³n. Solo el cliente propietario puede continuar. La pantalla ofrece tres
modalidades de pago mutuamente excluyentes:

- **PayPal Sandbox:** el servidor crea y captura la orden contra el entorno de
  pruebas de PayPal. Antes de salir se muestra el total CRC, equivalente USD,
  tasa y fecha de actualizaciÃ³n. Una captura completada se valida contra monto y
  moneda esperados; entonces el pedido pasa a `CONFIRMED`/`PAID` con evidencia
  Sandbox. Usa fondos de prueba: no es un cobro real.
- **Tarjeta por PayPal Sandbox:** usa los botones alojados por el SDK oficial y
  solo aparece como alternativa operativa si PayPal informa que la cuenta de
  prueba es elegible. VÃ©rtice no solicita ni almacena el nÃºmero/CVV; si no es
  elegible, se explica y quedan PayPal/SINPE como opciones.
- **SINPE MÃ³vil informado por el cliente:** se solicitan referencia, telÃ©fono,
  imagen del comprobante y nota opcional. Esto no consulta BAC ni demuestra una
  transferencia. El taller debe revisar y confirmar manualmente para marcar
  `PAID`; si lo rechaza, el pedido sigue `PENDING` y el cliente puede corregir.

No se permite combinar/alternar mÃ©todos una vez iniciada una modalidad o enviado
un comprobante. Errores de proveedor o discrepancias de monto no muestran un
  recibo de Ã©xito ni duplican captura. Las cotizaciones siguen un flujo distinto:
Admin envÃ­a la oferta, el cliente la aprueba en la app y solo entonces se crea
el pedido pendiente; el pago se completa en el carrito, no al aprobar ni desde
el detalle de pedido. La vigencia y versiÃ³n aprobada se vuelven a validar.

Las dos confirmaciones crean un outbox de recibo en la misma persistencia del
pago y lo despachan despuÃ©s, sin mantener bloqueada la cola de operaciones.
Un acuse vÃ¡lido registra `SENT` y `messageId`; fallos inciertos quedan `UNKNOWN`
y no se reintentan automÃ¡ticamente. El pago permanece registrado aunque falle
el correo. La integraciÃ³n estÃ¡ probada con HTTP/Gmail mock, no entrega real.
Admin envÃ­a la fecha del comprobante abierto: evidencia reemplazada devuelve
`PAYMENT_PROOF_OUTDATED`, sin cobrar ni enviar. El correo de oferta
mantiene su rama separada en Gmail/n8n; la publicaciÃ³n local del export tampoco
prueba por sÃ­ sola la instancia activa. No guardar secretos PayPal ni de Header
Auth en frontend/repositorio.

### PreservaciÃ³n de solicitud personalizada durante autenticaciÃ³n (E01, 2026-10-04)

El formulario de solicitud personalizada (`/solicitud`) guarda de forma reactiva el borrador en almacenamiento de sesiÃ³n/local (`vertice.quote.draft`), incluyendo campos manuales, interpretaciones del asistente y nombres de archivos seleccionados. Si un visitante no autenticado redacta su solicitud y navega a `/login` o `/registro`, el estado `from` preserva la ruta con retorno transparente; al volver, el formulario restaura Ã­ntegramente los campos y despliega un aviso informativo que aclara que, por polÃ­ticas de seguridad del navegador, los archivos binarios adjuntos deben seleccionarse nuevamente antes del envÃ­o.

### ReseÃ±as y revisiÃ³n de ofertas (2026-10-04)

Customer activo puede reseÃ±ar un producto existente: rating entero 1â€“5,
tÃ­tulo 1â€“100 y comentario 10â€“2000 caracteres tras recortar espacios.
No exige compra verificada ni promete moderaciÃ³n. AutorÃ­a: nombre de la cuenta.
Admin atiende CHANGES_REQUESTED en la bandeja del taller, ve el motivo y guarda
una nueva oferta QUOTED con quoteVersion incrementada. quoteHistory conserva
las ofertas reemplazadas y el motivo. Solo el envÃ­o confirmado por el proveedor
vuelve a AWAITING_APPROVAL; guardar no envÃ­a ni aprueba.

users, products, categories, orders, orderItems, customPrintRequests, reviews, coupons, notifications, activityLog, settings.

## Solicitud personalizada

NO es un producto de catÃ¡logo.

Ciclo:
~~~text
PENDING_QUOTE â†’ IN_REVIEW â†’ QUOTED â†’ AWAITING_APPROVAL â†’ APPROVED â†’ PAID
                                             â”œâ†’ CHANGES_REQUESTED
                                             â””â†’ REJECTED
~~~

Salidas: REJECTED, EXPIRED, CANCELLED.

Reglas:
- PENDING_QUOTE no tiene precio final.
- Solo `role: admin` puede iniciar `PENDING_QUOTE â†’ IN_REVIEW`; el cambio y el evento con actor/fecha se registran juntos en `activityLog`.
- El rango de IA es orientativo.
- En el MVP actual, solo el admin emite la cotizaciÃ³n final. Meta de producto indicada por el usuario: automatizar los casos FDM estÃ¡ndar y dejar intervenciÃ³n del taller para excepciones; ver condiciones y datos pendientes en `docs/07`. Esta meta no cambia el flujo operativo hasta implementar y validar el motor.
- Solo una cotizaciÃ³n aprobada puede pagarse.
- El cliente solo puede decidir una cotizaciÃ³n propia cuando la solicitud estÃ¡ `AWAITING_APPROVAL` y la versiÃ³n coincide con la oferta enviada. Aprobar exige vigencia activa; pedir cambios o rechazar exige un motivo breve y registra actor, motivo, fecha y transiciÃ³n en `activityLog`.
- `CHANGES_REQUESTED` requiere una nueva revisiÃ³n del taller. No crea un pedido ni aprueba la versiÃ³n anterior; Admin debe emitir y enviar una oferta nueva para volver a `AWAITING_APPROVAL`.
- El pedido pagado conserva requestId.
- Solicitud y pedido son entidades relacionadas, no la misma entidad.

## Producto

Campos mÃ­nimos: id, name, slug, description, categoryId, images, price, currency, material, availableColors, dimensions, weightGrams, estimatedProductionHours, status, featured, createdAt, updatedAt.

### FabricaciÃ³n de catÃ¡logo

- `material` usa uno de los filamentos disponibles: `ASA`, `PLA`, `PETG`, `ABS`, `TPU`.
- El proceso de producciÃ³n vigente es `FDM`; no anunciar ni asignar `SLA` en fichas o UI.
- Los productos del catÃ¡logo se fabrican despuÃ©s de recibir el pedido; no se ofrecen como productos de entrega inmediata.
- No mostrar en el storefront etiquetas ni cantidades que indiquen existencias, disponibilidad inmediata o falta de existencias.
- `status` controla la publicaciÃ³n del producto en el catÃ¡logo; no representa disponibilidad fÃ­sica.
- Los campos heredados `stock` y `minStock` que aÃºn aparezcan en datos demo no son fuente vÃ¡lida de disponibilidad y no deben determinar visibilidad, compra ni mensajes al cliente. Su eliminaciÃ³n del contrato/dataset requiere una migraciÃ³n explÃ­cita.

La bandeja Admin del catÃ¡logo consulta modelos y categorÃ­as y permite buscar y
filtrar por los valores de publicaciÃ³n/material presentes en el origen. CRUD de
catÃ¡logo: Admin puede crear/editar productos y categorÃ­as; los productos usan
`ACTIVE` (publicado), `INACTIVE` (oculto con ficha completa) y `DRAFT`
(incompleto y no visible en la tienda) como estados de publicaciÃ³n, nunca
disponibilidad. Un borrador puede tener `price: null` y `material: null`; no se
puede publicar hasta confirmar nombre, categorÃ­a, precio no negativo y un
filamento FDM vigente. PATCH modifica solo campos autorizados y no escribe campos de
inventario heredados. `images` existentes se conservan al editar y producto
nuevo inicia con `images: []`; carga/cambio de imÃ¡genes queda fuera hasta definir
almacenamiento. Una categorÃ­a no se elimina si tiene modelos asociados. Un
producto no se elimina definitivamente si aparece en `orderItems`; en ese caso
se oculta para conservar el historial. No se aplica cascada.

La capacidad vigente admite FDM con ASA, PLA, PETG, ABS y TPU. Si un registro
existente tiene otro material, Admin lo seÃ±ala para revisiÃ³n sin cambiarlo ni
ocultarlo silenciosamente.

Reglas:
- `price >= 0` para cualquier producto publicado; `null` solo se admite en `DRAFT`.
- el precio publicado corresponde al modelo de catÃ¡logo y no implica existencia fÃ­sica previa al pedido.

## Carrito hÃ­brido

Producto:
~~~text
quantity Ã— unitPrice = subtotal
~~~

Solicitud personalizada:
~~~text
subtotal = no definido mientras estÃ© PENDING_QUOTE
~~~

Resumen:
- Total de productos.
- Solicitudes pendientes.
- Total a pagar ahora.

Nunca representar una solicitud pendiente como â‚¡0 ni como cantidad Ã— precio.

## Pedidos

~~~text
PENDING â†’ CONFIRMED â†’ IN_PRODUCTION â†’ READY â†’ SHIPPED â†’ DELIVERED
~~~

Alternativos: CANCELLED, REJECTED.

Admin permite avanzar una etapa por vez con `expectedStatus` y `expectedUpdatedAt`:
`PENDING â†’ CONFIRMED â†’ IN_PRODUCTION â†’ READY â†’ SHIPPED â†’ DELIVERED`. Desde
`PENDING` o `CONFIRMED` se puede cerrar como `CANCELLED` o `REJECTED`, con motivo
obligatorio. Cada transiciÃ³n exige rol Admin, valida el estado/versionado y
registra `ORDER_STATUS_CHANGED` en `activityLog`. No se permite saltar etapas ni
alterar pedidos desde los asistentes. El total registrado sigue sin ser prueba
de pago; el modelo no tiene evidencia de cobro comercial automÃ¡ticamente
confirmada. Contrato tÃ©cnico en `docs/07`.

### Compra de productos de catÃ¡logo â€” C-P4 (2026-10-05)

`Pagar Â· DEMO` desde `/carrito` completa la compra simulada solo para una
sesiÃ³n `customer`. El servidor valida producto publicado, variante y cantidad,
ignora precios enviados por el navegador y recalcula cada precio unitario,
subtotal y subtotal CRC con el catÃ¡logo vigente. Guarda el snapshot tanto en
`orders[].orderItems` como en `orderItems`, registra `CATALOG_ORDER_CREATED` y
usa una clave idempotente para que reintentar no duplique pedido ni pago. Marca
`CONFIRMED`/`PAID` con `paymentMode: 'DEMO'`, registra el evento de compra, limpia
el carrito y lleva directamente a `/pedidos/:id`. No valida ni reserva stock;
`pricingScope: CATALOG_SUBTOTAL_ONLY` indica que entrega e impuestos no estÃ¡n
incluidos. El recibo lo aclara y el taller coordina esos detalles aparte.

## CotizaciÃ³n

La entrada del cliente distingue **pieza/archivo existente** de **ayuda para
crear una pieza**. El primer camino entrega el archivo y datos tÃ©cnicos al
taller; el segundo usa el chatbot para completar especificaciones. Ambos deben
crear/actualizar una solicitud `PENDING_QUOTE`, no saltar a precio final ni a
checkout. En este MVP Admin conserva la emisiÃ³n de la cotizaciÃ³n final; el bot
puede asistir, pero no decide ni envÃ­a un monto como oferta.

La calculadora de perfiles en `/solicitud` es una DEMO. No mide archivos ni debe
mandarse como cotizaciÃ³n final. `/solicitud/archivo` ya acepta referencias y
adjuntos con sesiÃ³n activa y confirmaciÃ³n, y crea `PENDING_QUOTE`; los bytes se
guardan en `.local-data` fuera de `db.json` con lectura autorizada. Esta soluciÃ³n
local no es almacenamiento de producciÃ³n. Cotizar automÃ¡ticamente un archivo
sigue requiriendo anÃ¡lisis/laminado verificable y costos calibrados. En la ruta
de ayuda de diseÃ±o, una acciÃ³n explÃ­cita de revisiÃ³n/envÃ­o crea el intake; la
conversaciÃ³n por sÃ­ sola no crea un encargo.

Conservar requestId, monto, moneda, vigencia, notas, tiempo estimado, fecha y admin emisor.
El Admin calcula el costo con datos tÃ©cnicos por pieza y tarifas vigentes introducidos
por una persona; el cliente ve el monto total y alcance, no una tarifa inventada ni
un rango de IA. Guardar entradas, desglose, fecha de revisiÃ³n de tarifas y versiÃ³n
de fÃ³rmula como snapshot de esa cotizaciÃ³n. Una actualizaciÃ³n de tarifas futura no
cambia una oferta ya guardada.

Para el primer cÃ¡lculo manual FDM: gramos y horas son por unidad; filamento y desgaste
se registran en USD/kg y se convierten a CRC con el tipo de cambio ingresado; la
electricidad se deriva de horas por pieza Ã— potencia media (kW) Ã— tarifa CRC/kWh;
postprocesado se escala por cantidad; diseÃ±o es por pedido; otros costos son un
monto por pedido. Un recargo explÃ­cito se aplica al
costo total y se distingue de margen bruto. El monto final se redondea a colones.
Costos no incluidos (por ejemplo impuestos, envÃ­o o comisiones) deben declararse en
condiciones o sumarse a â€œotros costosâ€; el cÃ¡lculo no los presume incluidos.

### EnvÃ­o de cotizaciÃ³n

Una cotizaciÃ³n guardada (`QUOTED`) se entrega desde Admin en un Ãºnico correo: el
cliente es `To` y la direcciÃ³n del administrador autenticado es `BCC` (el cliente
no ve la copia interna). Solo despuÃ©s de que el proveedor confirme la aceptaciÃ³n
del mensaje la solicitud avanza a `AWAITING_APPROVAL`; tambiÃ©n se guarda fecha,
destinatarios y evento `REQUEST_QUOTE_EMAIL_SENT`. Una direcciÃ³n incompleta o de
dominio reservado de ejemplo (`example.*`, `.test`, `.invalid`, `.localhost`)
bloquea el envÃ­o. Si el proveedor no estÃ¡ configurado/falla, la cotizaciÃ³n sigue
en `QUOTED` para poder corregir configuraciÃ³n y reintentar. El envÃ­o de correo no
calcula ni modifica el precio.

**DecisiÃ³n del usuario (2026-10-03):** el correo informa la cotizaciÃ³n y lleva al
cliente a su cuenta; no aprueba la oferta por responder o pulsar una acciÃ³n en el
email. La decisiÃ³n vinculante se registra dentro de la app en la cotizaciÃ³n
vigente. La aprobaciÃ³n debe confirmar al cliente y avisar al taller con una
instantÃ¡nea de la solicitud y la cotizaciÃ³n aceptada; mientras no exista pago
verificado, ese aviso no debe decir que el pedido estÃ¡ pagado ni que ya entrÃ³ a
producciÃ³n. Una vez exista un pedido, los cambios reales de etapa pueden generar
correos de avance al cliente. El aviso al taller y los correos de avance todavÃ­a
no estÃ¡n implementados. En C-P5, aprobaciÃ³n, rechazo y solicitud de cambios se
registran en `/cuenta`; el soporte de Admin para tomar/revisar solicitudes en
`CHANGES_REQUESTED` todavÃ­a requiere completar ese recorrido operativo.

## IA

Puede recomendar material, dimensiones, tiempo, rango indicativo y advertencias. Nunca autoriza el precio final.

Etiqueta obligatoria:
**ORIENTATIVO Â· SUJETO A VALIDACIÃ“N**

## Checkout

Productos: /checkout/productos.

Solicitud: /checkout/solicitud.

Una solicitud PENDING_QUOTE nunca llega al pago.


## HF-08 Checkout â€” reglas de negocio cerradas (2026-09-24)

El checkout no trata todos los elementos del carrito de la misma manera.

### Compra de productos de catÃ¡logo

Ruta conceptual: `/checkout/productos`

Puede contener:
- productos terminados;
- cantidad;
- precio unitario;
- subtotal;
- entrega;
- facturaciÃ³n;
- pago;
- confirmaciÃ³n.

El total es calculable porque son productos con precio definido.

### Pago de cotizaciÃ³n personalizada

Ruta conceptual: `/checkout/solicitud`

Solo puede entrar una solicitud que:
- tenga estado `APPROVED`;
- tenga monto aprobado;
- conserve referencia al archivo/especificaciones;
- tenga condiciones/validez de la cotizaciÃ³n.

No utiliza la lÃ³gica de `quantity Ã— unitPrice`.

### Estados y excepciones

La interfaz debe contemplar como mÃ­nimo:
- cotizaciÃ³n pendiente de aprobaciÃ³n;
- cotizaciÃ³n aprobada;
- cotizaciÃ³n caducada;
- cotizaciÃ³n rechazada/cancelada;
- pago DEMO pendiente;
- pago DEMO completado con recibo;
- formulario incompleto;
- error de envÃ­o;
- confirmaciÃ³n exitosa.

Una solicitud `PENDING_QUOTE` nunca muestra CTA de pago.

Una solicitud `QUOTED` debe llevar primero a revisiÃ³n/aprobaciÃ³n.

Una solicitud `APPROVED` puede llevar al pago de cotizaciÃ³n.

El usuario debe saber en todo momento si estÃ¡ comprando un producto o pagando una cotizaciÃ³n tÃ©cnica.

## CotizaciÃ³n y fulfillment DEMO (actualizado 2026-10-05)

`src/utils/quoteAutomation.js` ofrece perfiles anÃ¡logos para los modelos
conocidos. Gramos, horas, desgaste, energÃ­a y costos son **DEMO estimado**: no
provienen del STL, laminador, inventario fÃ­sico ni lectura elÃ©ctrica. La fÃ³rmula
determinista guarda desglose, versiÃ³n/fecha y validez; el snapshot no acredita
precio comercial ni fabricaciÃ³n. La cotizaciÃ³n puede generarse desde Admin o
`/solicitud`; el cliente aprueba el alcance vigente desde `/cuenta`.

La etapa `PAID` con `paymentMode: 'DEMO'` es una simulaciÃ³n, no una verificaciÃ³n
bancaria. Una cotizaciÃ³n aprobada todavÃ­a no crea orden: el cliente debe
registrar el pago desde su cuenta. Entonces se crea el pedido confirmado, con
snapshot del alcance libre escrito por Admin (sin exigir producto de catÃ¡logo),
y se muestra el recibo. La operaciÃ³n es idempotente. Los asistentes no ejecutan
mutaciones; el servidor aplica rol, propiedad, vigencia y versiÃ³n.

## Intake de solicitud y cotizador de catÃ¡logo â€” 2026-10-03

El asistente de `/solicitud/ayuda-diseno` prepara un resumen editable; no es el
cotizador ni envÃ­a la solicitud por el cliente. Debe conservar medidas tal como
las expresa la persona, no repetir preguntas contestadas y permitir dejar datos
desconocidos vacÃ­os. DespuÃ©s de revisar, una persona con sesiÃ³n de cliente envÃ­a
el intake: el estado inicial es `PENDING_QUOTE`, sin monto, envÃ­o de correo ni
aprobaciÃ³n implÃ­citos. Adjuntos y enlace de referencia explican el encargo; no
son mediciones de laminador.

La cotizaciÃ³n de una pieza nueva del catÃ¡logo es un flujo distinto y pertenece
al formulario Admin del producto. El perfil anÃ¡logo puede proponer un cÃ¡lculo
DEMO, pero no mide una foto/STL ni conoce tarifas reales. El operador debe
revisar y confirmar antes de publicar. La meta vigente del usuario es retirar
la carga manual de datos tÃ©cnicos mediante IA + herramientas; hoy esa
automatizaciÃ³n multimodal todavÃ­a no existe y ningÃºn precio se actualiza por
una respuesta de texto del bot.

En la ayuda de diseÃ±o, una orden explÃ­cita de preparar/enviar la solicitud
termina la entrevista y genera un borrador con los datos disponibles; los
campos opcionales desconocidos no bloquean el intake. Â«FlexibleÂ» puede guardarse
como preferencia TPU y Â«tamaÃ±o promedioÂ» como descripciÃ³n aproximada, nunca como
medidas inventadas ni garantÃ­a de seguridad. El cliente revisa, adjunta sus
referencias y confirma el envÃ­o.

**Ajuste de continuidad â€” 2026-10-03:** solo una instrucciÃ³n reciente y
explÃ­cita puede iniciar la preparaciÃ³n. Una intenciÃ³n vieja no debe interceptar
una pregunta nueva; sÃ­ permite que el siguiente mensaje sin interrogaciÃ³n y con
detalles estructurados complete el borrador. La guÃ­a determinista del taller es
la Ãºnica fuente para comparar materiales en la conversaciÃ³n: no se agregan
temperaturas, precios ni claims de seguridad que no estÃ©n en ella. Las
referencias adjuntas se guardan para la solicitud y el Admin puede consultarlas,
pero el agente actual recibe solo mensajes de texto: todavÃ­a no analiza las
imÃ¡genes ni extrae geometrÃ­a de STL/OBJ. No afirmar lo contrario.

Para fichas del catÃ¡logo, el operador llega al cÃ¡lculo DEMO desde Â«Cotizar DEMOÂ»
en la lista de modelos. El resultado no se considera precio confirmado hasta
que el operador lo revise y lo guarde explÃ­citamente.

En el formulario de producto, Admin puede pedir al agente general una propuesta
de ficha usando Ãºnicamente el nombre escrito. La respuesta incluye descripciÃ³n,
material y colores sugeridos, ademÃ¡s de gramos/horas muy aproximados; no consulta
stock, no mide la pieza, no propone precio ni publica/guarda por sÃ­ sola. El
operador revisa y edita cada campo. Antes de usar peso/horas estimados en el
calculador debe contrastarlos con el laminador; el perfil anÃ¡logo DEMO continÃºa
siendo una alternativa explÃ­cita distinta.

### Aislamiento del carrito por identidad

El carrito es persistencia local del navegador, no un carrito remoto ni un
pedido. La clave de visitante (`vertice-cart-v2:guest`) se separa de la clave
por usuario (`vertice-cart-v2:user:<id>`), por lo que cerrar sesiÃ³n no mezcla
selecciones entre cuentas. Entrar o registrarse desde `/carrito` como cliente
incorpora explÃ­citamente las lÃ­neas del visitante a su carrito, combinando
variantes iguales; iniciar sesiÃ³n desde otro punto no transfiere esa selecciÃ³n.
El carrito global anterior se migra Ãºnicamente como carrito de visitante porque
no existe dato fiable para atribuirlo a una cuenta. Admin tambiÃ©n tiene un
espacio aislado y no recibe lÃ­neas de cliente. Los cambios se sincronizan entre
pestaÃ±as del mismo navegador; no sincronizan dispositivos ni sustituyen el
pedido confirmado en la API.

