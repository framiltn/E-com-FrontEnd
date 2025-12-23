# Marketplace Frontend - Next.js

Simple, clean design for the multi-vendor marketplace with affiliate marketing.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **Axios** for API calls

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
FrontEnd/
├── app/
│   ├── page.jsx              # Home page
│   ├── layout.jsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── login/page.jsx        # Login page
│   ├── register/page.jsx     # Register page
│   ├── products/page.jsx     # Products listing
│   ├── cart/page.jsx         # Shopping cart
│   └── orders/page.jsx       # Orders page
├── components/
│   ├── Navbar.jsx            # Navigation bar
│   ├── Hero.jsx              # Hero section
│   ├── ProductGrid.jsx       # Product grid
│   ├── ProductCard.jsx       # Product card
│   └── Footer.jsx            # Footer
├── lib/
│   └── api.js                # API client (Axios)
└── public/                   # Static assets
```

## Features Implemented

### ✅ Core Pages
- Home page with hero and featured products
- Product listing with search and filters
- Login and registration
- Shopping cart
- Product details (coming soon)
- Checkout (coming soon)
- Orders (coming soon)

### ✅ Components
- Responsive navbar with cart counter
- Product cards with images
- Hero section
- Footer with links
- Reusable form inputs

### ✅ API Integration
- Authentication (login, register)
- Product browsing
- Cart management
- Order management
- Wishlist
- Categories
- Affiliate system

## API Client

All API calls are centralized in `lib/api.js`:

```javascript
import { productAPI, cartAPI, authAPI } from '@/lib/api'

// Example usage
const products = await productAPI.getAll()
const cart = await cartAPI.get()
```

## Styling

Using Tailwind CSS with custom utility classes:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input-field` - Form input
- `.card` - Card container

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000/api)

## Build for Production

```bash
npm run build
npm start
```

## Next Steps

1. Complete remaining pages (product details, checkout, orders)
2. Add seller dashboard
3. Add admin panel
4. Add affiliate dashboard
5. Implement payment integration (Razorpay)
6. Add image optimization
7. Add loading states and error handling
8. Add form validation
9. Add toast notifications
10. Mobile responsive improvements

## Backend Connection

Make sure the Laravel backend is running:
```bash
cd ../BackEnd/marketplace-backend
php artisan serve
```

Backend will run on: http://localhost:8000
