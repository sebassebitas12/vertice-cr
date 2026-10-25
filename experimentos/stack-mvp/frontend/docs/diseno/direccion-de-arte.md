# Dirección de arte — Vértice CR

> Guía provisional para la prueba visual de Next.js. Se evalúa en pantallas reales; no es una aprobación final de marca.

**Estado:** dirección visual implementada en la prueba local; pendiente de revisión de Sebastián.

## Referencias y qué tomar de cada una

| Referencia | Rasgo útil para Vértice | Límite |
|---|---|---|
| N3D, capturas compartidas por Sebastián: portada y catálogo de producto | Producto protagonista, titular directo y dos caminos visibles: explorar o hacer una consulta. | N3D vende diseños digitales y membresías. Vértice muestra solicitudes de fabricación FDM; no copiar modelo comercial, productos ni promesas. |
| [Fume](https://fume-studio.com/) | Foto editorial amplia seguida de fichas de producto con metadatos discretos. | No reutilizar sus fotos, promociones ni textos. |
| [Woodid](https://wearewoodid.com/) | Separar la pieza de catálogo del encargo personalizado y explicar el recorrido antes de pedir datos. | No reutilizar precios, plazos, materiales ni afirmaciones de fabricación. |
| [Formlabs Form 4](https://formlabs.com/products/form-4-basic-package/) | Orden claro entre imagen de producto, explicación y datos de producto. | Es otra tecnología y escala de fabricación; sus cifras, materiales y garantías no aplican a Vértice. |
| Tailwind Admin, captura compartida por Sebastián | Referencia futura para una consola interna con navegación y vistas de trabajo. | Es un panel administrativo; no usar sus tarjetas de métricas en la tienda pública. |
| Home anterior de Vértice, captura compartida por Sebastián | Sirve para ubicar el prototipo que se está reemplazando. | Se descartan su cubo, carbón y óxido, retícula, rótulos técnicos y dibujos SVG repetidos. |

## Esencia

1. Útil.
2. Material.
3. Cercano.

No debe parecer un dashboard, una ficha de ingeniería inventada, una plantilla de impresión 3D ni una extensión visual de Tienda-de-Impresion3D.

## Elemento firma

Escenas fotográficas conceptuales de objetos vistos en su uso. La imagen inspira la conversación, pero no demuestra que la pieza se haya fabricado, que exista en inventario o que tenga medidas confirmadas. El rótulo “Imagen conceptual” acompaña las imágenes generadas.

## Color

| Rol | Valor | Uso |
|---|---|---|
| Fondo base | #F4F1E9 | Lienzo cálido de toda la tienda. |
| Superficie elevada | #FFFEFA | Formulario y superficies que necesitan lectura. |
| Superficie secundaria | #E8ECF7 | Resúmenes, fondos de catálogo y estados neutrales. |
| Texto principal | #171B26 | Títulos y contenido. |
| Texto secundario | #717582 | Descripciones y ayuda. |
| Acento principal | #2949D2 | Enlaces, acción y énfasis editorial. |
| Acento breve | #F0D76D | Señal en CTA, avisos y detalle de composición. |
| Estado de error | #A73030 | Errores de validación. |

## Sistema de superficies

| Nivel | Superficie | Uso |
|---|---|---|
| 0 — Base | Marfil #F4F1E9 | Navegación y fondo general. |
| 1 — Elevada | Blanco #FFFEFA | Formulario y lectura prolongada. |
| 2 — Énfasis | Azul grisáceo #E8ECF7 o amarillo #F0D76D | Resumen de consulta y avisos. |
| 3 — Ambiente | Azul tinta #101A40 | Banda del recorrido y pie de página. |

No se crean fondos por sección fuera de estos cuatro niveles; las fotos conservan su fondo propio como objeto visual.

## Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Títulos | Iowan Old Style / Baskerville / Georgia, según disponibilidad del sistema | Titulares grandes y nombres de secciones; cursiva para un énfasis corto. |
| Texto y controles | Aptos / Segoe UI / Arial | Navegación, contenido y formularios. |
| Etiquetas técnicas | Cascadia Code / Consolas | Solo valores que realmente son técnicos; no decorar fichas con medidas inventadas. |

## Imágenes y movimiento

- Fotografía generada como concepto, con objetos plausibles de impresión FDM y fondos de estudio azul cobalto, marfil y amarillo tenue.
- No usar una imagen como prueba de acabado, disponibilidad, escala o tolerancia.
- Hover breve en imágenes y botones; la navegación no depende del hover. El CTA incorpora un relleno circular y movimiento corto de flecha.
- prefers-reduced-motion elimina el movimiento no esencial.
- No se instala un visor 3D ni scrollytelling mientras no haya geometrías y fotografías reales del taller.

## Pantallas de revisión

- [x] Home — primera versión de esta dirección, por revisar con Sebastián.
- [x] Catálogo — fichas con fotografía conceptual y aviso de datos de muestra.
- [x] Solicitud — formulario conectado a la API demo y resumen de referencia.

## Historial

- 2026-10-13: hoja creada; diseño de la entrega académica descartado.
- 2026-10-24: reemplazo provisional de la identidad anterior por una dirección editorial de catálogo público, usando Fume, Woodid, N3D y Formlabs como referencias delimitadas.
