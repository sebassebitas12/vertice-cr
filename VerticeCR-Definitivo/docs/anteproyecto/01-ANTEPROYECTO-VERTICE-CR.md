# Anteproyecto Oficial v2.0 — Proyecto Final Full Stack: Vértice CR

**Estudiante:** Sebastián Flores Miranda  
**Grupo / Modalidad:** Desamparados · Individual  
**Profesor:** Barry Vega  
**Programa:** FWD Costa Rica — Programa de Desarrollo Web Full Stack  
**Fecha:** 23 de noviembre de 2026  
**Avances obligatorios:** Jueves 03/12/2026 (Primer avance) · Miércoles 09/12/2026 (Segundo avance)

---

## Resumen Ejecutivo: ¿Qué es Vértice CR y por qué es una solución de negocio?

### ¿Qué es Vértice CR? (en una frase)
Es una plataforma costarricense que une en un solo lugar un **taller de impresión 3D bajo pedido** y una **tienda real de filamentos e insumos**, diseñada tanto para personas que nunca han usado una impresora 3D como para quienes ya tienen una.

### El problema real que resuelve
1. **Para quien necesita una pieza:** mucha gente ocupa un repuesto quebrado, un soporte o un accesorio a medida, pero no sabe de materiales ni de medidas técnicas. Cotizar por mensajes sueltos se vuelve largo, confuso y muchas ventas se pierden.
2. **Para quien ya tiene impresora:** en Costa Rica cuesta ver precios claros en colones/dólares y existencias reales de filamentos y repuestos sin estar preguntando por chat.
3. **Para el taller (el negocio por dentro):** llevar pedidos personalizados, cotizaciones, stock de bobinas, facturas de proveedores y seguimiento a mano consume demasiado tiempo, provoca errores de precio y deja desprotegidos los datos de los clientes.

### Por qué es una solución real de negocio (y no solo una tienda más)
- **Dos caminos claros desde el inicio:**
  - *«Necesito una pieza»:* elegís diseños ya probados o subís fotos de lo que se te quebró; un asistente te hace preguntas simples en español normal (nunca inventa medidas ni precios) para que el taller te mande una cotización formal.
  - *«Tengo impresora»:* comprás filamentos e insumos con stock real, tipo de cambio actualizado automáticamente cada día y pago directo (PayPal de prueba o SINPE Móvil).
- **Operación ordenada para crecer:** el taller entra y ve de primero **«Qué atender hoy»** (solicitudes nuevas, cotizaciones pendientes y filamentos por agotarse).
- **Inteligencia artificial con criterio comercial:** 8 agentes le ahorran trabajo repetitivo al negocio (guiar clientes, preparar borradores de cotización, leer facturas de proveedores, redactar seguimientos y redes, analizar ventas y orientar sobre privacidad), pero **una persona siempre tiene la última palabra**.
- **Seriedad y confianza:** roles separados (cliente, taller, administrador y auditor), seguridad real de cuentas y cumplimiento claro de privacidad y eliminación de datos bajo la **Ley N.° 8968** de Costa Rica.

### Versión hablada de 30 segundos (para explicárselo al profe Barry)
> «Vértice CR es la plataforma de un negocio real de impresión 3D y venta de filamentos en Costa Rica. Resuelve dos problemas a la vez: por fuera, permite que cualquier persona sin experiencia suba fotos de una pieza que necesita y reciba guía clara para cotizarla, mientras quien ya tiene impresora compra filamentos con stock real, tipo de cambio diario de Hacienda y pago por PayPal o SINPE. Y por dentro, ordena todo el taller con un panel de prioridades, automatizaciones, seguridad avanzada por roles y ocho agentes de IA que ayudan a cotizar, leer facturas y analizar el negocio sin quitarle el control al dueño.»

---

## 1. Introducción
En Costa Rica, tanto personas individuales como pequeños negocios enfrentan una barrera práctica cuando necesitan una pieza física específica (un repuesto que ya no se comercializa, un soporte ergonómico o un prototipo funcional): desconocen la terminología de la impresión 3D, no saben qué polímero resiste sol, calor o impacto y abandonan la consulta cuando deben intercambiar decenas de mensajes desordenados por chat. Al mismo tiempo, quienes ya tienen impresora 3D requieren filamentos e insumos con precios claros en colones, referencia real al dólar y existencias verificadas, mientras que el taller necesita controlar cotizaciones, producción, compras de proveedores y privacidad de datos sin desorden operativo.

