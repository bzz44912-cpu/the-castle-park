import re

new_grid = '''<div class="menu-grid">
                <!-- Item 1 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-coffee"></i></div>
                    <div class="menu-details">
                        <h3>Boissons</h3>
                        <p>Cafés premium, jus frais, milkshakes et thés variés.</p>
                    </div>
                </div>

                <!-- Item 2 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-sun"></i></div>
                    <div class="menu-details">
                        <h3>Brunch & Petit Déjeuner</h3>
                        <p>Des formules complètes pour bien démarrer votre journée.</p>
                    </div>
                </div>

                <!-- Item 3 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-egg"></i></div>
                    <div class="menu-details">
                        <h3>Cuisine Salée</h3>
                        <p>Omelettes variées et crêpes salées gourmandes.</p>
                    </div>
                </div>

                <!-- Item 4 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-ice-cream"></i></div>
                    <div class="menu-details">
                        <h3>Boules Bourgeois & Jwajem</h3>
                        <p>Le meilleur de la glace artisanale et des jwajem.</p>
                    </div>
                </div>

                <!-- Item 5 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-birthday-cake"></i></div>
                    <div class="menu-details">
                        <h3>Pâtisseries & Crêpes</h3>
                        <p>Crêpes sucrées, pancakes, viennoiseries et desserts.</p>
                    </div>
                </div>

                <!-- Item 6 -->
                <div class="menu-item">
                    <div class="menu-icon"><i class="fas fa-wind"></i></div>
                    <div class="menu-details">
                        <h3>Chicha</h3>
                        <p>Adalya et Fakher, avec ou sans fruits.</p>
                    </div>
                </div>
            </div>'''

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<div class="menu-grid">[\s\S]*?</div>\s*<div class="menu-cta">', new_grid + '\n\n            <div class="menu-cta">', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated menu-grid with real specialties.")
