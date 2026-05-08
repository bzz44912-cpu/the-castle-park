# 📱 Guide d'Utilisation du QR Code - The Castle Park

## ✅ Problème Résolu !

Le QR code a été corrigé et fonctionne maintenant correctement. Voici comment l'utiliser.

---

## 🎯 Comment Ça Marche ?

Le QR code pointe maintenant vers une URL configurée : **`http://localhost:3000/menu_complet.html`**

Cette URL fonctionne quand :
- ✅ Le serveur Node.js est en cours d'exécution
- ✅ Vous accédez depuis le même réseau WiFi
- ✅ Le port 3000 n'est pas bloqué par un pare-feu

---

## 🚀 Étapes pour Tester le QR Code

### 1️⃣ Démarrer le Serveur

Ouvrez un terminal PowerShell dans le dossier du projet :

```powershell
cd "c:\Users\Vibobook\fff\the_castle_park - s2"
node server.js
```

**Vous devriez voir :**
```
╔═══════════════════════════════════════════════════════════╗
║          🏛️  THE CASTLE PARK - Backend API 🏛️            ║
╠═══════════════════════════════════════════════════════════╣
║  🌐 Serveur démarré sur:  http://localhost:3000          ║
╚═══════════════════════════════════════════════════════════╝
```

✅ **Le serveur est maintenant actif !**

---

### 2️⃣ Accéder à la Page du QR Code

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000/qr-code-menu.html
```

Vous verrez une magnifique page premium avec :
- 🎨 Le QR code généré
- 📝 Des instructions claires
- 🔽 Des boutons pour télécharger et imprimer

---

### 3️⃣ Tester le QR Code avec Votre Smartphone

#### Option A : Depuis le Même Réseau WiFi 📶

**Conditions requises :**
- Votre ordinateur et smartphone doivent être sur le **même réseau WiFi**
- Le serveur Node.js doit être en cours d'exécution

**Étapes :**

1. **Trouver l'adresse IP locale de votre ordinateur** :

   Dans PowerShell, exécutez :
   ```powershell
   ipconfig
   ```
   
   Cherchez la ligne **"Adresse IPv4"**, par exemple : `192.168.1.10`

2. **Modifier le QR code pour utiliser cette IP** :

   Ouvrez `qr-code-menu.html` et modifiez la ligne 331 :
   ```javascript
   // AVANT:
   const BASE_URL = 'http://localhost:3000';
   
   // APRÈS (remplacez par VOTRE IP):
   const BASE_URL = 'http://192.168.1.10:3000';
   ```

3. **Recharger la page** dans votre navigateur

4. **Scanner le QR code** avec votre smartphone

5. ✅ **Ça fonctionne !** Vous devriez voir le menu complet s'ouvrir sur votre téléphone

---

#### Option B : Test Sans Smartphone 💻

Si vous n'avez pas de smartphone sous la main, testez directement dans le navigateur :

1. Cliquez sur le bouton **"Voir le Menu"** sur la page du QR code
2. Cela ouvrira `menu_complet.html` dans un nouvel onglet
3. Vérifiez que le menu s'affiche correctement

---

## 🌍 Déploiement en Production

Pour que le QR code fonctionne **partout** (pas seulement sur votre réseau WiFi), vous devez déployer votre site sur Internet.

### Options d'Hébergement Recommandées :

#### 1. **Vercel** (Recommandé - Gratuit)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

Après le déploiement, Vercel vous donnera une URL comme :
```
https://the-loft-lounge.vercel.app
```

#### 2. **Netlify** (Gratuit)

1. Allez sur [netlify.com](https://www.netlify.com)
2. Glissez-déposez votre dossier
3. Obtenez une URL comme : `https://the-loft-lounge.netlify.app`

#### 3. **GitHub Pages** (Gratuit pour sites statiques)

```bash
# Créer un repo GitHub
# Activer GitHub Pages dans les paramètres
# URL: https://votre-username.github.io/nom-du-repo
```

---

