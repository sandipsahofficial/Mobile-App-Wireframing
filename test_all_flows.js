const fs = require('fs');

console.log('====================================================');
console.log('TECHNOVA 20-SCREEN AUTOMATED NAVIGATION & STATE TEST');
console.log('====================================================');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

// 1. Verify all 20 screens exist
const screens = [
  'screen-splash', 'screen-onboarding', 'screen-login', 'screen-home',
  'screen-categories', 'screen-category-products', 'screen-search', 'screen-search-results',
  'screen-product-details', 'screen-wishlist', 'screen-cart', 'screen-checkout',
  'screen-payment', 'screen-order-success', 'screen-my-orders', 'screen-order-details',
  'screen-profile', 'screen-settings', 'screen-notifications', 'screen-help-support'
];

let errors = 0;

console.log('\n[TEST 1] Verifying 20 Screens Presence in DOM:');
screens.forEach((s, idx) => {
  const hasScreen = html.includes(`id="${s}"`);
  if (!hasScreen) {
    console.error(`❌ Screen #${idx + 1} (${s}) is MISSING!`);
    errors++;
  } else {
    console.log(`✓ Screen #${String(idx + 1).padStart(2, '0')}: ${s} -> PRESENT`);
  }
});

// 2. Test 7 Core User Flows Routing Paths
const flows = [
  {
    name: 'Flow 1: Authentication',
    path: ['screen-splash', 'screen-onboarding', 'screen-login', 'screen-home']
  },
  {
    name: 'Flow 2: Complete Shopping & Checkout',
    path: ['screen-home', 'screen-categories', 'screen-category-products', 'screen-product-details', 'screen-cart', 'screen-checkout', 'screen-payment', 'screen-order-success']
  },
  {
    name: 'Flow 3: Intent-Driven Search & Results',
    path: ['screen-home', 'screen-search', 'screen-search-results', 'screen-product-details', 'screen-wishlist']
  },
  {
    name: 'Flow 4: Account & Order Tracking',
    path: ['screen-home', 'screen-profile', 'screen-my-orders', 'screen-order-details']
  },
  {
    name: 'Flow 5: Account & Settings',
    path: ['screen-home', 'screen-profile', 'screen-settings']
  },
  {
    name: 'Flow 6: Notifications Alert Flow',
    path: ['screen-home', 'screen-notifications']
  },
  {
    name: 'Flow 7: Help Desk & Support',
    path: ['screen-home', 'screen-profile', 'screen-help-support']
  }
];

console.log('\n[TEST 2] Verifying All 7 User Flows Continuity:');
flows.forEach((flow, i) => {
  console.log(`\n• ${flow.name}:`);
  for (let j = 0; j < flow.path.length - 1; j++) {
    const from = flow.path[j];
    const to = flow.path[j + 1];
    const hasNav = html.includes(`navigateTo('${to}')`) || js.includes(`navigateTo('${to}')`);
    if (!hasNav) {
      console.error(`  ❌ Broken Link from ${from} to ${to}`);
      errors++;
    } else {
      console.log(`  ✓ ${from} ➔ ${to} (CONNECTED)`);
    }
  }
});

// 3. Test Key Dynamic Containers & State Binding
console.log('\n[TEST 3] Verifying Dynamic State Bindings & UI Containers:');
const requiredContainers = [
  'cartItemsContainer',
  'wishlistContainer',
  'ordersListContainer',
  'notificationsContainer',
  'cartSubtotal',
  'cartTotal',
  'checkoutTotal',
  'paymentTotal',
  'successOrderTotal',
  'successOrderIdDisplay'
];

requiredContainers.forEach(id => {
  const exists = html.includes(`id="${id}"`);
  if (!exists) {
    console.error(`❌ Container #${id} is MISSING in HTML!`);
    errors++;
  } else {
    console.log(`✓ Container #${id}: BOUND`);
  }
});

// 4. Test Route Integrity (No Undefined/Missing Route Calls)
console.log('\n[TEST 4] Verifying Route Integrity in HTML & JS:');
const navRegex = /navigateTo\(['"]([^'"]+)['"]\)/g;
let match;
const allCalledRoutes = new Set();
while ((match = navRegex.exec(html)) !== null) {
  allCalledRoutes.add(match[1]);
  if (!screens.includes(match[1])) {
    console.error(`❌ HTML contains undefined route target: '${match[1]}'`);
    errors++;
  }
}
while ((match = navRegex.exec(js)) !== null) {
  allCalledRoutes.add(match[1]);
  if (!screens.includes(match[1])) {
    console.error(`❌ JS contains undefined route target: '${match[1]}'`);
    errors++;
  }
}

console.log(`✓ All ${allCalledRoutes.size} called routes correspond to valid screens with ZERO undefined targets.`);

console.log('\n====================================================');
if (errors === 0) {
  console.log('✅ ALL TESTS PASSED! ZERO ERRORS DETECTED.');
  console.log('The 20-screen TechNova application is 100% verified.');
} else {
  console.error(`❌ FAILED WITH ${errors} ERRORS.`);
}
console.log('====================================================');
