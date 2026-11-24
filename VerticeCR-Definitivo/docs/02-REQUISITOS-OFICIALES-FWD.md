# Resumen de Requisitos Oficiales — FWD Costa Rica (Noviembre 2026)

Referencia rápida de lo que exigen los dos PDFs oficiales (**Proyecto Final Full Stack** + **Plan de Producción**) para no olvidar ningún entregable mientras diseñamos y construimos Vértice CR.

---

## 1. Fechas obligatorias
- **Primer avance:** Jueves **3 de diciembre de 2026**
- **Segundo avance:** Miércoles **9 de diciembre de 2026**

---

## 2. Entregable A — Anteproyecto (PDF o Word, ANTES de programar)
11 apartados mínimos:
1. Portada (proyecto, estudiante, programa, grupo, profesor, fecha)
2. Índice
3. Introducción (contexto, problema y a quién va dirigido)
4. Desarrollo (módulos, roles, entidades, 8 agentes de IA, APIs externas, 3 workflows n8n y relación entre sí)
5. Objetivo general (1 enunciado en infinitivo: el *qué*)
6. Objetivos específicos (3 a 6 en infinitivo, medibles: el *cómo*)
7. Requerimientos funcionales (`RF-01...`) y no funcionales (`RNF-01...`) con código, nombre, descripción, prioridad y rol/módulo
8. Historias de usuario (`HU-01...`) con formato *Como [rol], quiero [acción], para [beneficio]*, criterios de aceptación, prioridad/estimación y `RF/RNF` asociados
9. **Mockups de TODAS las pantallas** (PC y móvil: login, registro, recuperación, dashboard de cada rol, cada módulo, cada agente IA, pantallas con APIs externas, perfil, privacidad, términos y eliminación de cuenta)
10. **Libro de marca completo** (11 elementos: concepto, logotipo, retícula/área de protección, tamaños mínimos, paleta HEX/RGB/CMYK, tipografía, iconografía, fotografía, tono de voz, usos incorrectos, aplicaciones)
11. **Cronograma día a día** con fechas, actividad, `RF/HU`, entregable y estado hacia el `03/12` y `09/12`.

---

## 3. Requisitos técnicos obligatorios del sistema
- **Frontend:** React (consumo del backend propio, sesión, vistas por rol, responsivo, login + registro + recuperación + aceptación explícita de términos/privacidad).
- **Backend:** Node.js + Express en capas (`server`, `config`, `models`, `controllers`, `routes`, `middlewares`, `services`, `tests`, `.env` excluido + `.env.example`).
- **Base de datos SQL relacional (3FN):** MySQL o PostgreSQL (Supabase), con Diagrama ER, Diccionario de datos, entidades de seguridad (usuarios/roles), bitácora de agentes/integraciones, gobernanza (consentimientos y solicitudes de eliminación) y scripts de creación + seed.
- **Seguridad:** contraseñas con **`bcrypt`**, **JWT** con expiración y secreto en `.env`, autorización por roles validada en backend.
- **Agentes de IA:** al menos **8 agentes funcionales** en `backend/services/`, accesibles por rol y registrados en base de datos.
- **APIs externas reales:** al menos 1 (recomendado Costa Rica: **BCCR** o **Ministerio de Hacienda** — tipo de cambio y contribuyentes), siempre desde `backend/services/`.
- **n8n:** **3 workflows** reales replicando procesos del negocio, exportados en el repositorio con descripción.
- **Gobernanza de datos (Ley N.° 8968 Costa Rica):** Política de privacidad, Términos y condiciones, y flujo real en el perfil para **eliminar / anonimizar la cuenta** (confirmación de identidad, registro en BD, conservación contable justificada y notificación).
- **Pruebas unitarias:** Jest o equivalente (middlewares, roles, controladores y services con mocks), ejecutables con 1 comando.
- **GitHub:** ramas obligatorias (`main`, `develop`, `feature/...`, `fix/...`), commits constantes y Pull Requests.

---

## 4. Entregable B — Plan de Producción (PDF o Word + URL pública HTTPS)
- **Condición obligatoria:** accesible desde internet mediante **URL pública HTTPS** (no `localhost`).
- **18 apartados:** Portada/índice, Introducción, Objetivos, Arquitectura de producción (diagrama), Selección de proveedores, Tabla comparativa (min. 2 alternativas/componente), Estimación de costos, Variables de entorno (solo nombres, nunca valores), BD en producción, Proceso de despliegue automático desde `main`, Dominio y HTTPS, Seguridad, Respaldos, Monitoreo y logs, Plan de reversión, **Pruebas posteriores sobre la URL pública (8 capturas)**, Limitaciones/riesgos y Conclusiones.
- **8 pruebas obligatorias con captura en URL pública:** carga PC y móvil, registro/login encriptado, vistas/rutas por rol, agentes IA en producción, APIs externas actualizadas, 3 workflows n8n ejecutándose, páginas legales + eliminación de cuenta, HTTPS sin exponer credenciales.
