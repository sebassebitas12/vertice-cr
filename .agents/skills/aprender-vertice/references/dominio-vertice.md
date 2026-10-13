# Dominio de Vértice CR

Resumen operativo. La fuente detallada está en `docs/negocio/`; el material de origen en `docs/negocio/heredado/`.

## Qué es

Tienda costarricense de impresión 3D con dos líneas:

1. **Catálogo:** modelos que se fabrican al recibir el pedido (no hay entrega inmediata ni existencias).
2. **Impresión personalizada:** el cliente sube un archivo 3D o pide ayuda de diseño; se revisa y se cotiza antes de producir o cobrar.

## Roles

- **Cliente:** registro, login, catálogo, detalle, carrito, compra, solicitudes personalizadas, cotizaciones, pedidos, datos personales.
- **Administrador:** dashboard operativo, productos, pedidos y producción, solicitudes y cotizaciones, clientes, actividad, métricas.

## Capacidad de fabricación

- Solo **FDM**.
- Filamentos: **ASA, PLA, PETG, ABS, TPU**.
- No ofrecer resina, SLA, nylon ni otros procesos.
- No publicar tolerancias ni plazos hasta tener datos de operación aprobados.

## Entidades base (a refinar con `docs/negocio/`)

| Entidad | Idea |
|---|---|
| `User` | Cliente o admin; rol; datos de contacto |
| `Product` | Modelo del catálogo con variantes y material |
| `Material` | ASA, PLA, PETG, ABS, TPU |
| `QuoteRequest` | Solicitud personalizada: archivo, descripción, medidas, uso |
| `Quote` | Cotización preparada por el admin: total, vigencia, alcance |
| `Order` | Pedido de catálogo o de cotización aceptada, con estados |
| `ActivityLog` | Registro de eventos del admin |

Regla clave: una solicitud personalizada sin cotizar está en `PENDING_QUOTE`, nunca con precio `0`.

## Lo que hace único a Vértice

- Cotización técnica con archivo STL.
- Contexto costarricense: colones, envíos nacionales, facturación electrónica (a confirmar con contador).
- Marca: elegante, futurista, técnica e industrial con toques creativos; transmitir calidad de ingeniería, no "juguetes". Referencia de nivel: Formlabs.

## Cómo usar esto en las prácticas

Cuando una práctica pida un CRUD o un sistema genérico, mapéalo a la entidad de Vértice que mejor encaje (por ejemplo, un CRUD de tareas puede ser un CRUD de productos o solicitudes), siempre que cumpla el enunciado.

