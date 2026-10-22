# 0002 — Frontend modular del MVP académico

- Fecha: 2026-10-22
- Alcance: proyecto final de backend y demo de hackathon.
- Estado: recomendación de trabajo del asesor, a revisar con un prototipo pequeño; no es aprobación visual de Sebastián ni decisión del startup comercial.
- Relación: [anteproyecto](../proyecto-final-backend/README.md), [N3D y demo IA](../proyecto-final-backend/referencia-n3d-y-demo-ia.md). El ADR 0001 trata el startup futuro.

## Necesidad

Sebastián quiere una interfaz atractiva inspirada en N3D y facilidad para adaptar componentes de referencia sin cambios extensos en toda la página. La aplicación se reconstruirá desde cero, con backend primero. Supabase está confirmado y n8n coordinará una función central de IA.

## Selección recomendada

| Pieza | Uso |
|---|---|
| Next.js App Router | Páginas y layouts, presentación del catálogo y herramientas de imágenes y fuentes. |
| TypeScript | Contratos de componentes y datos; ayuda a detectar props y respuestas incompatibles. No produce el diseño visual. |
| Tailwind CSS | Composición y estilos locales usando variables de marca centralizadas. |
| shadcn/ui, componentes seleccionados | Base editable para controles, diálogos y formularios; adaptar a la marca. |
| React Hook Form + Zod | Estado del formulario y validación de datos propuestos por la IA. El backend vuelve a validar. |
| CSS y, cuando aporte valor, Motion | Estados y transiciones breves. Incorporar Motion al existir una interacción concreta. |

La API de negocio permanece separada y se implementa con el stack de backend del curso. Supabase aloja PostgreSQL. Las reglas de solicitudes, cotizaciones y permisos pertenecen a esa API; Next presenta el frontend. n8n utiliza herramientas acotadas y no expone credenciales al navegador.

### Alternativas y costo real

Vite + React también permite estas composiciones y bibliotecas; shadcn publica instalación para ambos. Vite implica menos conceptos cuando se construye una SPA. Next aporta páginas/layouts y herramientas de catálogo dentro de una convención común, a cambio de aprender la separación servidor/cliente. Elegir Next no garantiza mayor calidad visual ni cambios sin regresiones.

SvelteKit/Vue requerirían otra tecnología y adaptar referencias React. Para este MVP se prioriza continuidad con ese ecosistema. Un editor visual tipo arrastrar y soltar es una decisión distinta: esta recomendación contempla código modular editable con ayuda de agentes. Sebastián aún debe confirmar si espera edición visual directa.

## Qué mostró el documento 04 anterior

