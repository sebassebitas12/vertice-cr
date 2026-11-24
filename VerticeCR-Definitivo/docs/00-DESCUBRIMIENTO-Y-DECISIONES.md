# Alcance y decisiones — Vértice CR

**Estado:** Las cuatro decisiones de producto, las tres reglas comerciales y los cuatro roles están aprobados. El alcance se consolidó en 18 pantallas principales, cada una con versión de escritorio y móvil. Ya se puede iniciar el Anteproyecto oficial; los detalles técnicos se documentarán dentro de ese entregable antes de programar.

**Base académica:** docs/02-REQUISITOS-OFICIALES-FWD.md. Sebastián confirma que este resumen corresponde a la transcripción de los dos PDF oficiales de FWD.

**Identidad visual:** Del experimento anterior se conserva únicamente el Hero aprobado: onda 3D WebGL estilo PS3, Chakra Petch, fondo #161618, acento #ff6a1f y logo aprobado. El resto de la interfaz se diseña desde cero.

## 1. Modelo de negocio

| Línea | Oferta | Precio e inventario | Recorrido |
|---|---|---|---|
| Piezas 3D estándar | Diseños probados que se fabrican bajo pedido. | Precio base referencial en colones, con equivalente en dólares según el tipo de cambio oficial. No se inventan existencias de piezas terminadas. | Se elige un diseño y sus opciones; el modelo estándar se solicita a su precio base, y un cambio de medida o una pieza nueva pasa a cotización del taller. |
| Impresión 3D personalizada | Repuestos, piezas únicas y prototipos solicitados con una descripción, fotos y, opcionalmente, un modelo 3D. | Sin precio automático; cotiza el taller. | La IA ayuda a completar la solicitud, sin afirmar medidas ni precios que no estén confirmados. |
| Filamentos e insumos | Filamentos, boquillas, láminas, repuestos y herramientas. | Precio y existencias reales. | Se agregan al carrito y se compran con cuenta. |

## 2. Decisiones de producto aprobadas

### Decisión 1. Tienda pública
- La portada se organiza en dos caminos: **«Necesito una pieza»** y **«Tengo impresora»**.
- El menú da acceso directo a **Piezas 3D**, **Pedir con foto** y **Filamentos e insumos**.
- En **Mi cuenta**, las solicitudes 3D y las compras de insumos tienen pestañas separadas.
- Navegar es libre. Para comprar o enviar una solicitud se requiere una cuenta, para registrar el consentimiento de privacidad y mantener el historial personal.

### Decisión 2. Solicitudes con fotos y archivos
- Se permiten hasta 4 fotos JPG, PNG o WEBP, de máximo 5 MB cada una, y 1 archivo STL o 3MF opcional.
- El formulario incluye el consejo: **«Poné una regla o moneda a la par»**.
- La IA analiza con cautela y hace preguntas útiles; nunca inventa medidas ni precios.
- Si falla el análisis visual, las fotos se conservan y la solicitud puede enviarse sin bloquearse.

### Decisión 3. Panel del taller y administración
- La pantalla principal combina el inicio del taller con **«Qué atender hoy»**.
- Para Administración muestra cuatro cifras: solicitudes nuevas, cotizaciones pendientes, productos con poco stock y tipo de cambio del día.
- Debajo muestra tareas urgentes que se resuelven en uno o dos pasos. La vista del Taller prioriza su cola de trabajo según los permisos de ese rol.
- En PC el menú lateral se contrae. En celular se usa una barra inferior y pestañas que cambian la vista en su sitio; no se salta hacia abajo.

### Decisión 4. Ocho agentes de IA y workflows de n8n
1. **Guía de pedidos a medida:** aclara la necesidad y organiza la solicitud con sus fotos; no cotiza.
2. **Asesor de diseños y materiales:** recomienda diseños, filamentos o insumos desde el catálogo y datos técnicos revisados.
3. **Preparador de cotizaciones:** organiza los costos disponibles para que el taller revise y apruebe la propuesta antes de enviarla.
4. **Lector de facturas:** extrae productos, cantidades y costos a un borrador; alguien verifica antes de registrarlo.
5. **Atención y seguimiento:** consulta el estado real de un pedido y prepara respuestas para revisión; no las envía por su cuenta.
6. **Generador de contenido:** crea borradores basados en información aprobada; una persona los revisa antes de publicar.
7. **Analista del negocio:** responde preguntas sobre ventas, costos e inventario con datos autorizados para ese rol.
8. **Guía de privacidad:** explica las opciones y guía al equipo con una lista de pasos; no dicta conclusiones legales ni elimina datos.

Cada agente aparece dentro del módulo donde ayuda y también en un **Centro de Agentes** para probarlo o revisar sus resultados según el rol. La IA no publica, cobra, envía cotizaciones ni ejecuta acciones irreversibles sin confirmación humana.

