from PIL import Image
from pathlib import Path
source = Path('public/assets')
out = Path('public/images')
out.mkdir(exist_ok=True)
images = {
    'cozinha-aberta': 'asweb-f450bc4b8c5368ac1b0671b686b556810.jpg',
    'cozinha-integrada': 'asweb-ca93c2dbc3947082460e19f51242ab0b0.jpg',
    'cozinha-linear': 'asweb-20fc625b081546ce6680e515e4aa7d410.jpg',
    'cozinha-clara': 'hero-cozinha.jpg',
    'sala-ripada': 'asweb-d8d070f1350d45a5b286fc533e4332100.jpg',
    'sala-natural': 'asweb-96573ea6a57c1ad6202a5fbed991183c0.jpg',
    'quarto-madeira': 'asweb-6ed318f7238a206e34449fc915a8e7340.jpg',
    'quarto-claro': 'asweb-67a2df494bf367e5281e4b79fe2515900.jpg',
    'escritorio-musica': 'asweb-fd4207595bc341242173867f785952c00.jpg',
    'escritorio-bancada': 'asweb-bad3778b1829f3cca58cf56c87abfed20.jpg',
    'banheiro-escuro': 'asweb-bd19c217a1de66e0e7037fd5d300ce790.jpg',
    'banheiro-claro': 'asweb-b207bc6cf6442961d08d7c3c82ebd0c80.jpg',
    'fabrica': 'nossa-fabrica.jpg',
    'detalhe-madeira': 'asweb-7f524d9560cf72eba3b3f04f9358814c0.jpg',
}
for name, filename in images.items():
    image = Image.open(source / filename).convert('RGB')
    for size in [640, 1280, 1920]:
        copy = image.copy()
        copy.thumbnail((size, size))
        copy.save(out / f'{name}-{size}.webp', 'WEBP', quality=83, method=6)
print(f'{len(images)*3} WebP images saved')
