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
        phones: ["+216 94 443 814"],
        whatsapp: "21694443814",
        hours: "Lundi - Dimanche: 8h00 - Minuit",
        email: "contact@castlepark.com",
        wifi: "Gratuit pour tous les clients",
        services: ["Wifi Gratuit", "Café Premium", "Ambiance Royale", "Espace VIP", "Terrasse Panoramique"],
        menuLink: "#menu"
    };

    const MENU_DATA = {
        boissons_chaudes: {
            title: "☕ Boissons Chaudes",
            items: [
                { name: "Espresso Signature", price: "3.000" },
                { name: "Capucin Royal", price: "4.500" },
                { name: "Café au Lait", price: "4.500" },
                { name: "Café Crème", price: "5.000" },
                { name: "Chocolat Chaud", price: "5.500" },
                { name: "Thé à la Menthe", price: "2.500" }
            ]
        },
        jus_frais: {
            title: "🍊 Jus & Boissons Fraîches",
            items: [
                { name: "Jus d'Orange Frais", price: "5.000" },
                { name: "Citronnade Maison", price: "5.000" },
                { name: "Smoothie Riviera", price: "8.000" },
                { name: "Milkshake Artisanal", price: "7.000" },
                { name: "Ice Tea Maison", price: "5.000" }
            ]
        },
        petit_dejeuner: {
            title: "🌅 Petit Déjeuner & Brunch",
            items: [
                { name: "Formule Petit Déjeuner", price: "À partir de 8.000" },
                { name: "Brunch Complet Royale", price: "À partir de 15.000" }
            ]
        },
        cuisine_salee: {
            title: "🍳 Cuisine Salée",
            items: [
                { name: "Omelette Méditerranée", price: "9.000" },
                { name: "Club Sandwich", price: "12.000" },
                { name: "Pizza Bianca", price: "16.000" },
                { name: "Burger Signature", price: "14.000" }
            ]
        },
        patisseries: {
            title: "🍰 Pâtisseries & Desserts",
            items: [
                { name: "Crêpe Suzette", price: "7.000" },
                { name: "Tiramisu Maison", price: "8.000" },
                { name: "Fondant au Chocolat", price: "9.000" },
                { name: "Gâteau du Jour", price: "7.000" }
            ]
        }
    };

    // ─── SMART RESPONSE ENGINE ─────────────────────────────────────
    function generateResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();
        
        // Greetings
        if (msg.match(/^(salut|bonjour|bonsoir|hello|hi|hey|salam|slm|ahla|مرحبا|cv|wesh|yo)/)) {
            const greetings = [
                `Marhba bik fi **The Castle Park**! 🏰✨ Chna7wel lik? N9adder n3awnek f:\n\n☕ Menu w les prix\n📅 Réservation\n📍 L'adresse\n⏰ Les horaires\n\nKtebli chnou t7eb!`,
                `Ahla w sahla! 👋 Bienvenue au **The Castle Park**!\n\nAna l'assistant digitale mta3 el café. 9olli chnou t7eb:\n\n🍽️ Menu & Prix\n📞 Réservation\n📍 Comment nous trouver`,
                `Hello! 👑 Ravi de vous aider au **The Castle Park** !\n\nQue puis-je faire pour vous aujourd'hui ?\n\n☕ Voir le menu\n📅 Réserver une table\n📍 Notre adresse\n⏰ Horaires d'ouverture`
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
            response += `📋 [Voir la carte complète](#menu)\n\nChnou yechd 3inik? 😊`;
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

        // Prices
        if (msg.match(/(prix|price|سعر|b9addech|9addech|combien|tarif|cher|pas cher|promotion)/)) {
            return `💰 **Nos Prix**\n\n☕ Cafés: à partir de **3.000 DT**\n🍊 Jus frais: à partir de **5.000 DT**\n🍰 Pâtisseries: à partir de **6.000 DT**\n🌅 Petit déj: à partir de **8.000 DT**\n\n📋 Pour les prix détaillés, consultez notre [carte complète](#menu)!\n\n_Nous avons des options pour tous les budgets!_ 😊`;
        }

        // Reservation
        if (msg.match(/(réserv|reserv|r[eé]serv|book|table|7jez|احجز|place|anniversaire|f[eê]te)/)) {
            return `📅 **Réserver une Table**\n\nVous pouvez réserver facilement:\n\n📱 **Par WhatsApp** (le plus rapide!):\n[Cliquez ici pour réserver](https://wa.me/${CAFE_INFO.whatsapp}?text=${encodeURIComponent('Bonjour! Je souhaite réserver une table au Castle Park.')})\n\n📞 **Par téléphone:**\n• ${CAFE_INFO.phones[0]}\n\n💡 _Conseil: Pour les groupes ou les événements spéciaux, appelez-nous à l'avance!_`;
        }

        // Location / Address
        if (msg.match(/(adresse|address|وين|winek|finek|lieu|emplacement|location|o[uù]|comment (venir|arriver|trouver)|maps|gps|itinéraire|kif nousel|كيف نوصل)/)) {
            return `📍 **Notre Adresse**\n\n🏠 **The Castle Park**\nSidi Bouzid, Tunisie\n\n🗺️ [Voir sur Google Maps](${CAFE_INFO.mapsLink})\n\n📞 Besoin d'indications?\n• ${CAFE_INFO.phones[0]}\n\n_N'hésitez pas à nous appeler si vous avez du mal à nous trouver!_ 🚗`;
        }

        // Hours
        if (msg.match(/(heure|horaire|hours|وقت|w9ach|emta|ouvert|ferme|ferm[eé]|open|close|timing)/)) {
            return `⏰ **Nos Horaires d'Ouverture**\n\n🕗 **${CAFE_INFO.hours}**\n\n✅ Ouvert **7 jours sur 7**!\n\n_On vous attend!_ 🏰`;
        }

        // WiFi
        if (msg.match(/(wifi|wi-fi|internet|connexion|mot de passe|password|wificode)/)) {
            return `📶 **WiFi Gratuit**\n\nOui! Le WiFi est **gratuit** pour tous nos clients! 🎉\n\nDemandez le code WiFi à notre équipe sur place.`;
        }

        // Thank you
        if (msg.match(/(merci|thanks|thank you|شكرا|choukran|chokran|teslam|baraka|barak)/)) {
            return `De rien! 😊 C'était un plaisir! N'hésitez pas si vous avez d'autres questions. On vous attend au **The Castle Park**! 🏰✨`;
        }

        // Goodbye
        if (msg.match(/(bye|au revoir|bslema|بسلامة|ciao|tchao|a\+|à\+|bonne nuit|bonne soir[eé]e|bonne journ[eé]e)/)) {
            return `À bientôt! 👋✨\n\nOn espère vous voir très vite au **The Castle Park**! 🏰\n\n📍 ${CAFE_INFO.location}\n⏰ ${CAFE_INFO.hours}\n\n_Bslema!_ 💚`;
        }

        // Default / didn't understand
        return `Hmm, ma fhemtekch mli7 🤔 Amma n9adder n3awnek f:\n\n☕ **Menu** — Nos plats et prix\n📅 **Réservation** — Réserver une table\n📍 **Adresse** — Comment nous trouver\n⏰ **Horaires** — Quand on est ouvert\n\nKtebli chnou t7eb! 😊`;
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
        const chatbotHTML = `
        <div id="loftChatbot" class="loft-chatbot">
            <button id="chatbotToggle" class="chatbot-toggle" aria-label="Ouvrir le chat">
                <div class="chatbot-toggle-inner">
                    <i class="fas fa-comments chatbot-icon-open"></i>
                    <i class="fas fa-times chatbot-icon-close"></i>
                </div>
                <div class="chatbot-pulse"></div>
            </button>

            <div id="chatbotWindow" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-left">
                        <div class="chatbot-avatar">CP</div>
                        <div class="chatbot-header-info">
                            <h3>The Castle Park</h3>
                            <span class="chatbot-status">En ligne</span>
                        </div>
                    </div>
                    <button id="chatbotClose" class="chatbot-header-btn"><i class="fas fa-chevron-down"></i></button>
                </div>

                <div id="chatbotMessages" class="chatbot-messages"></div>

                <div id="chatbotQuickReplies" class="chatbot-quick-replies">
                    <button class="quick-reply-btn" data-message="Menu">☕ Menu</button>
                    <button class="quick-reply-btn" data-message="Réserver">📅 Réserver</button>
                    <button class="quick-reply-btn" data-message="Horaires">⏰ Horaires</button>
                </div>

                <div class="chatbot-input-area">
                    <div class="chatbot-input-wrapper">
                        <input type="text" id="chatbotInput" class="chatbot-input" placeholder="Écrivez ici..." autocomplete="off">
                        <button id="chatbotSend" class="chatbot-send-btn"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    // ─── MESSAGE HANDLING ──────────────────────────────────────────
    function addMessage(text, isBot = false) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if(!messagesContainer) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-msg ${isBot ? 'bot-msg' : 'user-msg'}`;

        const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        if (isBot) {
            msgDiv.innerHTML = `<div class="msg-avatar">CP</div><div class="msg-content"><div class="msg-bubble bot-bubble">${formatMessage(text)}</div><span class="msg-time">${time}</span></div>`;
        } else {
            msgDiv.innerHTML = `<div class="msg-content"><div class="msg-bubble user-bubble">${text}</div><span class="msg-time">${time}</span></div>`;
        }

        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

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

        function toggleChat() {
            isOpen = !isOpen;
            chatWindow.classList.toggle('chatbot-open', isOpen);
            toggleBtn.classList.toggle('chatbot-active', isOpen);

            if (isOpen && !hasWelcomed) {
                hasWelcomed = true;
                setTimeout(() => {
                    addMessage(`Marhba bik! 🏰✨\n\nAna l'assistant digital mta3 **The Castle Park**!\n\nN9adder n3awnek f:\n☕ Menu\n📅 Réservation\n📍 Adresse\n⏰ Horaires\n\nChnou t7eb? 😊`, true);
                }, 500);
            }
        }

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        function sendMessage() {
            const text = input.value.trim();
            if (text) {
                addMessage(text, false);
                input.value = '';
                setTimeout(() => addMessage(generateResponse(text), true), 600);
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.getAttribute('data-message');
                addMessage(msg, false);
                setTimeout(() => addMessage(generateResponse(msg), true), 600);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
