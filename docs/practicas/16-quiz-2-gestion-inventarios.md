# Quiz #2 — Gestión de Inventarios

**Fuente:** `Trabajo_Gestion_de_Inventarios_Quiz_2.pdf`, nueve páginas.  
**Estado:** enunciado revisado; opción de solución, integrantes y ejecución pendientes.  
**Fecha límite impresa:** viernes 6 de noviembre de 2026; esa fecha ya pasó al momento de registrar el trabajo el 9 de noviembre. Confirmar con el docente si existe una extensión o nueva fecha.

## Evaluación

- **Parte A — análisis de compras e inventario (40 puntos):** circuito de compra desde requisición hasta pago, matriz de aprobación, clasificación de gastos, controles de duplicados/precios/contratos, evaluación ponderada de proveedores, punto de reorden, stock de seguridad y trazabilidad.
- **Parte B — solución funcional con Node.js y base de datos (60 puntos):** el equipo debe escoger una de las tres opciones del enunciado.

## Opciones de la Parte B

1. **Comparador de precios:** normalizar productos y equivalencias, guardar historial por proveedor, consultar precios actuales y alertar diferencias; respetar fuentes y reglas de acceso.
2. **Inventario para construcción:** registrar materiales y parámetros de reposición, movimientos trazables por fecha/usuario/cantidad/ubicación/documento, calcular existencias desde movimientos, alertar reorden y detectar órdenes duplicadas.
3. **Motor de promociones:** administrar descuentos, códigos, proveedores, vigencias y condiciones; aplicar reglas al registrar o recibir compras, resolver conflictos y auditar ahorros.

El PDF exige conectar Node.js a una base de datos real. Permite implementar flujos con n8n o construir una API REST con Express, Fastify o Nest y un ORM/cliente; contempla migraciones o SQL y validaciones. Se pueden combinar enfoques.

## Entregables y reglas

- Informe de hasta 15 páginas.
- Repositorio GitHub/GitLab con código o exportación de flujos, creación/semilla de base de datos, `.env.example` y README.
- Video demostrativo de hasta cinco minutos y exposición de equipo de diez minutos.
- Equipo de 2 a 4 personas.
- El uso de IA para programar está permitido, pero cada integrante debe poder explicar su parte. No subir contraseñas, tokens ni cadenas de conexión.

## Próxima decisión

Aún no se escogió la opción 1, 2 o 3 y no se inició una implementación del quiz. La elección debe hacerse con el equipo y con el alcance confirmado por el docente. Este registro resume requisitos; no contiene una solución.
