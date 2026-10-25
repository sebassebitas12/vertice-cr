# Prueba vertical del MVP de VÃ©rtice

Esta carpeta permite evaluar una sola ruta completa con el stack propuesto en el MVP:
Next.js + React + TypeScript en la interfaz y una API Express separada. Express se usa porque aparece en la práctica de API REST del curso; el backend final sigue pendiente de confirmar contra los requisitos definitivos.

## Iniciar

Terminal 1:

    cd experimentos/stack-mvp/api
    npm.cmd run dev

Terminal 2:

    cd experimentos/stack-mvp/frontend
    npm.cmd run dev

Abre http://localhost:3000.

Si el frontend y la API usan otras direcciones, crea .env.local a partir de .env.example. Los valores predeterminados esperan la API en http://localhost:4000.

## QuÃ© se puede probar

- Buscar entre tres referencias ficticias del catÃ¡logo.
- Abrir una solicitud asociada a una pieza o iniciar una solicitud personalizada.
- Enviar descripciÃ³n, uso, cantidad y material preferido.
- Ver respuesta de validaciÃ³n y el estado PENDING_QUOTE.

El botÃ³n principal adapta la variante Calypso de Codrops: el cÃ­rculo de color oscuro crece al pasar el puntero o al enfocar con teclado. La licencia del ejemplo consultado es MIT; la adaptaciÃ³n mantiene solo ese gesto CSS. Se respeta prefers-reduced-motion.

## LÃ­mites de esta prueba

El catÃ¡logo y las solicitudes viven en memoria y desaparecen al reiniciar la API. No hay conexiÃ³n con Supabase ni n8n, cuentas, archivos, precios ni disponibilidad real. Es una prueba para revisar el stack y el flujo de MVP, no una selecciÃ³n definitiva ni una versiÃ³n lista para publicar.

La API valida de nuevo los campos y admite la cabecera Idempotency-Key. El frontend conserva los datos si la API falla. Una respuesta correcta deja el estado PENDING_QUOTE y price en null.


