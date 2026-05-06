# 🚀 GUIDE RAPIDE - Faire Fonctionner le QR Code

## ⚡ Solution en 3 Étapes

### Étape 1 : Autoriser le Port 3000 (C'est LE problème !)

**Option A - Via Script Automatique (Recommandé)** :

1. **Clic droit** sur le fichier `configurer-parefeu.ps1`
2. Sélectionnez **"Exécuter avec PowerShell"**
3. Si demandé, cliquez sur **"Oui"** pour autoriser les droits administrateur
4. ✅ **Terminé !**

**Option B - Via Commande Manuelle** :

1. Ouvrez PowerShell **en tant qu'administrateur** (clic droit > Exécuter en tant qu'administrateur)
2. Collez cette commande :
   ```powershell
   New-NetFirewallRule -DisplayName "The Castle Park Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
   ```
3. Appuyez sur **Entrée**
4. ✅ **Terminé !**

---

### Étape 2 : Vérifier que le Serveur Tourne

Dans un terminal, assurez-vous que le serveur est actif :

```powershell
node server.js
```

Vous devriez voir :
```
╔═══════════════════════════════════════════════════════════╗
║          🏛️  THE CASTLE PARK - Backend API 🏛️            ║
║  🌐 Serveur démarré sur:  http://localhost:3000          ║
╚═══════════════════════════════════════════════════════════╝
```

---

### Étape 3 : Scanner le QR Code

1. **Ouvrez** : `http://10.100.190.54:3000/qr-code-menu.html` dans votre navigateur
2. **Scannez** le QR code avec votre smartphone
3. 🎉 **Ça marche !**

---

## ✅ Checklist Avant de Scanner

- [ ] Le port 3000 est autorisé dans le pare-feu (Étape 1)
- [ ] Le serveur `node server.js` est en cours d'exécution
- [ ] Votre smartphone est sur le **même WiFi** que votre PC
- [ ] L'URL du QR code est : `http://10.100.190.54:3000/menu_complet.html`

---

## 🔧 Dépannage Ultra-Rapide

### ❌ "ERR_CONNECTION_REFUSED"
→ **Cause** : Le pare-feu bloque le port 3000
→ **Solution** : Exécutez `configurer-parefeu.ps1`

### ❌ "Site can't be reached"
→ **Cause** : Pas sur le même WiFi
→ **Solution** : Connectez votre smartphone au même réseau que votre PC

### ❌ "Timeout"
→ **Cause** : Le serveur n'est pas démarré
→ **Solution** : Lancez `node server.js`

---

## 📞 Test Sans QR Code

Pour vérifier que tout fonctionne, tapez directement dans le navigateur de votre smartphone :

```
http://10.100.190.54:3000/menu_complet.html
```

Si cette URL fonctionne → Le QR code fonctionnera aussi ! ✅

---

## 🎯 Résumé Ultra-Court

1. **Autorisez le port** : Exécutez `configurer-parefeu.ps1` en admin
2. **Démarrez le serveur** : `node server.js`
3. **Scannez le QR code** avec votre smartphone (même WiFi)

**C'est tout ! 🚀**
