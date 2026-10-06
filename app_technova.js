// ========================================================
// TechNova Mobile App — Complete 20-Screen Prototype Controller
// "Technology, Simplified"
// ========================================================

// Navigation History Stack
const navigationHistory = ['screen-splash'];
let currentScreen = 'screen-splash';
let isLoFiMode = false;
let isDarkMode = false;
let currentOnboardingSlide = 1;
let couponDiscount = 0;
let appliedCouponCode = '';

// Cart State
let cartItems = [
  { id: 'blade-16', name: 'TechNova Blade 16 Pro Laptop', price: 89999, qty: 1, image: 'laptop' },
  { id: 'pods-pro', name: 'TechNova NeoPods Active ANC', price: 4999, qty: 1, image: 'headphones' }
];

// Wishlist State
let wishlistItems = [
  { id: 'titan-fold', name: 'TechNova Titan Fold 5G', price: 119999, rating: 4.9, image: 'smartphone' },
  { id: 'watch-ultra', name: 'TechNova Watch Ultra S', price: 18999, rating: 4.8, image: 'watch' }
];

// Orders State
let ordersList = [
  {
    id: '#TN20261001',
    date: 'Oct 6, 2026',
    items: [{ name: 'TechNova Blade 16 Pro', qty: 1, price: 89999, image: 'laptop' }],
    total: 89999,
    status: 'IN TRANSIT',
    statusClass: 'bg-blue-100 dark:bg-blue-950 text-blue-600',
    type: 'active',
    tracking: 'BL-984210',
    address: 'Sandip Sah • Plot 42, Cyber Gateway Tech Park, Sector 5, Bengaluru'
  },
  {
    id: '#TN20260912',
    date: 'Sep 12, 2026',
    items: [{ name: 'NeoPods Active ANC', qty: 1, price: 4999, image: 'headphones' }],
    total: 4999,
    status: 'DELIVERED',
    statusClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600',
    type: 'delivered',
    tracking: 'BL-872199',
    address: 'Sandip Sah • Bengaluru Tech Gateway'
  }
];

let currentOrderDetails = ordersList[0];

// Notifications State
let notificationsList = [
  { id: 1, title: 'Your Order has Shipped!', desc: 'Order #TN20261001 is on courier van for delivery tomorrow.', time: '10m ago', unread: true, icon: 'truck', color: 'bg-blue-600' },
  { id: 2, title: 'Exclusive Fest Offer', desc: 'Use code TECH2026 for ₹5,000 off on all Blade Laptops.', time: '2h ago', unread: true, icon: 'gift', color: 'bg-amber-500' },
  { id: 3, title: 'Price Drop in Wishlist', desc: 'Titan Fold 5G dropped by ₹8,000 for a limited time.', time: '5h ago', unread: false, icon: 'heart', color: 'bg-red-500' }
];

// Initialize Lucide Icons
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Update clock time on mobile status bar
function updateClock() {
  const clockEl = document.getElementById('statusBarTime');
  if (clockEl) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  }
}

// Human-Readable Screen Mapping for Inspector & Jump Selectors
const screenNames = {
  'screen-splash': '01. Splash Screen',
  'screen-onboarding': '02. Onboarding (3 Slides)',
  'screen-login': '03. Login / Register',
  'screen-home': '04. Home Dashboard ⭐',
  'screen-categories': '05. Categories',
  'screen-category-products': '06. Category Products',
  'screen-search': '07. Search Screen',
  'screen-search-results': '08. Search Results',
  'screen-product-details': '09. Product Details ⭐',
  'screen-wishlist': '10. Wishlist (Saved)',
  'screen-cart': '11. Cart Screen ⭐',
  'screen-checkout': '12. Checkout Screen',
  'screen-payment': '13. Payment Screen',
  'screen-order-success': '14. Order Success',
  'screen-my-orders': '15. My Orders',
  'screen-order-details': '16. Order Details & Tracking',
  'screen-profile': '17. Profile Account Hub',
  'screen-settings': '18. Settings',
  'screen-notifications': '19. Notifications Feed',
  'screen-help-support': '20. Help & Support Desk'
};

