# Dominio de VÃ©rtice CR

Resumen operativo. La fuente detallada estÃ¡ en `docs/negocio/`; el material de origen en `docs/negocio/heredado/`.

## QuÃ© es

Tienda costarricense de impresiÃ³n 3D con dos lÃ­neas:

1. **CatÃ¡logo:** modelos que se fabrican al recibir el pedido (no hay entrega inmediata ni existencias).
2. **ImpresiÃ³n personalizada:** el cliente sube un archivo 3D o pide ayuda de diseÃ±o; se revisa y se cotiza antes de producir o cobrar.

## Roles

- **Cliente:** registro, login, catÃ¡logo, detalle, carrito, compra, solicitudes personalizadas, cotizaciones, pedidos, datos personales.
- **Administrador:** dashboard operativo, productos, pedidos y producciÃ³n, solicitudes y cotizaciones, clientes, actividad, mÃ©tricas.

## Capacidad de fabricaciÃ³n

- Solo **FDM**.
- Filamentos: **ASA, PLA, PETG, ABS, TPU**.
- No ofrecer resina, SLA, nylon ni otros procesos.
- No publicar tolerancias ni plazos hasta tener datos de operaciÃ³n aprobados.

## Entidades base (a refinar con `docs/negocio/`)

| Entidad | Idea |
|---|---|
| `User` | Cliente o admin; rol; datos de contacto |
| `Product` | Modelo del catÃ¡logo con variantes y material |
| `Material` | ASA, PLA, PETG, ABS, TPU |
| `QuoteRequest` | Solicitud personalizada: archivo, descripciÃ³n, medidas, uso |
| `Quote` | CotizaciÃ³n preparada por el admin: total, vigencia, alcance |
| `Order` | Pedido de catÃ¡logo o de cotizaciÃ³n aceptada, con estados |
| `ActivityLog` | Registro de eventos del admin |

Regla clave: una solicitud personalizada sin cotizar estÃ¡ en `PENDING_QUOTE`, nunca con precio `0`.

## Lo que hace Ãºnico a VÃ©rtice

- CotizaciÃ³n tÃ©cnica con archivo STL.
- Contexto costarricense: colones, envÃ­os nacionales, facturaciÃ³n electrÃ³nica (a confirmar con contador).
- Marca: elegante, futurista, tÃ©cnica e industrial con toques creativos; transmitir calidad de ingenierÃ­a, no "juguetes". Referencia de nivel: Formlabs.

## CÃ³mo usar esto en las prÃ¡cticas

Cuando una prÃ¡ctica pida un CRUD o un sistema genÃ©rico, mapÃ©alo a la entidad de VÃ©rtice que mejor encaje (por ejemplo, un CRUD de tareas puede ser un CRUD de productos o solicitudes), siempre que cumpla el enunciado.

