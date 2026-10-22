# 2026-10-22 — Extensión de base de datos para un gimnasio

## Contexto

Después del Laboratorio 2 se trabajó una extensión académica independiente, con un caso de gestión de gimnasio. La base se creó en el proyecto `extension_gimnasio` de Supabase. El registro del Laboratorio 2 está en [su nota de aprendizaje](2026-10-21-laboratorio2-fullstack.md); esta extensión cambia el dominio y se concentra en la base de datos.

## Qué aprendí

- Supabase ofrece un proyecto administrado que incluye una base PostgreSQL. Usar Supabase no significa dejar PostgreSQL: PostgreSQL es el motor de base de datos y Supabase proporciona el proyecto y herramientas para administrarlo.
- El Table Editor permite inspeccionar tablas y datos; el SQL Editor permite ejecutar sentencias SQL y revisar sus resultados.
- Un modelo relacional organiza los datos por entidades y se documenta con un diagrama entidad-relación.
- Las llaves, restricciones e identificadores generados deben quedar coherentes con la estructura y los datos insertados.
- El script SQL y una captura de su ejecución sirven para explicar y evidenciar la preparación de la base.

## Aplicación observada

Las capturas compartidas muestran el proyecto Supabase `extension_gimnasio`, el esquema `public` y nueve tablas: `socios`, `entrenadores`, `credenciales`, `planes`, `membresias`, `clases`, `reservas`, `asistencias` y `pagos`. En el SQL Editor se observó la ejecución que dejó registros de ejemplo en esas tablas; la captura final muestra los datos de `socios`.

La carpeta académica de la extensión quedó preparada con cuatro artefactos: investigación en PDF, diagrama ER, script SQL y captura de ejecución. Este registro no reproduce el script ni afirma que se haya conectado una aplicación a Supabase.

## Relación con el Laboratorio 2 y Vértice CR

La extensión retoma el modelado relacional y SQL trabajados en el Laboratorio 2, y ayuda a distinguir entre el motor PostgreSQL y una plataforma administrada como Supabase. La práctica del gimnasio permanece en su dominio académico: no se incorporan sus tablas al modelo de impresión 3D de Vértice CR ni se trasladan datos o credenciales.

Para Vértice queda como aprendizaje general la importancia de diseñar el esquema, documentar sus relaciones y conservar evidencia de la ejecución. Cualquier decisión de base de datos para el producto real se tomará aparte, según las decisiones vigentes del repositorio.

## Alcance del registro

El estado refleja la práctica y los artefactos preparados por Sebastián, junto con lo visible en las capturas compartidas. No certifica la calidad de cada restricción ni una integración desde una aplicación.
