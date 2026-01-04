import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { productsData } from '../data/products';

const Products = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const scrollContainerRef = useRef(null);

  // Use first 4 products from data
  const products = productsData.slice(0, 4);

  const handleAddToCart = (product) => {
    if (product.available) {
      addToCart(product);
      showToast(`${product.name} ${t('common.addedToCart') || 'added to cart'}`, 'success');
    }
  };

  const scrollProducts = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Match min-w-[320px]
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 border-b-2 border-ink relative bg-white/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 flex items-center justify-between">
        <h2 className="font-display text-4xl md:text-5xl tracking-tighter">{t('products.freshJuice')}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollProducts('left')}
            className="w-10 h-10 border-2 border-ink rounded-lg flex items-center justify-center hover:bg-acid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('common.scrollLeft') || 'Scroll left'}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <button
            onClick={() => scrollProducts('right')}
            className="w-10 h-10 border-2 border-ink rounded-lg flex items-center justify-center hover:bg-acid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('common.scrollRight') || 'Scroll right'}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 no-scrollbar snap-x snap-mandatory max-w-[100vw]"
      >
        {products.map((product) => {
          const getBadgeText = (badge) => {
            if (!badge) return null;
            const badgeMap = {
              bestseller: t('products.bestseller'),
              longLasting: t('products.longLasting'),
              soldOut: t('products.soldOut'),
            };
            return badgeMap[badge] || badge;
          };

          const getBadgeColor = () => {
            if (product.badgeColor) return product.badgeColor;
            if (product.badge === 'bestseller') return 'bg-acid';
            if (product.badge === 'longLasting') return 'bg-orange text-white';
            if (product.badge === 'soldOut') return 'bg-ink text-paper';
            return 'bg-acid';
          };

          return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="min-w-[280px] md:min-w-[320px] snap-center group"
            >
              <div className={`relative bg-white border-2 border-ink rounded-2xl aspect-square mb-4 overflow-hidden shadow-sm group-hover:shadow-hard transition-all duration-300 ${!product.available ? 'opacity-70' : ''}`}>
                {product.badge && (
                  <div className={`absolute top-3 left-3 z-10 ${getBadgeColor()} border border-ink px-2 py-0.5 text-[10px] font-bold rounded uppercase`}>
                    {getBadgeText(product.badge)}
                  </div>
                )}
                <img
                  src={product.image}
                  className={`w-full h-full object-contain p-8 transition-transform duration-500 ${product.available ? 'group-hover:scale-110' : 'grayscale'}`}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                  }}
                />
                
                {/* Action Overlay */}
                {product.available && (
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="flex-1 bg-ink text-paper text-sm font-bold py-3 rounded-lg border border-ink hover:bg-acid hover:text-ink transition-colors"
                      aria-label={`${t('common.addToCart')} ${product.name}`}
                    >
                      {t('common.addToCart')}
                    </button>
                  </div>
                )}
              </div>
              <h3 className="font-display text-xl leading-none mb-1">{product.name}</h3>
              <p className="text-sm font-medium opacity-60 mb-3">{product.notes}</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-ink">฿{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs font-bold line-through opacity-40">฿{product.originalPrice}</span>
                )}
              </div>
            </Link>
          );
        })}
        
        {/* See All Card */}
        <Link
          to="/shop"
          className="min-w-[280px] md:min-w-[320px] snap-center flex flex-col justify-center items-center border-2 border-ink border-dashed rounded-2xl aspect-square hover:bg-white transition-colors cursor-pointer group"
        >
          <div className="w-16 h-16 bg-acid rounded-full flex items-center justify-center border-2 border-ink mb-4 group-hover:scale-110 transition-transform">
            <ArrowRight className="w-8 h-8 stroke-[2]" />
          </div>
          <h3 className="font-display text-xl">{t('products.viewAll')}</h3>
        </Link>
      </div>
    </section>
  );
};

export default Products;

