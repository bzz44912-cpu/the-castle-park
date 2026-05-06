// Admin Dashboard - Frontend Only (No Backend)
// Uses localStorage for demo purposes

document.addEventListener('DOMContentLoaded', function () {
    // --- Elements ---
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // --- Mock Data Storage ---
    // Initialize mock data if not exists
    if (!localStorage.getItem('loft_reservations')) {
        const mockReservations = [
            {
                id: 1,
                customer_name: 'Jean Dupont',
                customer_phone: '06 12 34 56 78',
                reservation_date: '2026-02-10',
                reservation_time: '19:00',
                guests_count: 4,
                special_notes: 'Table près de la fenêtre',
                status: 'pending'
            },
            {
                id: 2,
                customer_name: 'Marie Martin',
                customer_phone: '06 98 76 54 32',
                reservation_date: '2026-02-12',
                reservation_time: '20:30',
                guests_count: 2,
                special_notes: '',
                status: 'confirmed'
            }
        ];
        localStorage.setItem('loft_reservations', JSON.stringify(mockReservations));
    }

    if (!localStorage.getItem('loft_messages')) {
        const mockMessages = [
            {
                id: 1,
                name: 'Pierre Bernard',
                email: 'pierre@example.com',
                message: 'Bonjour, je voudrais savoir si vous faites des événements privés ?',
                status: 'new',
                created_at: new Date().toISOString()
            }
        ];
        localStorage.setItem('loft_messages', JSON.stringify(mockMessages));
    }

    // --- Stats Loading ---
    function loadStats() {
        const reservations = JSON.parse(localStorage.getItem('loft_reservations') || '[]');
        const messages = JSON.parse(localStorage.getItem('loft_messages') || '[]');

        const totalResEl = document.getElementById('totalReservations');
        const totalMsgEl = document.getElementById('totalMessages');

        if (totalResEl) totalResEl.innerText = reservations.length;
        if (totalMsgEl) totalMsgEl.innerText = messages.length;
    }

    // --- Reservations Management ---

    window.fetchReservations = function () {
        const reservations = JSON.parse(localStorage.getItem('loft_reservations') || '[]');
        renderReservations(reservations);
    };

    function renderReservations(items) {
        const grid = document.getElementById('reservationsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        if (items.length === 0) {
            grid.innerHTML = '<tr><td colspan="8" style="text-align:center;">Aucune réservation trouvée.</td></tr>';
            return;
        }

        items.forEach(item => {
            const row = document.createElement('tr');

            // Status Badge
            let statusClass = 'pending';
            if (item.status === 'confirmed') statusClass = 'confirmed';
            if (item.status === 'cancelled') statusClass = 'cancelled';

            // Format labels
            const statusLabels = {
                'pending': 'En attente',
                'confirmed': 'Confirmée',
                'cancelled': 'Annulée',
                'completed': 'Terminée'
            };

            row.innerHTML = `
                <td>#${item.id}</td>
                <td>${item.reservation_date}</td>
                <td>${item.reservation_time}</td>
                <td>
                    <strong>${item.customer_name}</strong>
                    ${item.special_notes ? `<br><small class="text-muted">${item.special_notes}</small>` : ''}
                </td>
                <td>${item.customer_phone}</td>
                <td>${item.guests_count}</td>
                <td><span class="status-badge ${statusClass}">${statusLabels[item.status] || item.status}</span></td>
                <td>
                    <div class="action-buttons-group">
                        ${item.status === 'pending' ? `
                        <button class="action-btn confirm-btn" title="Confirmer cette réservation" data-id="${item.id}" data-action="confirmed">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn cancel-btn" title="Annuler cette réservation" data-id="${item.id}" data-action="cancelled">
                            <i class="fas fa-times"></i>
                        </button>
                        ` : ''}
                        ${item.status === 'confirmed' ? `
                        <button class="action-btn complete-btn" title="Marquer comme terminée" data-id="${item.id}" data-action="completed">
                            <i class="fas fa-check-double"></i>
                        </button>
                        ` : ''}
                        ${item.status !== 'cancelled' && item.status !== 'completed' ? `
                        <button class="action-btn delete-btn" title="Supprimer définitivement" data-id="${item.id}" data-action="delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            `;
            grid.appendChild(row);

            // Attach event listeners after adding to DOM
            const confirmBtn = row.querySelector('.confirm-btn');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', function () {
                    updateReservationStatus(item.id, 'confirmed');
                });
            }

            const cancelBtn = row.querySelector('.cancel-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', function () {
                    updateReservationStatus(item.id, 'cancelled');
                });
            }

            const completeBtn = row.querySelector('.complete-btn');
            if (completeBtn) {
                completeBtn.addEventListener('click', function () {
                    updateReservationStatus(item.id, 'completed');
                });
            }

            const deleteBtn = row.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', function () {
                    deleteReservation(item.id);
                });
            }
        });
    }

    window.updateReservationStatus = function (id, status) {
        // Messages de confirmation personnalisés
        let confirmMessage = '';
        let successMessage = '';

        switch (status) {
            case 'confirmed':
                confirmMessage = '✅ Voulez-vous vraiment CONFIRMER cette réservation ?';
                successMessage = 'Réservation confirmée avec succès !';
                break;
            case 'cancelled':
                confirmMessage = '❌ Êtes-vous sûr de vouloir ANNULER cette réservation ?\n\nLe client sera informé.';
                successMessage = 'Réservation annulée';
                break;
            case 'completed':
                confirmMessage = '✔️ Marquer cette réservation comme TERMINÉE ?';
                successMessage = 'Réservation marquée comme terminée';
                break;
            default:
                confirmMessage = 'Confirmer cette action ?';
                successMessage = 'Statut mis à jour';
        }

        // Demander confirmation
        if (!confirm(confirmMessage)) {
            return;
        }

        // Update in localStorage
        const reservations = JSON.parse(localStorage.getItem('loft_reservations') || '[]');
        const index = reservations.findIndex(r => r.id === id);
        if (index !== -1) {
            reservations[index].status = status;
            localStorage.setItem('loft_reservations', JSON.stringify(reservations));
            showToast(successMessage);
            fetchReservations();
            loadStats();
        }
    };

    window.deleteReservation = function (id) {
        if (!confirm('⚠️ SUPPRIMER DÉFINITIVEMENT cette réservation ?\n\nCette action est IRRÉVERSIBLE !')) return;

        // Delete from localStorage
        let reservations = JSON.parse(localStorage.getItem('loft_reservations') || '[]');
        reservations = reservations.filter(r => r.id !== id);
        localStorage.setItem('loft_reservations', JSON.stringify(reservations));

        showToast('Réservation supprimée définitivement');
        fetchReservations();
        loadStats();
    };

    // --- Messages Management ---

    window.fetchMessages = function () {
        const messages = JSON.parse(localStorage.getItem('loft_messages') || '[]');
        renderMessages(messages);
    };

    function renderMessages(items) {
        const container = document.getElementById('messagesContainer');
        if (!container) return;

        container.innerHTML = '';
        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Aucun message</h3>
                    <p>Les messages des clients apparaîtront ici</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = `message-card ${item.status}`;

            // Status icons and labels
            const statusIcons = {
                'new': '🆕',
                'read': '👁️',
                'replied': '✅'
            };

            const statusLabels = {
                'new': 'Nouveau',
                'read': 'Lu',
                'replied': 'Répondu'
            };

            // Format date
            const date = new Date(item.created_at);
            const formattedDate = date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            card.innerHTML = `
                <div class="message-header">
                    <div class="message-sender">
                        <div class="sender-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="sender-info">
                            <h3>${item.name}</h3>
                            <a href="mailto:${item.email}" class="sender-email">
                                <i class="fas fa-envelope"></i> ${item.email}
                            </a>
                        </div>
                    </div>
                    <div class="message-meta">
                        <span class="status-badge ${item.status}">
                            ${statusIcons[item.status]} ${statusLabels[item.status]}
                        </span>
                        <span class="message-date">
                            <i class="fas fa-clock"></i> ${formattedDate}
                        </span>
                    </div>
                </div>

                <div class="message-body">
                    <p>${item.message}</p>
                </div>

                <div class="message-actions">
                    ${item.status === 'new' ? `
                    <button class="action-btn read-btn" title="Marquer comme lu" data-id="${item.id}">
                        <i class="fas fa-eye"></i> Marquer comme lu
                    </button>
                    ` : ''}
                    ${item.status !== 'replied' ? `
                    <button class="action-btn reply-btn" title="Répondre" data-id="${item.id}" data-email="${item.email}">
                        <i class="fas fa-reply"></i> Répondre
                    </button>
                    ` : ''}
                    <button class="action-btn delete-btn" title="Supprimer" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            `;

            container.appendChild(card);

            // Attach event listeners
            const readBtn = card.querySelector('.read-btn');
            if (readBtn) {
                readBtn.addEventListener('click', () => updateMessageStatus(item.id, 'read'));
            }

            const replyBtn = card.querySelector('.reply-btn');
            if (replyBtn) {
                replyBtn.addEventListener('click', () => replyToMessage(item.id, item.email, item.name));
            }

            const deleteBtn = card.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => deleteMessage(item.id));
            }
        });
    }

    window.updateMessageStatus = function (id, status) {
        // Update in localStorage
        const messages = JSON.parse(localStorage.getItem('loft_messages') || '[]');
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].status = status;
            localStorage.setItem('loft_messages', JSON.stringify(messages));
            showToast(status === 'read' ? 'Message marqué comme lu' : 'Statut mis à jour');
            fetchMessages();
            loadStats();
        }
    };

    window.replyToMessage = function (id, email, name) {
        const subject = `Re: Votre message - The Castle Park`;
        const body = `Bonjour ${name},\n\nMerci de nous avoir contactés.\n\n\n\nCordialement,\nThe Castle Park\nSidi Bouzid`;

        // Open email client
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Mark as replied after a short delay
        setTimeout(() => {
            if (confirm('Avez-vous envoyé la réponse ? Marquer comme "Répondu" ?')) {
                updateMessageStatus(id, 'replied');
            }
        }, 2000);
    };

    window.deleteMessage = function (id) {
        if (!confirm('⚠️ SUPPRIMER ce message définitivement ?\n\nCette action est IRRÉVERSIBLE !')) return;

        // Delete from localStorage
        let messages = JSON.parse(localStorage.getItem('loft_messages') || '[]');
        messages = messages.filter(m => m.id !== id);
        localStorage.setItem('loft_messages', JSON.stringify(messages));

        showToast('Message supprimé définitivement');
        fetchMessages();
        loadStats();
    };

    // --- UI Logic ---

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.section;

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) sec.classList.add('active');
            });

            // Load specific section data
            if (target === 'reservations') {
                fetchReservations();
            } else if (target === 'messages') {
                fetchMessages();
            } else if (target === 'dashboard') {
                loadStats();
            }

            // Mobile close
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Sidebar Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    }

    // Toast Notification
    window.showToast = function (message, type = 'success') {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toastMessage');
        if (!toast || !msg) return;

        const icon = toast.querySelector('i');

        msg.innerText = message;
        toast.className = 'toast';
        toast.classList.add(type === 'success' ? 'toast-success' : 'toast-error');

        if (icon) {
            if (type === 'error') {
                icon.className = 'fas fa-exclamation-circle';
            } else {
                icon.className = 'fas fa-check-circle';
            }
        }

        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 3000);
    };

    // --- Initialization ---
    loadStats();
});
