-- 1. Table des Réservations
CREATE TABLE IF NOT EXISTS reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests TEXT NOT NULL,
    zone TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending'
);

-- 2. Table des Commandes
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    items JSONB NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    fcm_token TEXT
);

-- 3. Table des Messages Contact
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new'
);

-- Activer RLS (Row Level Security)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Créer des politiques (Policies)
-- Tout le monde peut insérer (pour les clients sur le site web)
CREATE POLICY "Public insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert" ON contact_messages FOR INSERT WITH CHECK (true);

-- Seul l'admin authentifié peut tout voir et modifier
CREATE POLICY "Admin full access" ON reservations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
