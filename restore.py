import re

with open('menu_complet.html', 'r', encoding='utf-8') as f:
    content = f.read()

insertions = [
    (r'(<span class="item-name">Marocain \(escalope grillée, champignon\)</span>\s*<span class="item-price">11000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">13000</span>\n                    </div>'),
    
    (r'(<span class="item-name">Marocain \(escalope grillée, champignon\)</span>\s*<span class="item-price">12000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">14000</span>\n                    </div>'),
    
    (r'(<span class="item-name">Lotus</span>\s*<span class="item-price">14000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">15500</span>\n                    </div>'),
    
    (r'(<span class="item-name">Lotus</span>\s*<span class="item-price">16000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">18500</span>\n                    </div>'),
    
    (r'(<span class="item-name">Lotus</span>\s*<span class="item-price">12500</span>\s*</div>)',
     r'\1\n                <div class="menu-item special-item">\n                    <span class="item-name">⭐ The Loft</span>\n                    <span class="item-price">17000</span>\n                </div>'),
    
    (r'(<h2>Plat Fruits de Saison</h2>\s*</div>\s*<div class="menu-items">\s*<div class="menu-item">\s*<span class="item-name">Mini</span>\s*<span class="item-price">8500</span>\s*</div>)',
     r'\1\n                <div class="menu-item special-item">\n                    <span class="item-name">⭐ The Loft</span>\n                    <span class="item-price">13000</span>\n                </div>'),
    
    (r'(<span class="item-name">Banana Split</span>\s*<span class="item-price">10000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">15000</span>\n                    </div>'),
    
    (r'(<span class="item-name">Chicha Adalya</span>\s*<span class="item-price">12000</span>\s*</div>)',
     r'\1\n                <div class="menu-item special-item">\n                    <span class="item-name">⭐ The Loft (glaçon, fruits)</span>\n                    <span class="item-price">17000</span>\n                </div>'),
    
    (r'(<h3 class="subcategory-title"><i class="fas fa-cookie"></i> Crêpe Sucrée</h3>[\s\S]*?<span class="item-name">Nutella Banane Fruits Secs</span>\s*<span class="item-price">14000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">16000</span>\n                    </div>'),
    
    (r'(<h3 class="subcategory-title"><i class="fas fa-layer-group"></i> Pancake</h3>[\s\S]*?<span class="item-name">Nutella Banane Fruits Secs</span>\s*<span class="item-price">14000</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">17000</span>\n                    </div>'),
    
    (r'(<span class="item-name">Pignon</span>\s*<span class="item-price">9200</span>\s*</div>)',
     r'\1\n                    <div class="menu-item special-item">\n                        <span class="item-name">⭐ The Loft</span>\n                        <span class="item-price">12500</span>\n                    </div>'),
    
    (r'(<div class="item-name" style="font-size: 1.3rem; margin-bottom: 10px;">Whatsapp</div>\s*<div style="font-size: 0.9rem; color: #666;">Café au choix, Jus, Croissant ou Cake, Eau,\s*Omelette, Pancake ou Boules Bourgeois, Yaourt</div>\s*</div>\s*<span class="item-price">18000</span>\s*</div>)',
     r'\1\n                <div class="menu-item special-item">\n                    <div>\n                        <div class="item-name" style="font-size: 1.3rem; margin-bottom: 10px;">⭐ The Loft</div>\n                        <div style="font-size: 0.9rem; color: #666;">2 Cafés au choix, 2 Jus, 2 Croissants ou Cakes, 1L\n                            d\'Eau, 2 Yaourts, 2 Salades de Fruits, Boules Bourgeois, 2 Omelettes, Charcuterie</div>\n                    </div>\n                    <span class="item-price">32000</span>\n                </div>')
]

for pattern, replacement in insertions:
    content = re.sub(pattern, replacement, content)

with open('menu_complet.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored special items successfully.")
