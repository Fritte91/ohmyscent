import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Minus, Plus, FlaskConical } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getProductById, getRelatedProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(parseInt(id));
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      navigate('/shop');
      return;
    }
    // Set default size (first available)
    const defaultSize = product.sizes?.find(s => s.available) || product.sizes?.[0];
    if (defaultSize) {
      setSelectedSize(defaultSize);
    }
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id, product, navigate]);

  if (!product) return null;

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
    if (product.badge === 'bestseller') return 'bg-acid text-ink';
    if (product.badge === 'longLasting') return 'bg-orange text-white';
    return 'bg-acid text-ink';
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedSize.available) {
      showToast(t('products.soldOut'), 'error');
      return;
    }
    
    const productToAdd = {
      ...product,
      price: selectedSize.price,
      size: selectedSize.size,
      quantity: quantity,
    };
    
    addToCart(productToAdd);
    showToast(`${product.name} ${selectedSize.size} ${t('common.addedToCart')}`, 'success');
  };

  const adjustQuantity = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const currentPrice = selectedSize?.price || product.price;

  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Navigation />
      
      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 pb-20 w-full relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-bold opacity-60 mb-6 pt-4">
          <Link to="/" className="hover:text-acid hover:underline">{t('productDetail.breadcrumbHome')}</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-acid hover:underline">{t('productDetail.breadcrumbShop')}</Link>
          <span>/</span>
          <span className="text-ink opacity-100">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white border-2 border-ink rounded-3xl aspect-[4/5] overflow-hidden shadow-hard">
              <img
                src={product.images?.[selectedImage] || product.image}
                className="w-full h-full object-contain p-12 hover:scale-105 transition-transform duration-700"
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x1000?text=Product+Image';
                }}
              />
              <div className="absolute top-4 right-4">
                <button 
                  className="w-10 h-10 rounded-full border-2 border-ink bg-paper flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 border-ink rounded-xl bg-white aspect-square flex items-center justify-center p-2 cursor-pointer hover:bg-acid/20 transition-colors ${
                      selectedImage === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      className="object-contain h-full"
                      alt={`${product.name} view ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full">
            <div className="mb-auto">
              <div className="flex items-center gap-3 mb-2">
                {product.badge && (
                  <span className={`${getBadgeColor()} px-2 py-1 rounded text-xs font-bold border border-ink`}>
                    {getBadgeText(product.badge)}
                  </span>
                )}
                <span className="text-ink/60 font-bold text-xs uppercase tracking-wider">{product.brand}</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl text-ink mb-4 leading-none">{product.name}</h1>
              
              <div className="flex items-end gap-4 mb-6 border-b-2 border-ink/10 pb-6">
                <span className="font-display text-3xl text-ink">฿{currentPrice}</span>
                {product.inStock ? (
                  <span className="mb-1 text-sm font-bold text-green-700">
                    {t('productDetail.inStock')} • {t('productDetail.shipsFrom')}
                  </span>
                ) : (
                  <span className="mb-1 text-sm font-bold text-red-600">{t('products.soldOut')}</span>
                )}
              </div>

              <p className="text-lg leading-relaxed opacity-80 mb-8">
                {product.description}
              </p>

              {/* Variants/Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <p className="font-display text-sm mb-3">{t('productDetail.size')}</p>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        disabled={!size.available}
                        className={`flex-1 min-w-[100px] py-3 border-2 border-ink rounded-xl font-bold transition-colors ${
                          selectedSize?.size === size.size
                            ? 'bg-ink text-paper shadow-hard'
                            : size.available
                            ? 'bg-white hover:bg-acid'
                            : 'bg-white opacity-50 cursor-not-allowed relative overflow-hidden'
                        }`}
                      >
                        {size.size}
                        {!size.available && (
                          <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg] text-xs text-red-600 font-display">
                            {t('productDetail.soldOut')}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Olfactory Notes */}
              {product.olfactoryNotes && product.olfactoryNotes.length > 0 && (
                <div className="bg-white border-2 border-ink rounded-xl p-4 mb-8">
                  <h3 className="font-display text-lg mb-3 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5" />
                    {t('productDetail.olfactoryNotes')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.olfactoryNotes.map((note, index) => (
                      <span
                        key={index}
                        className="bg-paper border border-ink px-3 py-1 rounded-full text-xs font-bold"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Sticky */}
            <div className="mt-8 pt-6 border-t-2 border-ink">
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-ink rounded-xl bg-white px-2">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    className="p-3 hover:text-acid transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </button>
                  <span className="w-8 text-center font-display text-lg">{quantity}</span>
                  <button
                    onClick={() => adjustQuantity(1)}
                    className="p-3 hover:text-acid transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize?.available}
                  className="flex-1 bg-ink text-acid font-display text-xl py-4 rounded-xl border-2 border-ink shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('productDetail.addToCart')} <span className="text-sm font-sans opacity-70">| ฿{currentPrice * quantity}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t-2 border-ink bg-paper py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h3 className="font-display text-3xl mb-8">{t('productDetail.youMightAlsoLike')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group cursor-pointer"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="bg-white border-2 border-ink rounded-xl aspect-square mb-3 p-4 group-hover:shadow-hard transition-all">
                    <img
                      src={relatedProduct.image}
                      className="w-full h-full object-contain"
                      alt={relatedProduct.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                      }}
                    />
                  </div>
                  <h4 className="font-display text-sm">{relatedProduct.name}</h4>
                  <p className="font-bold text-xs opacity-60">{relatedProduct.brand}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;

