# TECHNOVA Mobile App Wireframing — Complete 20-Screen Specification
**Brand:** TECHNOVA ("Technology, Simplified")  
**Platform:** Mobile App Wireframe Prototype (iOS / Android)  
**Deliverable:** 20 Full Wireframe Screens, Component Design System, Navigation Maps & College Project Presentation Kit

---

## 📁 1. Figma File & Frame Structure Architecture

Organize your Figma or Adobe XD project into 4 dedicated pages:

```
📁 TECHNOVA MOBILE APP (Figma File)
│
├── 📄 01 — User Flow & Architecture
│   ├── Main Application Information Architecture
│   ├── Flow 1: Shopping & Checkout
│   ├── Flow 2: Search & Wishlist
│   └── Flow 3: Order Tracking & Support
│
├── 📄 02 — Wireframes (20 Standard iPhone 15 Frames: 393 × 852 px)
│   ├── Frame 01: Splash Screen
│   ├── Frame 02: Onboarding (Step 1, 2, 3)
│   ├── Frame 03: Login & Sign Up (Auth)
│   ├── Frame 04: Home Dashboard
│   ├── Frame 05: Categories Explorer
│   ├── Frame 06: Category Products Listing
│   ├── Frame 07: Search & Recent Queries
│   ├── Frame 08: Search Results & Filter
│   ├── Frame 09: Product Details (Hero)
│   ├── Frame 10: Wishlist / Saved Items
│   ├── Frame 11: Shopping Cart
│   ├── Frame 12: Checkout & Delivery Address
│   ├── Frame 13: Payment Options (UPI / Card / NetBanking)
│   ├── Frame 14: Order Success Confirmation
│   ├── Frame 15: My Orders (Active & Delivered)
│   ├── Frame 16: Order Details & Live Timeline
│   ├── Frame 17: User Profile Account Hub
│   ├── Frame 18: System & Privacy Settings
│   ├── Frame 19: Notifications Feed
│   └── Frame 20: Help, FAQ & Support Desk
│
├── 📄 03 — Design System Components
│   ├── Atoms: Buttons (Primary, Outline, Icon, Pill), Inputs (Search, Text, Coupon)
│   ├── Molecules: Product Card, Category Tile, Order Card, Notification Item
│   ├── Organisms: Top Status Bar, Bottom Navigation Bar (5-tab), Stepper Timeline
│   └── Icons: Lucide / Feather Tech Icon Library
│
└── 📄 04 — Interactive Prototype Links
```

---

## 📱 2. The 20 Screen Wireframe Specifications

### Screen 01: Splash Screen
- **Purpose:** Brand reveal & initialization.
- **Key Components:**
  - Centered TECHNOVA geometric brand icon
  - Brand Title: "TECHNOVA"
  - Tagline: "Technology, Simplified"
  - 3-Dot animated loading indicator
- **Navigation:** Auto-advance / Tap → **02 Onboarding**.

### Screen 02: Onboarding Screen
- **Purpose:** Communicate core value propositions.
- **Key Components:**
  - Top "Skip" button (jumps directly to Login)
  - Hero illustration placeholder (Curated Tech Products)
  - Headline: "Discover Technology Built For You"
  - Body: "Explore our latest gadgets, laptops, and smart tech devices with instant delivery."
  - Pagination Indicators: `● ○ ○`
  - Primary CTA: "Next" → Advances to Step 2, 3, or **03 Login**.

### Screen 03: Login / Sign Up
- **Purpose:** User authentication & guest onboarding.
- **Key Components:**
  - Brand header & Welcome back text
  - Email input field & Password field with visibility toggle
  - "Forgot Password?" hyperlink
  - "Log In" primary button
  - Social Auth: Continue with Google & Apple
  - Switch tab: "New to TechNova? Create Account"
- **Navigation:** Login → **04 Home**; Forgot Password → Reset modal.

### Screen 04: Home Dashboard ⭐
- **Purpose:** Primary discovery console.
- **Key Components:**
  - Header with user greeting ("Hi, Sandip 👋") & Bell notification icon
  - Search trigger input ("Search laptops, smartphones, audio...")
  - Promotional Banner Carousel ("TechNova Fest: Up to 40% Off Laptops")
  - Horizontal Quick Category Bubbles (Smartphones, Laptops, Audio, Gaming, Smart Home)
  - Featured Tech Deals (2-column product grid with ratings and wishlist heart)
  - Persistent 5-tab Bottom Navigation (`Home`, `Categories`, `Search`, `Cart`, `Profile`)
