export type RouteLanguage = "en" | "es";

const LANGUAGE_SEGMENT = /^\/(en|es)(?=\/|$)/;
const PROJECT_ROUTE = /^\/(?:en|es)\/projects\/([^/]+)\/?$/;

export function languageFromPath(pathname = window.location.pathname): RouteLanguage | null {
  const match = pathname.match(LANGUAGE_SEGMENT);
  return match?.[1] === "en" || match?.[1] === "es" ? match[1] : null;
}

export function projectSlugFromPath(pathname = window.location.pathname): string | null {
  return pathname.match(PROJECT_ROUTE)?.[1] ?? null;
}

export function homePath(language: RouteLanguage): string {
  return `/${language}/`;
}

/** Root-relative anchors preserve the locale despite the asset <base href="/">. */
export function homeSectionPath(
  language: RouteLanguage,
  sectionId: string,
  search = "",
): string {
  return `${homePath(language)}${search}#${encodeURIComponent(sectionId)}`;
}

export function projectPath(language: RouteLanguage, slug: string): string {
  return `/${language}/projects/${slug}/`;
}

export function pathWithLanguage(
  language: RouteLanguage,
  pathname = window.location.pathname,
): string {
  if (LANGUAGE_SEGMENT.test(pathname)) {
    return pathname.replace(LANGUAGE_SEGMENT, `/${language}`);
  }
  return homePath(language);
}

export function replaceRoute(pathname: string): void {
  window.history.replaceState(window.history.state, "", pathname);
}

export function pushRoute(pathname: string): void {
  window.history.pushState({}, "", pathname);
}
