# INDATTA Landing

Landing page de INDATTA construida con React, TypeScript y Vite. La interfaz está organizada con Atomic Design y reutiliza assets, fuentes locales y estilos propios del proyecto.

## Requisitos

- Node.js 22 o superior
- npm

## Instalación

```bash
npm install
```

## Levantar en desarrollo

```bash
npm run dev
```

Vite mostrará la URL local en consola. Por defecto suele ser:

```text
http://localhost:5173/
```

Si necesitas usar una IP local explícita:

```bash
npm run dev -- --host 127.0.0.1
```

## Validar el proyecto

```bash
npm run lint
npm run build
```

El build de producción queda en:

```text
dist/indatta-landing-react
```

## Previsualizar el build

Primero compila:

```bash
npm run build
```

Luego levanta la preview:

```bash
npm run preview
```

## Estructura principal

```text
src/
  content/              Contenido tipado de la landing
  features/landing/     Página y secciones principales
  hooks/                Lógica reutilizable de UI y formulario
  shared/
    atoms/              Componentes base
    molecules/          Composiciones pequeñas
    organisms/          Bloques grandes reutilizables
  types/                Contratos TypeScript
```

## Formulario de contacto

El formulario usa estado controlado en React y validaciones con `zod`. Envía el payload a:

```text
/api/contacto
```

Para el canal `WhatsApp`, después de recibir confirmación abre una conversación con el número configurado en `src/content/landingContent.ts`.
