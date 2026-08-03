// Bun turns asset imports into hashed URLs at build time; TS needs to be told.
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
