document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.section-header, .about-text, .feature-card, .menu-item, .service-box, .contact-container, .ecommerce-card, .ecommerce-cta');

    // Add reveal class initially
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            document.body.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            document.body.classList.remove('scrolled');
        }
    });

    // --- Modal System ---
    const modals = {
        booking: document.getElementById('bookingModal'),
        menu: document.getElementById('menuModal')
    };

    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    // Close modal function
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // Button actions
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = btn.getAttribute('data-action');

            switch (action) {
                case 'view-menu':
                    // Smooth scroll to menu section
                    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'book-table':
                    openModal('bookingModal');
                    break;
                case 'full-menu':
                    openModal('menuModal');
                    break;
                case 'click-collect':
                    // Set delivery method to collect
                    if (typeof cart !== 'undefined') {
                        cart.deliveryMethod = 'collect';
                        saveCart();
                    }
                    showNotification('Mode Click & Collect activé. Choisissez vos plats !');
                    openModal('menuModal');
                    // Trigger adding buttons to menu
                    setTimeout(() => {
                        if (typeof addCartButtonsToMenu === 'function') {
                            addCartButtonsToMenu();
                        }
                    }, 100);
                    break;
                case 'delivery':
                    // Set delivery method to delivery
                    if (typeof cart !== 'undefined') {
                        cart.deliveryMethod = 'delivery';
                        saveCart();
                    }
                    showNotification('Mode Livraison activé. Choisissez vos plats !');
                    openModal('menuModal');
                    // Trigger adding buttons to menu
                    setTimeout(() => {
                        if (typeof addCartButtonsToMenu === 'function') {
                            addCartButtonsToMenu();
                        }
                    }, 100);
                    break;
                case 'track-order':
                    // Handle Order Tracking
                    const orderNumber = prompt('Veuillez entrer votre numéro de commande:');
                    if (orderNumber) {
                        showNotification(`Recherche de la commande #${orderNumber}...`);
                        setTimeout(() => {
                            console.log('Tracking order:', orderNumber);
                            // Simulate finding order
                            showNotification(`Commande #${orderNumber}: En cours de préparation`);
                        }, 1500);
                    }
                    break;
                case 'order-now':
                    // Open menu directly
                    openModal('menuModal');
                    setTimeout(() => {
                        if (typeof addCartButtonsToMenu === 'function') {
                            addCartButtonsToMenu();
                        }
                    }, 100);
                    break;
            }
        });
    });

    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            closeModal(modalId);
        });
    });

    // Close modal on backdrop click
    Object.values(modals).forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // --- Form Handlers ---

    // Booking Form (Frontend only - no backend)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);

            // Log reservation data to console
            console.log('Réservation soumise:', data);

            // WhatsApp Integration
            const phoneNumber = "21658044359";
            
            // Format the message
            const message = `Bonjour The Castle Park ! Je souhaite faire une réservation :
👤 Nom : ${data.name}
📞 Téléphone : ${data.phone}
📅 Date : ${data.date}
⏰ Heure : ${data.time}
👥 Personnes : ${data.guests}
📝 Demandes spéciales : ${data.notes || "Aucune"}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp Web/App URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            // Show success notification
            showNotification('Redirection vers WhatsApp pour confirmer votre réservation...');
            closeModal('bookingModal');
            bookingForm.reset();
        });
    }

    // Contact Form (Frontend only - no backend)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Log contact data to console
            console.log('Message de contact soumis:', data);

            // Show success notification
            showNotification('Message envoyé avec succès! Nous vous répondrons rapidement.');
            contactForm.reset();
        });
    }

    // --- Notification System ---
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');

        if (notification && notificationText) {
            notificationText.textContent = message;
            notification.classList.add('show');

            // Auto-hide after 4 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }
    }

    // --- Set minimum date for booking ---
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
});


