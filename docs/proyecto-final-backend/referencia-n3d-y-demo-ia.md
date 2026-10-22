# Referencia N3D y propuesta demostrable de IA

Fecha de revisión: 2026-10-22. Investigación para el MVP académico de backend/hackathon. La recomendación de trabajo de frontend y sus razones están en el [ADR 0002](../decisiones/0002-frontend-mvp.md); esta investigación no demuestra por sí sola que un framework sea necesario.

## Evidencia y límites

Se recorrieron en el navegador conectado la [portada](https://www.n3dmelbourne.com/), el [catálogo](https://www.n3dmelbourne.com/designs), la [ficha de Bulbasaur](https://www.n3dmelbourne.com/design/0001-bulbasaur) y la [calculadora de precios](https://www.n3dmelbourne.com/tools/print-price-calculator). Se inspeccionaron inicialmente portada, catálogo y ficha en un viewport estrecho. Después se revisaron la portada y el desplazamiento de la sección About en escritorio, con viewport de 1365 × 768. No se comprobaron compras, descargas ni herramientas de miembros. No se dedujo su framework ni su arquitectura a partir del aspecto.

La revisión directa sustituye la limitación anterior de HTTP 403: el sitio ya pudo observarse con el navegador conectado.

## Qué se observó

- Portada oscura, acento naranja, tipografía de gran peso, textos secundarios discretos y botones con jerarquía clara. Encabezado compacto y menú desplegable en la vista estrecha. Un gráfico de líneas decora el fondo; las superficies usan bordes y radios consistentes.
- Dos acciones visibles: explorar diseños y consultar membresías. La propuesta explica qué recibe el usuario y cómo se prueba cada diseño.
- El catálogo permite explorar sin cuenta. Agrupa búsqueda, categoría, perfil de impresión, dificultad, orden y filtros rápidos en un panel.
- La ficha muestra una fotografía grande, miniaturas, pestañas de descripción/comentarios/actualizaciones y perfiles de impresión separados. En el diseño gratuito inspeccionado, el acceso a archivos remite a MakerWorld.
- N3D ofrece diseños digitales y membresías para aficionados y vendedores; Vértice plantea piezas físicas FDM y solicitudes personalizadas. Los flujos comerciales requieren adaptación.
- La calculadora pide peso del modelo y purga, tiempo de impresión, material, energía, desgaste, trabajo, empaque, costos de licencia, comisiones y margen. Explica los cálculos y etiqueta el ejemplo como datos de muestra. Los pesos y tiempos proceden del laminador según las instrucciones de la página.
- El sitio presenta herramientas como PrintIt!, Build-a-Ball, Storefront y una API. Son descripciones públicas; no se ejecutaron ni verificaron sus capacidades.

## Desplazamiento observado en escritorio

En una revisión posterior solicitada por Sebastián se avanzó y retrocedió por About. El encabezado permanece visible y About se destaca en la navegación. La pieza representada en un canvas pasa de una composición casi ensamblada a componentes separados al avanzar por la sección. La orientación también varía; no se aisló qué parte de la rotación depende del tiempo frente al desplazamiento. No se dedujo biblioteca 3D ni se comprobó que la sección esté fijada.

Esto añade una referencia de movimiento a la referencia de composición. Para Vértice se propone una sección que explique pieza, detalles y uso antes de iniciar la solicitud, con alternativa estática y reducción de movimiento. No se ha implementado. Los mockups generados son estáticos y no permiten evaluar este comportamiento.

## Qué conviene trasladar a Vértice

1. Fotografías propias o autorizadas con protagonismo, fichas claras y superficies consistentes.
2. Una portada con dos caminos comprensibles: encontrar una pieza del catálogo o pedir una pieza personalizada.
3. Búsqueda y filtros elegidos para el catálogo real de Vértice, evitando adoptar perfiles técnicos que el cliente no necesita entender.
4. Información de uso, medidas y opciones junto a la ficha, con una acción principal evidente.
5. Explicar la revisión técnica y el siguiente paso de la solicitud antes de enviarla.

Los colores, la composición exacta y las fotografías de N3D no constituyen recursos autorizados para copiar. Una fotografía de referencia no verifica tolerancias, resistencia ni fabricabilidad.

## Implicaciones para el frontend

Lo observado requiere buen diseño responsive, fotografía, tipografía, componentes coherentes, filtros y estados claros. No prueba que un framework específico sea necesario ni que cambiar React/Vite resuelva por sí solo problemas visuales.

Validar la recomendación de Next.js con Tailwind y componentes propios del ADR 0002 mediante un prototipo pequeño con marca Vértice. Evaluar facilidad de modificar componentes, imágenes, accesibilidad, mantenimiento y tiempo de implementación. Supabase permanece como elección del usuario para base de datos.

## Una función central de IA para el MVP

Propuesta: **describir una necesidad y convertirla en una opción del catálogo o en una solicitud lista para revisión del taller**.

Ejemplo de entrada de demo: “Necesito organizar varios cables en mi escritorio; no sé cómo se llama la pieza”. La IA busca productos existentes y muestra tarjetas con información recuperada. Si las medidas no coinciden o no existe una opción, pregunta los datos indispensables y prepara una solicitud personalizada editable.

El resultado es una búsqueda y una acción persistida. Un chat que solo conversa o redacta texto no completa esta función.

### Recorrido propuesto

1. El frontend envía la necesidad y un identificador de conversación a la API.
2. La API valida acceso y límites; n8n coordina el modelo y herramientas acotadas.
3. La herramienta de búsqueda consulta el catálogo de Supabase mediante la API, con filtros de publicación y disponibilidad de información.
4. El modelo explica las coincidencias usando los datos recuperados y pregunta lo que falta.
5. Cuando se necesita personalización, genera un borrador estructurado y editable.
6. El usuario revisa y confirma. La API vuelve a validar y guarda la solicitud una sola vez en Supabase.
7. La bandeja del taller muestra la solicitud y permite seguir su revisión.

El modelo no decide por sí solo publicar productos, confirmar un pedido, fijar precio firme ni afirmar que una pieza soporta cierta carga. Si hay datos técnicos validados de un modelo conocido, puede explicar esos datos y una estimación calculada por código con sus supuestos. Una pieza nueva necesita revisión del taller y, para costos de material/tiempo, datos de laminado.

### Herramientas mínimas de n8n

- Buscar catálogo y obtener detalle por ID.
- Consultar información técnica aprobada del taller.
- Proponer un borrador estructurado de solicitud; su confirmación y guardado pasan por la API.

No hace falta multiplicar agentes para demostrar valor. La complejidad útil está en consultar datos correctos, preservar contexto, ejecutar una acción válida y recuperarse de errores.

### Alcance para poder terminarlo

- Catálogo pequeño y curado, preparado para la demo y marcado como demostrativo cuando corresponda.
- Un asistente y un workflow principal de n8n.
- Una solicitud por necesidad, con descripción, cantidad y datos relevantes; adjuntos y análisis geométrico no son necesarios para demostrar este primer recorrido.
- Bandeja de taller sencilla y persistencia en Supabase.
- Casos de prueba y revisión de resultados antes de mostrarlo como confiable.

## Cómo demostrar que funciona

| Caso preparado | Resultado observable esperado |
|---|---|
| Hay una coincidencia en catálogo | Tarjeta con un ID real y explicación respaldada por sus campos. |
| Falta una medida importante | Pregunta concreta; no confirma compatibilidad. |
| No hay una opción adecuada | Ofrece preparar una solicitud y explica qué falta, sin inventar un producto. |
| El usuario confirma el borrador | Aparece un registro en Supabase y en la bandeja; al recargar sigue presente. |
| Se repite la confirmación | La API identifica la misma operación y evita duplicar la solicitud. |
| Falla n8n o el proveedor | Se conserva el borrador y se muestra recuperación; no se informa un guardado inexistente. |

La demo debe mostrar el recorrido del cliente, una ejecución de n8n y el registro asociado en Supabase/bandeja. Estos son criterios propuestos: todavía no se implementó ni comprobó esa integración.

Medir en un conjunto pequeño de solicitudes preparadas la correspondencia con catálogo, preguntas necesarias, éxito de guardado, duplicados y latencia observada. Publicar resultados reales cuando existan; no inventar porcentajes de precisión.

## Próximos pasos

1. Concretar la dirección combinada confirmada por Sebastián y el desplazamiento solicitado en componentes y una ficha de movimiento.
2. Seleccionar un catálogo de demo y redactar los casos de uso.
3. Definir contrato API/n8n, esquema de solicitud y criterios de aceptación.
4. Probar el recorrido IA con persistencia antes de expandir funcionalidades.
5. Validar la recomendación de frontend mediante el prototipo y los requisitos del proyecto.
