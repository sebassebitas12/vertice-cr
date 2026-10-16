# Fundamentos de POO en JavaScript

- **Registro:** 2026-10-16
- **Área:** Backend — fundamentos de programación
- **Estado:** estudiado y practicado en clase (informado por el estudiante)
- **Fuente:** presentación «Programación Orientada a Objetos en JavaScript» (16 diapositivas); prácticas #2 y #3 compartidas en la sesión.
- **Alcance:** apuntes de conceptos, no copia de soluciones ni evaluación.

## Qué se estudió

La **programación orientada a objetos (POO)** agrupa datos y comportamiento relacionado para modelar problemas.

- **Clase:** plantilla definida con `class`.
- **Objeto o instancia:** ejemplar concreto creado con `new`.
- **Constructor:** inicializa datos cuando se crea una instancia.
- **`this`:** referencia al objeto con el que se trabaja.
- **Método:** función asociada a una clase.
- **Getters y setters:** acceso controlado a atributos; los setters pueden validar.
- **Campos privados `#campo`:** estado interno no accesible directamente desde fuera.

## Los cuatro pilares

| Pilar | Idea de la clase | Herramienta o ejemplo |
|---|---|---|
| Encapsulamiento | Proteger estado y exponer operaciones públicas | `#saldo`, `get saldo()` |
| Herencia | Reutilizar y extender comportamiento | `extends`, `super()` |
| Polimorfismo | Igual método, comportamiento distinto según el objeto | `hacerSonido()` en `Perro` y `Gato` |
| Abstracción | Exponer operaciones esenciales ocultando los pasos internos | `encender()` como interfaz simple |

También se practicó **herencia multinivel** (padre → hijo → nieto), según lo comentado sobre las clases realizadas localmente. No se conservan ni se requieren esos archivos.

## Ideas técnicas relevantes

- `super()` inicializa la parte heredada de la clase padre en un constructor hijo.
- `super.metodo()` permite reutilizar comportamiento del padre al extenderlo.
- La composición suele ser preferible a jerarquías de herencia profundas; usar POO cuando datos y comportamiento pertenezcan juntos.
- Evitar clases gigantes, exponer indiscriminadamente campos y herencias excesivas.

## Prácticas realizadas

- **#2 — Los cuatro pilares:** ejercicio de zoológico con clases `Animal`, `Perro`, `Gato` y `Zoologico`; campos privados, movimiento, sonidos, alimentación y polimorfismo. Ver [registro](../practicas/02-cuatro-pilares-poo.md).
- **#3 — Carrito de compras:** `Producto` y `CarritoDeCompras`; cantidades, stock, total, cupón y resumen. Ver [registro](../practicas/03-carrito-compras-poo.md).

**Nota sobre el registro:** el estudiante indicó que ya realizó las prácticas. Este registro no certifica ni inspecciona las implementaciones locales ni atribuye resultados de ejecución no vistos.

## Relación futura con backend

POO aporta vocabulario para modelar entidades y comportamientos. Más adelante puede conectarse con persistencia, APIs y bases de datos, sin elegir ahora una arquitectura ni imponer clases al startup.

## Fuentes y límites

La presentación recorre clases/objetos, constructor, `this`, métodos, pilares, acceso privado, `extends`/`super`, buenas prácticas y un reto de empleados. Los enunciados #2 y #3 son ejercicios académicos de JavaScript con `module.exports`; no son requisitos de producción de Vértice. Los tres PDF fueron compartidos en la conversación, **no se suben al repositorio**.
