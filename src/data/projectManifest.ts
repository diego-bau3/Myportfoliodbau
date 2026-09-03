export const PROJECT_MANIFEST = [
  { key: "aircraft", slug: "rc-aircraft" },
  { key: "cnc", slug: "cnc-lathe" },
  { key: "so101", slug: "so101" },
  { key: "gripper", slug: "interchangeable-gripper" },
  { key: "wearable", slug: "holley" },
  { key: "car", slug: "brushless-vehicle" },
  { key: "bomba", slug: "centrifugal-pump" },
  { key: "harv", slug: "harv" },
] as const;

export const PROJECT_SLUGS = Object.fromEntries(
  PROJECT_MANIFEST.map(({ key, slug }) => [key, slug]),
) as Record<(typeof PROJECT_MANIFEST)[number]["key"], string>;
