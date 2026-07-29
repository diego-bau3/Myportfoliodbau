FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY tsconfig.json index.html ./
COPY src ./src
COPY assets ./assets
RUN bun run build

FROM oven/bun:1-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY server.ts ./
USER bun
EXPOSE 3000
CMD ["bun", "server.ts"]