// Navigate to any screen
function navigateTo(screenId) {
  if (screenId === currentScreen) return;

  const targetEl = document.getElementById(screenId);
  if (!targetEl) {
    console.warn('Target screen not found:', screenId);
    showToast('Route: ' + screenId);
    return;
  }

  // Push to history
  if (navigationHistory[navigationHistory.length - 1] !== screenId) {
    navigationHistory.push(screenId);
  }

  // Hide all screens
  document.querySelectorAll('.screen-view').forEach(screen => {
    screen.classList.remove('active');
  });

  // Activate target screen
  targetEl.classList.add('active');
  currentScreen = screenId;

  // Reset scroll to top
  const container = document.getElementById('screenContainer');
  if (container) container.scrollTop = 0;

  // Update Dynamic Island text briefly
  const islandText = document.getElementById('islandText');
  if (islandText) {
    const cleanName = screenId.replace('screen-', '').toUpperCase();
    islandText.textContent = cleanName.length > 8 ? cleanName.substring(0, 8) : cleanName;
    setTimeout(() => {
      islandText.textContent = 'TechNova';
    }, 1800);
  }

  // Update Bottom Nav state
  updateBottomNav(screenId);

  // Update Top & Side Navigation Badges
  updateFlowBadges(screenId);

  // Re-render dynamic sections based on current screen
  if (screenId === 'screen-cart') renderCart();
  if (screenId === 'screen-wishlist') renderWishlist();
  if (screenId === 'screen-my-orders') renderOrders();
  if (screenId === 'screen-notifications') renderNotifications();

  // Re-render icons
  initIcons();
}

// Navigate back one step
function navigateBack() {
  if (navigationHistory.length > 1) {
    navigationHistory.pop(); // Remove current
    const previousScreen = navigationHistory[navigationHistory.length - 1];

    document.querySelectorAll('.screen-view').forEach(screen => {
      screen.classList.remove('active');
    });

    const targetEl = document.getElementById(previousScreen);
    if (targetEl) {
      targetEl.classList.add('active');
      currentScreen = previousScreen;
      updateBottomNav(previousScreen);
      updateFlowBadges(previousScreen);
      initIcons();
    }
  } else {
    navigateTo('screen-home');
  }
}

// Bottom Nav Bar Visibility and Active Indicator
function updateBottomNav(screenId) {
  const bottomBar = document.getElementById('bottomNavBar');
  if (!bottomBar) return;

  const hideBottomScreens = ['screen-splash', 'screen-onboarding', 'screen-login', 'screen-checkout', 'screen-payment', 'screen-order-success'];
  if (hideBottomScreens.includes(screenId)) {
    bottomBar.style.display = 'none';
  } else {
    bottomBar.style.display = 'flex';
  }

  // Highlight active bottom nav item
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.remove('active');
    const navScreen = btn.getAttribute('data-nav');
    if (navScreen === screenId) {
      btn.classList.add('active');
    }
  });

  // Update cart badge count
  const cartBadge = document.getElementById('cartBadgeCount');
  if (cartBadge) {
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Update Top Pill Buttons & Side Flow Map Indicators
function updateFlowBadges(screenId) {
  const badge = document.getElementById('currentScreenBadge');
  if (badge) {
    badge.textContent = screenNames[screenId] || screenId;
  }

  const jumpSelect = document.getElementById('screenJumpSelect');
  if (jumpSelect) {
    jumpSelect.value = screenId;
  }

  document.querySelectorAll('.flow-map-card').forEach(card => {
    if (card.getAttribute('data-screen') === screenId) {
      card.classList.add('border-blue-500', 'bg-blue-950/40');
    } else {
      card.classList.remove('border-blue-500', 'bg-blue-950/40');
    }
  });
}

// Onboarding Slide Controller (1, 2, 3)
function nextOnboardingSlide() {
  currentOnboardingSlide++;
  if (currentOnboardingSlide > 3) {
    navigateTo('screen-login');
    currentOnboardingSlide = 1;
    updateOnboardingUI();
  } else {
    updateOnboardingUI();
  }
}

function updateOnboardingUI() {
  const titleEl = document.getElementById('onboardingTitle');
  const descEl = document.getElementById('onboardingDesc');
  const iconEl = document.getElementById('onboardingIcon');
  const dot1 = document.getElementById('onboardDot1');
  const dot2 = document.getElementById('onboardDot2');
  const dot3 = document.getElementById('onboardDot3');

  if (!titleEl) return;

  if (currentOnboardingSlide === 1) {
    titleEl.textContent = 'Discover Technology Built For You';
    descEl.textContent = 'Explore our curated collection of next-gen laptops, flagship smartphones, and smart devices.';
    iconEl.setAttribute('data-lucide', 'cpu');
    dot1.className = 'w-6 h-2 rounded-full bg-blue-600 transition-all';
    dot2.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
    dot3.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
  } else if (currentOnboardingSlide === 2) {
    titleEl.textContent = 'Lightning-Fast Express Delivery';
    descEl.textContent = 'Get genuine products delivered to your doorstep with guaranteed same-day dispatch & live tracking.';
    iconEl.setAttribute('data-lucide', 'truck');
    dot1.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
    dot2.className = 'w-6 h-2 rounded-full bg-blue-600 transition-all';
    dot3.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
  } else if (currentOnboardingSlide === 3) {
    titleEl.textContent = 'Secure Checkout & Official Warranty';
    descEl.textContent = 'Enjoy seamless zero-interest EMI, UPI, encrypted checkout, and official TechNova brand protection.';
    iconEl.setAttribute('data-lucide', 'shield-check');
    dot1.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
    dot2.className = 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
    dot3.className = 'w-6 h-2 rounded-full bg-blue-600 transition-all';
  }

  initIcons();
}

// Cart Item Quantity & Operations
function updateCartQty(id, change) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cartItems = cartItems.filter(i => i.id !== id);
    showToast('Item removed from cart');
  }

  renderCart();
  updateBottomNav(currentScreen);
}

