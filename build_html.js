const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechNova — Modern Mobile App Wireframing Prototype (20 Screens)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="min-h-screen bg-tech-grid flex flex-col items-center justify-start p-3 md:p-6 text-slate-800 dark:text-slate-100">

  <!-- Top Controller / App Command Bar -->
  <header class="w-full max-w-6xl flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/25">
        <i data-lucide="layers" class="w-5 h-5"></i>
      </div>
      <div>
        <h1 class="text-base font-bold text-white flex items-center gap-2">
          TECHNOVA <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 font-mono">20 Screens Prototype</span>
        </h1>
        <p class="text-xs text-slate-400">Technology, Simplified • Professional Mobile Wireframing System</p>
      </div>
    </div>

    <!-- Mode Toggles & Screen Direct Jump -->
    <div class="flex items-center gap-2 flex-wrap">
      <!-- Design Thinking Modal -->
      <button onclick="toggleCaseStudyModal(true)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 transition">
        <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
        <span>Case Study & UX</span>
      </button>

      <!-- Light / Dark Mode Toggle -->
      <button onclick="toggleDarkMode()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
        <i data-lucide="moon" class="w-3.5 h-3.5 text-amber-400"></i>
        <span>Theme</span>
      </button>

      <!-- Lo-Fi Blueprint Mode -->
      <button id="toggleWireframeModeBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
        <i data-lucide="layout" class="w-3.5 h-3.5 text-blue-400"></i>
        <span id="wireframeModeLabel">Lo-Fi Blueprint Mode</span>
      </button>

      <!-- 20 Screen Direct Selector -->
      <div class="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
        <span class="text-slate-400 px-2 font-medium">Screen:</span>
        <select id="screenJumpSelect" onchange="navigateTo(this.value)" class="bg-slate-900 text-slate-200 rounded-lg px-2.5 py-1 text-xs border border-slate-700 focus:outline-none focus:border-blue-500">
          <option value="screen-splash">01. Splash Screen</option>
          <option value="screen-onboarding">02. Onboarding (3 Slides)</option>
          <option value="screen-login">03. Login / Register</option>
          <option value="screen-home" selected>04. Home Dashboard ⭐</option>
          <option value="screen-categories">05. Categories</option>
          <option value="screen-category-products">06. Category Products</option>
          <option value="screen-search">07. Search Screen</option>
          <option value="screen-search-results">08. Search Results</option>
          <option value="screen-product-details">09. Product Details ⭐</option>
          <option value="screen-wishlist">10. Wishlist (Saved)</option>
          <option value="screen-cart">11. Cart Screen ⭐</option>
          <option value="screen-checkout">12. Checkout Screen</option>
          <option value="screen-payment">13. Payment Screen</option>
          <option value="screen-order-success">14. Order Success</option>
          <option value="screen-my-orders">15. My Orders</option>
          <option value="screen-order-details">16. Order Details & Tracking</option>
          <option value="screen-profile">17. Profile Account Hub</option>
          <option value="screen-settings">18. Settings</option>
          <option value="screen-notifications">19. Notifications Feed</option>
          <option value="screen-help-support">20. Help & Support Desk</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Main Canvas: Phone Frame + Side Navigation Matrix -->
  <main class="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">

    <!-- LEFT: REALISTIC MOBILE DEVICE -->
    <div class="relative flex flex-col items-center">
      <div class="phone-mockup">
        
        <!-- Top Status Bar Area -->
        <div class="w-full pt-3 px-6 pb-1 flex items-center justify-between z-40 text-xs text-slate-500 dark:text-slate-400 select-none">
          <span id="statusBarTime" class="font-semibold text-slate-800 dark:text-slate-200">09:41</span>
          
          <!-- Dynamic Island Notch -->
          <div class="dynamic-island" id="dynamicIsland" title="Click to interact">
            <div class="w-2.5 h-2.5 rounded-full bg-blue-500 live-badge"></div>
            <span class="text-[10px] text-blue-300 font-mono tracking-tight" id="islandText">TechNova</span>
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>

          <div class="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <i data-lucide="wifi" class="w-3.5 h-3.5"></i>
            <i data-lucide="battery" class="w-4 h-4"></i>
          </div>
        </div>

        <!-- Phone Screen Area -->
        <div class="phone-screen">
          
          <!-- Scrollable Viewport Container -->
          <div class="screen-container" id="screenContainer">

            <!-- SCREEN 01: SPLASH SCREEN -->
            <div id="screen-splash" class="screen-view p-6 flex flex-col items-center justify-between text-center min-h-[720px] bg-gradient-to-b from-slate-900 to-slate-950 text-white">
              <div></div>
              <div class="flex flex-col items-center">
                <div class="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 mb-5">
                  <i data-lucide="layers" class="w-10 h-10"></i>
                </div>
                <h1 class="text-3xl font-black tracking-wider text-white">TECHNOVA</h1>
                <p class="text-xs text-blue-400 tracking-widest uppercase font-mono mt-1">Technology, Simplified</p>
                
                <div class="flex items-center gap-2 mt-8">
                  <div class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-blue-300"></div>
                </div>
                <p class="text-[11px] text-slate-500 mt-3 font-mono">Initializing ecosystem...</p>
              </div>

              <div class="w-full pb-4">
                <button onclick="navigateTo('screen-onboarding')" class="tap-effect w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-blue-600/30">
                  Get Started →
                </button>
              </div>
            </div>

            <!-- SCREEN 02: ONBOARDING SCREEN -->
            <div id="screen-onboarding" class="screen-view p-6 flex flex-col justify-between min-h-[720px] bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between pt-2">
                <div class="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  <i data-lucide="layers" class="w-4 h-4"></i>
                  <span>TechNova</span>
                </div>
                <button onclick="navigateTo('screen-login')" class="text-xs font-semibold text-slate-500 hover:text-blue-600">Skip</button>
              </div>

              <div class="py-6 flex flex-col items-center text-center">
                <div class="w-56 h-56 rounded-3xl bg-blue-50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700/60 flex items-center justify-center text-blue-600 mb-6 relative overflow-hidden lofi-img-ph">
                  <div class="w-24 h-24 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                    <i id="onboardingIcon" data-lucide="cpu" class="w-12 h-12 text-blue-600"></i>
                  </div>
                </div>

                <h2 id="onboardingTitle" class="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                  Discover Technology Built For You
                </h2>
                <p id="onboardingDesc" class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                  Explore our curated collection of next-gen laptops, flagship smartphones, and smart devices.
                </p>

                <div class="flex items-center gap-1.5 mt-6">
                  <span id="onboardDot1" class="w-6 h-2 rounded-full bg-blue-600 transition-all"></span>
                  <span id="onboardDot2" class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></span>
                  <span id="onboardDot3" class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></span>
                </div>
              </div>

              <div class="space-y-2.5 pb-4">
                <button onclick="nextOnboardingSlide()" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2">
                  <span>Continue</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- SCREEN 03: LOGIN / SIGN UP -->
            <div id="screen-login" class="screen-view p-6 flex flex-col justify-between min-h-[720px] bg-slate-50 dark:bg-slate-900">
              <div class="pt-2">
                <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-4 shadow-md shadow-blue-500/30">
                  <i data-lucide="layers" class="w-6 h-6"></i>
                </div>
                <h2 class="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in to access your TechNova account & orders</p>

                <div class="mt-6 space-y-3.5">
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
                    <div class="relative">
                      <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                      <input type="email" value="sandip@technova.io" class="app-input w-full pl-9 pr-3 py-2.5 text-xs rounded-xl" placeholder="name@domain.com">
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-1">
                      <label class="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Password</label>
                      <button onclick="showToast('Password reset link sent!')" class="text-[11px] text-blue-600 font-semibold hover:underline">Forgot?</button>
                    </div>
                    <div class="relative">
                      <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                      <input type="password" value="••••••••••••" class="app-input w-full pl-9 pr-3 py-2.5 text-xs rounded-xl">
                    </div>
                  </div>

                  <button onclick="navigateTo('screen-home'); showToast('Signed in successfully!')" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-blue-600/25">
                    Log In
                  </button>

                  <div class="relative my-4 text-center">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                    <span class="relative bg-slate-50 dark:bg-slate-900 px-3 text-[10px] text-slate-400 uppercase font-mono">Or continue with</span>
                  </div>

                  <div class="grid grid-cols-2 gap-2.5">
                    <button onclick="navigateTo('screen-home')" class="tap-effect py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
                      <i data-lucide="chrome" class="w-4 h-4 text-red-500"></i> Google
                    </button>
                    <button onclick="navigateTo('screen-home')" class="tap-effect py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
                      <i data-lucide="apple" class="w-4 h-4 text-slate-900 dark:text-white"></i> Apple
                    </button>
                  </div>
                </div>
              </div>

              <div class="text-center py-4">
                <p class="text-xs text-slate-500">
                  New to TechNova? 
                  <button onclick="showToast('Registration mode active')" class="text-blue-600 font-bold hover:underline">Create Account</button>
                </p>
              </div>
            </div>

            <!-- SCREEN 04: HOME SCREEN ⭐ -->
            <div id="screen-home" class="screen-view active p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <i data-lucide="layers" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Hello, Sandip 👋</span>
                    <h3 class="text-sm font-black text-slate-900 dark:text-white">TechNova Store</h3>
                  </div>
                </div>

                <div class="flex items-center gap-1.5">
                  <button onclick="navigateTo('screen-wishlist')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 transition">
                    <i data-lucide="heart" class="w-4 h-4"></i>
                  </button>
                  <button onclick="navigateTo('screen-notifications')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 relative">
                    <i data-lucide="bell" class="w-4 h-4"></i>
                    <span class="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5"></span>
                  </button>
                </div>
              </div>

              <div onclick="navigateTo('screen-search')" class="tap-effect cursor-pointer app-card p-2.5 rounded-2xl flex items-center gap-2.5 mb-4 text-slate-400 bg-white dark:bg-slate-800/90 shadow-sm">
                <i data-lucide="search" class="w-4 h-4 text-blue-500 ml-1"></i>
                <span class="text-xs text-slate-400">Search laptops, smartphones, earbuds...</span>
              </div>

              <div class="tap-effect cursor-pointer app-card rounded-2xl p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-4 shadow-lg shadow-blue-600/20 relative overflow-hidden" onclick="navigateTo('screen-category-products')">
                <span class="text-[9px] font-mono uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-bold">TechNova Fest 2026</span>
                <h4 class="text-base font-black mt-2 leading-tight">Next-Gen Blade 16 Pro</h4>
                <p class="text-[11px] text-blue-100 mt-0.5">Up to ₹15,000 off with instant bank discount</p>
                <div class="mt-3 inline-flex items-center gap-1 text-[11px] font-bold bg-white text-blue-600 px-3 py-1 rounded-lg">
                  Shop Now <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </div>
              </div>

              <div class="flex items-center justify-between mb-2.5">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Top Categories</h4>
                <button onclick="navigateTo('screen-categories')" class="text-[11px] text-blue-600 font-semibold hover:underline">View All</button>
              </div>

              <div class="grid grid-cols-4 gap-2 mb-4">
                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-blue-600 mb-1">
                    <i data-lucide="laptop" class="w-5 h-5"></i>
                  </div>
                  <span class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Laptops</span>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 flex items-center justify-center text-purple-600 mb-1">
                    <i data-lucide="smartphone" class="w-5 h-5"></i>
                  </div>
                  <span class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Phones</span>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-slate-800 border border-pink-100 dark:border-slate-700 flex items-center justify-center text-pink-600 mb-1">
                    <i data-lucide="headphones" class="w-5 h-5"></i>
                  </div>
                  <span class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Audio</span>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 flex items-center justify-center text-emerald-600 mb-1">
                    <i data-lucide="gamepad-2" class="w-5 h-5"></i>
                  </div>
                  <span class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Gaming</span>
                </div>
              </div>

              <div class="flex items-center justify-between mb-2.5">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Featured Products</h4>
                <span class="text-[10px] text-slate-400 font-mono">Curated Deals</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5 mb-4">
                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-blue-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="laptop" class="w-8 h-8"></i>
                    <button onclick="event.stopPropagation(); toggleWishlist({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'})" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center text-slate-400 hover:text-red-500">
                      <i data-lucide="heart" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                  <div class="flex items-center gap-1 text-[10px] text-amber-500 font-bold mb-0.5">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-500"></i> 4.9 (1.2k)
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">Blade 16 Pro Laptop</h5>
                  <p class="text-[10px] text-slate-400">Core Ultra 9 • 32GB</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹89,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-purple-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="smartphone" class="w-8 h-8"></i>
                    <button onclick="event.stopPropagation(); toggleWishlist({id:'titan-fold', name:'Titan Fold 5G', price:119999, image:'smartphone'})" class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center text-slate-400 hover:text-red-500">
                      <i data-lucide="heart" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                  <div class="flex items-center gap-1 text-[10px] text-amber-500 font-bold mb-0.5">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-500"></i> 4.8 (850)
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">Titan Fold 5G</h5>
                  <p class="text-[10px] text-slate-400">120Hz LTPO • 512GB</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹1,19,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'titan-fold', name:'Titan Fold 5G', price:119999, image:'smartphone'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between mb-2">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">New Arrivals</h4>
                <span class="text-[10px] text-blue-600 font-semibold cursor-pointer" onclick="navigateTo('screen-category-products')">Explore &gt;</span>
              </div>
              <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-pink-50 dark:bg-slate-700 flex items-center justify-center text-pink-600">
                    <i data-lucide="headphones" class="w-6 h-6"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">NeoPods Active ANC</h5>
                    <p class="text-[10px] text-slate-400">Lossless Spatial Audio • 45h Playtime</p>
                    <span class="text-xs font-bold text-blue-600">₹4,999</span>
                  </div>
                </div>
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
              </div>
            </div>

            <!-- SCREEN 05: CATEGORIES SCREEN -->
            <div id="screen-categories" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">All Categories</h3>
                </div>
                <button onclick="navigateTo('screen-search')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="search" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <i data-lucide="laptop" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Laptops & Rigs</h5>
                    <p class="text-[10px] text-slate-400">42 Products</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                    <i data-lucide="smartphone" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Smartphones</h5>
                    <p class="text-[10px] text-slate-400">28 Products</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950 text-pink-600 flex items-center justify-center">
                    <i data-lucide="headphones" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Audio & Sound</h5>
                    <p class="text-[10px] text-slate-400">35 Products</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <i data-lucide="gamepad-2" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Gaming Gear</h5>
                    <p class="text-[10px] text-slate-400">19 Products</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                    <i data-lucide="watch" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Wearables</h5>
                    <p class="text-[10px] text-slate-400">22 Products</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-category-products')" class="tap-effect cursor-pointer app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-32">
                  <div class="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 flex items-center justify-center">
                    <i data-lucide="home" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Smart Home IoT</h5>
                    <p class="text-[10px] text-slate-400">16 Products</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREEN 06: CATEGORY PRODUCTS SCREEN -->
            <div id="screen-category-products" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">Laptops & Rigs</h3>
                </div>
                <div class="flex items-center gap-1.5">
                  <button onclick="showToast('Sort modal opened')" class="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1">
                    <i data-lucide="arrow-up-down" class="w-3 h-3"></i> Sort
                  </button>
                  <button onclick="showToast('Filter panel opened')" class="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold flex items-center gap-1">
                    <i data-lucide="sliders-horizontal" class="w-3 h-3"></i> Filter
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-blue-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="laptop" class="w-8 h-8"></i>
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">Blade 16 Pro</h5>
                  <p class="text-[10px] text-slate-400">Core Ultra 9 • OLED</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹89,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'blade-16', name:'Blade 16 Pro', price:89999, image:'laptop'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-blue-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="laptop" class="w-8 h-8"></i>
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">AeroBook Air 14</h5>
                  <p class="text-[10px] text-slate-400">M3 Ultra • 18h Batt</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹64,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'aerobook-14', name:'AeroBook Air 14', price:64999, image:'laptop'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-blue-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="laptop" class="w-8 h-8"></i>
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">Nexus Studio 17</h5>
                  <p class="text-[10px] text-slate-400">RTX 4080 • 64GB</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹1,49,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'nexus-17', name:'Nexus Studio 17', price:149999, image:'laptop'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div class="w-full h-24 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-blue-600 mb-2 relative lofi-img-ph">
                    <i data-lucide="laptop" class="w-8 h-8"></i>
                  </div>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white truncate">EdgeStation Mini</h5>
                  <p class="text-[10px] text-slate-400">Ryzen 9 • 32GB Mini</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs font-black text-blue-600">₹52,999</span>
                    <button onclick="event.stopPropagation(); addToCart({id:'edge-mini', name:'EdgeStation Mini', price:52999, image:'laptop'})" class="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                      <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREEN 07: SEARCH SCREEN -->
            <div id="screen-search" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <div class="flex-1 relative">
                  <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                  <input id="searchInputField" type="text" placeholder="Search gadgets, laptops..." value="Gaming Laptop" onkeydown="if(event.key==='Enter') applySearch(this.value)" class="app-input w-full pl-9 pr-9 py-2 text-xs rounded-xl">
                  <button onclick="showToast('Voice Search active...')" class="absolute right-2.5 top-2 text-blue-600">
                    <i data-lucide="mic" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">Recent Searches</span>
                  <button onclick="showToast('History cleared')" class="text-[11px] text-slate-400 hover:text-red-500">Clear</button>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button onclick="applySearch('Gaming Laptop')" class="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> Gaming Laptop
                  </button>
                  <button onclick="applySearch('Wireless Earbuds')" class="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> Wireless Earbuds
                  </button>
                  <button onclick="applySearch('Smart Watch Ultra')" class="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
                    <i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> Smart Watch
                  </button>
                </div>
              </div>

              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white mb-2 block">Trending on TechNova</span>
                <div class="space-y-1.5">
                  <div onclick="applySearch('Titan Fold 5G')" class="tap-effect cursor-pointer p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-700 dark:text-slate-300">1. Titan Fold 5G</span>
                    <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-500"></i>
                  </div>
                  <div onclick="applySearch('NeoPods ANC')" class="tap-effect cursor-pointer p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-700 dark:text-slate-300">2. NeoPods Active ANC</span>
                    <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-500"></i>
                  </div>
                  <div onclick="applySearch('Blade 16 Pro')" class="tap-effect cursor-pointer p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-700 dark:text-slate-300">3. Blade 16 Pro OLED</span>
                    <i data-lucide="trending-up" class="w-3.5 h-3.5 text-emerald-500"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREEN 08: SEARCH RESULTS SCREEN -->
            <div id="screen-search-results" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <div>
                    <h3 id="searchQueryDisplay" class="text-sm font-black text-slate-900 dark:text-white">Results for "Gaming Laptop"</h3>
                    <p class="text-[10px] text-slate-400">24 matching tech products</p>
                  </div>
                </div>
                <button onclick="showToast('Filter criteria updated')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="filter" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="space-y-2.5">
                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600 lofi-img-ph">
                      <i data-lucide="laptop" class="w-8 h-8"></i>
                    </div>
                    <div>
                      <span class="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold uppercase font-mono">Bestseller</span>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white mt-0.5">TechNova Blade 16 Pro</h4>
                      <p class="text-[10px] text-slate-400">Core Ultra 9 • 32GB RAM</p>
                      <span class="text-xs font-bold text-blue-600">₹89,999</span>
                    </div>
                  </div>
                  <button onclick="event.stopPropagation(); addToCart({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'})" class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                  </button>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600 lofi-img-ph">
                      <i data-lucide="laptop" class="w-8 h-8"></i>
                    </div>
                    <div>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Nexus Studio 17 R-Edition</h4>
                      <p class="text-[10px] text-slate-400">RTX 4080 • 240Hz QHD</p>
                      <span class="text-xs font-bold text-blue-600">₹1,49,999</span>
                    </div>
                  </div>
                  <button onclick="event.stopPropagation(); addToCart({id:'nexus-17', name:'Nexus Studio 17', price:149999, image:'laptop'})" class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- SCREEN 09: PRODUCT DETAILS SCREEN ⭐ -->
            <div id="screen-product-details" class="screen-view p-4 pb-24 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <div class="flex items-center gap-2">
                  <button onclick="toggleWishlist({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'})" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-red-500">
                    <i data-lucide="heart" class="w-4 h-4 fill-red-500"></i>
                  </button>
                  <button onclick="showToast('Share link copied!')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="share-2" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <div class="w-full h-52 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-blue-600 mb-3 relative overflow-hidden lofi-img-ph">
                <i data-lucide="laptop" class="w-16 h-16"></i>
                <span class="text-[10px] text-slate-400 font-mono mt-2">Blade 16 Pro — Obsidian Black Edition</span>
                <div class="flex items-center gap-1.5 absolute bottom-3">
                  <span class="w-4 h-1.5 rounded-full bg-blue-600"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                </div>
              </div>

              <div class="mb-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">IN STOCK</span>
                  <div class="flex items-center text-[10px] text-amber-500 font-bold">
                    <i data-lucide="star" class="w-3 h-3 fill-amber-500"></i> 4.9 (1,240 Reviews)
                  </div>
                </div>
                <h3 class="text-lg font-black text-slate-900 dark:text-white leading-tight">TechNova Blade 16 Pro Laptop</h3>
                <div class="flex items-baseline gap-2 mt-2">
                  <span class="text-xl font-black text-blue-600">₹89,999</span>
                  <span class="text-xs text-slate-400 line-through">₹1,05,000</span>
                  <span class="text-xs font-bold text-emerald-600">14% OFF</span>
                </div>
              </div>

              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Key Specifications</h4>
              <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="app-card p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span class="text-[9px] text-slate-400 font-mono">PROCESSOR</span>
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">Intel Core Ultra 9</div>
                </div>
                <div class="app-card p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span class="text-[9px] text-slate-400 font-mono">MEMORY / SSD</span>
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">32GB LPDDR5X • 1TB</div>
                </div>
                <div class="app-card p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span class="text-[9px] text-slate-400 font-mono">DISPLAY</span>
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">16" 240Hz 3.2K OLED</div>
                </div>
                <div class="app-card p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span class="text-[9px] text-slate-400 font-mono">BATTERY</span>
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">99.9Wh (100W GaN)</div>
                </div>
              </div>

              <div class="mb-4">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Overview</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Crafted with aerospace aluminum alloy and vapor chamber thermals. Delivers uncompromised multi-core processing for AI model inference and 4K creative rendering.
                </p>
              </div>

              <div class="fixed bottom-0 left-0 right-0 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 z-50">
                <button onclick="addToCart({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'}); navigateTo('screen-cart')" class="tap-effect flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                  <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart
                </button>
                <button onclick="addToCart({id:'blade-16', name:'TechNova Blade 16 Pro', price:89999, image:'laptop'}); navigateTo('screen-checkout')" class="tap-effect flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5">
                  <i data-lucide="zap" class="w-4 h-4"></i> Buy Now
                </button>
              </div>
            </div>

            <!-- SCREEN 10: WISHLIST SCREEN -->
            <div id="screen-wishlist" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">Saved Wishlist</h3>
                </div>
                <button onclick="navigateTo('screen-cart')" class="text-xs font-semibold text-blue-600">View Cart</button>
              </div>

              <div id="wishlistContainer" class="space-y-3"></div>
            </div>

            <!-- SCREEN 11: CART SCREEN ⭐ -->
            <div id="screen-cart" class="screen-view p-4 pb-24 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">Shopping Cart</h3>
                </div>
                <button onclick="navigateTo('screen-categories')" class="text-xs text-blue-600 font-semibold">+ Add Items</button>
              </div>

              <div id="cartItemsContainer" class="space-y-3 mb-4"></div>

              <div class="app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                <div class="flex items-center gap-2">
                  <i data-lucide="tag" class="w-4 h-4 text-blue-600"></i>
                  <input type="text" placeholder="Enter coupon (e.g. TECH2026)" value="TECH2026" class="app-input flex-1 px-3 py-1.5 text-xs rounded-xl">
                  <button onclick="showToast('Coupon TECH2026 applied! (-₹5,000)')" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">Apply</button>
                </div>
              </div>

              <div class="app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4 space-y-2 text-xs">
                <div class="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span id="cartSubtotal" class="font-bold text-slate-900 dark:text-white">₹94,998</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>Express Delivery</span>
                  <span class="font-bold text-emerald-600">FREE</span>
                </div>
                <div class="flex justify-between text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Total Amount</span>
                  <span id="cartTotal" class="text-blue-600">₹94,998</span>
                </div>
              </div>

              <button onclick="navigateTo('screen-checkout')" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <span>Proceed to Checkout</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- SCREEN 12: CHECKOUT SCREEN -->
            <div id="screen-checkout" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <h3 class="text-sm font-black text-slate-900 dark:text-white">Order Checkout</h3>
              </div>

              <div class="flex items-center justify-between mb-4 px-2 text-[10px] font-bold">
                <span class="text-blue-600 flex items-center gap-1">● 1. Address</span>
                <span class="text-slate-400 flex items-center gap-1">○ 2. Payment</span>
                <span class="text-slate-400 flex items-center gap-1">○ 3. Confirm</span>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <i data-lucide="map-pin" class="w-4 h-4 text-blue-600"></i> Shipping Address
                  </span>
                  <button onclick="showToast('Address editor opened')" class="text-[11px] text-blue-600 font-semibold hover:underline">Change</button>
                </div>
                <p class="text-xs font-semibold text-slate-800 dark:text-slate-200">Sandip Sah</p>
                <p class="text-[11px] text-slate-500 mt-0.5">Plot 42, Cyber Gateway Tech Park, Sector 5</p>
                <p class="text-[11px] text-slate-500">Bengaluru, KA — 560100 • +91 98765 43210</p>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3">
                <span class="text-xs font-bold text-slate-900 dark:text-white block mb-2">Delivery Option</span>
                <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <i data-lucide="truck" class="w-4 h-4 text-blue-600"></i>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">TechNova Express Priority</div>
                      <div class="text-[10px] text-slate-500">Guaranteed delivery by Tomorrow, 2 PM</div>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-emerald-600">FREE</span>
                </div>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4 text-xs space-y-1.5">
                <div class="flex justify-between text-slate-500">
                  <span>Payable Total:</span>
                  <span id="checkoutTotal" class="font-bold text-blue-600 text-sm">₹94,998</span>
                </div>
              </div>

              <button onclick="navigateTo('screen-payment')" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <span>Continue to Payment</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- SCREEN 13: PAYMENT SCREEN -->
            <div id="screen-payment" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <h3 class="text-sm font-black text-slate-900 dark:text-white">Payment Method</h3>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 mb-4 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-500 uppercase font-mono">Total Due</span>
                  <div id="paymentTotal" class="text-base font-black text-blue-600">₹94,998</div>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold font-mono">256-BIT SSL ENCRYPTED</span>
              </div>

              <div class="space-y-2 mb-4 text-xs">
                <label class="tap-effect cursor-pointer app-card p-3 rounded-xl bg-white dark:bg-slate-800 border border-blue-500 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="paymethod" checked class="text-blue-600">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i> UPI (Instant Zero-Fee)
                      </div>
                      <div class="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">FASTEST</span>
                </label>

                <label class="tap-effect cursor-pointer app-card p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="paymethod" class="text-blue-600">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <i data-lucide="credit-card" class="w-4 h-4 text-blue-600"></i> Credit / Debit Card
                      </div>
                      <div class="text-[10px] text-slate-500">Visa, Mastercard, RuPay, Amex</div>
                    </div>
                  </div>
                </label>

                <label class="tap-effect cursor-pointer app-card p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="paymethod" class="text-blue-600">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <i data-lucide="landmark" class="w-4 h-4 text-slate-600 dark:text-slate-300"></i> Net Banking
                      </div>
                      <div class="text-[10px] text-slate-500">HDFC, ICICI, SBI, Axis & all banks</div>
                    </div>
                  </div>
                </label>

                <label class="tap-effect cursor-pointer app-card p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="paymethod" class="text-blue-600">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <i data-lucide="banknote" class="w-4 h-4 text-emerald-600"></i> Cash on Delivery
                      </div>
                      <div class="text-[10px] text-slate-500">Pay at doorstep upon delivery</div>
                    </div>
                  </div>
                </label>
              </div>

              <button onclick="navigateTo('screen-order-success'); showToast('Payment authorized successfully!')" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4"></i>
                <span>Authorize & Pay Now</span>
              </button>
            </div>

            <!-- SCREEN 14: ORDER SUCCESS SCREEN -->
            <div id="screen-order-success" class="screen-view p-6 flex flex-col justify-between min-h-[720px] bg-slate-50 dark:bg-slate-900 text-center">
              <div></div>
              <div class="flex flex-col items-center">
                <div class="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4 shadow-xl">
                  <i data-lucide="check" class="w-10 h-10"></i>
                </div>
                <span class="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">TRANSACTION CONFIRMED</span>
                <h2 class="text-xl font-black text-slate-900 dark:text-white mt-1">Order Placed Successfully!</h2>
                <p class="text-xs text-slate-500 mt-1 max-w-xs">
                  We've received your order. Tracking updates will be sent via SMS & Email.
                </p>

                <div class="app-card w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-6 text-xs text-left space-y-2">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Order ID:</span>
                    <span class="font-mono font-bold text-slate-900 dark:text-white">#TN20261001</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Estimated Delivery:</span>
                    <span class="font-bold text-slate-900 dark:text-white">Tomorrow, Oct 7</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Amount Paid:</span>
                    <span id="successOrderTotal" class="font-black text-blue-600">₹94,998</span>
                  </div>
                </div>
              </div>

              <div class="space-y-2.5 pb-4">
                <button onclick="navigateTo('screen-order-details')" class="tap-effect w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4"></i>
                  <span>Track Order Status</span>
                </button>
                <button onclick="navigateTo('screen-home')" class="tap-effect w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs">
                  Continue Shopping
                </button>
              </div>
            </div>

            <!-- SCREEN 15: MY ORDERS SCREEN -->
            <div id="screen-my-orders" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <h3 class="text-sm font-black text-slate-900 dark:text-white">My Orders</h3>
              </div>

              <div class="flex items-center gap-2 mb-4">
                <button class="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">Active (1)</button>
                <button class="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 font-semibold">Delivered (4)</button>
                <button class="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 font-semibold">Cancelled (0)</button>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-3 space-y-3">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <div>
                    <span class="text-[10px] text-slate-400 font-mono">#TN20261001</span>
                    <div class="text-[11px] text-slate-500">Oct 6, 2026 • 2 Items</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-600 live-badge"></span> IN TRANSIT
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-600">
                    <i data-lucide="laptop" class="w-6 h-6"></i>
                  </div>
                  <div class="flex-1">
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">TechNova Blade 16 Pro</h5>
                    <p class="text-xs font-bold text-blue-600">₹89,999</p>
                  </div>
                </div>

                <button onclick="navigateTo('screen-order-details')" class="tap-effect w-full py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-bold flex items-center justify-center gap-1.5">
                  <span>View Details & Live Tracking</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <div class="app-card p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 opacity-80">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <div>
                    <span class="text-[10px] text-slate-400 font-mono">#TN20260912</span>
                    <div class="text-[11px] text-slate-500">Sep 12, 2026</div>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-bold flex items-center gap-1">
                    ✓ DELIVERED
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-pink-600">
                    <i data-lucide="headphones" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">NeoPods Active ANC</h5>
                    <span class="text-xs text-slate-500">₹4,999</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREEN 16: ORDER DETAILS & TRACKING -->
            <div id="screen-order-details" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">Order Tracking</h3>
                </div>
                <button onclick="navigateTo('screen-help-support')" class="text-xs font-semibold text-blue-600">Need Help?</button>
              </div>

              <div class="app-card p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
                <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                  <div>
                    <span class="text-[10px] text-slate-400 font-mono">TRACKING ID: BL-984210</span>
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">Express Airway Bill</h4>
                  </div>
                  <span class="text-xs font-bold text-blue-600 font-mono">BlueDart</span>
                </div>

                <div class="space-y-4 text-xs">
                  <div class="timeline-step flex items-start justify-between">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Order Placed</div>
                      <div class="text-[10px] text-slate-400">Oct 6, 9:40 PM • Verified</div>
                    </div>
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
                  </div>

                  <div class="timeline-step flex items-start justify-between">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Confirmed & Packed</div>
                      <div class="text-[10px] text-slate-400">Oct 6, 9:45 PM • Warehouse Hub</div>
                    </div>
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
                  </div>

                  <div class="timeline-step flex items-start justify-between">
                    <div>
                      <div class="font-bold text-blue-600 flex items-center gap-1.5">
                        In Transit (Shipped) <span class="w-2 h-2 rounded-full bg-blue-600 live-badge"></span>
                      </div>
                      <div class="text-[10px] text-slate-400">Oct 6, 10:15 PM • On Courier Van</div>
                    </div>
                    <i data-lucide="truck" class="w-4 h-4 text-blue-600"></i>
                  </div>

                  <div class="timeline-step flex items-start justify-between opacity-50">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Out for Delivery</div>
                      <div class="text-[10px] text-slate-400">Expected Tomorrow by 2 PM</div>
                    </div>
                    <i data-lucide="circle" class="w-4 h-4 text-slate-400"></i>
                  </div>

                  <div class="timeline-step flex items-start justify-between opacity-50">
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Delivered</div>
                      <div class="text-[10px] text-slate-400">Handover to recipient</div>
                    </div>
                    <i data-lucide="circle" class="w-4 h-4 text-slate-400"></i>
                  </div>
                </div>
              </div>

              <div class="app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <span class="font-bold text-slate-900 dark:text-white block mb-1">Delivering To:</span>
                <p class="text-slate-500 text-[11px]">Sandip Sah • Bengaluru Tech Gateway</p>
              </div>
            </div>

            <!-- SCREEN 17: PROFILE SCREEN -->
            <div id="screen-profile" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-black text-slate-900 dark:text-white">Account Hub</h3>
                <button onclick="navigateTo('screen-settings')" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="settings" class="w-4 h-4"></i>
                </button>
              </div>

              <div class="app-card p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3.5 mb-4 shadow-sm">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-lg shadow-blue-500/30">
                  SS
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate">Sandip Sah</h4>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 font-bold font-mono">PLUS MEMBER</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">sandip@technova.io</p>
                  <p class="text-[10px] text-slate-400 mt-1">+91 98765 43210</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2.5 mb-4">
                <div onclick="navigateTo('screen-my-orders')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <i data-lucide="package" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">My Orders</h5>
                    <p class="text-[10px] text-slate-400">1 Active Item</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-wishlist')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950 text-red-500 flex items-center justify-center">
                    <i data-lucide="heart" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <h5 class="text-xs font-bold text-slate-900 dark:text-white">Wishlist</h5>
                    <p class="text-[10px] text-slate-400">2 Saved Items</p>
                  </div>
                </div>
              </div>

              <div class="app-card rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 text-xs mb-4">
                <div onclick="showToast('Address management active')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i> Saved Addresses
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>

                <div onclick="showToast('Saved cards list')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <i data-lucide="credit-card" class="w-4 h-4 text-slate-400"></i> Payment Methods
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>

                <div onclick="navigateTo('screen-notifications')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <i data-lucide="bell" class="w-4 h-4 text-slate-400"></i> Notification Alerts
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>

                <div onclick="navigateTo('screen-help-support')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                    <i data-lucide="help-circle" class="w-4 h-4 text-slate-400"></i> Help & Support
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>
              </div>

              <button onclick="navigateTo('screen-login'); showToast('Logged out of TechNova')" class="tap-effect w-full py-3 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 font-bold text-xs flex items-center justify-center gap-2">
                <i data-lucide="log-out" class="w-4 h-4"></i> Sign Out
              </button>
            </div>

            <!-- SCREEN 18: SETTINGS SCREEN -->
            <div id="screen-settings" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <h3 class="text-sm font-black text-slate-900 dark:text-white">Settings & Preferences</h3>
              </div>

              <span class="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-2">Preferences</span>
              <div class="app-card rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 space-y-3 text-xs mb-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="moon" class="w-4 h-4 text-blue-600"></i>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Dark Mode</div>
                      <div class="text-[10px] text-slate-400">Toggle dark tech theme</div>
                    </div>
                  </div>
                  <button onclick="toggleDarkMode()" class="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold">Toggle</button>
                </div>

                <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-2.5">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="bell" class="w-4 h-4 text-blue-600"></i>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Order Notifications</div>
                      <div class="text-[10px] text-slate-400">Real-time delivery SMS & alerts</div>
                    </div>
                  </div>
                  <span class="text-emerald-500 font-bold text-[11px]">ON</span>
                </div>

                <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-2.5">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i>
                    <div>
                      <div class="font-bold text-slate-900 dark:text-white">Language</div>
                      <div class="text-[10px] text-slate-400">Default application locale</div>
                    </div>
                  </div>
                  <span class="text-slate-500 font-mono text-[11px]">English (IN)</span>
                </div>
              </div>

              <span class="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mb-2">Security & Legal</span>
              <div class="app-card rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                <div onclick="showToast('Password reset dialog')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <span>Change Account Password</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>
                <div onclick="showToast('Privacy Policy viewed')" class="tap-effect cursor-pointer p-3 flex items-center justify-between">
                  <span>Privacy Policy & Data Security</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
                </div>
                <div class="p-3 flex items-center justify-between text-slate-400">
                  <span>TechNova App Version</span>
                  <span class="font-mono">v2.4.0 (Build 9021)</span>
                </div>
              </div>
            </div>

            <!-- SCREEN 19: NOTIFICATIONS SCREEN -->
            <div id="screen-notifications" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  </button>
                  <h3 class="text-sm font-black text-slate-900 dark:text-white">Notifications</h3>
                </div>
                <button onclick="showToast('All notifications marked as read')" class="text-xs font-semibold text-blue-600">Mark all as read</button>
              </div>

              <div class="space-y-2.5">
                <div onclick="navigateTo('screen-order-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="truck" class="w-4 h-4"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h5 class="text-xs font-bold text-slate-900 dark:text-white">Your Order has Shipped!</h5>
                      <span class="text-[9px] text-slate-400 font-mono">10m ago</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Order #TN20261001 is on courier van for delivery tomorrow.</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-product-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="gift" class="w-4 h-4"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h5 class="text-xs font-bold text-slate-900 dark:text-white">Exclusive Fest Offer</h5>
                      <span class="text-[9px] text-slate-400 font-mono">2h ago</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Use code TECH2026 for ₹5,000 off on all Blade Laptops.</p>
                  </div>
                </div>

                <div onclick="navigateTo('screen-wishlist')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="heart" class="w-4 h-4"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h5 class="text-xs font-bold text-slate-900 dark:text-white">Price Drop in Wishlist</h5>
                      <span class="text-[9px] text-slate-400 font-mono">5h ago</span>
                    </div>
                    <p class="text-[11px] text-slate-500 mt-0.5">Titan Fold 5G dropped by ₹8,000 for a limited time.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREEN 20: HELP & SUPPORT SCREEN -->
            <div id="screen-help-support" class="screen-view p-4 pb-20 bg-slate-50 dark:bg-slate-900">
              <div class="flex items-center gap-2 mb-4">
                <button onclick="navigateBack()" class="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <h3 class="text-sm font-black text-slate-900 dark:text-white">Help & Support Desk</h3>
              </div>

              <div class="relative mb-4">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-3"></i>
                <input type="text" placeholder="Search issues, orders, warranty..." class="app-input w-full pl-9 pr-3 py-2 text-xs rounded-xl">
              </div>

              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Popular Support Topics</h4>
              <div class="grid grid-cols-2 gap-2 mb-4">
                <div onclick="navigateTo('screen-order-details')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <i data-lucide="package" class="w-5 h-5 text-blue-600 mb-1"></i>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white">Track Order</h5>
                  <p class="text-[10px] text-slate-400">Live courier updates</p>
                </div>

                <div onclick="showToast('Returns initiated')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <i data-lucide="refresh-cw" class="w-5 h-5 text-emerald-600 mb-1"></i>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white">Returns & Refunds</h5>
                  <p class="text-[10px] text-slate-400">7-day replacement</p>
                </div>

                <div onclick="showToast('Warranty check active')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <i data-lucide="shield" class="w-5 h-5 text-purple-600 mb-1"></i>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white">Brand Warranty</h5>
                  <p class="text-[10px] text-slate-400">Register device</p>
                </div>

                <div onclick="showToast('Payment FAQ opened')" class="tap-effect cursor-pointer app-card p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <i data-lucide="credit-card" class="w-5 h-5 text-amber-500 mb-1"></i>
                  <h5 class="text-xs font-bold text-slate-900 dark:text-white">Payment Help</h5>
                  <p class="text-[10px] text-slate-400">UPI & card refunds</p>
                </div>
              </div>

              <h4 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Contact TechNova</h4>
              <div class="space-y-2">
                <button onclick="showToast('Connecting to 24/7 Live Support Agent...')" class="tap-effect w-full p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-blue-600/20">
                  <div class="flex items-center gap-2.5">
                    <i data-lucide="message-square" class="w-4 h-4"></i>
                    <span>Start 24/7 Live Chat</span>
                  </div>
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>

                <div onclick="showToast('Calling toll-free helpline 1800-TECHNOVA')" class="tap-effect cursor-pointer app-card p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                    <i data-lucide="phone-call" class="w-4 h-4 text-emerald-500"></i> Toll-Free: 1800-TECHNOVA
                  </div>
                  <span class="text-[10px] text-emerald-500 font-bold">24x7</span>
                </div>
              </div>
            </div>

          </div>

          <!-- BOTTOM NAVIGATION BAR (5 Tabs) -->
          <nav id="bottomNavBar" class="bottom-nav">
            <button onclick="navigateTo('screen-home')" class="bottom-nav-item active" data-nav="screen-home">
              <i data-lucide="home" class="w-5 h-5 mb-0.5"></i>
              <span class="text-[9px]">Home</span>
            </button>

            <button onclick="navigateTo('screen-search')" class="bottom-nav-item" data-nav="screen-search">
              <i data-lucide="search" class="w-5 h-5 mb-0.5"></i>
              <span class="text-[9px]">Search</span>
            </button>

            <button onclick="navigateTo('screen-categories')" class="bottom-nav-item" data-nav="screen-categories">
              <i data-lucide="grid" class="w-5 h-5 mb-0.5"></i>
              <span class="text-[9px]">Products</span>
            </button>

            <button onclick="navigateTo('screen-cart')" class="bottom-nav-item relative" data-nav="screen-cart">
              <i data-lucide="shopping-bag" class="w-5 h-5 mb-0.5"></i>
              <span class="text-[9px]">Cart</span>
              <span id="cartBadgeCount" class="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold absolute top-1 right-2 flex items-center justify-center">2</span>
            </button>

            <button onclick="navigateTo('screen-profile')" class="bottom-nav-item" data-nav="screen-profile">
              <i data-lucide="user" class="w-5 h-5 mb-0.5"></i>
              <span class="text-[9px]">Profile</span>
            </button>
          </nav>

          <!-- Home Indicator Gesture -->
          <div class="home-indicator"></div>

        </div>
      </div>
    </div>

    <!-- RIGHT: 20-SCREEN FLOW MAP & VIVA CONTROLLER -->
    <div class="flex-1 w-full max-w-xl space-y-6">

      <!-- Navigation Matrix Inspector -->
      <div class="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="compass" class="w-4 h-4 text-blue-400"></i>
            20-Screen Interactive Navigation Map
          </h2>
          <span id="currentScreenBadge" class="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 font-mono">
            04. Home Dashboard ⭐
          </span>
        </div>

        <p class="text-xs text-slate-400 leading-relaxed mb-4">
          Every screen is completely wired. Click any card below to jump directly, or navigate organically inside the smartphone frame.
        </p>

        <!-- 3 Golden Viva Flows Highlight -->
        <div class="space-y-2 mb-4">
          <div class="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs">
            <span class="text-blue-300 font-bold flex items-center gap-1.5 mb-1">
              <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i> Flow 1 — End-to-End Shopping:
            </span>
            <p class="text-[11px] text-slate-400 font-mono">
              Home ➔ Categories ➔ Category Products ➔ Product Details ➔ Cart ➔ Checkout ➔ Payment ➔ Order Success
            </p>
          </div>

          <div class="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs">
            <span class="text-purple-300 font-bold flex items-center gap-1.5 mb-1">
              <i data-lucide="search" class="w-3.5 h-3.5"></i> Flow 2 — Search, Filter & Wishlist:
            </span>
            <p class="text-[11px] text-slate-400 font-mono">
              Home ➔ Search ➔ Search Results ➔ Product Details ➔ Wishlist ➔ Cart
            </p>
          </div>

          <div class="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs">
            <span class="text-emerald-300 font-bold flex items-center gap-1.5 mb-1">
              <i data-lucide="user-check" class="w-3.5 h-3.5"></i> Flow 3 — Account, Orders & Support:
            </span>
            <p class="text-[11px] text-slate-400 font-mono">
              Home ➔ Profile ➔ My Orders ➔ Order Details Timeline ➔ Help & Support
            </p>
          </div>
        </div>

        <!-- 20-Screen Interactive Grid -->
        <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Direct Screen Matrix</h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-mono">
          <button onclick="navigateTo('screen-splash')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-splash">01 Splash</button>
          <button onclick="navigateTo('screen-onboarding')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-onboarding">02 Onboard</button>
          <button onclick="navigateTo('screen-login')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-login">03 Login</button>
          <button onclick="navigateTo('screen-home')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition border-blue-500" data-screen="screen-home">04 Home ⭐</button>

          <button onclick="navigateTo('screen-categories')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-categories">05 Categories</button>
          <button onclick="navigateTo('screen-category-products')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-category-products">06 Cat Prods</button>
          <button onclick="navigateTo('screen-search')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-search">07 Search</button>
          <button onclick="navigateTo('screen-search-results')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-search-results">08 Results</button>

          <button onclick="navigateTo('screen-product-details')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-product-details">09 Details ⭐</button>
          <button onclick="navigateTo('screen-wishlist')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-wishlist">10 Wishlist</button>
          <button onclick="navigateTo('screen-cart')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-cart">11 Cart ⭐</button>
          <button onclick="navigateTo('screen-checkout')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-checkout">12 Checkout</button>

          <button onclick="navigateTo('screen-payment')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-payment">13 Payment</button>
          <button onclick="navigateTo('screen-order-success')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-order-success">14 Success</button>
          <button onclick="navigateTo('screen-my-orders')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-my-orders">15 Orders</button>
          <button onclick="navigateTo('screen-order-details')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-order-details">16 Tracking</button>

          <button onclick="navigateTo('screen-profile')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-profile">17 Profile</button>
          <button onclick="navigateTo('screen-settings')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-settings">18 Settings</button>
          <button onclick="navigateTo('screen-notifications')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-notifications">19 Alerts</button>
          <button onclick="navigateTo('screen-help-support')" class="flow-map-card p-2 rounded-xl bg-slate-950 border border-slate-800 text-left hover:border-blue-500 transition" data-screen="screen-help-support">20 Support</button>
        </div>
      </div>

    </div>
  </main>

  <!-- Design Thinking Case Study Full Modal -->
  <div id="caseStudyModal" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300">
    <div class="bg-slate-900 border border-slate-700 w-full max-w-4xl max-h-[88vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
      <div class="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <i data-lucide="compass" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white">TechNova Design Thinking Case Study & Research</h3>
            <p class="text-xs text-slate-400">User Research • Personas • 20-Screen Architecture • Usability</p>
          </div>
        </div>
        <button onclick="toggleCaseStudyModal(false)" class="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <h4 class="text-sm font-bold text-blue-400 flex items-center gap-2 mb-2">
            <i data-lucide="search" class="w-4 h-4"></i> 1. User Research & Pain Points
          </h4>
          <p class="text-slate-400 mb-2">
            Interviews with tech consumers revealed that checkout friction and opaque specifications cause 48% of cart drop-offs.
          </p>
          <ul class="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
            <li>Need for fast 1-tap UPI authorization with instant zero-fee receipts.</li>
            <li>Real-time visual package tracking rather than static text tracking numbers.</li>
            <li>Clean specs matrix (RAM, processor, refresh rate) placed prominently above the fold.</li>
          </ul>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <h4 class="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
            <i data-lucide="users" class="w-4 h-4"></i> 2. Target Personas
          </h4>
          <p class="text-slate-400 font-mono text-[11px]">
            <strong>Alex Rivera (31, Lead Dev / Power User):</strong> Demands flagship hardware with instant same-day dispatch and zero-friction checkout.<br>
            <strong>Priya Patel (26, Designer / Tech Enthusiast):</strong> Prioritizes high-DPI displays, active noise cancelling, and transparent return policies.
          </p>
        </div>
      </div>

      <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
        <span class="text-slate-500 font-mono text-[11px]">TechNova Mobile App Wireframing v2.4</span>
        <button onclick="toggleCaseStudyModal(false)" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition">
          Close Case Study
        </button>
      </div>
    </div>
  </div>

  <!-- Interactive Toast Notification -->
  <div id="toastNotification" class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl border border-blue-500/50 shadow-2xl transition-all duration-300 opacity-0 pointer-events-none z-50 flex items-center gap-2">
    <i data-lucide="check-circle" class="w-4 h-4 text-blue-400"></i>
    <span id="toastMessage">Action completed</span>
  </div>

  <script src="app.js"></script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully generated index.html with all 20 screens!');
