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


## Validaciones implementadas

- Formulario con validacion Zod
- Honeypot anti-spam
- Rate limit por IP (en memoria)
- Fallback de datos si Payload no esta disponible
- Fallback sin View Transition cuando el navegador no lo soporta
- Respeto de `prefers-reduced-motion`
  
