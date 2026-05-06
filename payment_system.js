// ===== SHOPPING CART & PAYMENT SYSTEM =====

// Cart state
let cart = {
    items: [],
    deliveryFee: 0,
    deliveryMethod: 'delivery'
};

// Customer data
let customerData = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    deliveryNotes: '',
    paymentMethod: 'cash'
};

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('loftLoungeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('loftLoungeCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(itemName, itemPrice, itemIcon = 'utensils') {
    const existingItem = cart.items.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({
            name: itemName,
            price: parseFloat(itemPrice),
            quantity: 1,
            icon: itemIcon
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${itemName} ajouté au panier!`);

    // Animate cart button
    const cartBtn = document.querySelector('.cart-button-fixed');
    if (cartBtn) {
        cartBtn.classList.add('bounce');
        setTimeout(() => cartBtn.classList.remove('bounce'), 500);
    }
}

// Remove item from cart
function removeFromCart(itemName) {
    cart.items = cart.items.filter(item => item.name !== itemName);
    saveCart();
    updateCartUI();
    showNotification(`Article retiré du panier`);
}

// Update item quantity
function updateQuantity(itemName, change) {
    const item = cart.items.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.deliveryMethod === 'delivery' ? (subtotal >= 50 ? 0 : 3) : 0;
    const total = subtotal + deliveryFee;

    return {
        subtotal: subtotal.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        total: total.toFixed(2)
    };
}

// Update cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    const cartBadge = document.querySelector('.cart-badge');

    // Update badge
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Show/hide empty state
    if (cart.items.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartItemsContainer) cartItemsContainer.innerHTML = '';
        return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';

    // Render cart items
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <i class="fas fa-${item.icon}"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} TND</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    // Update totals
    const totals = calculateTotals();
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const totalPriceEl = document.getElementById('totalPrice');

    if (subtotalEl) subtotalEl.textContent = `${totals.subtotal} TND`;
    if (deliveryFeeEl) {
        deliveryFeeEl.textContent = totals.deliveryFee === '0.00'
            ? 'Gratuit!'
            : `${totals.deliveryFee} TND`;
    }
    if (totalPriceEl) totalPriceEl.textContent = `${totals.total} TND`;
}

// Open cart modal
function openCartModal() {
    updateCartUI();
    openModal('cartModal');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.items.length === 0) {
        showNotification('Votre panier est vide!');
        return;
    }

    closeModal('cartModal');
    openModal('checkoutModal');
    goToCheckoutStep(1);
    updateCheckoutSummary();
}

// Go to checkout step
function goToCheckoutStep(step) {
    // Hide all steps
    for (let i = 1; i <= 3; i++) {
        const stepContent = document.getElementById(`step${i}`);
        const stepIndicator = document.querySelector(`.step[data-step="${i}"]`);

        if (stepContent) stepContent.style.display = 'none';
        if (stepIndicator) {
            stepIndicator.classList.remove('active');
            if (i < step) {
                stepIndicator.classList.add('completed');
            } else {
                stepIndicator.classList.remove('completed');
            }
        }
    }

    // Show current step
    const currentStep = document.getElementById(`step${step}`);
    const currentIndicator = document.querySelector(`.step[data-step="${step}"]`);

    if (currentStep) currentStep.style.display = 'block';
    if (currentIndicator) currentIndicator.classList.add('active');

    // Update summary for step 3
    if (step === 3) {
        updateCheckoutSummary();
    }
}

// Update checkout summary
function updateCheckoutSummary() {
    const totals = calculateTotals();

    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutDelivery = document.getElementById('checkoutDelivery');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (checkoutSubtotal) checkoutSubtotal.textContent = `${totals.subtotal} TND`;
    if (checkoutDelivery) {
        checkoutDelivery.textContent = totals.deliveryFee === '0.00'
            ? 'Gratuit!'
            : `${totals.deliveryFee} TND`;
    }
    if (checkoutTotal) checkoutTotal.textContent = `${totals.total} TND`;
}

// Handle delivery method change
function handleDeliveryMethodChange() {
    const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    const addressForm = document.getElementById('addressForm');
    const deliveryAddress = document.getElementById('deliveryAddress');

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cart.deliveryMethod = e.target.value;

            if (e.target.value === 'delivery') {
                if (addressForm) addressForm.style.display = 'block';
                if (deliveryAddress) deliveryAddress.required = true;
            } else {
                if (addressForm) addressForm.style.display = 'none';
                if (deliveryAddress) deliveryAddress.required = false;
            }

            saveCart();
            updateCartUI();
            updateCheckoutSummary();
        });
    });
}

// Handle payment method change
function handlePaymentMethodChange() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const d17Form = document.getElementById('d17PaymentForm');
    const cardForm = document.getElementById('cardPaymentForm');
    const cashInfo = document.getElementById('cashPaymentInfo');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            customerData.paymentMethod = e.target.value;

            // Hide all payment forms
            if (d17Form) d17Form.style.display = 'none';
            if (cardForm) cardForm.style.display = 'none';
            if (cashInfo) cashInfo.style.display = 'none';

            // Show selected form
            if (e.target.value === 'd17' && d17Form) {
                d17Form.style.display = 'block';
            } else if (e.target.value === 'card' && cardForm) {
                cardForm.style.display = 'block';
            } else if (e.target.value === 'cash' && cashInfo) {
                cashInfo.style.display = 'block';
            }
        });
    });
}

// Format card number
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// Format card expiry
function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Process D17 payment
async function processD17Payment(phone) {
    // Simulate D17 API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('D17 Payment processed for:', phone);
            resolve({ success: true, transactionId: `D17-${Date.now()}` });
        }, 2000);
    });
}

// Process card payment
async function processCardPayment(cardData) {
    // Simulate payment gateway
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Card Payment processed:', cardData);
            resolve({ success: true, transactionId: `CARD-${Date.now()}` });
        }, 2000);
    });
}

// Finalize order
async function finalizeOrder() {
    const finalizeBtn = document.getElementById('finalizeOrderBtn');
    if (!finalizeBtn) return;

    // Disable button
    finalizeBtn.disabled = true;
    const originalText = finalizeBtn.innerHTML;
    finalizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';

    try {
        let paymentResult = { success: true, transactionId: null };

        // Process payment based on method
        if (customerData.paymentMethod === 'd17') {
            const d17Phone = document.querySelector('input[name="d17Phone"]')?.value;
            if (!d17Phone) {
                throw new Error('Numéro D17 requis');
            }
            paymentResult = await processD17Payment(d17Phone);
        } else if (customerData.paymentMethod === 'card') {
            const cardNumber = document.querySelector('input[name="cardNumber"]')?.value;
            const cardName = document.querySelector('input[name="cardName"]')?.value;
            const cardExpiry = document.querySelector('input[name="cardExpiry"]')?.value;
            const cardCVV = document.querySelector('input[name="cardCVV"]')?.value;

            if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
                throw new Error('Informations de carte incomplètes');
            }

            paymentResult = await processCardPayment({
                number: cardNumber,
                name: cardName,
                expiry: cardExpiry,
                cvv: cardCVV
            });
        }

        if (paymentResult.success) {
            // Generate order number
            const orderNumber = `LFL${Date.now().toString().slice(-6)}`;

            // Create order object
            const order = {
                orderNumber,
                items: cart.items,
                customer: customerData,
                totals: calculateTotals(),
                deliveryMethod: cart.deliveryMethod,
                paymentMethod: customerData.paymentMethod,
                transactionId: paymentResult.transactionId,
                timestamp: new Date().toISOString(),
                status: 'confirmed'
            };

            // Save order to localStorage (in real app, send to backend)
            const orders = JSON.parse(localStorage.getItem('loftLoungeOrders') || '[]');
            orders.push(order);
            localStorage.setItem('loftLoungeOrders', JSON.stringify(orders));

            // Show confirmation
            showOrderConfirmation(order);

            // Clear cart
            cart.items = [];
            cart.deliveryFee = 0;
            saveCart();
            updateCartUI();

            // Close checkout modal
            closeModal('checkoutModal');

        } else {
            throw new Error('Échec du paiement');
        }

    } catch (error) {
        showNotification(`Erreur: ${error.message}`, 'error');
        finalizeBtn.disabled = false;
        finalizeBtn.innerHTML = originalText;
    }
}

// Show order confirmation
function showOrderConfirmation(order) {
    const confirmOrderNumber = document.getElementById('confirmOrderNumber');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmDeliveryTime = document.getElementById('confirmDeliveryTime');

    if (confirmOrderNumber) {
        confirmOrderNumber.textContent = `#${order.orderNumber}`;
    }

    if (confirmMessage) {
        let message = 'Votre commande a été reçue et sera préparée sous peu.';
        if (order.paymentMethod === 'd17') {
            message += ' Le paiement D17 a été confirmé.';
        } else if (order.paymentMethod === 'card') {
            message += ' Le paiement par carte a été confirmé.';
        }
        confirmMessage.textContent = message;
    }

    if (confirmDeliveryTime) {
        const timeText = order.deliveryMethod === 'collect'
            ? 'Prêt pour retrait dans: 15-20 minutes'
            : 'Livraison estimée: 30-45 minutes';
        confirmDeliveryTime.textContent = timeText;
    }

    openModal('orderConfirmModal');
}

// Track order
function trackOrder() {
    closeModal('orderConfirmModal');
    const orderNumber = document.getElementById('confirmOrderNumber')?.textContent;
    showNotification(`Suivi de la commande ${orderNumber}...`);
    // In real app, redirect to tracking page
    console.log('Tracking order:', orderNumber);
}

// Add to cart buttons to menu items
function addCartButtonsToMenu() {
    const menuModal = document.getElementById('menuModal');
    if (!menuModal) return;

    const menuItems = menuModal.querySelectorAll('.menu-item-detail');

    menuItems.forEach(item => {
        // Check if button already exists
        if (item.querySelector('.btn-add-to-cart')) return;

        const itemName = item.querySelector('h4')?.textContent;
        const priceText = item.querySelector('.price')?.textContent;
        const price = priceText?.replace(/[^\d.]/g, '');

        if (itemName && price) {
            const button = document.createElement('button');
            button.className = 'btn-add-to-cart';
            button.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter';
            button.onclick = () => addToCart(itemName, price);

            const infoDiv = item.querySelector('.item-info');
            if (infoDiv) {
                infoDiv.appendChild(button);
            }
        }
    });
}

// Initialize payment system
function initPaymentSystem() {
    // Initialize cart
    initCart();

    // Setup event listeners
    const proceedBtn = document.getElementById('proceedToCheckout');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', proceedToCheckout);
    }

    // Customer info form
    const customerForm = document.getElementById('customerInfoForm');
    if (customerForm) {
        customerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(customerForm);
            customerData.fullName = formData.get('fullName');
            customerData.phone = formData.get('phone');
            customerData.email = formData.get('email') || '';
            goToCheckoutStep(2);
        });
    }

    // Delivery method handlers
    handleDeliveryMethodChange();

    // Payment method handlers
    handlePaymentMethodChange();

    // Card formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => formatCardNumber(e.target));
    }

    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => formatCardExpiry(e.target));
    }

    // Finalize order button
    const finalizeBtn = document.getElementById('finalizeOrderBtn');
    if (finalizeBtn) {
        finalizeBtn.addEventListener('click', finalizeOrder);
    }

    // Add cart buttons to menu when menu modal opens
    const menuButtons = document.querySelectorAll('[data-action="full-menu"]');
    menuButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(addCartButtonsToMenu, 100);
        });
    });

    // Update delivery address requirement
    const collectRadio = document.getElementById('collect');
    if (collectRadio && collectRadio.checked) {
        const addressForm = document.getElementById('addressForm');
        const deliveryAddress = document.getElementById('deliveryAddress');
        if (addressForm) addressForm.style.display = 'none';
        if (deliveryAddress) deliveryAddress.required = false;
    }
}

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openCartModal = openCartModal;
window.goToCheckoutStep = goToCheckoutStep;
window.trackOrder = trackOrder;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPaymentSystem);
