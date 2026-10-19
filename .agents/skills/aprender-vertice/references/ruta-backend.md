# Ruta de aprendizaje — Backend

Esta ruta registra **temas de clase**, no tareas pendientes de la tienda. Se actualiza cuando el estudiante comparte materiales o comunica avances. No exigir archivos de prácticas ni evaluarlo de nuevo por defecto.

## Estados

- **Estudiado y practicado:** el estudiante indica haber visto y realizado ejercicios.
- **En curso:** indica que lo está estudiando.
- **Pendiente:** todavía no lo ha visto o no se ha registrado.

El estado describe el aprendizaje reportado; no pretende certificar el nivel de dominio ni la calidad del código.

## 01 — POO en JavaScript

**Estado: estudiado y practicado** · Registro: 2026-10-16

- Clases y objetos; instancias con `new`.
- Constructor, `this` y métodos.
- Encapsulamiento, campos privados `#`, getters/setters.
- Herencia, `extends`, `super` y herencia multinivel (padre, hijo, nieto).
- Polimorfismo y abstracción.
- Prácticas informadas como realizadas: #2 (zoológico) y #3 (carrito).
- Buenas prácticas: composición cuando conviene; evitar herencia profunda y clases demasiado grandes.

Consulta [nota de POO](../../../docs/aprendizaje/2026-10-16-poo-javascript.md).

## LAB1 — Integración de servicios y workflows con n8n

**Estado: práctica realizada y demostrada; aprobación del profesor informada por el estudiante** · Registro: 2026-10-19

- Integración de Gmail con OAuth 2.0 y un trigger de revisión periódica.
- Consumo de una API REST con nodos HTTP Request para consultar catálogo e historial y persistir solicitudes.
- Separación entre JavaScript local, lógica dentro de nodos Code y workflow exportable/importable.
- Extracción y validación de datos desde correos cotidianos.
- Reglas deterministas de stock, precios y totales; uso de DeepSeek solo para sugerencias internas.
- Persistencia de solicitudes y comparación descriptiva de disponibilidad en el historial.

Consulta la [nota de aprendizaje](../../../docs/aprendizaje/2026-10-19-automatizacion-cotizaciones-n8n.md) y el [registro de LAB1](../../../docs/practicas/lab1-gestion-cotizaciones-n8n.md). El material del ejercicio no se convierte automáticamente en funcionalidades de Vértice.

## Próximos temas

No se asignan tecnologías, secuencias ni fechas hasta que aparezcan en el curso. La práctica LAB1 ofrece experiencia introductoria con APIs y automatización; los siguientes temas se registran cuando el estudiante los comparte.

## Registro

- **2026-10-16:** se documentaron la teoría y las prácticas ya realizadas de POO; sin importar soluciones locales al repo.
- **2026-10-19:** se registró LAB1 y su extensión de n8n a partir del workflow, las pruebas compartidas y la aprobación informada por el estudiante.
