# Vértice — contexto vigente de la prueba de stack

**Fecha:** 2026-10-24 (America/Mexico_City)  
**Rama:** `experimento/stack-frontends`  
**Alcance:** prueba completa de producto y stack en Vértice; Lab 3 está cerrado y fuera de alcance.

## Objetivo

Construir una aplicación recorrible como cliente y como taller, con acabado y estados de producto listos para evaluar como preview desplegable. La meta principal de esta prueba es visual: acercarse al nivel de acabado del dashboard Tailwind Admin para el área de trabajo y adaptar la experiencia pública observada en N3D Melbourne a los servicios FDM de Vértice. El stack Next.js sigue siendo una hipótesis: se conserva si la prueba demuestra calidad visual, funcionamiento y facilidad de cambio con GPT-6 Luna; de lo contrario se rehace después con evidencia.

## Decisiones explícitas

- Frontend: Next.js App Router, React, TypeScript, Tailwind y shadcn.
- API de negocio separada: Express con TypeScript.
- PostgreSQL/Auth/Storage: Supabase, en entorno exclusivo para la prueba; no usar ni modificar el proyecto de Lab 3 ni otra base existente.
- Automatización/asistencia: n8n mediante la API; secretos solo en servidor.
- Tema oscuro por defecto y tema claro con el mismo nivel de acabado.
- Fabricación FDM bajo pedido. No inventar stock inmediato, precios, tiempos, tolerancias ni capacidades técnicas.
- Una solicitud sin cotización mantiene `PENDING_QUOTE` y precio nulo. La cotización real la prepara el taller; pagos solo en entorno demostrativo.
- Capturas, estados vacíos/error/carga y uso móvil/teclado son parte de aceptación; compilar por sí solo no cierra una tarea.
- No hay presupuesto para nuevos servicios de pago. No se eliminan ni actualizan recursos existentes.

## Referencias reunidas

- N3D Melbourne: https://www.n3dmelbourne.com/ y https://www.n3dmelbourne.com/designs — composición pública, fichas visuales, catálogo y movimiento; adaptar su organización, no su identidad ni sus recursos.
- Tailwind Admin React: https://react.tailwind-admin.com/ — referencia de acabado que Sebastián destacó.
- Repositorio gratuito: https://github.com/Tailwind-Admin/free-tailwind-admin-dashboard-template — ejecutar su variante Next como muestra independiente, revisar qué incluye, conservar su licencia MIT si se reutiliza código.
- Candidatos documentados: `docs/diseno/componentes-candidatos-mvp.md`, `docs/diseno/seleccion-ampliada-por-pantalla.md`, `docs/diseno/investigacion-referencias-04.md`. Son propuestas/candidatos; no todos están aceptados ni instalados.
- Experimento Svelte y repo Tienda-de-Impresion3D: usar solo como antecedentes funcionales y de aprendizaje. No copiar estilos ni afirmar que decisiones visuales rechazadas siguen aprobadas.

Inventario verificable y capturas pendientes: `docs/diseno/referencias-prueba-vertice.md`.

## Estado encontrado

- Next/React/TypeScript y algunas pantallas públicas ya existen en `experimentos/stack-mvp/frontend`.
- API Express actual es JavaScript, con catálogo ficticio y solicitudes en memoria; no tiene persistencia/auth/archivos/n8n.
- No se encontró configuración local de Supabase, n8n, PostgreSQL, migraciones ni workflows exportados. No se hallaron credenciales de entorno. El archivo `.env.example` solo contiene URLs locales.
- Las pantallas del prototipo actual no han sido aprobadas por Sebastián. No se deben llamar terminadas ni usar como estándar visual.
- El frontend tiene una copia histórica de `PROJECT_CONTEXT.md`; este archivo en `docs/` del repositorio es el contexto canónico.

## Recorrido objetivo

Explorar catálogo → ficha → crear borrador → adjuntar referencia privada → solicitar sugerencias → revisar/editar/deshacer → confirmar una vez → cliente ve el estado → taller revisa y pide información/cotiza/cancela → cliente acepta una versión exacta → se crea pedido demostrativo → seguimiento persistente.

## Siguiente trabajo

1. Guardar y verificar referencias/candidatos; ejecutar de forma aislada el template Next gratuito para comparar el contenido real de la versión libre.
2. Crear sistema visual y completar el recorrido público, cuenta, cliente y taller con datos de demo; mostrarlo antes de conectar persistencia.
3. Definir migraciones/seed reproducibles y adaptar API Express a TypeScript, contratos y permisos.
4. Conectar un proyecto Supabase nuevo de prueba y n8n solo cuando estén disponibles credenciales/recursos existentes sin costo adicional.
5. Revisar screenshots 390/768/1440 px, ambos temas, teclado/reduced motion, errores y recorrido completo.
6. Preparar deploy gratis dentro de límites actuales; evaluar si Next se conserva.

Ver tareas y bloqueos con evidencia en `docs/desarrollo/plan-luna.md`.
