# Contorno + centrado por el objeto (sin contar la sombra) + export webp.
import sys, glob, os
from PIL import Image, ImageFilter
src, out = sys.argv[1:3]; os.makedirs(out, exist_ok=True); SIZE = 400
for f in sorted(g for g in glob.glob(f"{src}/*.png") if not g.endswith(".mask.png")):
    im = Image.open(f).convert("RGBA").resize((400, 400), Image.LANCZOS)
    mf = f[:-4] + ".mask.png"
    if os.path.exists(mf):  # silueta completa (incluye plástico transparente)
        obj = Image.open(mf).convert("RGBA").resize((400, 400), Image.LANCZOS).split()[3].point(lambda v: 255 if v > 100 else 0)
    else:
        obj = im.split()[3].point(lambda v: 255 if v > 140 else 0).filter(ImageFilter.MedianFilter(3))
    ring = obj.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(0.7))
    edge = Image.new("RGBA", im.size, (96, 112, 105, 0)); edge.putalpha(ring.point(lambda v: int(v * 0.9)))
    comp = Image.new("RGBA", im.size, (0, 0, 0, 0)); comp.alpha_composite(edge); comp.alpha_composite(im)
    ob = ring.getbbox()                                    # objeto + contorno
    full = comp.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox()  # incluye sombra
    cx, cy = (ob[0] + ob[2]) / 2, (ob[1] + ob[3]) / 2
    half = max(ob[2] - ob[0], ob[3] - ob[1]) * 0.56
    half = max(half, cx - full[0], full[2] - cx, cy - full[1], full[3] - cy)  # que entre la sombra
    box = (int(cx - half), int(cy - half), int(cx + half), int(cy + half))
    sq = Image.new("RGBA", (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    sq.alpha_composite(comp.crop((max(box[0], 0), max(box[1], 0), min(box[2], 400), min(box[3], 400))), (max(-box[0], 0), max(-box[1], 0)))
    sq.resize((SIZE, SIZE), Image.LANCZOS).save(f"{out}/{os.path.basename(f)[:-4]}.webp", "WEBP", quality=86, method=4)
print("ok")
