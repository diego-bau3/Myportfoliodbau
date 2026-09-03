import { afterEach, describe, expect, test } from "bun:test";
import { plugin } from "bun";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Asset imports are URLs in the browser; no image decoding is needed here.
plugin({
  name: "routing-test-assets",
  setup(build) {
    build.onLoad({ filter: /\.(png|webp|pdf|mp4)$/ }, ({ path }) => ({
      contents: `export default ${JSON.stringify(path)}`,
      loader: "js",
    }));
  },
});

const { LanguageProvider } = await import("../src/i18n.tsx");
const { default: HangarScreen } = await import("../src/screens/HangarScreen.tsx");
const { PROJECT_MANIFEST } = await import("../src/data/projectManifest.ts");
const { languageFromPath, pathWithLanguage, projectPath, projectSlugFromPath } =
  await import("../src/routing.ts");

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

describe("localized navigation with the root asset base", () => {
  for (const language of ["en", "es"] as const) {
    for (const search of ["", "?utm_source=portfolio&view=hangar"]) {
      test(`${language}${search}: every hangar anchor stays in the same document`, () => {
        const current = new URL(`https://diegobau.com/${language}/${search}`);
        Object.defineProperty(globalThis, "window", {
          configurable: true,
          value: { location: current },
        });
        const html = renderToStaticMarkup(
          createElement(LanguageProvider, null, createElement(HangarScreen)),
        );
        const base = new URL("/", current);
        const links = Array.from(html.matchAll(/<a\b[^>]*href="([^"]+)"/g))
          .map((match) => new URL(match[1]!.replaceAll("&amp;", "&"), base))
          .filter((url) => url.hash);

        expect(links.length).toBeGreaterThanOrEqual(10);
        for (const target of links) {
          // Changing origin/path/query would reload the page; only the hash may change.
          expect(target.origin).toBe(current.origin);
          expect(target.pathname).toBe(current.pathname);
          expect(target.search).toBe(current.search);
          expect(html).toContain(`id="${decodeURIComponent(target.hash.slice(1))}"`);
        }
        expect(links.some((url) => url.hash === "#project-harv")).toBe(true);
        expect(links.some((url) => url.hash === "#project-cnc-lathe")).toBe(true);
      });
    }

    test(`${language}: language switching preserves every project destination`, () => {
      const other = language === "en" ? "es" : "en";
      for (const { slug } of PROJECT_MANIFEST) {
        const path = projectPath(language, slug);
        expect(languageFromPath(path)).toBe(language);
        expect(projectSlugFromPath(path)).toBe(slug);
        expect(pathWithLanguage(other, path)).toBe(projectPath(other, slug));
      }
    });
  }
});
