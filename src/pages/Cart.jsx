import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { showToast } = useToast();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 1500 ? 0 : 100;
  const total = subtotal + shipping;

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id, item.size);
    showToast(`${item.name} ${item.size ? `${item.size} ` : ''}${t('common.removedFromCart')}`, 'success');
  };

  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full relative z-10">
        <h1 className="font-display text-4xl md:text-5xl tracking-tighter mb-8">{t('cart.title')}</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl mb-4">{t('cart.empty')}</p>
            <p className="opacity-70 mb-8">{t('cart.emptyDescription')}</p>
            <Link
              to="/"
              className="inline-block bg-ink text-acid border-2 border-ink px-8 py-4 rounded-xl font-display text-lg tracking-wide shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border-2 border-ink rounded-xl p-6 shadow-hard flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg border border-ink/20"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=Product+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-xl mb-1">{item.name}</h3>
                    <p className="text-sm opacity-60 mb-2">{item.notes}</p>
                    {item.size && (
                      <p className="text-sm font-bold text-ink mb-2">{t('productDetail.size')}: {item.size}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-bold">{t('cart.quantity')}:</label>
                        <div className="flex items-center border-2 border-ink rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                            className="px-3 py-1 hover:bg-acid transition-colors font-bold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-bold min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                            className="px-3 py-1 hover:bg-acid transition-colors font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">฿{item.price * item.quantity}</p>
                        <button
                          onClick={() => handleRemoveFromCart(item)}
                          className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1 mt-2 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-paper border-2 border-ink rounded-xl p-6 shadow-hard sticky top-24">
                <h2 className="font-display text-2xl mb-6">{t('checkout.orderSummary')}</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-bold">฿{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.shipping')}</span>
                    <span className="font-bold">
                      {shipping === 0 ? t('common.free') : `฿${shipping}`}
                    </span>
                  </div>
                  {subtotal < 1500 && (
                    <p className="text-xs opacity-60">{t('cart.freeShippingNote')}</p>
                  )}
                  <div className="border-t-2 border-ink pt-4 flex justify-between font-display text-xl">
                    <span>{t('cart.total')}</span>
                    <span>฿{total}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-ink text-acid border-2 border-ink px-8 py-4 rounded-xl font-display text-lg tracking-wide shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-center"
                >
                  {t('cart.checkout')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

