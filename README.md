# Donrich Portfolio

Portafolio cinematografico con Next.js App Router, TypeScript, GSAP, View Transitions, modo light/dark, Payload CMS y Supabase Postgres.

## Stack

- Next.js 16.1.6 + React 19 + TypeScript
- GSAP + ScrollTrigger (animacion narrativa por scroll)
- next-themes (theme toggle con persistencia)
- Payload CMS + @payloadcms/db-postgres
- Supabase Postgres (DATABASE_URI)
- API de contacto con guardado en Payload + email via Resend

## Rutas principales

- `/` Home
- `/proyectos` Catalogo con filtros
- `/proyectos/[slug]` Detalle de proyecto
- `/api/contact` Formulario de contacto global

## Requisitos previos

- Node.js 20+
- Proyecto en Supabase
- Base Postgres activa

## Configuracion

1. Copia variables de entorno:

```bash
cp .env.example .env.local
```

2. Completa valores en `.env.local`:

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY` (opcional)
- `CONTACT_FROM_EMAIL` (opcional)
- `CONTACT_TO_EMAIL` (opcional)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (opcional)

3. Instala dependencias:

```bash
npm install
```

4. Ejecuta migraciones de Payload:

```bash
npm run payload:migrate
```

5. Si es primera vez, crea categorias base:

```bash
npm run payload:seed
```

6. Ejecuta app Next:

```bash
npm run dev
```

7. (Opcional) Ejecuta admin de Payload en otro terminal:

```bash
npm run payload:dev
```

Admin disponible en `http://localhost:3001/admin`.

## Flujo recomendado Payload + Supabase

1. Crear proyecto en Supabase.
2. Obtener `DATABASE_URI` con `sslmode=require`.
3. Ejecutar migraciones de Payload.
4. Crear usuario admin en coleccion `users` desde Payload CLI/admin.
5. Cargar proyectos y marcar `featured=true` para homepage.

## Validaciones implementadas

- Formulario con validacion Zod
- Honeypot anti-spam
- Rate limit por IP (en memoria)
- Fallback de datos si Payload no esta disponible
- Fallback sin View Transition cuando el navegador no lo soporta
- Respeto de `prefers-reduced-motion`

## Notas

- El contenido actual incluye datos de ejemplo para que la UI sea funcional mientras compartes tu CV y tus mejores proyectos.
- Al cargar contenido real en Payload, el home y catalogo lo reflejan sin tocar codigo.
