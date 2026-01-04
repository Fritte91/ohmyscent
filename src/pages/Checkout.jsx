import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 1500 ? 0 : 100;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Thailand',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Payment integration would be handled here
    // After successful payment, clear cart and redirect
    // try {
    //   const response = await processPayment(formData, cartItems);
    //   if (response.success) {
    //     clearCart();
    //     navigate('/order-success');
    //   }
    // } catch (error) {
    //   console.error('Payment error:', error);
    // }
    
    // Placeholder - remove this when implementing payment
    showToast(t('checkout.paymentPlaceholder') || 'Payment integration will be configured here. This is a placeholder.', 'error');
  };

  if (cartItems.length === 0) {
    return (
      <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen flex flex-col">
        <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
        <Navigation />
        <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full relative z-10 text-center">
          <p className="font-display text-2xl mb-4">{t('cart.empty')}</p>
          <Link to="/" className="inline-block bg-ink text-acid border-2 border-ink px-8 py-4 rounded-xl font-display text-lg">
            {t('cart.continueShopping')}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full relative z-10">
        <Link to="/cart" className="inline-flex items-center gap-2 mb-8 hover:text-acid transition-colors">
          ← {t('checkout.backToCart')}
        </Link>

        <h1 className="font-display text-4xl md:text-5xl tracking-tighter mb-12">{t('checkout.title')}</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-paper border-2 border-ink rounded-xl p-6 shadow-hard">
              <h2 className="font-display text-2xl mb-6">{t('checkout.shippingInfo')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.firstName')}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.lastName')}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{9,10}"
                    placeholder="0812345678"
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">{t('checkout.address')}</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.city')}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">{t('checkout.postalCode')}</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{5}"
                    placeholder="10100"
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2">{t('checkout.country')}</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-ink rounded-lg px-4 py-3 font-bold focus:shadow-hard transition-all outline-none"
                  >
                    <option value="Thailand">Thailand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-paper border-2 border-ink rounded-xl p-6 shadow-hard">
              <h2 className="font-display text-2xl mb-6">{t('checkout.paymentMethod')}</h2>
              <p className="opacity-70 text-sm">{t('checkout.paymentNote')}</p>
              {/* Payment integration components would go here */}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-paper border-2 border-ink rounded-xl p-6 shadow-hard sticky top-24">
              <h2 className="font-display text-2xl mb-6">{t('checkout.orderSummary')}</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-bold">฿{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t-2 border-ink pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-bold">฿{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-bold">{shipping === 0 ? t('common.free') : `฿${shipping}`}</span>
                  </div>
                  <div className="border-t-2 border-ink pt-4 flex justify-between font-display text-xl">
                    <span>{t('cart.total')}</span>
                    <span>฿{total}</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-ink text-acid border-2 border-ink px-8 py-4 rounded-xl font-display text-lg tracking-wide shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                {t('checkout.placeOrder')}
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

