# Business Solutions: del proceso comercial a los datos y agentes

**Sesiones:** 29–30 de octubre de 2026.  
**Estado:** teoría estudiada y práctica parcial.  
**Fuentes:** PDF compartido `Primer_Postejercicio_Business_Solutions(1).pdf`, tutoría y capturas de MySQL Workbench compartidas por Sebastián. El 30 de octubre informó que no pudo terminar la práctica y priorizó el módulo de mercadeo. El resumen del resultado previsto no acredita una entrega terminada.

## 1. Entender el negocio antes del sistema

Business Solutions conecta una necesidad, un servicio, un proceso operativo y evidencia para decidir. Antes de elegir tablas o agentes: identificar a quién se atiende, qué problema tiene, quién decide/paga, qué se entrega y cómo se comprobará el resultado.

El caso académico independiente fue **Merma Cero**, consultoría para reducir desperdicios en restaurantes pequeños y medianos de la GAM: sodas, bufés, cafeterías con cocina y restaurantes. Servicios: diagnóstico, compras/almacenamiento, preparación/porciones, capacitación y seguimiento. La disposición a pagar y los precios no quedaron validados comercialmente. Los ejemplos y datos fueron ficticios; no se garantiza ahorro.

La base diseñada administra el mercadeo y las ventas de la consultora. Medir inventario, recetas y desperdicios dentro de cada restaurante sería otro alcance.

## 2. Recorrido del cliente y embudo

- **Recorrido:** perspectiva del cliente. Conciencia del problema, consideración de alternativas y decisión. Es una simplificación: puede comparar, volver atrás o abandonar.
- **Embudo:** perspectiva del negocio. Registra avances y pérdidas entre estados definidos.
- **Lead:** contacto interesado; no equivale a cliente.
- **Prospecto:** contacto que cumple criterios acordados para profundizar.
- **Oportunidad:** posible contratación concreta.
- **Propuesta:** oferta con alcance, precio, condiciones, vigencia y versión.
- **Contrato:** acuerdo formal; no equivale automáticamente a ingreso cobrado ni utilidad.

Las definiciones de etapas varían por negocio: documentar sus criterios de entrada/salida. Un cliente puede tener varias oportunidades, y una oportunidad varias versiones de propuesta. Perder una venta posterior no borra compras anteriores.

## 3. Mercadeo, canales y contenido

Se trabajaron tres estrategias: contacto directo, contenido orgánico y anuncios en Google. Cada campaña necesita objetivo, público, responsable, fechas, canales y presupuesto justificado.

Un canal es el medio de contacto; una campaña es una iniciativa con objetivo y período. El contenido debe corresponder a la pregunta del cliente: reconocer pérdidas, entender cómo se diagnostican o evaluar una propuesta.

**Presupuesto** es planificación; **gasto** es ejecución real. Una cifra ilustrativa no demuestra que un canal sea rentable. Alcance y seguidores ayudan a describir atención, pero no prueban ventas.

## 4. Equipos y traspaso a ventas

Mercadeo atrae y ayuda a calificar; ventas profundiza, propone y negocia; gerencia define criterios y aprueba lo que corresponda. Son responsabilidades, no cantidades obligatorias de personas: en un negocio pequeño una persona puede asumir varios roles. Liderar implica objetivos claros, responsables, criterios, revisión de resultados y resolución de bloqueos.

Un traspaso debe conservar: contacto, origen, necesidad, interés mostrado, presupuesto declarado o desconocido, autoridad de decisión, interacciones, siguiente acción, responsable y plazo. Se pierde información cuando cambia de manos sin contexto, se dispersa en mensajes o nadie confirma recepción.

El caso propuso aceptación/rechazo con motivo y primer intento de contacto dentro de **un día hábil**. Fue un acuerdo del ejercicio: no es norma universal ni compromiso de Vértice. Distinguir acuse automático, respuesta de ventas, intento de contacto y conversación efectiva; también definir horario y calendario laboral.

Para contenido se propuso borrador → revisión → aprobación/rechazo → publicación. Guardar quién aprobó, fecha y copia de la versión exacta. Cambiar el contenido aprobado requiere revisar la nueva versión.

## 5. Traducir el proceso a una base relacional

El modelo académico llegó a 22 tablas: restaurantes, contactos, empleados, roles, empleados_roles, canales, campanas, campanas_canales, etapas_recorrido, etapas_embudo, leads, historial_leads, contenidos, revisiones_contenido, interacciones, traspasos, servicios, oportunidades, propuestas, contratos, gastos y resultados_canales.

