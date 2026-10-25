# Plan de implementación para GPT-6 Luna — Vértice

Las tareas pueden programarse con GPT-6 Luna en esta secuencia. Cada fase se considera cerrada solo con evidencia funcional y visual; una compilación no es criterio suficiente. El plan no permite copiar silenciosamente una variante simplificada de una referencia seleccionada.

## Tablero

| ID | Fase | Cierre verificable | Estado |
|---|---|---|---|
| VTX-01 | Inventario de contexto y referencias | Contexto canónico, repo/refs priorizados, decisiones rechazadas señaladas | En curso |
| VTX-02 | Ejecutar Tailwind Admin Next gratis aparte | URL/capturas desktop y móvil, páginas presentes en descarga libre, dependencias/licencia registradas | Pendiente de red y descarga |
| VTX-03 | Sistema visual Vértice | Tokens, tipografía, densidad, navegación, cards, tablas, formularios y tema claro/oscuro revisados en galería | Pendiente |
| VTX-04 | Experiencia pública completa | Home, catálogo, búsqueda/filtros, ficha, proceso/materiales, acceso/registro/recuperación | Pendiente |
| VTX-05 | Cliente y taller | Solicitudes, cotizaciones versionadas, seguimiento, bandeja, detalle, catálogo/productos, producción | Pendiente |
| VTX-06 | Base reproducible | SQL migrations/seed, restricciones/índices/RLS y guía de reset seguro en proyecto NUEVO | Pendiente de Supabase |
| VTX-07 | API TypeScript | Contratos Zod, servicios/repositorios, auth/roles, idempotencia, versionado de cotización y errores | Pendiente |
| VTX-08 | Archivos y previsualización | Storage privado, allowlist/tamaño, autorización de descarga, fallback de STL en error | Pendiente |
| VTX-09 | Asistencia n8n | Contrato aislado, catálogo con procedencia, sugerencias parciales y manejo de respuestas tardías/fallos | Pendiente del workflow y credencial disponibles |
| VTX-10 | Escena de pieza | Objeto de demo completo/explotado/partes, fallback estático, móvil y prefers-reduced-motion | Pendiente |
| VTX-11 | Evidencia responsive y funcional | 390/768/1440, ambos temas, teclado, estados vacíos/carga/error/éxito y casos del plan | Pendiente |
| VTX-12 | Preview y decisión Next | Vercel + Render + Supabase si las cuotas gratuitas disponibles bastan; informe de costo/latencia/cambios | Pendiente de cuentas |

## Contrato de trabajo por tarea

GPT-6 Luna recibe: ID de tarea, referencia exacta, rutas a tocar, contrato vigente, estados que debe mostrar, desktop/móvil objetivo, comandos permitidos y criterio de cierre. Al terminar reporta rutas, decisiones, checks ejecutados, problemas y capturas guardadas. No agregar librerías solo por aparecer en una galería y no cambiar toda la hoja de estilos como atajo para una pantalla.

## Bloqueos externos identificados

- El repo no contiene URL/anon key/service key de un proyecto Supabase dedicado ni workflow exportado de n8n.
- No cambiar datos ni políticas de Lab 3; crear un proyecto nuevo requiere cuota disponible y autenticación al panel del usuario.
- No hay credenciales n8n/LLM en el entorno local. Una respuesta fixture no cuenta como validación de IA real.
- No se pagará una suscripción ni se elevará un plan para cumplir el demo.