- **Navigation:**
  - Search bar → **07 Search**
  - Bell icon → **19 Notifications**
  - Category bubble → **06 Category Products**
  - Product card → **09 Product Details**

### Screen 05: Categories Explorer
- **Purpose:** Comprehensive catalog breakdown.
- **Key Components:**
  - Search header
  - 2-Column Grid of Tech Categories with icons:
    - Smartphones & Foldables
    - Laptops & Ultrabooks
    - Audio & Wireless Earbuds
    - Gaming Rigs & Consoles
    - Smart Home & IoT
    - Wearables & Accessories
- **Navigation:** Tap any category card → **06 Category Products**.

### Screen 06: Category Products Listing
- **Purpose:** Browse items filtered by category.
- **Key Components:**
  - Back button & Category title ("Laptops & Ultrabooks")
  - Filter & Sort pill buttons ("Filter by Brand", "Price: Low to High")
  - Grid of product cards with price (₹), specs, ratings, and wishlist toggles
- **Navigation:** Tap card → **09 Product Details**.

### Screen 07: Search Screen
- **Purpose:** Direct intent search entry.
- **Key Components:**
  - Active search bar with clear button & mic icon
  - "Recent Searches" chips (Gaming Laptop, ANC Earbuds, Smart Watch)
  - "Trending Now" list with search volumes
  - Quick Category Shortcuts
- **Navigation:** Submit search query → **08 Search Results**.

### Screen 08: Search Results Screen
- **Purpose:** Filterable search outcome.
- **Key Components:**
  - Query header ("Results for 'Gaming Laptop' • 24 items")
  - Filter drawer trigger & Sort bar
  - Product cards list with badge discounts ("Save ₹15,000")
- **Navigation:** Tap item → **09 Product Details**.

### Screen 09: Product Details Screen ⭐
- **Purpose:** Decision-making and conversion hub.
- **Key Components:**
  - Multi-image carousel placeholder with pagination dots
  - Product Title ("TechNova Blade 16 Pro Laptop")
  - Rating badge (⭐ 4.8 / 5 • 1,240 reviews)
  - Pricing section: Current price (₹89,999) + Original (₹1,05,000) + 14% Off
  - Key Specs Matrix: RAM, GPU, Display refresh rate, Battery life
  - Expandable Accordion: Full Tech Specs & User Reviews
  - Bottom Sticky Bar: Wishlist heart, "Add to Cart" button, "Buy Now" button
- **Navigation:**
  - "Add to Cart" → Toast message & badge update on **11 Cart**
  - "Buy Now" → **12 Checkout**
  - Heart icon → **10 Wishlist**

### Screen 10: Wishlist Screen
- **Purpose:** Manage saved favorite gadgets.
- **Key Components:**
  - Header: "My Wishlist (3 items)"
  - List of saved items with thumbnail, title, price, and stock status
  - 1-Tap "Move to Cart" button per item
  - Trash icon to remove item
- **Navigation:** Move to Cart → **11 Cart**; Tap item → **09 Product Details**.

### Screen 11: Cart Screen ⭐
- **Purpose:** Review order before purchase.
- **Key Components:**
  - Item list cards with Stepper (`− 1 +`) and delete button
  - Coupon code input field + "Apply" button (`TECH2026`)
  - Bill Breakdown:
    - Subtotal: ₹89,999
    - Delivery: FREE / ₹499
    - Discount applied: −₹5,000
    - Total: ₹85,498
  - Sticky bottom "Proceed to Checkout" button
- **Navigation:** Tap Checkout → **12 Checkout**.

### Screen 12: Checkout Screen
- **Purpose:** Delivery logistics setup.
- **Key Components:**
  - Step Indicator (Address → Payment → Confirmation)
  - Selected Delivery Address card with "Change / Edit" link
  - Estimated Delivery date badge ("Express: Arriving Tomorrow")
  - Mini Product Summary thumbnail
  - Total Payable: ₹85,498
  - Primary CTA: "Continue to Payment"
- **Navigation:** Tap Continue → **13 Payment**.

### Screen 13: Payment Screen
- **Purpose:** Secure transaction options.
- **Key Components:**
  - Amount to Pay banner (₹85,498)
  - Payment Method Accordion / Radio buttons:
    - ⚡ UPI (Google Pay, PhonePe, Paytm, BHIM)
    - 💳 Credit / Debit Card (Visa, Mastercard, RuPay)
    - 🏦 Net Banking (HDFC, ICICI, SBI)
    - 👛 Wallets
    - 💵 Cash on Delivery (COD)
  - Security reassurance badge ("256-bit SSL Encrypted")
  - Primary CTA: "Pay ₹85,498 Now"
