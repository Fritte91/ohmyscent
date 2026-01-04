# Oh My Scent! - Premium Decants E-Commerce

A modern React e-commerce website for premium perfume decants, featuring full internationalization (English & Thai), shopping cart functionality, and checkout system ready for payment integration.

## Features

✨ **Modern React Architecture**
- Built with Vite for fast development
- Component-based architecture
- React Router for navigation
- Context API for state management

🌐 **Internationalization (i18n)**
- Full English and Thai language support
- Dynamic text switching via react-i18next
- All content managed through JSON translation files
- Easy to add more languages in the future

🛒 **Shopping Cart & Checkout**
- Full shopping cart functionality
- Persistent cart (localStorage)
- Cart page with item management
- Complete checkout flow
- Ready for payment gateway integration

🎨 **Design**
- Beautiful, modern UI matching the original design
- Tailwind CSS with custom theme
- Responsive design (mobile & desktop)
- Smooth animations and transitions
- Custom fonts (Dela Gothic One, Space Grotesk)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
OhMyScent/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Marquee.jsx      # Top scrolling marquee
│   │   ├── Navigation.jsx   # Main navigation bar
│   │   ├── Hero.jsx         # Hero section
│   │   ├── Ticker.jsx       # Scrolling ticker
│   │   ├── Categories.jsx   # Category grid
│   │   ├── WhyUs.jsx        # Features section
│   │   ├── Products.jsx     # Product listing
│   │   ├── Testimonials.jsx # Customer reviews
│   │   ├── Newsletter.jsx   # Newsletter signup
│   │   ├── Footer.jsx       # Footer component
│   │   └── LanguageToggle.jsx # Language switcher
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Home page
│   │   ├── Cart.jsx         # Shopping cart page
│   │   └── Checkout.jsx     # Checkout page
│   ├── contexts/            # React contexts
│   │   └── CartContext.jsx  # Shopping cart state
│   ├── locales/             # Translation files
│   │   ├── en.json          # English translations
│   │   └── th.json          # Thai translations
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind imports & custom styles
│   ├── i18n.js              # i18n configuration
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## Adding/Editing Translations

All text content is managed through JSON files in `src/locales/`:

- `en.json` - English translations
- `th.json` - Thai translations

To add or edit text:
1. Open the appropriate language file
2. Find or add the key you want to modify
3. Update the value
4. The changes will be reflected immediately

**Example:**
```json
{
  "hero": {
    "title1": "SMELL LIKE",
    "title2": "A MILLION",
    "title3": "BAHT."
  }
}
```

To use in components:
```jsx
const { t } = useTranslation();
<h1>{t('hero.title1')}</h1>
```

## Shopping Cart

The shopping cart is managed via React Context (`CartContext`). It provides:

- `addToCart(product)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Empty the cart
- `getCartTotal()` - Calculate total price
- `getCartItemCount()` - Get total item count
- `cartItems` - Array of cart items

Cart data is automatically saved to localStorage for persistence.

## Payment Integration

The checkout page (`src/pages/Checkout.jsx`) is structured to easily integrate payment gateways. 

To add payment integration:

1. Install your preferred payment SDK (Stripe, PayPal, etc.)
2. Add payment method UI components in the Payment Method section
3. Handle payment processing in the `handleSubmit` function
4. Update the form submission logic

The checkout form already captures:
- Shipping information
- Customer details
- Order summary

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```js
colors: {
  ink: '#0A2A1F',      // Dark green
  paper: '#F8F4E8',    // Cream
  acid: '#D2E823',     // Lime green
  orange: '#FF5C00',   // Orange
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`. To change:
1. Update the Google Fonts link
2. Update `fontFamily` in `tailwind.config.js`

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal, etc.)
- [ ] Product detail pages
- [ ] User authentication
- [ ] Order history
- [ ] Search functionality
- [ ] Filtering and sorting
- [ ] Product reviews
- [ ] Admin dashboard

## License

MIT

---

Built with ❤️ for Oh My Scent!

# ohmyscent