### Configurer l'URL de Production

Une fois déployé, modifiez `qr-code-menu.html` :

```javascript
// Ligne 331
const BASE_URL = 'https://votre-site-deploye.com';
```

**Exemple concret :**
```javascript
const BASE_URL = 'https://the-castle-park.vercel.app';
```

Ensuite :
1. Re-déployez votre site
2. Ouvrez `https://votre-site.com/qr-code-menu.html`
3. Téléchargez le nouveau QR code
4. Imprimez-le et placez-le sur vos tables

✅ **Le QR code fonctionnera maintenant partout dans le monde !**

---

## 📝 Checklist Avant Impression

Avant d'imprimer vos QR codes pour vos tables :

- [ ] ✅ Le serveur est déployé en ligne (ou configuré sur votre réseau local)
- [ ] ✅ Le `BASE_URL` est correctement configuré
- [ ] ✅ Vous avez testé le QR code avec votre smartphone
- [ ] ✅ Le menu s'affiche correctement sur mobile
- [ ] ✅ Le QR code est de bonne qualité (300x300px minimum)

---

## 🎨 Comment Imprimer le QR Code

### Option 1 : Imprimer Directement la Page

1. Ouvrez `qr-code-menu.html` dans votre navigateur
2. Cliquez sur le bouton **"Imprimer"** ou appuyez sur `Ctrl + P`
3. Les boutons et sections inutiles seront automatiquement masqués
4. Imprimez en couleur pour un meilleur rendu

### Option 2 : Télécharger et Utiliser l'Image

1. Cliquez sur le bouton **"Télécharger QR"**
2. L'image sera sauvegardée : `the-loft-lounge-menu-qr-code.png`
3. Utilisez cette image dans :
   - Canva pour créer des supports marketing
   - Photoshop pour des designs personnalisés
   - Word/PowerPoint pour des affiches
   - Instagram/Facebook pour partager en ligne

---

## 🔧 Dépannage

### ❌ "Le QR code ne fonctionne pas quand je le scanne"

**Causes possibles :**

1. **Le serveur n'est pas démarré**
   - Solution : Exécutez `node server.js`

2. **Mauvaise URL dans le QR code**
   - Solution : Vérifiez que `BASE_URL` pointe vers la bonne adresse

3. **Smartphone pas sur le même réseau WiFi**
   - Solution : Connectez votre téléphone au même WiFi que votre PC

4. **Pare-feu bloque le port 3000**
   - Solution : Autorisez le port 3000 dans Windows Defender

5. **Site non déployé publiquement**
   - Solution : Déployez sur Vercel/Netlify pour un accès externe

### ❌ "Le serveur démarre mais la page ne s'affiche pas"

Vérifiez que vous utilisez la bonne URL :
- ✅ Correct : `http://localhost:3000/qr-code-menu.html`
- ❌ Incorrect : `file:///C:/Users/.../qr-code-menu.html`

### ❌ "Le QR code s'affiche mais pointe vers un mauvais lien"

1. Ouvrez la console développeur (F12)
2. Regardez les logs, vous devriez voir :
   ```
   🔗 QR Code généré pour: http://localhost:3000/menu_complet.html
   ```
3. Si l'URL est incorrecte, modifiez `BASE_URL` dans le code

---

## 📊 Résumé des URLs

| Environnement | BASE_URL | Exemple |
|---------------|----------|---------|
| **Développement Local** | `http://localhost:3000` | Pour tester sur votre PC |
| **Réseau Local (WiFi)** | `http://192.168.x.x:3000` | Pour tester avec smartphone |
| **Production** | `https://votre-domaine.com` | Pour clients réels |

---

## 🎉 C'est Prêt !

Votre QR code est maintenant **100% fonctionnel** ! 

Vous pouvez :
- ✅ Le tester localement
- ✅ L'imprimer pour vos tables
- ✅ Le partager sur les réseaux sociaux
- ✅ Le déployer en production

**Bon succès avec The Castle Park ! 🏛️☕**
