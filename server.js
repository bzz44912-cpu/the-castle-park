const express = require('express');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Chemins des fichiers de données
const DATA_DIR = path.join(__dirname, 'data');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// S'assurer que le dossier data existe
fs.ensureDirSync(DATA_DIR);

// Initialiser les fichiers s'ils n'existent pas
const initFile = (file) => {
    if (!fs.existsSync(file)) {
        fs.writeJsonSync(file, []);
    }
};

initFile(RESERVATIONS_FILE);
initFile(MESSAGES_FILE);
initFile(ORDERS_FILE);

// --- ROUTES API ---

// 1. RÉSERVATIONS
app.get('/api/reservations', async (req, res) => {
    try {
        const data = await fs.readJson(RESERVATIONS_FILE);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/reservations', async (req, res) => {
    try {
        const reservations = await fs.readJson(RESERVATIONS_FILE);
        const newRes = {
            id: Date.now(),
            ...req.body,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        reservations.push(newRes);
        await fs.writeJson(RESERVATIONS_FILE, reservations);
        res.json({ success: true, data: newRes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/reservations/:id', async (req, res) => {
    try {
        const reservations = await fs.readJson(RESERVATIONS_FILE);
        const index = reservations.findIndex(r => r.id == req.params.id);
        if (index !== -1) {
            reservations[index].status = req.body.status;
            await fs.writeJson(RESERVATIONS_FILE, reservations);
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. CONTACT / MESSAGES
app.get('/api/contact', async (req, res) => {
    try {
        const data = await fs.readJson(MESSAGES_FILE);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const messages = await fs.readJson(MESSAGES_FILE);
        const newMsg = {
            id: Date.now(),
            ...req.body,
            status: 'new',
            created_at: new Date().toISOString()
        };
        messages.push(newMsg);
        await fs.writeJson(MESSAGES_FILE, messages);
        res.json({ success: true, data: newMsg });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. COMMANDES (LIVRAISON)
app.get('/api/orders', async (req, res) => {
    try {
        const data = await fs.readJson(ORDERS_FILE);
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const orders = await fs.readJson(ORDERS_FILE);
        const newOrder = {
            id: 'ORD-' + Date.now().toString().slice(-6),
            ...req.body,
            status: 'pending', // pending, preparing, delivering, completed, cancelled
            created_at: new Date().toISOString()
        };
        orders.push(newOrder);
        await fs.writeJson(ORDERS_FILE, orders);
        res.json({ success: true, data: newOrder });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const orders = await fs.readJson(ORDERS_FILE);
        const index = orders.findIndex(o => o.id == req.params.id);
        if (index !== -1) {
            orders[index].status = req.body.status;
            await fs.writeJson(ORDERS_FILE, orders);
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'Non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- ROUTES PAGES ---

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin', (req, res) => {
    // Note: In a production app, you would check session/token here
    res.sendFile(path.join(__dirname, 'admin-dashboard-v2.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Santé du serveur
app.get('/health', (req, res) => {
    res.json({ status: 'online', timestamp: new Date() });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('\x1b[32m%s\x1b[0m', '╔═══════════════════════════════════════════════════════════╗');
    console.log('\x1b[32m%s\x1b[0m', '║          🏛️  THE CASTLE PARK - FULL SYSTEM 🏛️           ║');
    console.log('\x1b[32m%s\x1b[0m', '╠═══════════════════════════════════════════════════════════╣');
    console.log('\x1b[32m%s\x1b[0m', `║  🌐 Serveur démarré sur:  http://localhost:${PORT}          ║`);
    console.log('\x1b[32m%s\x1b[0m', `║  👑 Admin Dashboard:      http://localhost:${PORT}/admin    ║`);
    
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                console.log('\x1b[36m%s\x1b[0m', `║  📱 Accès mobile:        http://${iface.address}:${PORT}    ║`);
            }
        }
    }
    
    console.log('\x1b[32m%s\x1b[0m', '╚═══════════════════════════════════════════════════════════╝');
});
