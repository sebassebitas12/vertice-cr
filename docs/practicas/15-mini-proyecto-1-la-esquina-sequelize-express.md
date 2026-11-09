# Mini Proyecto 1 — Minimercado La Esquina

**Estado:** terminado y entregado según lo informado por Sebastián.  
**Repositorio independiente:** [sebassebitas12/la-esquina-pos](https://github.com/sebassebitas12/la-esquina-pos).  
**Tecnologías del ejercicio:** Node.js, Express, Sequelize, MySQL y React.

## Propósito

Practicar un sistema de ventas e inventario con recursos relacionados y una API REST. El trabajo evolucionó desde el CRUD de clientes hasta los módulos de catálogo, compras, facturación, existencias y devoluciones.

## Aprendizajes registrados

- Separar rutas, controladores, modelos, middleware y acceso a datos.
- Declarar modelos y relaciones con Sequelize, y gestionar el esquema mediante migraciones.
- Completar operaciones CRUD y devolver estados HTTP acordes al resultado.
- Autenticar cuentas con JWT y hash de contraseña; proteger rutas privadas.
- Separar permisos de administrador y lector con RBAC: el lector consulta, el administrador administra.
- Probar flujos por API y comprobar la compilación de la interfaz contra el backend.

## Validación observada en la copia local

El 2026-11-09 terminaron correctamente `db:migrate`, `node --check` sobre los archivos JavaScript del backend, `npm run build --workspace frontend`, `npm run smoke:api`, `npm run smoke:clients` y `npm run smoke:domain`. Los flujos de humo incluyeron autenticación, control de acceso por rol y operaciones de dominio. Esta evidencia corresponde a la copia local revisada; no afirma que el docente haya evaluado el trabajo.

## Relación con Vértice

Se documentan conceptos aprendidos, no se importan el producto, el diseño ni archivos de La Esquina a Vértice CR.
