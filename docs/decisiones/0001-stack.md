# 0001 â€” Stack del startup

- **Estado:** propuesta (pendiente de confirmar por SebastiÃ¡n)
- **Fecha:** 2026-10-13

## Contexto

La entrega acadÃ©mica usÃ³ React + Vite + JavaScript + JSON Server. Para un startup real hacen falta: SEO en el catÃ¡logo, usuarios reales, archivos STL, y un front end que SebastiÃ¡n pueda dominar y mantener solo.

## DecisiÃ³n propuesta

| Capa | ElecciÃ³n | Motivo |
|---|---|---|
| Front end | Next.js (App Router) + TypeScript | SEO, rutas, backend ligero, errores detectados antes de ejecutar |
| Estilos | Tailwind CSS v4 | Tokens centralizados, coherencia visual |
| Formularios | React Hook Form + Zod | ValidaciÃ³n compartida |
| Datos y auth | Por definir segÃºn el curso de backend (Supabase como candidato) | Auth, base de datos y archivos |
| Pruebas | Jest o Vitest + Testing Library | Continuidad con lo ya aprendido |
| Despliegue | Por definir (Vercel como candidato) | Simplicidad |

## Pendientes

- Confirmar quÃ© tecnologÃ­a usa el curso de backend; puede cambiar la capa de datos.
- Confirmar pasarela de pago viable en Costa Rica y requisitos de facturaciÃ³n electrÃ³nica.

## Alternativas descartadas

- Seguir en React + Vite + JSON Server: bueno para prototipo, no para tienda real.
- Shopify: mÃ¡s rÃ¡pido para vender, pero no sirve como medio de aprendizaje y limita la cotizaciÃ³n con archivos STL.

