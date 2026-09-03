import { describe, expect, test } from "bun:test";
import { PROJECT_MANIFEST } from "../src/data/projectManifest.ts";
import { stationLayout, STATION_PRESENTATIONS } from "../src/data/stationGeometry.ts";

describe("shared project detail stations", () => {
  test("every localized project uses the same presentation registry", () => {
    expect(Object.keys(STATION_PRESENTATIONS).sort()).toEqual(PROJECT_MANIFEST.map(({ key }) => key).sort());
  });

  for (const [key, preset] of Object.entries(STATION_PRESENTATIONS)) {
    test(`${key}: asset dimensions match its undistorted presentation`, async () => {
      if (key === "harv") return;
      const bytes = new DataView(await Bun.file(new URL(`../assets/stations/${key}-detail-v1.png`, import.meta.url)).arrayBuffer());
      expect(bytes.getUint32(16)).toBe(preset.width);
      expect(bytes.getUint32(20)).toBe(preset.height);
      expect(bytes.getUint8(25)).toBe(6); // PNG RGBA, not a painted checkerboard.
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