### 2.5 Tres workflows de n8n
1. **Tipo de cambio diario:** obtiene y registra el tipo de cambio oficial para los precios y conversiones.
2. **Registro y actividad comercial:** da la bienvenida y registra el consentimiento al crear la cuenta; cuando entra una solicitud o compra, confirma recepción y avisa al taller. No genera cotizaciones automáticas.
3. **Eliminación de cuenta:** registra y guía la solicitud; las acciones definitivas siguen el procedimiento de privacidad y requieren revisión humana.

## 3. Reglas comerciales aprobadas

1. **Piezas estándar:** muestran un precio base referencial en colones y su equivalente en dólares según el tipo de cambio oficial. Si se cambia una medida o se pide una pieza nueva, el taller prepara una cotización.
2. **Pagos y entrega:**
   - **PayPal Sandbox:** integración real desde el backend con el entorno Sandbox de PayPal; el backend convierte el monto en colones a dólares con el tipo de cambio oficial. Es una prueba y no mueve dinero real.
   - **SINPE Móvil o transferencia bancaria:** el cliente adjunta el comprobante y el taller valida el pago.
   - El mismo flujo sirve para compras de insumos y modelos estándar sin cambios; las cotizaciones 3D aprobadas reutilizan el paso de pago.
   - Se puede retirar en el taller o elegir envío por mensajería o Correos de Costa Rica.
3. **Cuenta:** navegar no requiere iniciar sesión; comprar o enviar solicitudes sí requiere una cuenta, aceptación registrada de privacidad e historial propio.

## 4. Alcance consolidado de 18 pantallas para mockups

Cada pantalla tiene propuesta para escritorio y móvil de 390 px. Los pasos, pestañas y detalles seleccionados son estados de estas pantallas, no páginas adicionales. En móvil, las tablas se muestran como tarjetas; los controles no saltan a otra parte de la página.

1. **Portada:** Hero aprobado, los dos caminos principales y accesos directos a las tres líneas.
2. **Piezas 3D:** catálogo y detalle del diseño seleccionado en la misma vista.
3. **Pedir con foto:** descripción, adjuntos, guía de la IA, revisión y envío en pasos.
4. **Filamentos e insumos:** catálogo y detalle del producto seleccionado.
5. **Compra y pago:** flujo breve para insumos o modelos estándar: carrito cuando aplica, dirección o retiro, método de pago, comprobante si aplica y confirmación. Una cotización 3D aprobada reutiliza el paso de pago.
6. **Acceso a la cuenta:** iniciar sesión, crear cuenta con consentimiento y recuperar contraseña.
7. **Información legal:** pestañas para política de privacidad y términos.
8. **Mi cuenta:** pestañas para solicitudes/cotizaciones 3D y compras de insumos; al elegir un registro se muestran sus detalles.
9. **Perfil y privacidad:** datos propios, consentimiento y solicitud de eliminación de cuenta.
10. **Inicio del Taller y Administración:** una sola pantalla principal adaptada al rol; Administración ve las cuatro cifras y el Taller su trabajo prioritario.
11. **Solicitudes y producción:** una sola vista con pestañas por estado, detalle del caso, cotización, pago por validar y avance del trabajo.
12. **Catálogo e inventario:** una sola vista administrativa con pestañas para piezas 3D e insumos; incluye precios, existencias y movimientos de stock.
13. **Compras de proveedores:** facturas y datos extraídos por el agente en borrador para revisión.
14. **Costos y reportes:** ventas, compras, costos y análisis del negocio.
15. **Campañas y publicaciones:** borradores del agente y aprobación humana.
16. **Centro de Agentes:** los ocho agentes, acceso según rol, pruebas y resultados.
17. **Configuración del Admin:** pestañas para usuarios y roles, tipo de cambio de Hacienda/BCCR, PayPal Sandbox y los tres workflows de n8n.
18. **Auditoría:** consulta de solo lectura de ejecuciones de agentes, integraciones, workflows, consentimientos y solicitudes de privacidad.

Las interacciones de cada agente se muestran también en su contexto: pedido con foto, catálogo, cotización, factura, seguimiento, publicaciones, reportes y privacidad. El Centro de Agentes ofrece la vista común de prueba y revisión.

## 5. Roles aprobados

1. **Cliente:** navega, solicita piezas, compra insumos, consulta únicamente sus pedidos y administra su perfil.
2. **Taller / Operación:** atiende solicitudes, prepara cotizaciones, actualiza la producción y gestiona inventario según sus permisos.
3. **Administrador / Dueño:** configura productos, precios, cuentas, roles, finanzas, campañas e integraciones.
4. **Auditor:** consulta en modo de solo lectura los registros de agentes, integraciones, workflows y privacidad.

## 6. Detalles técnicos que se resolverán en el Anteproyecto

- Seleccionar y justificar el servicio oficial de tipo de cambio y la regla de conversión utilizada.
- Describir el flujo de PayPal Orders v2 en Sandbox desde el backend, sin credenciales en el frontend ni transacciones reales.
- Definir el cálculo del costo de envío, los estados de pago y los comprobantes que revisa el taller.
- Completar arquitectura, datos, requerimientos, historias de usuario, mockups, libro de marca, cronograma y estimación de producción solicitados por FWD.