**Vértice CR** resuelve ambos frentes en una sola plataforma web full stack con tres líneas claras: **piezas 3D estándar bajo pedido**, **solicitudes personalizadas asistidas por IA con subida de fotos (y archivo 3D opcional)** y **tienda de filamentos e insumos con inventario real**, respaldada por un panel administrativo sencillo, autenticación avanzada, ocho agentes de IA especializados, integración con APIs reales de Costa Rica (Ministerio de Hacienda) y PayPal Sandbox, tres workflows de n8n y gobernanza de datos alineada a la **Ley N.° 8968**.

## 2. Objetivos
### 2.1 Objetivo general
Desarrollar un sistema web full stack seguro, responsivo y desplegado en una URL pública para **Vértice CR**, que unifique la venta de filamentos e insumos, el catálogo de piezas 3D bajo pedido, la recepción de solicitudes personalizadas con fotografías asistidas por ocho agentes de inteligencia artificial, integraciones con APIs reales y automatizaciones en n8n bajo los principios de la Ley N.° 8968.

### 2.2 Objetivos específicos
1. **Modelar e implementar** una base de datos SQL relacional normalizada en tercera forma normal (PostgreSQL en Supabase, 21 tablas) gestionada con **Sequelize ORM**, diccionario de datos, `schema.sql` y `seed.sql`.
2. **Construir** una API REST en Node.js y Express organizada por capas (`config, models, controllers, routes, middlewares, services, tests`) con **Sequelize ORM** (prevención de SQL Injection, allow-list anti-Mass Assignment y transacciones ACID), autenticación avanzada (`bcrypt`, Access JWT corto + Refresh Token rotativo en cookie `HttpOnly`, recuperación segura, rate-limiting, Helmet, CORS estricto, anti-IDOR) y autorización por cuatro roles (`cliente`, `taller`, `admin`, `auditor`).
3. **Implementar** ocho agentes de IA en `backend/services/agents/` —documentados con objetivo, modelo/proveedor, entradas, salidas y protección de datos— bajo supervisión humana y bitácora auditable (`ai_agent_logs`).
4. **Integrar** APIs externas reales desde el servidor —Ministerio de Hacienda CR (tipo de cambio oficial y consulta de contribuyentes) y PayPal Orders v2 Sandbox (junto con comprobantes SINPE Móvil)— y exportar tres workflows en n8n (`/n8n/*.json`).
5. **Diseñar, probar y desplegar** una interfaz responsiva en React (escritorio y móvil `390 px`) coherente con el Libro de Marca v2.0, acompañada de pruebas unitarias con Jest (`npm test`), flujo de ramas en GitHub, gobernanza Ley N.° 8968 y Plan de Producción verificado sobre URL pública HTTPS.

## 3. Base de datos (21 tablas en 3FN) y Seguridad Avanzada
- **Seguridad y sesiones (5):** `users`, `roles`, `user_roles`, `refresh_tokens`, `password_reset_tokens`.
- **Catálogo e inventario (3):** `products_3d`, `supplies`, `inventory_movements`.
- **Solicitudes y ventas (6):** `quote_requests`, `request_attachments`, `quotes`, `orders`, `order_items`, `payments`.
- **Finanzas y tasa CR (3):** `supplier_invoices`, `exchange_rates`, `campaigns`.
- **Auditoría y gobernanza (4):** `ai_agent_logs`, `n8n_webhook_logs`, `legal_consents`, `account_deletion_requests`.
- **Stack confirmado:** Frontend en **React + Vite + TypeScript (`.tsx`)** · Backend en **Node.js + Express + Sequelize ORM + PostgreSQL (`pg`)**.
- **Autenticación avanzada y seguridad OWASP (100 % alineado a la clase de seguridad):**
  - **OAuth 2.0 + OpenID Connect:** «Continuar con Google» para clientes con **Authorization Code + PKCE**, validación de `state`, `redirect_uri` exacta, scopes mínimos (`openid email profile`) e `ID token` solo para identidad (con consentimiento Ley 8968); más **OAuth 2.0 Client Credentials** server-side en PayPal Orders v2 Sandbox.
  - **MFA con TOTP:** 2FA de 6 dígitos (`otplib` + QR, secreto cifrado en BD) para cuentas internas de **Administrador** y **Taller**.
  - **Sesiones sin `localStorage` + CSRF:** Access JWT (`15 min`) y Refresh Token rotativo (`7 días`) en cookies `HttpOnly, Secure, SameSite=Lax`, validando siempre **firma, `iss`, `aud` y `exp`**, protegidos con **Double Submit Cookie (`X-CSRF-Token`)**, verificación de `Origin` y cero mutaciones por `GET`.
  - **RBAC granular + ABAC («Denegar por defecto»):** middleware `requierePermiso("recurso:accion")` + verificación de propiedad (`ownership` anti-IDOR), diferenciando estrictamente `401 Unauthorized` y `403 Forbidden`.
  - **Sequelize ORM + XSS/Fuerza bruta:** consultas parametrizadas (anti-SQLi) y allow-list de `fields/attributes` (anti-Mass Assignment), transacciones ACID, `bcrypt` (≥ 10–12 rondas) con mensajes genéricos y bloqueo progresivo, `helmet` con **CSP**, cero `dangerouslySetInnerHTML`, CORS por whitelist y secretos exclusivos en `.env`.

