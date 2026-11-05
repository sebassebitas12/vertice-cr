# Plan de implementación para GPT-6 Luna — Vértice

Las tareas pueden programarse con GPT-6 Luna en esta secuencia. Cada fase se considera cerrada solo con evidencia funcional y visual; una compilación no es criterio suficiente. El plan no permite copiar silenciosamente una variante simplificada de una referencia seleccionada.

## Tablero

| ID | Fase | Cierre verificable | Estado |
|---|---|---|---|
| VTX-01 | Inventario de contexto y referencias | Contexto canónico, repo/refs priorizados, decisiones rechazadas señaladas | Hecho; propuesta visual aún sin aprobación |
| VTX-02 | Ejecutar Tailwind Admin Next gratis aparte | URL/capturas desktop y móvil, páginas presentes en descarga libre, dependencias/licencia registradas | En progreso: descargado y ejecutado aparte; faltan capturas archivadas y comparación |
| VTX-03 | Sistema visual Vértice | Tokens, tipografía, densidad, navegación, cards, tablas, formularios y tema claro/oscuro revisados en galería | En progreso: tokens y primera propuesta pública/formulario; faltan galería y evidencia responsive |
| VTX-04 | Experiencia pública completa | Home, catálogo, búsqueda/filtros, ficha, proceso/materiales, acceso/registro/recuperación | En progreso: home, catálogo de 12, búsqueda/filtros, fichas atribuidas y `/solicitud` con confirmación implementados; acceso/registro/recuperación pendientes |
| VTX-05 | Cliente y taller | Solicitudes, cotizaciones versionadas, seguimiento, bandeja, detalle, catálogo/productos, producción | Pendiente |
| VTX-06 | Base reproducible | SQL migrations/seed, restricciones/índices/RLS y guía de reset seguro en proyecto NUEVO | Pendiente de Supabase |
| VTX-07 | API TypeScript | Contratos Zod, servicios/repositorios, auth/roles, idempotencia, versionado de cotización y errores | Pendiente |
| VTX-08 | Archivos y previsualización | Storage privado, allowlist/tamaño, autorización de descarga, fallback de STL en error | Pendiente |
| VTX-09 | Asistencia n8n | Contrato aislado, catálogo con procedencia, sugerencias parciales y manejo de respuestas tardías/fallos | Pendiente del workflow y credencial disponibles |
| VTX-10 | Escena de pieza | Objeto de demo completo/explotado/partes, fallback estático, móvil y prefers-reduced-motion | Pendiente |
| VTX-11 | Evidencia responsive y funcional | 390/768/1440, ambos temas, teclado, estados vacíos/carga/error/éxito y casos del plan | Incompleto: endpoints, imágenes y envío verificados; revisión visual de resoluciones/temas y capturas archivadas pendientes |
| VTX-12 | Preview y decisión Next | Vercel + Render + Supabase si las cuotas gratuitas disponibles bastan; informe de costo/latencia/cambios | Pendiente de cuentas |

## Contrato de trabajo por tarea

GPT-6 Luna recibe: ID de tarea, referencia exacta, rutas a tocar, contrato vigente, estados que debe mostrar, desktop/móvil objetivo, comandos permitidos y criterio de cierre. Al terminar reporta rutas, decisiones, checks ejecutados, problemas y capturas guardadas. No agregar librerías solo por aparecer en una galería y no cambiar toda la hoja de estilos como atajo para una pantalla.

## Estado de la experiencia pública (2026-10-25)

- La rama activa sigue siendo `experimento/visual-taller-limpio`; el commit `d22284a` es el resguardo anterior y no incluye estos cambios.
- Se mantuvo la identidad oscura actual y la V provisional elegida por Sebastián. La dirección visual general todavía requiere revisión renderizada; compilar no la aprueba.
- `/` conserva la portada pública con una fotografía de producto. `/piezas` muestra exactamente 12 referencias del catálogo acordado, con búsqueda y filtros. Cada ficha incluye procedencia y licencia.
- Las fotos físicas están disponibles para nueve fichas. Carcasa Raspberry Pi, soporte para celular y soporte para laptop usan marcador neutral porque el material fuente solo ofrece renders/diagramas.
- `/solicitud?producto=<id>` precarga la pieza. `POST /api/requests` devuelve `PENDING_QUOTE` y guarda datos solo en memoria. No se agregaron base de datos, precios, stock, tiempos ni reseñas.
- `npm run lint` y el build de producción pasaron. El build se hizo en una copia aislada porque el servidor de preview mantiene ocupado `.next`. Se verificaron catálogo, búsqueda, fichas, fotos y solicitud/idempotencia vía HTTP.
- La captura de navegador headless falló porque Edge no pudo iniciar su proceso GPU en este entorno. No hay evidencia visual archivada para 390/768/1440 ni tema claro; debe revisarse desde el navegador normal.

## Bloqueos externos identificados

- El repo no contiene URL/anon key/service key de un proyecto Supabase dedicado ni workflow exportado de n8n.
- No cambiar datos ni políticas de Lab 3; crear un proyecto nuevo requiere cuota disponible y autenticación al panel del usuario.
- No hay credenciales n8n/LLM en el entorno local. Una respuesta fixture no cuenta como validación de IA real.
- No se pagará una suscripción ni se elevará un plan para cumplir el demo.
