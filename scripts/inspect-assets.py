from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
files = list(Path('public/assets').glob('*.jpg')) + list(Path('public/assets').glob('logo-*.png'))
sheet = Image.new('RGB', (1200, ((len(files)+4)//5)*190), '#eaeaea')
d = ImageDraw.Draw(sheet)
for i, path in enumerate(files):
    im = Image.open(path).convert('RGB')
    thumb = ImageOps.contain(im, (232, 150))
    x, y = (i%5)*240, (i//5)*190
    sheet.paste(thumb, (x, y))
    d.text((x+3, y+153), f'{i}: {path.name[:24]}', fill='black')
    d.text((x+3, y+169), str(im.size), fill='black')
Path('qa').mkdir(exist_ok=True)
sheet.save('qa/assets-contact-sheet.jpg')
print('\n'.join(f'{i}: {p.name}' for i,p in enumerate(files)))
