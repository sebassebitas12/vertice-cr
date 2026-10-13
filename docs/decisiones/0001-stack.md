# 0001 — Stack del startup

- **Estado:** propuesta (pendiente de confirmar por Sebastián)
- **Fecha:** 2026-10-13

## Contexto

La entrega académica usó React + Vite + JavaScript + JSON Server. Para un startup real hacen falta: SEO en el catálogo, usuarios reales, archivos STL, y un front end que Sebastián pueda dominar y mantener solo.

## Decisión propuesta

| Capa | Elección | Motivo |
|---|---|---|
| Front end | Next.js (App Router) + TypeScript | SEO, rutas, backend ligero, errores detectados antes de ejecutar |
| Estilos | Tailwind CSS v4 | Tokens centralizados, coherencia visual |
| Formularios | React Hook Form + Zod | Validación compartida |
| Datos y auth | Por definir según el curso de backend (Supabase como candidato) | Auth, base de datos y archivos |
| Pruebas | Jest o Vitest + Testing Library | Continuidad con lo ya aprendido |
| Despliegue | Por definir (Vercel como candidato) | Simplicidad |

## Pendientes

- Confirmar qué tecnología usa el curso de backend; puede cambiar la capa de datos.
- Confirmar pasarela de pago viable en Costa Rica y requisitos de facturación electrónica.

## Alternativas descartadas

- Seguir en React + Vite + JSON Server: bueno para prototipo, no para tienda real.
- Shopify: más rápido para vender, pero no sirve como medio de aprendizaje y limita la cotización con archivos STL.

