import os
import urllib.request
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

out_dir = r'e:\antigravity projects\haveli\client\public\dishes'
os.makedirs(out_dir, exist_ok=True)

sources = {
    'kulcha-plate.png': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=85', # Stuffed Paratha with Butter
    'dal-plate.png': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',      # Thali & Dal
    'bhature-plate.png': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=85',  # Chole Bhature
    'refreshment-plate.png': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1000&q=85' # Lassi / drinks
}

def create_gourmet_plate(name, url):
    dest = os.path.join(out_dir, name)
    temp_path = os.path.join(out_dir, 'temp_' + name)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response, open(temp_path, 'wb') as out_file:
            out_file.write(response.read())
        raw_img = Image.open(temp_path).convert('RGB')
    except Exception as e:
        print(f"Fallback for {name}: {e}")
        raw_img = Image.new('RGB', (800, 800), color=(50, 10, 15))

    w, h = raw_img.size
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    cropped = raw_img.crop((left, top, left + min_dim, top + min_dim)).resize((800, 800), Image.LANCZOS)
    
    size = 800
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    margin = 40
    draw.ellipse((margin, margin, size - margin, size - margin), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=2))
    
    rim = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    rim_draw = ImageDraw.Draw(rim)
    rim_draw.ellipse((margin - 2, margin - 2, size - margin + 2, size - margin + 2), outline=(212, 175, 55, 200), width=3)
    rim = rim.filter(ImageFilter.GaussianBlur(radius=1))
    
    canvas.paste(cropped, (0, 0), mask)
    canvas = Image.alpha_composite(canvas, rim)
    
    canvas.save(dest, 'PNG')
    if os.path.exists(temp_path):
        os.remove(temp_path)
    print(f"Refreshed {name}")

for fname, furl in sources.items():
    create_gourmet_plate(fname, furl)
