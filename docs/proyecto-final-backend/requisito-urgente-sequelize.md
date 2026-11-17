# Requisito urgente: ORM para el proyecto final

Registro: 2026-11-16.

Sebastián indicó que el profesor exige utilizar Sequelize y le advirtió que la presencia de consultas SQL escritas manualmente impediría exponer el proyecto final. Se registra como **bloqueante de entrega**, según lo comunicado por Sebastián; no se cuenta aquí con una rúbrica escrita ni con una validación independiente de su alcance.

## Criterio de trabajo

- Utilizar modelos, asociaciones y métodos de Sequelize para acceder a datos.
- No incluir consultas SQL escritas manualmente en el código del proyecto final; revisar también inicialización de datos, migraciones y pruebas. El SQL que genera internamente el ORM es diferente del SQL escrito por el equipo.
- Revisar que migraciones y características específicas de PostgreSQL puedan implementarse cumpliendo esta restricción; si alguna requiere una excepción, aclararla con el profesor antes de depender de ella.
- Mantener controles de autorización y separación entre usuarios al migrar, y comprobarlos con pruebas.
- Antes de exponer, auditar el repositorio y la entrega ejecutable, ejecutar las verificaciones pertinentes y registrar la evidencia. Este documento no afirma que esa auditoría ya se haya hecho.

La base PostgreSQL administrada prevista para el MVP y el uso de Sequelize en la API deben integrarse sin cambiar la decisión de infraestructura por esta nota. La conexión, migraciones y permisos quedan pendientes de diseño y verificación.
