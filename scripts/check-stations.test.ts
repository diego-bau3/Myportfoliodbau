import { describe, expect, test } from "bun:test";
import { PROJECT_MANIFEST } from "../src/data/projectManifest.ts";
import { stationLayout, STATION_PRESENTATIONS } from "../src/data/stationGeometry.ts";

const HOME_IMAGE_DIMENSIONS = {
  cnc: [639, 360],
  aircraft: [900, 339],
  so101: [605, 900],
  gripper: [1200, 854],
  wearable: [617, 760],
  car: [760, 583],
  bomba: [1448, 1086],
  harv: [1265, 712],
} as const;

describe("shared project detail stations", () => {
  test("every localized project uses the same presentation registry", () => {
    expect(Object.keys(STATION_PRESENTATIONS).sort()).toEqual(PROJECT_MANIFEST.map(({ key }) => key).sort());
  });

  for (const [key, preset] of Object.entries(STATION_PRESENTATIONS)) {
    test(`${key}: geometry matches the image reused from the home hangar`, () => {
      expect([preset.width, preset.height]).toEqual(HOME_IMAGE_DIMENSIONS[key as keyof typeof HOME_IMAGE_DIMENSIONS]);
    });

    for (const [width, height, fullHeight] of [[320, 440, 780], [390, 540, 860], [768, 760, 980], [745, 515, 708], [792, 650, 850], [950, 650, 900], [1267, 815, 1080]]) {
      test(`${key}: centered, grounded and clear of the gallery at ${width}x${height}`, () => {
        const layout = stationLayout(width!, height!, fullHeight!, preset);
        expect(layout.object.left + layout.object.width / 2).toBeCloseTo(width! / 2, 6);
        expect(layout.object.top + layout.object.height * preset.contact[1]).toBeCloseTo(layout.contactY, 6);
        expect(layout.object.width / layout.object.height).toBeCloseTo(preset.width / preset.height, 6);
        expect(layout.object.width).toBeLessThanOrEqual(preset.width);
        expect(layout.object.top).toBeGreaterThan(0);
        expect(layout.object.top + layout.object.height).toBeLessThanOrEqual(height!);
        expect(layout.contactY).toBeGreaterThan(layout.floorY);
        expect(layout.photo.left).toBeLessThanOrEqual(0);
        expect(layout.photo.top).toBeLessThanOrEqual(0);
        expect(layout.photo.left + layout.photo.width).toBeGreaterThanOrEqual(width!);
        expect(layout.photo.top + layout.photo.height + .001).toBeGreaterThanOrEqual(fullHeight!);
      });
    }
  }
});
