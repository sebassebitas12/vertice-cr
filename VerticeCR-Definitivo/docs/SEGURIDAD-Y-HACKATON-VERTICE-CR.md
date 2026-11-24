# Plan de Seguridad Avanzada, Pruebas de Seguridad y Gobernanza — Vértice CR

**Proyecto:** Vértice CR (producción real + defensa FWD Costa Rica + pruebas de seguridad)  
**Responsable:** Sebastián Flores Miranda  
**Actualizado:** 24 de noviembre de 2026  

---

## 1. Base obligatoria del taller «Seguridad completa en Express» (piso mínimo)
Todo lo visto en el taller del profe se cumple al 100 % como **línea base obligatoria**:
- **OWASP Top 10:2025:** mitigación directa de `A01 Broken Access Control` (incluye SSRF), `A04 Cryptographic Failures`, `A07 Authentication Failures` y `A09 Logging & Alerting`.
- **Defensa en 6 capas (en orden antes de tocar la BD):** `HTTPS/TLS + HSTS` → `Perímetro (helmet, CORS restringido, rate limit)` → `Validación Zod (body, params, query)` → `Autenticación` → `Autorización (RBAC + propiedad)` → `Datos (Hash + cifrado en reposo)`.
- **Contraseñas y criptografía:**
  - `Argon2id` (`memoryCost: 19456 KiB` = 19 MiB, `timeCost: 2`, `parallelism: 1`) + `argon2.needsRehash()` al iniciar sesión. Prohibido MD5/SHA para contraseñas.
  - **NIST SP 800-63B-4:** mínimo **15 caracteres** si es único factor (**8 caracteres** cuando lleva MFA), máximo permitido `64+`, permitir pegar y gestores de contraseñas, validar contra contraseñas filtradas; **prohibidas** reglas arbitrarias de composición, rotación periódica obligatoria, pistas o preguntas de seguridad.
  - **AES-256-GCM** con IV aleatorio único de `12 bytes` + `authTag` de `16 bytes` (clave de 32 bytes desde gestor de secretos, nunca en repo) para datos sensibles en reposo (teléfonos, direcciones exactas, secretos TOTP y tokens de terceros).
- **Ciclo de vida de cuentas:**
  - Verificación de correo con enlace de un solo uso; login en **tiempo constante** contra `HASH_FALSO` + respuesta genérica `"Credenciales inválidas"` (anti-enumeración).
  - Recuperación con token aleatorio de `32 bytes` guardado como hash `SHA-256`, expiración 30 min, un solo uso, invalida sesiones y notifica por correo.
  - Reautenticación obligatoria para acciones sensibles (cambiar correo, contraseña, MFA o solicitar baja).
- **Sesiones, JWT y Tokens de renovación:**
  - JWT de acceso de corta duración (`15 min`) solo en memoria del cliente (jamás `localStorage`), algoritmo fijo explícito en `jwt.verify(..., { algorithms: ["HS256"] })` (o `RS256/EdDSA`), validando `exp`, `iss` y `aud`, cero datos sensibles en payload.
  - Refresh Token opaco (`7 días`) en cookie `HttpOnly`, `Secure`, `SameSite=Lax/Strict`, guardado con hash en BD, con **rotación en `/refresh`** y **detección de reutilización** (si llega un token ya usado, revocar toda la familia de tokens y forzar login).
- **Autorización y endurecimiento Express:**
  - Denegar por defecto, RBAC (`cliente`, `taller`, `admin`, `auditor`) + verificación de propiedad en servidor (**devolver `404` en lugar de `403`** para no revelar existencia de recursos ajenos / anti-IDOR).
  - `helmet()` (CSP, HSTS, `X-Content-Type-Options`), CORS con lista blanca exacta (nunca `*` con credenciales), anti-CSRF en mutaciones, errores genéricos sin stack traces y logs de seguridad sin contraseñas ni tokens.

---

