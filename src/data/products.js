// Product data structure
export const productsData = [
  {
    id: 1,
    name: 'Dior Sauvage Elixir',
    brand: 'Dior',
    notes: 'Spicy • Wood • Lavender',
    price: 690,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    ],
    badge: 'bestseller',
    badgeColor: 'bg-acid',
    available: true,
    inStock: true,
    category: 'men',
    sizes: [
      { size: '2ml', price: 250, available: true },
      { size: '5ml', price: 450, available: true },
      { size: '10ml', price: 690, available: true },
    ],
    description: 'A powerful and fresh fragrance with spicy and woody notes. Perfect for confident men who love a bold scent.',
    olfactoryNotes: ['Spicy', 'Wood', 'Lavender', 'Bergamot', 'Vanilla'],
  },
  {
    id: 2,
    name: 'YSL Y Eau de Parfum',
    brand: 'Yves Saint Laurent',
    notes: 'Fresh • Sage • Apple',
    price: 450,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
    ],
    badge: 'longLasting',
    badgeColor: 'bg-orange text-white',
    available: true,
    inStock: true,
    category: 'men',
    sizes: [
      { size: '2ml', price: 200, available: true },
      { size: '5ml', price: 350, available: true },
      { size: '10ml', price: 450, available: true },
    ],
    description: 'A fresh and modern fragrance with green apple and sage notes. Vibrant and energizing.',
    olfactoryNotes: ['Fresh', 'Sage', 'Apple', 'Ginger', 'Cedarwood'],
  },
  {
    id: 3,
    name: 'Tom Ford Lost Cherry',
    brand: 'Tom Ford',
    notes: 'Cherry • Almond • Liqueur',
    price: 890,
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
    images: [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
    ],
    badge: 'soldOut',
    badgeColor: 'bg-ink text-paper',
    available: false,
    inStock: false,
    category: 'women',
    sizes: [
      { size: '2ml', price: 350, available: false },
      { size: '5ml', price: 650, available: false },
      { size: '10ml', price: 890, available: false },
    ],
    description: 'A seductive and luxurious fragrance with cherry and almond notes. Bold and unforgettable.',
    olfactoryNotes: ['Cherry', 'Almond', 'Liqueur', 'Rose', 'Tonka Bean'],
  },
  {
    id: 4,
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    notes: 'Citrus • Amber • Wood',
    price: 550,
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
    images: [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
    ],
    available: true,
    inStock: true,
    category: 'men',
    sizes: [
      { size: '2ml', price: 250, available: true },
      { size: '5ml', price: 400, available: true },
      { size: '10ml', price: 550, available: true },
    ],
    description: 'A timeless and elegant fragrance with citrus and woody notes. Classic and sophisticated.',
    olfactoryNotes: ['Citrus', 'Amber', 'Wood', 'Grapefruit', 'Mint'],
  },
  {
    id: 5,
    name: 'Santal 33',
    brand: 'Le Labo',
    notes: 'Sandalwood • Cardamom • Leather',
    price: 9800,
    image: '/perfume4.jpg',
    images: [
      '/perfume4.jpeg',
    ],
    badge: 'bestseller',
    badgeColor: 'bg-acid',
    available: true,
    inStock: true,
    category: 'unisex',
    sizes: [
      { size: '50ml', price: 9800, available: true },
      { size: '100ml', price: 15800, available: true },
      { size: '500ml', price: 25800, available: false },
    ],
    description: 'A perfume that touches the sensual universality of this icon... that would intoxicate a man as much as a woman... that introduces our use of cardamom, iris, violet, ambrox which crackle in the formula and bring to this smoking wood alloy (Australian sandalwood, papyrus, cedarwood) some spicy, leathery, musky notes.',
    olfactoryNotes: ['Australian Sandalwood', 'Cedarwood', 'Cardamom', 'Iris', 'Violet', 'Leather'],
  },
];

export const getProductById = (id) => {
  return productsData.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return productsData;
  return productsData.filter(product => product.category === category);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return productsData
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

