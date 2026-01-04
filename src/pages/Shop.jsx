import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { productsData, getProductsByCategory } from '../data/products';

const Shop = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  // Update selected category when URL parameter changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = [
    { id: 'all', name: t('shop.allCategories') },
    { id: 'newArrivals', name: t('nav.newArrivals') },
    { id: 'men', name: t('nav.men') },
    { id: 'women', name: t('nav.women') },
    { id: 'discoverySets', name: t('nav.discoverySets') },
    { id: 'unisex', name: t('footer.shop.unisex') },
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Update URL parameter
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const filteredProducts = useMemo(() => {
    // Handle special categories that don't exist in product data yet
    if (selectedCategory === 'newArrivals' || selectedCategory === 'discoverySets') {
      // For now, show all products. Later you can add these as actual categories in product data
      return productsData;
    }
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const getBadgeText = (badge) => {
    if (!badge) return null;
    const badgeMap = {
      bestseller: t('products.bestseller'),
      longLasting: t('products.longLasting'),
      soldOut: t('products.soldOut'),
    };
    return badgeMap[badge] || badge;
  };

  const getBadgeColor = (product) => {
    if (product.badgeColor) return product.badgeColor;
    if (product.badge === 'bestseller') return 'bg-acid';
    if (product.badge === 'longLasting') return 'bg-orange text-white';
    if (product.badge === 'soldOut') return 'bg-ink text-paper';
    return 'bg-acid';
  };

  const handleAddToCart = (product) => {
    if (product.available) {
      addToCart(product);
      showToast(`${product.name} ${t('common.addedToCart')}`, 'success');
    }
  };

  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full relative z-10">
        <h1 className="font-display text-4xl md:text-5xl tracking-tighter mb-8">{t('shop.title')}</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 border-b-2 border-ink/20 pb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-xl font-display text-sm border-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-ink text-acid border-ink shadow-hard'
                  : 'bg-white text-ink border-ink hover:bg-acid hover:shadow-hard-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl mb-4">{t('shop.noProducts')}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm font-bold opacity-60">
              {t('shop.showing')} {filteredProducts.length} {t('shop.results')}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className={`relative bg-white border-2 border-ink rounded-2xl aspect-square mb-4 overflow-hidden shadow-sm group-hover:shadow-hard transition-all duration-300 ${!product.available ? 'opacity-70' : ''}`}>
                    {product.badge && (
                      <div className={`absolute top-3 left-3 z-10 ${getBadgeColor(product)} border border-ink px-2 py-0.5 text-[10px] font-bold rounded uppercase`}>
                        {getBadgeText(product.badge)}
                      </div>
                    )}
                    <img
                      src={product.image}
                      className={`w-full h-full object-contain p-4 md:p-8 transition-transform duration-500 ${product.available ? 'group-hover:scale-110' : 'grayscale'}`}
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
                  <h3 className="font-display text-lg md:text-xl leading-none mb-1">{product.name}</h3>
                  <p className="text-xs md:text-sm font-medium opacity-60 mb-2">{product.notes}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base md:text-lg text-ink">฿{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs font-bold line-through opacity-40">฿{product.originalPrice}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;

