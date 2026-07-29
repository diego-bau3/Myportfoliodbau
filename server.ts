// Production server: serves the built dist/ folder. Local work uses `bun run dev`.
const DIST = new URL("./dist/", import.meta.url);
const INDEX = Bun.file(new URL("index.html", DIST));

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  hostname: "0.0.0.0",
  async fetch(request) {
    const { pathname } = new URL(request.url);
    const asset = Bun.file(new URL(`.${pathname}`, DIST));

    if (pathname !== "/" && pathname !== "/index.html" && (await asset.exists())) {
      // Bundled filenames carry a content hash, so they can never go stale.
      return new Response(asset, {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      });
    }

    return new Response(INDEX, { headers: { "content-type": "text/html" } });
  },
});

console.log(`Serving dist/ on port ${server.port}`);
