import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import LanguageToggle from './LanguageToggle';

const Navigation = () => {
  const { t } = useTranslation();
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-acid focus:text-ink focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:border-2 focus:border-ink"
      >
        Skip to main content
      </a>
      <nav className="sticky top-4 z-50 px-4 md:px-8">
        <div className="bg-paper/80 backdrop-blur-md border-2 border-ink rounded-xl shadow-hard flex justify-between items-center p-3 md:p-4 transition-all hover:shadow-hard-xl">
          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-acid rounded-lg border border-transparent hover:border-ink transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>

        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-display tracking-tighter flex items-center gap-1 group">
          OH MY <span className="text-acid text-shadow-sm group-hover:text-ink transition-colors" style={{ WebkitTextStroke: '1px #0A2A1F' }}>SCENT!</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-medium text-sm tracking-tight">
          <Link to="/shop?category=newArrivals" className="hover:text-acid hover:bg-ink px-3 py-1 rounded transition-colors">{t('nav.newArrivals')}</Link>
          <Link to="/shop?category=men" className="hover:text-acid hover:bg-ink px-3 py-1 rounded transition-colors">{t('nav.men')}</Link>
          <Link to="/shop?category=women" className="hover:text-acid hover:bg-ink px-3 py-1 rounded transition-colors">{t('nav.women')}</Link>
          <Link to="/shop?category=discoverySets" className="hover:text-acid hover:bg-ink px-3 py-1 rounded transition-colors">{t('nav.discoverySets')}</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Locale Toggle */}
          <LanguageToggle />

          <button 
            className="hidden md:block hover:bg-acid rounded-lg p-2 border border-transparent hover:border-ink transition-all"
            aria-label={t('common.search')}
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <Link
            to="/cart"
            className="bg-ink text-acid px-3 md:px-4 py-2 rounded-lg font-display text-xs md:text-sm border-2 border-ink hover:bg-acid hover:text-ink transition-colors flex items-center gap-2 group"
            aria-label={`${t('common.cart')} (${cartCount} ${cartCount === 1 ? 'item' : 'items'})`}
          >
            <span>{t('common.cart')} ({cartCount})</span>
            <ShoppingBag className="w-4 h-4 stroke-[1.5] group-hover:fill-ink" />
            {cartCount > 0 && (
              <span className="sr-only">{cartCount} {cartCount === 1 ? 'item' : 'items'} in cart</span>
            )}
          </Link>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="bg-paper border-2 border-ink rounded-xl shadow-hard-xl m-4 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-2xl">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-acid rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Link
              to="/shop?category=newArrivals"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-acid hover:bg-ink px-4 py-2 rounded transition-colors font-medium"
            >
              {t('nav.newArrivals')}
            </Link>
            <Link
              to="/shop?category=men"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-acid hover:bg-ink px-4 py-2 rounded transition-colors font-medium"
            >
              {t('nav.men')}
            </Link>
            <Link
              to="/shop?category=women"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-acid hover:bg-ink px-4 py-2 rounded transition-colors font-medium"
            >
              {t('nav.women')}
            </Link>
            <Link
              to="/shop?category=discoverySets"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-acid hover:bg-ink px-4 py-2 rounded transition-colors font-medium"
            >
              {t('nav.discoverySets')}
            </Link>
            <div className="pt-4 border-t border-ink/20">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

