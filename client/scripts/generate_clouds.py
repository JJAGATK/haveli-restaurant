import os
import numpy as np
from PIL import Image, ImageFilter

out_dir = r'e:\antigravity projects\haveli\client\public\clouds'
os.makedirs(out_dir, exist_ok=True)

def generate_cloud(width, height, seed, bias_left=False, bias_right=False):
    np.random.seed(seed)
    noise = np.zeros((height, width), dtype=np.float32)
    scales = [16, 32, 64, 128, 256]
    weights = [0.08, 0.15, 0.25, 0.32, 0.2]
    
    for scale, weight in zip(scales, weights):
        sw, sh = max(4, width // scale), max(4, height // scale)
        small = np.random.rand(sh, sw).astype(np.float32)
        im = Image.fromarray(small).resize((width, height), resample=Image.BICUBIC)
        noise += np.array(im) * weight

    noise = (noise - noise.min()) / (noise.max() - noise.min() + 1e-6)
    
    y, x = np.ogrid[:height, :width]
    cx, cy = width / 2.0, height / 2.0
    
    y_mask = np.clip(1.0 - (y - cy)**2 / (cy**2 * 1.5), 0, 1)
    
    if bias_left:
        x_mask = np.clip((width * 0.85 - x) / (width * 0.65), 0, 1)
        mask = x_mask * y_mask
    elif bias_right:
        x_mask = np.clip((x - width * 0.15) / (width * 0.65), 0, 1)
        mask = x_mask * y_mask
    else:
        dist_sq = ((x - cx) / (cx * 0.85))**2 + ((y - cy) / (cy * 0.75))**2
        mask = np.clip(1.0 - dist_sq, 0, 1)
        
    alpha = np.clip((noise - 0.22) / 0.78, 0, 1) * mask
    alpha = np.power(alpha, 1.1) * 255.0
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    
    r = np.full((height, width), 252, dtype=np.uint8)
    g = np.full((height, width), 248, dtype=np.uint8)
    b = np.full((height, width), 240, dtype=np.uint8)
    
    img = Image.fromarray(np.stack([r, g, b, alpha], axis=-1), mode='RGBA')
    img = img.filter(ImageFilter.GaussianBlur(radius=8))
    return img

c_left = generate_cloud(1400, 900, seed=42, bias_left=True)
c_left.save(os.path.join(out_dir, 'cloud-left.png'))

c_right = generate_cloud(1400, 900, seed=99, bias_right=True)
c_right.save(os.path.join(out_dir, 'cloud-right.png'))

c_center = generate_cloud(1200, 700, seed=123)
c_center.save(os.path.join(out_dir, 'cloud-center.png'))

print('Generated clouds successfully:', os.listdir(out_dir))
