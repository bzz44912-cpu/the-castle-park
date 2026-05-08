document.addEventListener('DOMContentLoaded', async function() {
    // 1. Initialisation Supabase (Unique)
    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // 2. Vérification de Sécurité (Restriction par Email)
    const AUTHORIZED_EMAIL = 'bzz44912@gmail.com'; // <--- VOTRE EMAIL

    async function checkAuth() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (session) {
            if (session.user.email !== AUTHORIZED_EMAIL) {
                console.error("Accès interdit pour cet email !");
                alert("Accès refusé : Ce compte n'est pas autorisé.");
                await supabaseClient.auth.signOut();
                localStorage.clear();
                window.location.href = 'admin-login.html';
                return false;
            }
            localStorage.setItem('admin_logged_in', 'true');
            return true;
        } else if (!localStorage.getItem('admin_logged_in')) {
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    }

    const isAuthorized = await checkAuth();
    if (!isAuthorized) return;

    // 3. Initialisation Lucide
    lucide.createIcons();

    // 4. Logique de Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    const viewDetails = {
        'dashboard': { title: 'Tableau de Bord', subtitle: "Vue d'ensemble" },
        'reservations': { title: 'Réservations', subtitle: 'Gestion des tables et du parc' },
        'orders': { title: 'Commandes', subtitle: 'Gestion des services restaurant & café' },
        'events': { title: 'Événements', subtitle: 'Planification et réceptions' },
        'settings': { title: 'Paramètres', subtitle: 'Configuration du système' }
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`${view}-view`).classList.add('active');
            pageTitle.textContent = viewDetails[view].title;
            pageSubtitle.textContent = viewDetails[view].subtitle;
            if (view === 'dashboard') initActivityChart();

        });
    });

    // 5. Graphiques
    let activityChartInstance = null;
    function initActivityChart() {
        const ctx = document.getElementById('activityChart');
        if (!ctx) return;
        if (activityChartInstance) activityChartInstance.destroy();
        activityChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Restaurant',
                    data: [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: '#c5a059',
                    borderRadius: 8
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }



    // 6. Gestion des Données (Supabase)
    async function fetchReservations() {
        try {
            const { data, error } = await supabaseClient
                .from('reservations')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            renderReservations(data);
            updateReservationStats(data);
        } catch (error) { console.error(error); }
    }

    async function fetchOrders() {
        try {
            const { data, error } = await supabaseClient
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            renderOrders(data);
            updateOrderStats(data);
        } catch (error) { console.error(error); }
    }

    function renderReservations(data) {
        const tableBody = document.querySelector('.data-table tbody');
        if (!tableBody) return;
        
        if (!data || data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px;">Aucune réservation trouvée.</td></tr>';
            return;
        }

        tableBody.innerHTML = data.slice().sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10).map(r => `
            <tr>
                <td>
                    <div class="client-cell">
                        <div class="client-initials" style="background: rgba(197, 160, 89, 0.2); color: var(--accent-gold);">${r.name.substring(0, 2).toUpperCase()}</div>
                        <div class="client-info">
                            <span class="name">${r.name}</span>
                            <span class="tag">${r.email}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div>${r.time}</div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary);">${r.date}</div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 8px; height: 8px; background: ${r.zone === 'Café' ? 'var(--accent-purple)' : (r.zone === 'Parc' ? '#fff' : 'var(--accent-gold)')}; border-radius: 50%;"></span>
                        <span>${r.zone || 'Restaurant'}</span>
                    </div>
                </td>
                <td>${r.guests}</td>
                <td><span class="status-tag status-${r.status}">${r.status === 'pending' ? 'En attente' : (r.status === 'confirmed' ? 'Confirmé' : r.status)}</span></td>
                <td><i data-lucide="more-horizontal" style="cursor: pointer;"></i></td>
            </tr>
        `).join('');
        lucide.createIcons();
    }

    function renderOrders(data) {
        const container = document.querySelector('.orders-list');
        if (!container) return;
        
        const header = container.querySelector('div:first-child');
        container.innerHTML = '';
        if (header) container.appendChild(header);

        if (!data || data.length === 0) {
            container.innerHTML += '<div class="card" style="text-align:center;">Aucune commande en cours.</div>';
            return;
        }

        data.slice().sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10).forEach(o => {
            const card = document.createElement('div');
            card.className = 'order-card';
            
            // On définit le bouton en fonction du statut
            let actionBtn = '';
            let locationBtn = '';

            if (o.status === 'pending') {
                actionBtn = `<button class="btn-primary" style="background: var(--accent-green);" onclick="updateStatus('orders', '${o.id}', 'preparing')">Accepter la Commande</button>`;
            } else if (o.status === 'preparing') {
                actionBtn = `<button class="btn-secondary" onclick="updateStatus('orders', '${o.id}', 'ready')">Marquer comme Prête</button>
                             <button class="btn-primary" style="background: #3b82f6;" onclick="startDelivery('${o.id}')">🛵 Lancer la livraison</button>`;
            } else if (o.status === 'delivering') {
                actionBtn = `<button class="btn-primary" style="background: var(--accent-green);" onclick="updateStatus('orders', '${o.id}', 'delivered')">✅ Livrée</button>
                             <span style="color: #3b82f6; font-size: 0.75rem; animation: blink 1.5s infinite;">📡 GPS actif</span>`;
            } else {
                actionBtn = `<span style="color: var(--accent-green); font-size: 0.8rem; font-weight: 600;">✓ Terminé</span>`;
            }

            // Bouton localisation client
            if (o.client_lat && o.client_lng) {
                locationBtn = `<a href="https://www.google.com/maps?q=${o.client_lat},${o.client_lng}" target="_blank" 
                    style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(197,160,89,0.15);color:#C5A059;border-radius:8px;font-size:0.75rem;text-decoration:none;font-weight:600;">
                    📍 Voir localisation client
                </a>`;
            }

            card.innerHTML = `
                <div class="order-card-header">
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <div class="table-tag">${o.id.substring(0, 4)}</div>
                        <div>
                            <div style="font-weight: 600;">${o.customer_name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-secondary);">⏰ ${new Date(o.created_at).toLocaleTimeString()}</div>
                        </div>
                    </div>
                    <span class="status-badge status-${o.status === 'pending' ? 'waiting' : (o.status === 'preparing' ? 'preparing' : (o.status === 'delivering' ? 'preparing' : 'confirmed'))}">
                        ${o.status === 'pending' ? 'En attente' : (o.status === 'preparing' ? 'En Cuisine' : (o.status === 'delivering' ? '🛵 En livraison' : 'Prête'))}
                    </span>
                </div>
                <div class="order-items-list">
                    ${(o.items && Array.isArray(o.items)) ? o.items.map(i => `
                        <div class="order-item-row">
                            <span>${i.qty}x ${i.name}</span>
                            <span style="font-weight: 600;">${(i.price * i.qty).toFixed(2)}€</span>
                        </div>
                    `).join('') : '<div class="order-item-row"><span>Aucun article</span></div>'}
                </div>
                <div class="order-note">
                    <div>
                        <span style="font-style: italic;">Note: ${o.address || 'Livraison standard'}</span>
                        ${locationBtn ? '<br>' + locationBtn : ''}
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                        ${actionBtn}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        lucide.createIcons();
    }

    function updateOrderStats(data) {
        if (!data) return;
        let pending = 0, preparing = 0, ready = 0, late = 0;
        let revenue = 0;
        
        data.forEach(o => {
            if (o.status === 'pending') pending++;
            else if (o.status === 'preparing') preparing++;
            else if (o.status === 'ready' || o.status === 'completed') ready++;
            
            let orderTotal = 0;
            if (o.items && Array.isArray(o.items)) {
                o.items.forEach(i => {
                    orderTotal += (i.price * i.qty);
                });
            }
            revenue += orderTotal;
        });

        const elRev = document.getElementById('dash-revenue');
        if (elRev) elRev.textContent = revenue.toFixed(2) + ' €';

        const elPending = document.getElementById('order-stat-pending');
        if (elPending) elPending.textContent = pending.toString().padStart(2, '0');
        
        const elPreparing = document.getElementById('order-stat-preparing');
        if (elPreparing) elPreparing.textContent = preparing.toString().padStart(2, '0');
        
        const elReady = document.getElementById('order-stat-ready');
        if (elReady) elReady.textContent = ready.toString().padStart(2, '0');
        
        const elLate = document.getElementById('order-stat-late');
        if (elLate) elLate.textContent = late.toString().padStart(2, '0');
    }

    function updateReservationStats(data) {
        if (!data) return;
        let total = data.length;
        let confirmed = 0;
        let pending = 0;
        
        data.forEach(r => {
            if (r.status === 'confirmed') confirmed++;
            else if (r.status === 'pending') pending++;
        });

        const elDashRes = document.getElementById('dash-reservations');
        if (elDashRes) elDashRes.textContent = total.toString();

        const elResTotal = document.getElementById('res-stat-total');
        if (elResTotal) elResTotal.textContent = total.toString();

        const elResConf = document.getElementById('res-stat-confirmed');
        if (elResConf) elResConf.textContent = confirmed.toString();

        const elResPend = document.getElementById('res-stat-pending');
        if (elResPend) elResPend.textContent = pending.toString();

        const elResInfo = document.getElementById('res-pagination-info');
        if (elResInfo) elResInfo.textContent = `Affichage de ${total} réservations`;
    }

    async function updateStatus(type, id, status) {
        try {
            console.log(`🔄 Mise à jour de ${type} (${id}) vers le statut: ${status}...`);
            const { error } = await supabaseClient
                .from(type)
                .update({ status })
                .eq('id', id);
            
            if (error) throw error;
            
            console.log(`✅ Mise à jour réussie !`);
            if (type === 'orders') fetchOrders();
            else fetchReservations();
        } catch (error) { console.error(`❌ Erreur:`, error); }
    }

    async function startDelivery(id) {
        try {
            console.log(`🛵 Lancement de la livraison pour la commande ${id}...`);
            
            // 1. Mettre à jour le statut
            const { error: statusError } = await supabaseClient
                .from('orders')
                .update({ status: 'delivering' })
                .eq('id', id);
            
            if (statusError) throw statusError;

            // 2. Commencer à suivre la position GPS du livreur
            if (navigator.geolocation) {
                const watchId = navigator.geolocation.watchPosition(async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    console.log(`📍 GPS Livreur (#${id}):`, latitude, longitude);

                    // Mettre à jour Supabase avec la nouvelle position
                    const { error: geoError } = await supabaseClient
                        .from('orders')
                        .update({ 
                            delivery_lat: latitude, 
                            delivery_lng: longitude 
                        })
                        .eq('id', id);

                    if (geoError) console.error("Erreur mise à jour GPS:", geoError);
                }, (err) => {
                    console.error("Erreur Geolocation:", err);
                    alert("Impossible d'accéder au GPS. Vérifiez les permissions.");
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                });

                // Stocker le watchId pour pouvoir l'arrêter si besoin (optionnel)
                window[`deliveryWatch_${id}`] = watchId;
            } else {
                alert("Votre navigateur ne supporte pas la géolocalisation.");
            }

            console.log(`✅ Livraison lancée !`);
            fetchOrders();
        } catch (error) {
            console.error(`❌ Erreur:`, error);
            alert("Erreur lors du lancement de la livraison.");
        }
    }

    window.updateStatus = updateStatus;
    window.startDelivery = startDelivery;

    // 7. Chargement Initial & Realtime
    fetchReservations();
    fetchOrders();
    initActivityChart();

    // --- ÉCOUTE EN TEMPS RÉEL (REALTIME) ---
    // Pour les commandes
    supabaseClient
        .channel('any')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
            console.log('Changement détecté dans les commandes !', payload);
            fetchOrders(); // On recharge la liste dès qu'il y a un changement
        })
        .subscribe();

    // Pour les réservations
    supabaseClient
        .channel('any2')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, payload => {
            console.log('Changement détecté dans les réservations !', payload);
            fetchReservations();
        })
        .subscribe();
});

// --- FONCTIONS GLOBALES ---
async function handleLogout(e) {
    if (e) e.preventDefault();
    const { createClient } = supabase;
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    await client.auth.signOut();
    localStorage.clear();
    window.location.href = 'admin-login.html';
}