Lecciones reutilizables:
- Separar conceptos que cambian de forma independiente; usar PK/FK, tablas intermedias y restricciones.
- La normalización evita dependencias y duplicaciones innecesarias; más tablas no garantizan un mejor diseño.
- Conservar eventos con fecha, actor y motivo para reconstruir cambios de etapa.
- Un snapshot conserva lo entregado/aprobado en ese momento aunque los datos actuales cambien.
- Diferenciar el diagrama EER, el script DDL y la base realmente creada en el servidor; importar un modelo no demuestra ejecución.
- Verificar el SQL generado por herramientas: no asumir que conserva todas las restricciones.
- Algunas reglas caben en CHECK/FK/UNIQUE; otras requieren lógica de aplicación, permisos y transacciones. Una FK no demuestra que quien aprobó tenía autoridad.
- No sumar gastos o contratos después de unir varias relaciones 1:N sin controlar duplicaciones; agregar cada conjunto al nivel adecuado.

## 6. Métricas y sus límites

| Métrica | Definición operativa básica |
|---|---|
| CTR | Clics / impresiones × 100. |
| CPC | Gasto publicitario / clics atribuibles. |
| Conversión | Entidades que avanzan / entidades elegibles de origen × 100. |
| CAC | Costos de adquisición definidos / clientes nuevos adquiridos. |
| ROAS | Ingresos atribuidos a anuncios / gasto publicitario. |
| Ciclo de venta | Tiempo entre el inicio comercial definido y el cierre. |
| Ticket promedio | Valor de ventas / número de ventas, con criterio consistente. |

Definir período, moneda, unidad de conteo, atribución, costos incluidos y tratamiento de anulaciones. Evitar dividir por cero: reportar ausencia de base, no inventar cero.

Para CAC, un segundo contrato del mismo restaurante no es un cliente nuevo. No mezclar conversiones de personas con conversiones de oportunidades. Las conversiones por cohorte y las cuentas del mes responden preguntas diferentes.

Usar importes firmados para ROAS solo sería una aproximación explícita de valor contratado atribuible, no ROAS de ingresos cobrados. ROAS tampoco mide utilidad. El alcance diario no se suma como personas únicas del mes.

Las métricas fueron explicadas y previstas; no se completaron ni verificaron sus consultas finales en esta práctica.

## 7. Arquitectura de agentes: diseño, no implementación

La parte 2.2 requería documentar un orquestador central y agentes especializados que se comunican mediante él. Se resumieron como candidatos contenido, calificación, traspaso, apoyo comercial y analítica.

Cada agente necesita objetivo, entradas/salidas, tablas, herramientas autorizadas, límites y puntos de aprobación humana. El orquestador coordina; no sustituye permisos ni validaciones. La base conserva el estado persistente; una conversación del modelo no basta como registro comercial.

Ejemplo conceptual: llega una consulta → se detectan datos faltantes → se completa la evaluación → se prepara un traspaso con contexto → ventas confirma recepción. Una IA no debe inventar presupuesto, autoridad, disponibilidad o resultados. Las aprobaciones comerciales y de publicación requieren responsables definidos.

## 8. Posibles aplicaciones a Vértice — sin aprobar

| Aprendizaje | Posible uso a evaluar |
|---|---|
| Conservar contexto al traspasar | Pasar de una consulta a evaluación técnica sin perder archivo, material solicitado, cantidad, uso y dudas. |
| Diferenciar etapas | Separar interés, solicitud, cotización y aceptación según reglas vigentes. |
| Versionar propuestas | Conservar alcance y condiciones que realmente aceptó el cliente. |
| Medir resultados | Analizar consultas, cotizaciones y ventas con períodos y criterios claros. |
| Autoridad y agentes | Preparar borradores o detectar faltantes mediante herramientas autorizadas; revisión humana según operación. |

Estas posibilidades no aprueban un CRM, 22 tablas, MySQL, campañas pagadas, presupuesto, plazos ni nuevos agentes para el producto. Se conserva la regla vigente: una solicitud personalizada sin cotizar permanece `PENDING_QUOTE`; no inventar precios ni fechas. El catálogo bajo pedido y el servicio personalizado pueden necesitar recorridos distintos.

## 9. Decisiones y práctica real

**Autorizado en esta sesión:** conservar lo aprendido en la documentación de Vértice, distinguiendo teoría, práctica y aplicaciones candidatas. No se adoptaron nuevas decisiones de producto.

**Practicado:** modelado EER, creación de 22 tablas en MySQL y carga parcial con capturas de ejecución. Último bloque verificado: traspasos e interacciones; véase el [registro](../practicas/09-business-solutions-merma-cero.md). No se importa la solución académica al código del startup.
