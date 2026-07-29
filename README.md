# Portafolio Diego Bau

Single-page portfolio en React + TypeScript. Bun es todo el toolchain
(bundler, dev server, runtime y servidor de producción), así que las únicas
dependencias de runtime son `react` y `react-dom`.

## Requisitos

[Bun](https://bun.com/docs/installation):

```bash
curl -fsSL https://bun.com/install | bash
```

## Desarrollo

```bash
bun install
bun run dev
```

Abrir `http://localhost:3000` (hot reload incluido).

## Scripts

| Script              | Qué hace                                            |
| ------------------- | --------------------------------------------------- |
| `bun run dev`       | Dev server con hot reload                           |
| `bun run build`     | Bundle de producción en `dist/`                     |
| `bun run start`     | Sirve `dist/` con `server.ts` (lo que usa Docker)   |
| `bun run typecheck` | `tsc --noEmit`                                      |

## Docker

```bash
docker build -t diego-portfolio .
docker run -p 3000:3000 diego-portfolio
```

Imagen multi-stage (~65 MB): `oven/bun:1` compila, `oven/bun:1-slim` sirve.
El puerto se toma de `PORT` (default 3000).

## Estructura

```text
index.html            entrada de Bun (monta #root)
server.ts             servidor estático de producción
Dockerfile            build + runtime
src/main.tsx          raíz de React
src/screens/          una pantalla completa por archivo (LandingScreen)
src/components/       piezas reutilizables (Hero, ProjectsStrip, ProjectCard,
                      ProjectDetail, ScrollCar)
src/hooks/            lógica compartida (useScrollScene)
src/data/             contenido y tipos (projects.ts)
src/env.d.ts          tipos de los imports de imágenes
src/styles.css        estilos
assets/               imágenes importadas desde TS; Bun las emite con hash
```

Una pantalla compone componentes y es dueña del estado; los componentes no
saben nada de la pantalla que los usa.
