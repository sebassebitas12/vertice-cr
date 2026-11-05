# Contexto del proyecto — Vértice CR

## Objetivo actual

Probar el stack web de Vértice de forma aislada. La etapa actual se concentra en mejorar la experiencia pública de catálogo y solicitud; no incluye Lab3. La decisión final de stack y marca queda pendiente de comparar la prueba con el otro experimento de Vértice.

## Decisiones y límites

- Esta copia de trabajo está en la rama experimento/stack-frontends.
- Frontend de prueba: Next.js App Router, React, TypeScript, React Hook Form y Zod.
- API separada de demo: Express en JavaScript con catálogo y solicitudes en memoria.
- No conectar aquí Supabase ni n8n; el catálogo es ficticio y las solicitudes no son persistentes.
- El DER de Lab3 no forma parte de esta prueba.
- Se descarta expresamente la herencia visual de Tienda-de-Impresion3D: marca-cubo, paleta carbón/óxido, retícula, medidas simuladas y dibujos técnicos repetidos.
- Dirección provisional: tienda editorial de objetos útiles con fondos marfil, azul cobalto y amarillo, tipografía serif para titulares, fotografía conceptual de uso y llamadas claras a explorar o describir una pieza.
- Referencias adaptadas con límites: N3D para claridad de producto y doble ruta; Fume para composición fotográfica; Woodid para separar catálogo y encargo; Formlabs para jerarquía de producto. Tailwind Admin queda para una posible consola interna, no la portada pública.
- Las imágenes nuevas son conceptos generados y se etiquetan como tales; no acreditan disponibilidad ni piezas producidas.

## Trabajo visual implementado

- Home con imagen editorial propia, entrada directa a catálogo o solicitud, recorrido de tres pasos y fichas fotográficas.
- Tarjetas con imágenes específicas por tipo de objeto; se conserva búsqueda y enlace al formulario con la referencia seleccionada.
- Solicitud con la misma dirección visual, resumen contextual e información honesta sobre revisión, precio y persistencia temporal.
- Movimiento reducido y estados de foco visibles.

## Próximo paso

Abrir la prueba local, revisar escritorio y móvil y recoger la evaluación de Sebastián. Después decidir si se mantiene esta dirección en el experimento Next o se traslada el aprendizaje al siguiente stack de Vértice.
