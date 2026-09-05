/** Shared camera/floor coordinates for all project detail scenes. */
export type StationPresentation = {
  mode: "object" | "software";
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  contact: readonly [number, number];
  shadowWidth: number;
};

export const STATION_PRESENTATIONS = {
  cnc: { mode: "object", width: 639, height: 360, maxWidth: .62, maxHeight: .50, contact: [.43, .99], shadowWidth: .72 },
  aircraft: { mode: "object", width: 900, height: 339, maxWidth: .80, maxHeight: .46, contact: [.30, .985], shadowWidth: .43 },
  so101: { mode: "object", width: 605, height: 900, maxWidth: .42, maxHeight: .49, contact: [.70, .99], shadowWidth: .48 },
  gripper: { mode: "object", width: 1200, height: 854, maxWidth: .66, maxHeight: .49, contact: [.13, .99], shadowWidth: .23 },
  wearable: { mode: "object", width: 617, height: 760, maxWidth: .48, maxHeight: .52, contact: [.16, .81], shadowWidth: .37 },
  car: { mode: "object", width: 760, height: 583, maxWidth: .60, maxHeight: .47, contact: [.49, .99], shadowWidth: .68 },
  bomba: { mode: "object", width: 1448, height: 1086, maxWidth: .60, maxHeight: .43, contact: [.50, .98], shadowWidth: .73 },
  harv: { mode: "software", width: 1265, height: 712, maxWidth: .80, maxHeight: .55, contact: [.50, 1], shadowWidth: .83 },
} as const satisfies Record<string, StationPresentation>;

export type StationKey = keyof typeof STATION_PRESENTATIONS;

export function stationLayout(width: number, height: number, fullHeight: number, preset: StationPresentation) {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const floorY = safeHeight * .79;
  const contactY = safeHeight * .90;
  // One camera transform for the photograph and all floor/contact coordinates.
  // The reference floor is y=700, the center bay is x=838, in the 1672x941 source.
  const photoScale = Math.max(safeWidth / 550, floorY / 700, (fullHeight - floorY) / 241);
  const aspect = preset.width / preset.height;
  const objectWidth = Math.min(safeWidth * preset.maxWidth, safeHeight * preset.maxHeight * aspect, preset.width);
  const objectHeight = objectWidth / aspect;
  const left = (safeWidth - objectWidth) / 2;
  const top = contactY - objectHeight * preset.contact[1];

  return {
    photo: { width: 1672 * photoScale, height: 941 * photoScale, left: safeWidth / 2 - 838 * photoScale, top: floorY - 700 * photoScale },
    object: { width: objectWidth, height: objectHeight, left, top },
    shadow: { left: left + objectWidth * preset.contact[0], top: contactY, width: objectWidth * preset.shadowWidth, height: Math.max(9, objectHeight * .055) },
    floorY,
    contactY,
  };
}
