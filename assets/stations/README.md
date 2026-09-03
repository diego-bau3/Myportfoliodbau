# Project-detail images

These are non-generative, alpha-masked derivatives of existing portfolio assets.
The owner explicitly approved direct masks/crops on 2026-09-02. RGB pixels are
retained from the inputs; no machine components were generated or redrawn.

| Detail | Original source | Treatment |
| --- | --- | --- |
| CNC | `../cnc/cnc-01.webp` | Higher-resolution photograph; exterior black mask with protected dark interiors |
| RC aircraft | `../rc-aircraft-cutout.webp` | Silhouette mask; detached background residue removed |
| SO-101 | `../so101-robotic-arm.webp` | Silhouette mask; detached background residue removed |
| Gripper | `../gripper/gripper-01-cutout.webp` | Detached residue removed; transparent margins trimmed |
| Holley | `../wearable-collector.webp` | Detached residue removed; transparent margins trimmed |
| Vehicle | `../brushless-motor-car.webp` | Detached residue removed |
| Pump | `../bomba/bomba-02.webp` | Original CAD render with background/dimension annotations masked |

Reproduce with `scripts/prepare-station-assets.py` (Pillow and NumPy).
All originals and documentary galleries remain unchanged. Pump photographs are
still in the project gallery; the previous generated checkerboard image is not
used by the new detail scene. Harv uses its existing, unaltered interface capture.

`src/data/stationGeometry.ts` holds the per-object scale and contact points.
`scripts/check-stations.test.ts` checks those against the PNGs and responsive sizes.
