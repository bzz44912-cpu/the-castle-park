import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove from menu-grid
content = re.sub(r'<!-- Item 1 -->[\s\S]*?<!-- Item 2 -->', '<!-- Item 2 -->', content)
content = re.sub(r'<!-- Item 2 -->[\s\S]*?<!-- Item 3 -->', '<!-- Item 3 -->', content)
content = re.sub(r'<!-- Item 3 -->[\s\S]*?<!-- Item 4 -->', '<!-- Item 4 -->', content)
content = re.sub(r'<!-- Item 4 -->[\s\S]*?<!-- Item 5 -->', '<!-- Item 5 -->', content)
content = re.sub(r'<!-- Item 5 -->[\s\S]*?<!-- Item 6 -->', '<!-- Item 6 -->', content)

# Remove from modal
content = re.sub(r'<div class="menu-category">\s*<h3><i class="fas fa-pizza-slice"></i> Pizzas</h3>[\s\S]*?</div>\s*(?=<div class="menu-category">)', '', content)
content = re.sub(r'<div class="menu-category">\s*<h3><i class="fas fa-hamburger"></i> Burgers</h3>[\s\S]*?</div>\s*(?=<div class="menu-category">)', '', content)
content = re.sub(r'<div class="menu-category">\s*<h3><i class="fas fa-pepper-hot"></i> Tacos & Burritos</h3>[\s\S]*?</div>\s*(?=<div class="menu-category">)', '', content)
content = re.sub(r'<!-- Sandwiches & Paninis -->[\s\S]*?<!-- Salades -->', '<!-- Salades -->', content)
content = re.sub(r'<!-- Salades -->[\s\S]*?<!-- Desserts -->', '<!-- Desserts -->', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed non-existent items from index.html successfully.")
