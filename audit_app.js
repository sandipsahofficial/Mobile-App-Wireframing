const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const expectedScreens = [
  'screen-splash', 'screen-onboarding', 'screen-login', 'screen-home',
  'screen-categories', 'screen-category-products', 'screen-search', 'screen-search-results',
  'screen-product-details', 'screen-wishlist', 'screen-cart', 'screen-checkout',
  'screen-payment', 'screen-order-success', 'screen-my-orders', 'screen-order-details',
  'screen-profile', 'screen-settings', 'screen-notifications', 'screen-help-support'
];

console.log('--- CHECKING SCREENS IN index.html ---');
let missingScreens = 0;
expectedScreens.forEach(s => {
  const exists = html.includes('id="' + s + '"');
  if (!exists) {
    console.error('MISSING SCREEN:', s);
    missingScreens++;
  } else {
    console.log('EXISTS:', s);
  }
});
console.log('Missing screens:', missingScreens);

console.log('--- CHECKING ALL navigateTo CALLS IN index.html ---');
const regex = /navigateTo\(['"]([^'"]+)['"]\)/g;
let m;
const htmlTargets = new Set();
while ((m = regex.exec(html)) !== null) {
  htmlTargets.add(m[1]);
  if (!expectedScreens.includes(m[1])) {
    console.error('UNDEFINED ROUTE TARGET IN HTML:', m[1]);
  }
}
console.log('Unique targets in HTML:', htmlTargets.size);

console.log('--- CHECKING ALL navigateTo CALLS IN app.js ---');
const jsTargets = new Set();
while ((m = regex.exec(js)) !== null) {
  jsTargets.add(m[1]);
  if (!expectedScreens.includes(m[1])) {
    console.error('UNDEFINED ROUTE TARGET IN JS:', m[1]);
  }
}
console.log('Unique targets in JS:', jsTargets.size);