function removeCartItem(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  showToast('Item removed from cart');
  renderCart();
  updateBottomNav(currentScreen);
}

function addToCart(item) {
  const existing = cartItems.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ ...item, qty: 1 });
  }
  showToast(`${item.name} added to cart!`);
  renderCart();
  updateBottomNav(currentScreen);
}

// Apply Coupon Function
function applyCoupon(code) {
  const input = document.getElementById('couponInput');
  const val = (code || (input ? input.value : '')).trim().toUpperCase();

  if (val === 'TECH2026') {
    couponDiscount = 5000;
    appliedCouponCode = 'TECH2026';
    showToast('Coupon TECH2026 applied! (-₹5,000)');
  } else if (val === '') {
    showToast('Please enter a coupon code');
  } else {
    showToast('Invalid coupon. Try TECH2026');
  }
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const checkoutTotalEl = document.getElementById('checkoutTotal');
  const paymentTotalEl = document.getElementById('paymentTotal');
  const successTotalEl = document.getElementById('successOrderTotal');

  const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const delivery = subtotal > 0 ? (subtotal > 50000 ? 0 : 499) : 0;
  const effectiveDiscount = Math.min(couponDiscount, subtotal);
  const total = Math.max(0, subtotal + delivery - effectiveDiscount);

  const formattedSubtotal = `₹${subtotal.toLocaleString('en-IN')}`;
  const formattedTotal = `₹${total.toLocaleString('en-IN')}`;

  if (subtotalEl) subtotalEl.textContent = formattedSubtotal;
  if (totalEl) totalEl.textContent = formattedTotal;
  if (checkoutTotalEl) checkoutTotalEl.textContent = formattedTotal;
  if (paymentTotalEl) paymentTotalEl.textContent = formattedTotal;
  if (successTotalEl) successTotalEl.textContent = formattedTotal;

  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-3 text-slate-300"></i>
        <p class="text-sm font-semibold">Your cart is empty</p>
        <button onclick="navigateTo('screen-categories')" class="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">Explore Products</button>
      </div>
    `;
    initIcons();
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="app-card p-3 rounded-2xl flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-800">
      <div class="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 shrink-0">
        <i data-lucide="${item.image || 'package'}" class="w-7 h-7"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.name}</h4>
        <p class="text-xs font-semibold text-blue-600 mt-0.5">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button onclick="updateCartQty('${item.id}', -1)" class="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 font-bold">−</button>
            <span class="px-2 font-semibold text-slate-900 dark:text-white">${item.qty}</span>
            <button onclick="updateCartQty('${item.id}', 1)" class="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 font-bold">+</button>
          </div>
          <button onclick="removeCartItem('${item.id}')" class="text-[11px] text-red-500 hover:underline">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  initIcons();
}

// Wishlist Render & Operations
function toggleWishlist(item) {
  const index = wishlistItems.findIndex(i => i.id === item.id);
  if (index >= 0) {
    wishlistItems.splice(index, 1);
    showToast('Removed from Wishlist');
  } else {
    wishlistItems.push(item);
    showToast('Saved to Wishlist!');
  }
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlistContainer');
  if (!container) return;

  if (wishlistItems.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="heart" class="w-12 h-12 mx-auto mb-3 text-slate-300"></i>
        <p class="text-sm font-semibold">Your wishlist is empty</p>
        <button onclick="navigateTo('screen-home')" class="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">Explore Products</button>
      </div>
    `;
    initIcons();
    return;
  }

  container.innerHTML = wishlistItems.map(item => `
    <div class="app-card p-3 rounded-2xl flex items-center justify-between gap-3 border border-slate-200 dark:border-slate-800">
      <div class="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 shrink-0">
        <i data-lucide="${item.image || 'package'}" class="w-7 h-7"></i>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${item.name}</h4>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-xs font-bold text-blue-600">₹${item.price.toLocaleString('en-IN')}</span>
          <span class="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 rounded font-medium">In Stock</span>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="addToCart({id: '${item.id}', name: '${item.name}', price: ${item.price}, image: '${item.image}'})" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700">Add to Cart</button>
          <button onclick="toggleWishlist({id: '${item.id}'})" class="text-[11px] text-red-500 hover:underline">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  initIcons();
}

// Complete Purchase & Place Order
function placeOrder() {
  const total = cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const newOrderId = `#TN2026${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    id: newOrderId,
    date: 'Just now',
    items: cartItems.length > 0 ? [...cartItems] : [{ name: 'TechNova Blade 16 Pro', qty: 1, price: 89999, image: 'laptop' }],
    total: total > 0 ? total : 89999,
    status: 'CONFIRMED',
    statusClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600',
    type: 'active',
    tracking: `BL-${Math.floor(100000 + Math.random() * 900000)}`,
    address: 'Sandip Sah • Plot 42, Cyber Gateway Tech Park, Bengaluru'
  };

  ordersList.unshift(newOrder);
  currentOrderDetails = newOrder;

  const orderIdEl = document.getElementById('successOrderIdDisplay');
  if (orderIdEl) orderIdEl.textContent = newOrderId;

  notificationsList.unshift({
    id: Date.now(),
    title: 'Order Confirmed!',
    desc: `Your order ${newOrderId} has been confirmed. Expected delivery tomorrow.`,
    time: 'Just now',
    unread: true,
    icon: 'package-check',
    color: 'bg-emerald-600'
  });

  cartItems = [];
  couponDiscount = 0;
  appliedCouponCode = '';

  navigateTo('screen-order-success');
  showToast('Order placed successfully!');
}