## 4. Los 8 Agentes de IA (`backend/services/agents/`), APIs y 3 Workflows n8n
1. **Guía de pedidos a medida** (*Cliente* · `Gemini 2.5 Flash Visión+Texto`) — analiza fotos con cautela sin inventar medidas ni precios.
2. **Asesor de diseños y materiales** (*Cliente/Taller* · `DeepSeek Chat + RAG SQL`) — recomienda modelos y polímeros reales.
3. **Preparador de cotizaciones** (*Taller/Admin* · `DeepSeek Chat + cálculo Node.js`) — borrador editable `₡/$` con tasa Hacienda.
4. **Lector de facturas** (*Taller/Admin* · `Gemini 2.5 Flash + parser XML`) — extrae facturas de proveedores en borrador.
5. **Atención y seguimiento** (*Taller/Admin* · `DeepSeek Chat`) — borradores de respuesta sin envío automático.
6. **Generador de contenido** (*Admin* · `DeepSeek Chat + plantillas`) — 3 piezas de redes en estado pendiente de aprobación.
7. **Analista del negocio** (*Admin* · `DeepSeek Chat sobre SQL agregado`) — métricas de ventas, costos y stock sin PII.
8. **Guía de privacidad** (*Todos/Auditor* · `DeepSeek Chat + RAG interno`) — orientación Ley N.° 8968 sin borrados autónomos.
- **APIs externas:** `api.hacienda.go.cr` (tipo de cambio y contribuyentes) + `api-m.sandbox.paypal.com` (Orders v2 Sandbox).
- **3 Workflows n8n:** `WF-01` Envío transaccional de correos y alertas vía Gmail/SMTP (registro, recuperación, cotizaciones, pedidos y stock bajo), `WF-02` Recepción y clasificación automática de correos entrantes vía Trigger Gmail/IMAP (facturas XML/PDF de proveedores → Agente 04; respuestas/comprobantes de clientes → caso + borrador Agente 05 bajo revisión humana), `WF-03` Eliminación y anonimización de cuenta con avisos por correo (Ley N.° 8968). *(El tipo de cambio diario de Hacienda CR corre como tarea programada a las `7:00 a. m.` dentro del backend Express con respaldo en `exchange_rates`).*

## 5. Requerimientos, Historias de Usuario, Anexos y Cronograma
- **Requerimientos codificados:** `RF-01..RF-22` y `RNF-01..RNF-12` (todos con prioridad y rol/módulo) detallados en las páginas 11–12 de `Anteproyecto-Vertice-CR.pdf`.
- **Historias de usuario:** `HU-01..HU-14` con criterios de aceptación, estimación (`73 h`) y trazabilidad en las páginas 13–14.
- **Documentos complementarios:**
  - `Libro-de-Marca-Vertice-CR.pdf` (entregado — 24 láminas 16:9, 11/11 elementos oficiales).
  - `Anexo-Mockups-Vertice-CR.pdf` (entregado — 20 láminas 16:9 con las 18 pantallas oficiales en escritorio 1440 px + móvil 390 px).
  - `Plan-de-Produccion-Vertice-CR.pdf` (18 apartados + URL pública HTTPS + 8 capturas verificadas antes del 09/12).
- **Cronograma completo (23/11/2026 – 09/12/2026):** ver página 17 del PDF con hitos del **03/12** y **09/12**.
