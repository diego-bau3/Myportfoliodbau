"""Non-generative masks approved by the owner; original RGB pixels are preserved.

Run with Python + Pillow + NumPy. Never overwrites the source photographs.
The output is used only by project detail scenes, not the home page or gallery.
"""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OUTPUT = ASSETS / "stations"


def polygon_mask(size, polygons):
    # Supersampling smooths only the alpha edge, never the photographed subject.
    scale = 4
    mask = Image.new("L", (size[0] * scale, size[1] * scale))
    draw = ImageDraw.Draw(mask)
    for points in polygons:
        draw.polygon([(round(x * scale), round(y * scale)) for x, y in points], fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)


def substantial_components(alpha, minimum=300):
    """Remove detached background crumbs while keeping connected fine wires."""
    height, width = alpha.shape
    remaining = alpha > 12
    kept = np.zeros_like(remaining)
    for y, x in zip(*np.nonzero(remaining)):
        if not remaining[y, x]:
            continue
        queue = deque([(int(x), int(y))])
        remaining[y, x] = False
        component = []
        while queue:
            px, py = queue.popleft()
            component.append((px, py))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    nx, ny = px + dx, py + dy
                    if 0 <= nx < width and 0 <= ny < height and remaining[ny, nx]:
                        remaining[ny, nx] = False
                        queue.append((nx, ny))
        if len(component) >= minimum:
            xs, ys = zip(*component)
            kept[ys, xs] = True
    # Recover the original soft edges immediately adjoining retained components.
    support = np.asarray(Image.fromarray(kept.astype("uint8") * 255).filter(ImageFilter.MaxFilter(3))) > 0
    return np.where(support, alpha, 0).astype("uint8")


def save(key, image, alpha):
    image = image.convert("RGBA")
    image.putalpha(Image.fromarray(alpha))
    bounds = image.getchannel("A").getbbox()
    assert bounds, key
    image = image.crop(bounds)
    # Exact tight bounds give every scene an unambiguous visible footprint.
    destination = OUTPUT / f"{key}-detail-v1.png"
    image.save(destination, optimize=True)
    print(f"{key}: {image.width} x {image.height}; source bounds {bounds}; {destination.name}")


def clean_existing(key, source, polygons=None):
    image = Image.open(ASSETS / source).convert("RGBA")
    alpha = np.asarray(image.getchannel("A")).copy()
    if polygons:
        mask = np.asarray(polygon_mask(image.size, polygons))
        alpha = np.minimum(alpha, mask)
    save(key, image, substantial_components(alpha))


def cnc():
    image = Image.open(ASSETS / "cnc/cnc-01.webp").convert("RGB")
    rgb = np.asarray(image)
    # Keep dark interiors opaque; only remove the black exterior around them.
    protected = polygon_mask(image.size, [
        [(49, 225), (71, 211), (148, 216), (173, 201), (309, 207), (318, 198),
         (812, 207), (881, 196), (969, 189), (989, 306), (970, 411),
         (984, 751), (921, 815), (112, 820), (124, 694), (79, 683),
         (80, 620), (102, 615), (98, 399), (56, 405)],
        [(987, 308), (1130, 301), (1144, 340), (1154, 405), (1163, 532),
         (1190, 649), (1238, 702), (1233, 760), (975, 763), (963, 426)],
    ])
    bright = rgb.max(axis=2).astype(float)
    exterior = np.clip((bright - 3) / 15, 0, 1) * 255
    alpha = np.maximum(exterior, np.asarray(protected)).astype("uint8")
    # Source debris is detached from the photographed machine.
    save("cnc", image, substantial_components(alpha, minimum=500))


def pump():
    # Use the project's original CAD render, not the AI image with baked checkerboard.
    image = Image.open(ASSETS / "bomba/bomba-02.webp").convert("RGB")
    rgb = np.asarray(image)
    alpha = np.clip((255 - rgb.min(axis=2).astype(float)) / 20, 0, 1) * 255
    # Restrict to the pump assembly; keep dimension annotations outside its silhouette.
    mask = polygon_mask(image.size, [[
        (57, 211), (213, 153), (229, 121), (257, 110), (257, 44), (271, 44),
        (271, 88), (304, 79), (335, 84), (371, 75), (399, 105), (403, 163),
        (462, 183), (462, 239), (213, 307), (111, 276), (111, 227), (57, 242),
    ]])
    alpha = np.minimum(alpha.astype("uint8"), np.asarray(mask))
    save("bomba", image, substantial_components(alpha, minimum=500))


if __name__ == "__main__":
    OUTPUT.mkdir(exist_ok=True)
    cnc()
    clean_existing("so101", "so101-robotic-arm.webp", [[
        (28, 230), (168, 204), (180, 168), (182, 134), (228, 82), (250, 79),
        (285, 119), (259, 145), (265, 198), (247, 228), (266, 270), (328, 315),
        (376, 353), (376, 371), (291, 367), (280, 405), (290, 451), (334, 490),
        (386, 494), (429, 520), (432, 543), (412, 605), (407, 663), (416, 729),
        (400, 762), (244, 766), (225, 737), (206, 697), (223, 669), (211, 625),
        (191, 587), (166, 554), (137, 515), (116, 467), (100, 408), (87, 360),
        (56, 331), (30, 302), (23, 270),
    ]])
    clean_existing("aircraft", "rc-aircraft-cutout.webp", [
        [(53, 174), (61, 155), (97, 143), (140, 129), (213, 105), (255, 78),
         (287, 74), (402, 81), (456, 73), (477, 44), (498, 26), (517, 26),
         (534, 82), (648, 87), (650, 95), (562, 98), (552, 112), (528, 128),
         (466, 148), (545, 165), (623, 184), (747, 204), (860, 214), (879, 218),
         (875, 245), (866, 266), (762, 255), (621, 247), (500, 232), (423, 214),
         (388, 199), (315, 209), (253, 230), (194, 242), (154, 237), (100, 232),
         (69, 217), (53, 202)],
        [(74, 120), (87, 122), (76, 172), (69, 220), (55, 275), (48, 276), (57, 209)],
        [(165, 229), (192, 236), (191, 275), (210, 284), (211, 302), (201, 314),
         (186, 319), (168, 313), (154, 302), (153, 287), (166, 276)],
        [(399, 205), (409, 209), (446, 235), (452, 230), (463, 231), (469, 242),
         (468, 258), (460, 270), (447, 269), (436, 257), (435, 242)],
    ])
    clean_existing("car", "brushless-motor-car.webp")
    clean_existing("wearable", "wearable-collector.webp")
    clean_existing("gripper", "gripper/gripper-01-cutout.webp")
    pump()