// Render My Orders Screen
function filterOrders(type) {
  renderOrders(type);
}

function renderOrders(filter = 'all') {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  const filtered = ordersList.filter(o => {
    if (filter === 'active') return o.type === 'active';
    if (filter === 'delivered') return o.type === 'delivered';
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-slate-400">
        <i data-lucide="package" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p class="text-xs font-semibold">No orders found in this section</p>
      </div>
    `;
    initIcons();
    return;
  }

  container.innerHTML = filtered.map(order => `
    <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3 space-y-3">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
        <div>
          <span class="text-[10px] text-slate-400 font-mono">${order.id}</span>
          <div class="text-[11px] text-slate-500">${order.date} • ${order.items.length} Item(s)</div>
        </div>
        <span class="text-[10px] px-2 py-0.5 rounded-full ${order.statusClass} font-bold flex items-center gap-1">
          ${order.status}
        </span>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600">
          <i data-lucide="${order.items[0]?.image || 'laptop'}" class="w-6 h-6"></i>
        </div>
        <div class="flex-1">
          <h5 class="text-xs font-bold text-slate-900 dark:text-white">${order.items[0]?.name || 'TechNova Product'}</h5>
          <p class="text-xs font-bold text-blue-600">₹${order.total.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <button onclick="viewOrderDetails('${order.id}')" class="tap-effect w-full py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5">
        <span>View Details & Live Tracking</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join('');

  initIcons();
}

function viewOrderDetails(orderId) {
  const found = ordersList.find(o => o.id === orderId);
  if (found) {
    currentOrderDetails = found;
    const trackingBadge = document.getElementById('orderDetailsTrackingId');
    if (trackingBadge) trackingBadge.textContent = `TRACKING ID: ${found.tracking}`;
    const addressDisplay = document.getElementById('orderDetailsAddress');
    if (addressDisplay) addressDisplay.textContent = found.address;
  }
  navigateTo('screen-order-details');
}

// Render Notifications
function renderNotifications() {
  const container = document.getElementById('notificationsContainer');
  if (!container) return;

  if (notificationsList.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="bell-off" class="w-12 h-12 mx-auto mb-3 text-slate-300"></i>
        <p class="text-sm font-semibold">No notifications right now</p>
      </div>
    `;
    initIcons();
    return;
  }

  container.innerHTML = notificationsList.map(notif => `
    <div onclick="markNotificationRead(${notif.id})" class="tap-effect cursor-pointer app-card p-3 rounded-2xl ${notif.unread ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'} border flex items-start gap-3">
      <div class="w-8 h-8 rounded-xl ${notif.color} text-white flex items-center justify-center shrink-0 mt-0.5">
        <i data-lucide="${notif.icon}" class="w-4 h-4"></i>
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <h5 class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            ${notif.title}
            ${notif.unread ? '<span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>' : ''}
          </h5>
          <span class="text-[9px] text-slate-400 font-mono">${notif.time}</span>
        </div>
        <p class="text-[11px] text-slate-500 mt-0.5">${notif.desc}</p>
      </div>
    </div>
  `).join('');

  initIcons();
}

function markNotificationRead(id) {
  const n = notificationsList.find(item => item.id === id);
  if (n) {
    n.unread = false;
    renderNotifications();
    if (n.title.includes('Order')) navigateTo('screen-order-details');
    else if (n.title.includes('Wishlist')) navigateTo('screen-wishlist');
  }
}

function markAllNotificationsRead() {
  notificationsList.forEach(n => n.unread = false);
  renderNotifications();
  showToast('All notifications marked as read');
}

// Search Filter Trigger
function applySearch(query) {
  const queryEl = document.getElementById('searchQueryDisplay');
  if (queryEl) queryEl.textContent = `Results for "${query}"`;
  navigateTo('screen-search-results');
}

// Wireframe Mode Switcher (Lo-Fi Blueprint vs Hi-Fi)
function toggleWireframeMode() {
  isLoFiMode = !isLoFiMode;
  const label = document.getElementById('wireframeModeLabel');

  if (isLoFiMode) {
    document.body.classList.add('wireframe-mode-lofi');
    if (label) label.textContent = 'Hi-Fi UI Mode';
    showToast('Switched to Lo-Fi Blueprint Wireframe Mode');
  } else {
    document.body.classList.remove('wireframe-mode-lofi');
    if (label) label.textContent = 'Lo-Fi Blueprint Mode';
    showToast('Switched to Modern Hi-Fi UI Mode');
  }
}

// Dark Mode Switcher
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    showToast('Dark Theme Enabled');
  } else {
    document.body.classList.remove('dark-mode');
    showToast('Light Theme Enabled');
  }
}

// Toast notification helper
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2200);
}

// Case Study Modal Controller
function toggleCaseStudyModal(show) {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;
  if (show) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
  } else {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
  }
  initIcons();
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  updateClock();
  setInterval(updateClock, 30000);

  // Auto-advance Splash to Onboarding after 2.8 seconds
  setTimeout(() => {
    if (currentScreen === 'screen-splash') {
      navigateTo('screen-onboarding');
    }
  }, 2800);

  // Setup mode toggle button
  const toggleBtn = document.getElementById('toggleWireframeModeBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleWireframeMode);
  }

  // Initial State
  renderCart();
  renderWishlist();
  renderOrders();
  renderNotifications();
  updateBottomNav('screen-splash');
  updateFlowBadges('screen-splash');
});