- **Navigation:** Tap Pay Now → **14 Order Success**.

### Screen 14: Order Success Screen
- **Purpose:** Reassurance, confirmation & tracking entry point.
- **Key Components:**
  - Animated green checkmark badge
  - Heading: "Order Placed Successfully!"
  - Order Reference: `#TN-2026-98421`
  - Delivery estimate: "Expected Delivery: Oct 9, 2026"
  - Summary: 1 Item • ₹85,498 paid via UPI
  - Primary CTA: "Track Order" → **16 Order Details**
  - Secondary CTA: "Continue Shopping" → **04 Home**

### Screen 15: My Orders Screen
- **Purpose:** Order history hub.
- **Key Components:**
  - Filter Tabs: `Active (1)`, `Delivered (4)`, `Cancelled (0)`
  - Order card layout:
    - Order number & Date
    - Product thumbnail & title
    - Order total (₹)
    - Real-time status pill (● Shipped / ✓ Delivered)
    - "View Order & Track" button
- **Navigation:** Tap order → **16 Order Details**.

### Screen 16: Order Details & Live Tracking
- **Purpose:** Detailed tracking timeline.
- **Key Components:**
  - Header with Back button & Order ID
  - Vertical Stepper Timeline:
    - [✓] Order Placed — Oct 6, 9:40 PM
    - [✓] Order Confirmed — Oct 6, 9:45 PM
    - [✓] Packed at TechNova Hub — Oct 7, 6:00 AM
    - [●] Shipped (In Transit) — Oct 7, 2:30 PM *(Active)*
    - [○] Out for Delivery — Oct 9
    - [○] Delivered
  - Courier Partner info: BlueDart Tracking `#BL-928172`
  - Shipping address card
  - Need Help button → **20 Help & Support**

### Screen 17: User Profile Hub
- **Purpose:** Central account dashboard.
- **Key Components:**
  - User avatar, name ("Sandip Sah"), email & "TechNova Plus Member" badge
  - Quick action tiles: My Orders, Wishlist, Saved Addresses, Payment Cards
  - Menu list:
    - Account Information
    - Settings
    - Notifications
    - Help & Support
    - Log Out
- **Navigation:** Route to corresponding settings or order screens.

### Screen 18: System & Privacy Settings
- **Purpose:** App preferences.
- **Key Components:**
  - ACCOUNT: Edit Profile, Change Password, Manage 2FA
  - PREFERENCES:
    - Push Notifications (Toggle ON/OFF)
    - Dark Mode Theme (Toggle ON/OFF)
    - App Language (English)
  - SECURITY & LEGAL: Privacy Policy, Terms of Service, App Version `v2.4.0`

### Screen 19: Notifications Screen
- **Purpose:** Activity & promotional feed.
- **Key Components:**
  - "Mark all as read" button
  - Timestamped notifications grouped by Today / Yesterday:
    - 📦 *Order Shipped:* "Your TechNova Blade 16 is in transit."
    - 🎁 *Special Offer:* "Exclusive 20% coupon code unlocked."
    - 🔔 *Price Drop:* "An item in your wishlist dropped by ₹3,000."

### Screen 20: Help & Support Screen
- **Purpose:** Customer service and troubleshooting.
- **Key Components:**
  - Search help topics input
  - Quick Assistance Categories:
    - Order & Delivery Tracking
    - Returns & Refunds
    - Warranty & Repairs
    - Payment Issues
  - Support Channels:
    - 💬 Live Chat with Agent (24/7)
    - ✉️ Email Support (`support@technova.com`)
    - 📞 Call Helpline (`1800-TECHNOVA`)

---

## 🚀 3. Recommended Project Demonstration Flows (For College Viva & Presentations)

Demonstrate these 3 core interactive flows:

### Flow 1: Complete Shopping & Checkout (Golden Path)
`Home (04)` ➔ `Categories (05)` ➔ `Category Products (06)` ➔ `Product Details (09)` ➔ `Cart (11)` ➔ `Checkout (12)` ➔ `Payment (13)` ➔ `Order Success (14)`

### Flow 2: Search, Filter & Wishlist Intent
`Home (04)` ➔ `Search (07)` ➔ `Search Results (08)` ➔ `Product Details (09)` ➔ `Wishlist (10)` ➔ `Cart (11)`

### Flow 3: Post-Purchase Tracking & Support
`Home (04)` ➔ `Profile (17)` ➔ `My Orders (15)` ➔ `Order Details Timeline (16)` ➔ `Help & Support (20)`
