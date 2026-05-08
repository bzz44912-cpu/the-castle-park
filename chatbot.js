/* ========================================
   THE CASTLE PARK - CHATBOT PREMIUM
   Assistant intelligent pour le café
   ======================================== */

(function() {
    'use strict';

    // ─── CAFE KNOWLEDGE BASE ───────────────────────────────────────
    const CAFE_INFO = {
        name: "The Castle Park",
        location: "Sidi Bouzid, Tunisie",
        mapsLink: "https://maps.app.goo.gl/2MVquQtkWmLYrJnx5",
        phones: ["+216 58 044 359", "+216 94 840 088"],
        whatsapp: "21658044359",
        hours: "Lundi - Dimanche: 8h00 - 23h00",
        email: "contact@thecastlepark.com",
        wifi: "Gratuit pour tous les clients",
        services: ["Wifi Gratuit", "Café Premium", "Ambiance Lounge", "Chicha", "Espace Étage", "Coin Photo"],
        menuLink: "menu_complet.html"
    };

    const MENU_DATA = {
        boissons_chaudes: {
            title: "☕ Boissons Chaudes",
            items: [
                { name: "Express", price: "3.000" },
                { name: "Direct", price: "3.500" },
                { name: "Capucin", price: "4.500" },
                { name: "Café au Lait", price: "4.500" },
                { name: "Café Crème", price: "5.000" },
                { name: "Chocolat Chaud", price: "5.500" },
                { name: "Thé", price: "2.500" },
                { name: "Thé Vert", price: "3.000" }
            ]
        },
        jus_frais: {
            title: "🍊 Jus & Boissons Fraîches",
            items: [
                { name: "Jus d'Orange Frais", price: "5.000" },
                { name: "Citronnade", price: "5.000" },
                { name: "Smoothie Fruits", price: "8.000" },
                { name: "Milkshake", price: "7.000" },
                { name: "Ice Tea Maison", price: "5.000" }
            ]
        },
        petit_dejeuner: {
            title: "🌅 Petit Déjeuner & Brunch",
            items: [
                { name: "Formule Petit Déjeuner", price: "À partir de 8.000" },
                { name: "Brunch Complet", price: "À partir de 15.000" }
            ]
        },
        cuisine_salee: {
            title: "🍳 Cuisine Salée",
            items: [
                { name: "Omelettes variées", price: "À partir de 6.000" },
                { name: "Crêpes salées", price: "À partir de 7.000" }
            ]
        },
        patisseries: {
            title: "🍰 Pâtisseries & Crêpes",
            items: [
                { name: "Crêpe Nutella", price: "7.000" },
                { name: "Tiramisu Maison", price: "8.000" },
                { name: "Fondant au Chocolat", price: "9.000" },
                { name: "Pancakes", price: "7.000" },
                { name: "Gâteau du Jour", price: "6.000" }
            ]
        },
        glaces: {
            title: "🍦 Boules Bourgeois & Jwajem",
            items: [
                { name: "Glace artisanale", price: "À partir de 3.000" },
                { name: "Jwajem", price: "À partir de 5.000" }
            ]
        },
        chicha: {
            title: "💨 Chicha",
            items: [
                { name: "Adalya", price: "Sur place" },
                { name: "Fakher", price: "Sur place" },
                { name: "Avec fruits", price: "Supplément" }
            ]
        }
    };

    // ─── SMART RESPONSE ENGINE ─────────────────────────────────────
    function generateResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();
        
        // Greetings
        if (msg.match(/^(salut|bonjour|bonsoir|hello|hi|hey|salam|slm|ahla|مرحبا|cv|wesh|yo)/)) {
            const greetings = [
                `Marhba bik fi **The Castle Park**! 🌿✨ Chna7wel lik? N9adder n3awnek f:\n\n☕ Menu w les prix\n📅 Réservation\n📍 L'adresse\n⏰ Les horaires\n\nKtebli chnou t7eb!`,
                `Ahla w sahla! 👋 Bienvenue au **The Castle Park**!\n\nAna l'assistant digitale mta3 el café. 9olli chnou t7eb:\n\n🍽️ Menu & Prix\n📞 Réservation\n📍 Comment nous trouver\n💨 Chicha`,
                `Hello! 🌸 Ravi de vous aider au **The Castle Park** !\n\nQue puis-je faire pour vous aujourd'hui ?\n\n☕ Voir le menu\n📅 Réserver une table\n📍 Notre adresse\n⏰ Horaires d'ouverture`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // Menu general
        if (msg.match(/(menu|carte|manger|akl|أكل|plat|nourriture|chnou 3andkom|ch3andkom|mawjoud)/)) {
            let response = `🍽️ **Notre Menu - The Castle Park**\n\n`;
            Object.values(MENU_DATA).forEach(cat => {
                response += `**${cat.title}**\n`;
                cat.items.slice(0, 3).forEach(item => {
                    response += `  • ${item.name} — ${item.price} DT\n`;
                });
                if (cat.items.length > 3) response += `  _...et plus encore!_\n`;
                response += `\n`;
            });
            response += `📋 [Voir la carte complète](menu_complet.html)\n\nChnou yechd 3inik? 😊`;
            return response;
        }

        // Coffee specific
        if (msg.match(/(caf[eé]|coffee|9ahwa|قهوة|express|capucin|cappuccino|latte|nescaf)/)) {
            let response = `☕ **Nos Cafés Premium**\n\n`;
            MENU_DATA.boissons_chaudes.items.forEach(item => {
                response += `• **${item.name}** — ${item.price} DT\n`;
            });
            response += `\n_Tous nos cafés sont préparés avec des grains de qualité premium!_ ✨`;
            return response;
        }

        // Juice & cold drinks
        if (msg.match(/(jus|juice|عصير|boisson|drink|smoothie|milkshake|citron|orange|frais|froid|bered)/)) {
            let response = `🍊 **Nos Boissons Fraîches**\n\n`;
            MENU_DATA.jus_frais.items.forEach(item => {
                response += `• **${item.name}** — ${item.price} DT\n`;
            });
            response += `\n🧊 _Fraîcheur garantie avec des fruits de saison!_`;
            return response;
        }

        // Desserts & pastries
        if (msg.match(/(dessert|gateau|gâteau|patisserie|pâtisserie|7alwa|حلوة|cr[eê]pe|pancake|tiramisu|chocolat|nutella|sucr[eé])/)) {
            let response = `🍰 **Nos Pâtisseries & Desserts**\n\n`;
            MENU_DATA.patisseries.items.forEach(item => {
                response += `• **${item.name}** — ${item.price} DT\n`;
            });
            response += `\n😋 _Fait maison avec amour chaque jour!_`;
            return response;
        }

        // Chicha / Hookah
        if (msg.match(/(chicha|shisha|شيشة|hookah|narguilé|narguil[eé]|adalya|fakher|m3ass[ae]l)/)) {
            let response = `💨 **Chicha - The Castle Park**\n\n`;
            response += `• **Adalya** — Large sélection de goûts\n`;
            response += `• **Fakher** — Classique et premium\n`;
            response += `• **Avec fruits frais** — Supplément disponible\n\n`;
            response += `🍉 _Ambiance lounge garantie! Venez découvrir nos mélanges exclusifs._`;
            return response;
        }

        // Ice cream
        if (msg.match(/(glace|ice cream|بوظة|jwajem|boule|bourgeois)/)) {
            let response = `🍦 **Boules Bourgeois & Jwajem**\n\n`;
            MENU_DATA.glaces.items.forEach(item => {
                response += `• **${item.name}** — ${item.price} DT\n`;
            });
            response += `\n_Le meilleur de la glace artisanale!_ 🍨`;
            return response;
        }

        // Breakfast
        if (msg.match(/(petit[- ]d[eé]jeuner|breakfast|brunch|ftor|فطور|matin|morning|sba7)/)) {
            let response = `🌅 **Petit Déjeuner & Brunch**\n\n`;
            MENU_DATA.petit_dejeuner.items.forEach(item => {
                response += `• **${item.name}** — ${item.price} DT\n`;
            });
            response += `\n☀️ _Commencez votre journée avec style au Loft!_\n`;
            response += `_Disponible tous les matins à partir de 8h00._`;
            return response;
        }

        // Prices
        if (msg.match(/(prix|price|سعر|b9addech|9addech|combien|tarif|cher|pas cher|promotion)/)) {
            return `💰 **Nos Prix**\n\n☕ Cafés: à partir de **3.000 DT**\n🍊 Jus frais: à partir de **5.000 DT**\n🍰 Pâtisseries: à partir de **6.000 DT**\n🍦 Glaces: à partir de **3.000 DT**\n🌅 Petit déj: à partir de **8.000 DT**\n\n📋 Pour les prix détaillés, consultez notre [carte complète](menu_complet.html)!\n\n_Nous avons des options pour tous les budgets!_ 😊`;
        }

        // Reservation
        if (msg.match(/(réserv|reserv|r[eé]serv|book|table|7jez|احجز|place|soirée|soir[eé]e|groupe|celebration|anniversaire|f[eê]te)/)) {
            return `📅 **Réserver une Table**\n\nVous pouvez réserver facilement:\n\n📱 **Par WhatsApp** (le plus rapide!):\n[Cliquez ici pour réserver](https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent('Bonjour! Je souhaite réserver une table au Castle Park.')})\n\n📞 **Par téléphone:**\n• ${CAFE_INFO.phones[0]}\n• ${CAFE_INFO.phones[1]}\n\n💡 _Conseil: Pour les groupes de 6+ personnes ou les événements spéciaux, appelez-nous à l'avance!_`;
        }

        // Location / Address
        if (msg.match(/(adresse|address|وين|winek|finek|lieu|emplacement|location|o[uù]|comment (venir|arriver|trouver)|maps|gps|itinéraire|kif nousel|كيف نوصل)/)) {
            return `📍 **Notre Adresse**\n\n🏠 **The Castle Park**\nSidi Bouzid, Tunisie\n\n🗺️ [Voir sur Google Maps](${CAFE_INFO.mapsLink})\n\n📞 Besoin d'indications?\n• ${CAFE_INFO.phones[0]}\n• ${CAFE_INFO.phones[1]}\n\n_N'hésitez pas à nous appeler si vous avez du mal à nous trouver!_ 🚗`;
        }

        // Hours
        if (msg.match(/(heure|horaire|hours|وقت|w9ach|emta|ouvert|ferme|ferm[eé]|open|close|timing|matloua|7ell|sa3a)/)) {
            return `⏰ **Nos Horaires d'Ouverture**\n\n🕗 **${CAFE_INFO.hours}**\n\n✅ Ouvert **7 jours sur 7**!\n\n☕ Petit déjeuner dès 8h00\n🍽️ Déjeuner à partir de 12h00\n🌙 Service continu jusqu'à 23h00\n\n_On vous attend!_ 🌿`;
        }

        // Contact
        if (msg.match(/(contact|appel|appeler|num[eé]ro|telephone|t[eé]l[eé]phone|phone|whatsapp|واتساب|email|mail)/)) {
            return `📞 **Nous Contacter**\n\n📱 **Téléphone:**\n• ${CAFE_INFO.phones[0]}\n• ${CAFE_INFO.phones[1]}\n\n💬 **WhatsApp:**\n[Envoyer un message](https://wa.me/${CAFE_INFO.whatsapp})\n\n📧 **Email:** ${CAFE_INFO.email}\n\n📍 [Notre position sur Maps](${CAFE_INFO.mapsLink})\n\n_Nous répondons rapidement!_ ⚡`;
        }

        // WiFi
        if (msg.match(/(wifi|wi-fi|internet|connexion|mot de passe|password|wificode)/)) {
            return `📶 **WiFi Gratuit**\n\nOui! Le WiFi est **gratuit** pour tous nos clients! 🎉\n\nDemandez le code WiFi à notre équipe sur place.\n\n💻 _Parfait pour travailler ou se détendre avec une bonne connexion!_`;
        }

        // Thank you
        if (msg.match(/(merci|thanks|thank you|شكرا|choukran|chokran|teslam|baraka|barak)/)) {
            const thanks = [
                `De rien! 😊 C'était un plaisir! N'hésitez pas si vous avez d'autres questions. On vous attend au **The Castle Park**! 🌿✨`,
                `3aychek! 🙏 Marhba bik fi The Castle Park à tout moment! ☕🌸`,
                `Ya3tik essa7a! 😄 Heureux de pouvoir aider. À bientôt au Loft! 🌿`
            ];
            return thanks[Math.floor(Math.random() * thanks.length)];
        }

        // Goodbye
        if (msg.match(/(bye|au revoir|bslema|بسلامة|ciao|tchao|a\+|à\+|bonne nuit|bonne soir[eé]e|bonne journ[eé]e)/)) {
            return `À bientôt! 👋✨\n\nOn espère vous voir très vite au **The Castle Park**! 🌿\n\n📍 ${CAFE_INFO.location}\n⏰ ${CAFE_INFO.hours}\n\n_Bslema w tji merte okhra!_ 💚`;
        }

        // About the cafe
        if (msg.match(/(c'est quoi|chnowa|شنو|about|à propos|7akili|parle.moi|tell me|presentation|qui [eê]tes)/)) {
            return `🌿 **The Castle Park**\n\nSitué au cœur de **Sidi Bouzid**, The Castle Park est bien plus qu'un simple café.\n\nC'est un espace conçu pour:\n• 🛋️ La **détente** — Ambiance lounge unique\n• 👫 La **convivialité** — Parfait pour vos sorties\n• 🎨 Le **plaisir des sens** — Décor élégant\n\n**Nos points forts:**\n✅ Café Premium\n✅ Cuisine raffinée\n✅ Chicha (Adalya & Fakher)\n✅ WiFi gratuit\n✅ Ambiance musicale\n✅ Coin photo Instagram\n\n_Venez vivre l'expérience Loft!_ ✨`;
        }

        // Ambiance / photos / Instagram
        if (msg.match(/(ambiance|photo|instagram|décor|decor|beau|beautiful|joli|7lou|تصوير|selfie|coin)/)) {
            return `📸 **L'Ambiance du Loft**\n\nNotre café est un véritable **lieu instagrammable**!\n\n🌸 Mur de fleurs de cerisier\n🌿 Murs vert sauge élégants\n💡 Éclairage néon "The Castle"\n🌺 Escalier décoré de fleurs\n🛋️ Espaces lounge confortables\n\n_Venez prendre les plus belles photos de Sidi Bouzid!_ 🤳✨`;
        }

        // Default / didn't understand
        const defaults = [
            `Hmm, ma fhemtekch mli7 🤔 Amma n9adder n3awnek f:\n\n☕ **Menu** — Nos plats et prix\n📅 **Réservation** — Réserver une table\n📍 **Adresse** — Comment nous trouver\n⏰ **Horaires** — Quand on est ouvert\n📞 **Contact** — Nos numéros\n💨 **Chicha** — Notre sélection\n📶 **WiFi** — Info connexion\n\nKtebli chnou t7eb! 😊`,
            `Je ne suis pas sûr de comprendre, mais essayez de demander:\n\n• "**Menu**" pour voir nos plats\n• "**Réserver**" pour une table\n• "**Horaires**" pour nos heures\n• "**Adresse**" pour nous trouver\n• "**Chicha**" pour notre sélection\n\n_Je suis là pour vous aider!_ 🌿`
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    // ─── FORMAT MARKDOWN-LIKE TEXT ─────────────────────────────────
    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/\n/g, '<br>');
    }

    // ─── CREATE CHATBOT DOM ────────────────────────────────────────
    function createChatbot() {
        // Main container
        const chatbotHTML = `
        <div id="loftChatbot" class="loft-chatbot">
            <!-- Floating Button -->
            <button id="chatbotToggle" class="chatbot-toggle" aria-label="Ouvrir le chat" title="Parlez avec nous!">
                <div class="chatbot-toggle-inner">
                    <i class="fas fa-comments chatbot-icon-open"></i>
                    <i class="fas fa-times chatbot-icon-close"></i>
                </div>
                <div class="chatbot-pulse"></div>
                <div class="chatbot-pulse chatbot-pulse-2"></div>
            </button>

            <!-- Chat Window -->
            <div id="chatbotWindow" class="chatbot-window">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-left">
                        <div class="chatbot-avatar">
                            <span>CP</span>
                            <div class="chatbot-status-dot"></div>
                        </div>
                        <div class="chatbot-header-info">
                            <h3>The Castle Park</h3>
                            <span class="chatbot-status">En ligne • Prêt à aider</span>
                        </div>
                    </div>
                    <button id="chatbotClose" class="chatbot-header-btn" aria-label="Fermer">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>

                <!-- Messages Area -->
                <div id="chatbotMessages" class="chatbot-messages">
                    <!-- Welcome message will be injected -->
                </div>

                <!-- Quick Replies -->
                <div id="chatbotQuickReplies" class="chatbot-quick-replies">
                    <button class="quick-reply-btn" data-message="Menu">☕ Menu</button>
                    <button class="quick-reply-btn" data-message="Réserver une table">📅 Réserver</button>
                    <button class="quick-reply-btn" data-message="Horaires">⏰ Horaires</button>
                    <button class="quick-reply-btn" data-message="Adresse">📍 Adresse</button>
                    <button class="quick-reply-btn" data-message="Chicha">💨 Chicha</button>
                    <button class="quick-reply-btn" data-message="Contact">📞 Contact</button>
                </div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <div class="chatbot-input-wrapper">
                        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Écrivez votre message..." autocomplete="off">
                        <button id="chatbotSend" class="chatbot-send-btn" aria-label="Envoyer">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chatbot-powered">
                        <i class="fas fa-leaf"></i> The Castle Park Assistant
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    // ─── MESSAGE HANDLING ──────────────────────────────────────────
    function addMessage(text, isBot = false) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-msg ${isBot ? 'bot-msg' : 'user-msg'}`;

        const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        if (isBot) {
            msgDiv.innerHTML = `
                <div class="msg-avatar">
                    <span>CP</span>
                </div>
                <div class="msg-content">
                    <div class="msg-bubble bot-bubble">
                        ${formatMessage(text)}
                    </div>
                    <span class="msg-time">${time}</span>
                </div>`;
        } else {
            msgDiv.innerHTML = `
                <div class="msg-content">
                    <div class="msg-bubble user-bubble">
                        ${text}
                    </div>
                    <span class="msg-time">${time}</span>
                </div>`;
        }

        messagesContainer.appendChild(msgDiv);

        // Animate in
        requestAnimationFrame(() => {
            msgDiv.classList.add('msg-visible');
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-msg bot-msg typing-indicator-msg';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="msg-avatar">
                <span>CP</span>
            </div>
            <div class="msg-content">
                <div class="msg-bubble bot-bubble typing-bubble">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>`;
        messagesContainer.appendChild(typingDiv);
        requestAnimationFrame(() => typingDiv.classList.add('msg-visible'));
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    function handleUserMessage(text) {
        if (!text.trim()) return;

        addMessage(text, false);

        // Hide quick replies after first message
        const quickReplies = document.getElementById('chatbotQuickReplies');
        if (quickReplies) quickReplies.style.display = 'none';

        // Show typing, then respond
        showTypingIndicator();

        const delay = Math.min(800 + text.length * 20, 2000);
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateResponse(text);
            addMessage(response, true);

            // Show quick replies again after bot response
            setTimeout(() => {
                if (quickReplies) quickReplies.style.display = 'flex';
            }, 500);
        }, delay);
    }

    // ─── INITIALIZE ────────────────────────────────────────────────
    function init() {
        createChatbot();

        const toggleBtn = document.getElementById('chatbotToggle');
        const chatWindow = document.getElementById('chatbotWindow');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatbotSend');
        const quickBtns = document.querySelectorAll('.quick-reply-btn');

        let isOpen = false;
        let hasWelcomed = false;

        // Toggle chat
        function toggleChat() {
            isOpen = !isOpen;
            chatWindow.classList.toggle('chatbot-open', isOpen);
            toggleBtn.classList.toggle('chatbot-active', isOpen);

            if (isOpen && !hasWelcomed) {
                hasWelcomed = true;
                setTimeout(() => {
                    addMessage(`Marhba bik! 👋🌿\n\nAna l'assistant digital mta3 **The Castle Park**!\n\nN9adder n3awnek bach:\n☕ Tchouf el **menu** w les prix\n📅 T7jez **table**\n📍 Tal9a el **adresse**\n⏰ Ta3ref el **horaires**\n\nChnou t7eb? 😊`, true);
                }, 500);
            }

            if (isOpen) {
                setTimeout(() => input.focus(), 300);
            }
        }

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // Send message
        function sendMessage() {
            const text = input.value.trim();
            if (text) {
                handleUserMessage(text);
                input.value = '';
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Quick reply buttons
        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.getAttribute('data-message');
                handleUserMessage(msg);
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) toggleChat();
        });

        // Show greeting tooltip after delay
        setTimeout(() => {
            if (!isOpen) {
                toggleBtn.classList.add('chatbot-greeting');
                setTimeout(() => toggleBtn.classList.remove('chatbot-greeting'), 5000);
            }
        }, 3000);
    }

    // ─── EXPOSE GLOBAL API ────────────────────────────────────────
    window.chatbot = {
        addBotMessage: (text) => {
            const chatWindow = document.getElementById('chatbotWindow');
            const toggleBtn = document.getElementById('chatbotToggle');
            const input = document.getElementById('chatbotInput');

            // Open chat window if closed
            if (chatWindow && !chatWindow.classList.contains('chatbot-open')) {
                chatWindow.classList.add('chatbot-open');
                if (toggleBtn) toggleBtn.classList.add('chatbot-active');
                // Focus input if opening
                if (input) setTimeout(() => input.focus(), 300);
            }

            // Add the message
            addMessage(text, true);
        }
    };

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
