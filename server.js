require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialisation Supabase avec la Service Role Key (Bypass RLS sur le serveur)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- ROUTES API ---

// 1. RÉSERVATIONS
app.get('/api/reservations', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/reservations', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert([req.body])
            .select();
            
        if (error) throw error;
        res.json({ success: true, data: data[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/reservations/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('reservations')
            .update({ status: req.body.status })
            .eq('id', req.params.id);
            
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. COMMANDES
app.get('/api/orders', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        res.json({ success: true, count: data.length, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([req.body])
            .select();
            
        if (error) throw error;
        res.json({ success: true, data: data[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: req.body.status })
            .eq('id', req.params.id);
            
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- ROUTES PAGES ---

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard-v2.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Santé du serveur
app.get('/health', (req, res) => {
    res.json({ 
        status: 'online', 
        database: 'Supabase Connected',
        timestamp: new Date() 
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('\x1b[32m%s\x1b[0m', '╔═══════════════════════════════════════════════════════════╗');
    console.log('\x1b[32m%s\x1b[0m', '║          🏛️  THE CASTLE PARK - FULL SYSTEM 🏛️           ║');
    console.log('\x1b[32m%s\x1b[0m', '╠═══════════════════════════════════════════════════════════╣');
    console.log('\x1b[32m%s\x1b[0m', `║  🌐 Serveur démarré sur:  http://localhost:${PORT}          ║`);
    console.log('\x1b[32m%s\x1b[0m', `║  👑 Admin Dashboard:      http://localhost:${PORT}/admin    ║`);
    console.log('\x1b[32m%s\x1b[0m', '╚═══════════════════════════════════════════════════════════╝');
});