## 2. Capa de Seguridad Avanzada (más allá de la base, para pruebas de seguridad y producción)
Como la guía de Express es la base mínima, Vértice CR suma controles avanzados verificables:
1. **MFA resistente a phishing:** soporte de **Passkeys (WebAuthn)** como opción principal + **TOTP (RFC 6238)** + **códigos de respaldo de un solo uso hasheados** (obligatorio para `ADMIN` y `TALLER`, disponible para clientes en `Mi perfil y privacidad`).
2. **Validación contra contraseñas filtradas en registro/cambio:** chequeo **Have I Been Pwned (HIBP) por k-anonymity** (solo salen los primeros 5 caracteres del hash SHA-1, nunca la contraseña).
3. **Doble barrera anti-IDOR:** validación de propiedad en Express (`404`) **+** políticas **RLS (Row Level Security)** activas en PostgreSQL/Supabase.
4. **Protección anti-SSRF (OWASP A01:2025):** lista blanca estricta de hosts salientes (`api.hacienda.go.cr`, `api-m.sandbox.paypal.com`, host n8n, Supabase) y bloqueo de IPs privadas (`127.0.0.0/8`, `10.0.0.0/8`, `169.254.169.254`, IPv6 local).
5. **Seguridad en carga de archivos (fotos, `.STL`/`.3MF`, comprobantes SINPE):** verificación por **magic bytes** reales (no solo extensión/MIME del navegador), límites de tamaño (`≤ 5 MB`), renombrado con UUID, almacenamiento privado en buckets firmados (URLs temporales) y prohibición de ejecución HTML/SVG.
6. **Seguridad específica para los 8 Agentes de IA (OWASP LLM Top 10):** aislamiento de instrucciones contra *Prompt Injection*, salida estructurada con Zod, prohibición de ejecutar precios/cobros/borrados sin confirmación humana, redacción de PII antes de enviar contexto innecesario y trazabilidad completa en tabla `agent_runs`.
7. **Integridad financiera en Checkout:** cálculo 100 % en backend desde precios de BD + tasa Hacienda CR del servidor + idempotency keys + verificación criptográfica de webhooks PayPal.
8. **Suite automatizada de pruebas de seguridad (antes de deploy y en CI):**
   - Pruebas con Jest/Supertest para: SQLi, XSS/CSP, `alg: none` y manipulación de JWT, **reuse detection** de refresh tokens, anti-enumeración en `/login` y `/recuperar`, fuerza bruta (`429`), CSRF (`403`), IDOR (`404`), SSRF bloqueado, subida de archivos disfrazados (magic bytes) y manipulación de precios en PayPal/SINPE.

---

## 3. Integración obligatoria del Governance Pack (FWD Costa Rica)
Plantilla base verificada en `C:\Documentos\Gobvernance pack\governance-pack-template` (`github.com/sebassebitas12/governance-pack-template.git`). En la fase de repo oficial de Vértice CR se integra la rama `docs/governance-pack` con los **6 archivos obligatorios + bot verde** (`node .github/governance-pack/verificar-pack.mjs`):
1. `docs/gobernanza/inventario-de-datos.md`: tabla completa de datos personales y operativos clasificados según **Ley N.° 8968 art. 9** (`Sensible`, `Acceso restringido`, `Acceso irrestricto`, `Crediticio`) + sección **«Lo que NO recolectamos»** (ej. cédula de identidad, tarjetas de crédito en BD propia, biometría).
2. `docs/adr/0001-modelo-y-proveedor-de-ia.md`: decisión de Gemini / proveedores usados por los 8 agentes, alternativas descartadas y verificación.
3. `docs/adr/0002-que-decide-la-ia.md`: frontera exacta de **control humano obligatorio** (la IA propone y ordena; nunca cotiza final, cobra, publica ni borra cuentas sin confirmación humana).
4. `docs/adr/0003-donde-viven-los-datos.md`: residencia de datos en Supabase (Postgres + Storage), PayPal Sandbox, n8n y proveedor IA + cifrado y retención.
5. `docs/gobernanza/registro-de-riesgos.md`: riesgos técnicos, de IA, de privacidad y de seguridad con responsable y plan de corrección.
6. `AGENTS.md` (mínimo 5 reglas obligatorias para agentes de código) + `.github/workflows/governance-pack.yml` + `.github/pull_request_template.md`.

---

## 4. Impacto directo en los Mockups que vamos a diseñar
- **Pantalla 06 (`Acceso / Registro / Recuperación`):** reflejar política NIST SP 800-63B-4 (`mínimo 15 caracteres` o `8 con MFA`, sin checklists absurdos de mayúscula/símbolo), opción de **Passkey (WebAuthn)** + TOTP y mensajes neutros anti-enumeración.
- **Pantalla 09 (`Mi perfil y privacidad`):** gestión de **Passkeys + TOTP + códigos de respaldo**, reautenticación visible para acciones sensibles, sesiones activas y flujo de privacidad/baja Ley N.° 8968.
- **Pantalla 18 (`Auditoría`):** eventos de seguridad (`OWASP A09`: intentos fallidos, revocaciones por reuse detection, cambios de rol), ejecuciones de agentes (`agent_runs`), consentimientos y trazabilidad del Governance Pack.
