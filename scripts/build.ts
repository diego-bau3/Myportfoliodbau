import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { PROJECT_MANIFEST } from "../src/data/projectManifest.ts";

await rm("dist", { force: true, recursive: true });

const build = await Bun.build({
  entrypoints: ["./index.html"],
  minify: true,
  outdir: "./dist",
  target: "browser",
});

if (!build.success) {
  build.logs.forEach((log) => console.error(log));
  process.exit(1);
}

const rootHtml = await readFile("dist/index.html", "utf8");
const rootedHtml = rootHtml
  .replaceAll('href="./', 'href="/')
  .replaceAll('src="./', 'src="/');

const routes = (["en", "es"] as const).flatMap((language) => [
  { language, path: `${language}` },
  ...PROJECT_MANIFEST.map(({ slug }) => ({
    language,
    path: `${language}/projects/${slug}`,
  })),
]);

for (const route of routes) {
  const output = join("dist", route.path, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(
    output,
    rootedHtml.replace(/<html lang="[^"]+">/, `<html lang="${route.language}">`),
  );
}

await writeFile("dist/404.html", rootedHtml);
await cp("CNAME", "dist/CNAME");

console.log(`Built the site and ${routes.length} localized routes.`);