Fuente inspeccionada: [04-DISENO-VISUAL-Y-ACCESIBILIDAD.md, rama Pruebas](https://github.com/sebassebitas12/Tienda-de-Impresion3D/blob/Pruebas/docs/04-DISENO-VISUAL-Y-ACCESIBILIDAD.md).

- Incluye React Bits, Motion, Radix, shadcn, Magic UI, Aceternity y galerías como Godly, Awwwards y Refero. No todas son paquetes: varias son fuentes de criterio y ejemplos visuales.
- Conserva contratos de un mockup congelado, JavaScript/JSX y restricciones sobre nuevas dependencias. Esas reglas acotaban cómo se trasladaban referencias al proyecto anterior; no demuestran una incompatibilidad técnica de Vite.
- Describe una identidad industrial de superficies cálidas oscuras, naranja selectivo, Space Grotesk y JetBrains Mono. Se conserva como antecedente; la nueva composición necesita confirmación.
- No se auditó el código CSS/React anterior en esta revisión: no se atribuye una causa exacta a sus problemas de diseño.
- Las comparaciones antiguas sobre competidores no se reutilizan como hallazgos actuales sin comprobarlas.

React Bits ofrece variantes JavaScript/TypeScript y CSS/Tailwind. Muchas referencias ya son compatibles con React. Un componente concreto requiere revisar su licencia, dependencias, comportamiento y estilos; una referencia HTML, Vue o de otro stack exige adaptación.

## Cómo añadir un botón sin rehacer la página

Organización propuesta, aún no implementada:

- componentes/ui: Button, Input, Dialog y controles compartidos.
- componentes/catalogo: TarjetaProducto, FiltrosCatalogo y GaleriaProducto.
- componentes/solicitud: FormularioSolicitud, SugerenciasIA y ResumenConfirmacion.
- páginas/layouts: composición de esos bloques.
- estilos: variables de color, fuente, espacio y radio; estilos especiales encapsulados.

Ejemplo de cambio: añadir “Consultar esta pieza” a una tarjeta. La tarjeta tiene una zona de acciones que admite un botón; el botón usa una variante local. La acción transmite el ID de producto al flujo de solicitud mediante el servicio correspondiente. Se comprueba el espacio en móvil y teclado, y no se edita la estructura global para acomodarlo.

Si se adapta un botón de React Bits o una referencia similar, se encapsula su comportamiento y se normalizan sus colores, tamaños y foco. No se pega una hoja de estilos que cambie todos los botones del sitio. No se cambian los tokens globales para resolver el aspecto de una sola pieza.

Esto reduce el alcance del cambio, pero no elimina la necesidad de revisar desbordes, interacciones, accesibilidad y tamaño de dependencias. Añadir un botón tampoco crea automáticamente la función que debe ejecutar.

## IA que completa la página

El modelo devuelve datos estructurados y referencias a productos, nunca código arbitrario que se ejecuta en el navegador.

Cada campo conserva valor, origen y estado: escrito por el usuario, propuesto por IA o aceptado por el usuario. La IA propone cambios sin borrar lo escrito; si una sugerencia contradice un valor confirmado, muestra la diferencia y solicita elegir. Es posible deshacer una aplicación. Un campo faltante permanece vacío y genera una pregunta útil.

El cliente revisa una vista previa antes de confirmar el envío. Guardar y cambiar estados requiere una operación validada por la API, con protección contra duplicados y control del propietario. El asistente conserva el borrador ante errores o navegación prevista.

## Dirección visual por confirmar

N3D fue revisado en viewport estrecho: fotografía protagonista, superficies oscuras, acento naranja y jerarquía sencilla. El documento 04 aporta una dirección industrial más expresiva. Se preguntó a Sebastián si prefiere limpieza de N3D, identidad industrial simplificada o combinación por áreas; la respuesta no se presume.

El siguiente prototipo debe comparar composición de portada/catálogo y un formulario asistido con datos de muestra. Antes de programarlo se aprueban disposición, tipografía, fotografía y un conjunto pequeño de componentes. No se exige montar una aplicación completa para decidir cómo debe verse.

## Criterios de aceptación de esta arquitectura

1. Añadir una acción a una tarjeta requiere cambios en la tarjeta/acción y su servicio, sin reestructurar las páginas ajenas.
2. Una variante visual de botón no cambia todos los botones.
3. Navegación, formulario y asistente se componen con estados de carga, vacío, error y éxito definidos.
4. Las sugerencias de IA respetan las ediciones del cliente y pueden revisarse/deshacerse antes de enviar.
5. Los controles se pueden usar con teclado y en móvil; el movimiento respeta reduced-motion.
6. Las dependencias se incorporan por necesidad concreta, no por aparecer en una galería.
7. Las reglas de negocio se prueban en el backend; la UI no trata la respuesta del modelo como autorización.

## Fuentes oficiales consultadas

- [shadcn para Next.js](https://ui.shadcn.com/docs/installation/next) y [para Vite](https://ui.shadcn.com/docs/installation/vite).
- [Next.js: componentes de servidor y cliente](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- [React Bits: variantes e introducción](https://reactbits.dev/get-started/introduction).
- [Motion para React](https://motion.dev/docs/react).

Son fuentes de compatibilidad y capacidades. La elección responde al contexto del proyecto; no es un benchmark de facilidad o rendimiento.
