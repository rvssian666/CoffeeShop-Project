import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Bell, Filter, Star, RotateCcw, Heart, Plus, Minus, Leaf, X, ShoppingBag } from 'lucide-react';
import { useCart, PRODUCTS, Product } from './CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const CATEGORIES = [
  { id: 'all', label: 'Todo', emoji: '🍽️' },
  { id: 'bocadillos', label: 'Bocadillos', emoji: '🥪' },
  { id: 'saludable', label: 'Saludable', emoji: '🥗' },
  { id: 'bebidas', label: 'Bebidas', emoji: '☕' },
  { id: 'bolleria', label: 'Bollería', emoji: '🥐' },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const { addItem, updateQuantity, items, count, favorites, toggleFavorite } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showNotif, setShowNotif] = useState(true);

  const getItemQty = (id: number) => items.find(i => i.id === id)?.quantity ?? 0;

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="flex flex-col bg-gray-50 min-h-full pb-20">
      {/* Sticky header */}
      <div className="bg-white px-4 pt-4 pb-2 sticky top-0 z-20 shadow-sm">
        {/* Notification banner */}
        {showNotif && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-3 flex items-start justify-between gap-2">
            <p className="text-xs text-amber-700 leading-snug">
              <span className="font-semibold">⚠️ Aviso:</span> La cafetería cerrará la recepción de pedidos del Recreo 1 en 10 minutos.
            </p>
            <button onClick={() => setShowNotif(false)} className="flex-shrink-0 mt-0.5">
              <X size={13} className="text-amber-500" />
            </button>
          </div>
        )}

        {/* User header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400">Buenos días 👋</p>
            <h1 className="text-gray-900 font-bold text-lg leading-tight">Hola, Ana</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              AG
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Buscar bocadillos, bebidas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 min-w-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={13} className="text-gray-400" />
              </button>
            )}
          </div>
          <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <Filter size={16} className="text-white" />
          </button>
        </div>

        {/* Quick access */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl py-2 px-3 hover:bg-amber-100 active:scale-95 transition"
          >
            <Star size={13} className="text-amber-500" />
            <span className="text-xs font-semibold text-amber-700">Mis Favoritos</span>
          </button>
          <button
            onClick={() => {
              addItem(PRODUCTS[0]);
              addItem(PRODUCTS[6]);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 rounded-xl py-2 px-3 hover:bg-blue-100 active:scale-95 transition"
          >
            <RotateCcw size={13} className="text-blue-500" />
            <span className="text-xs font-semibold text-blue-700">Repetir Pedido</span>
          </button>
        </div>

        {/* Categories */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="p-4">
        <p className="text-gray-500 text-xs font-medium mb-3">
          {filteredProducts.length} productos disponibles
        </p>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-gray-500 text-sm">No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => {
              const qty = getItemQty(product.id);
              const isFav = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-28 object-cover cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                    {product.healthy && (
                      <div className="absolute top-2 left-2 bg-green-500 rounded-full p-1 shadow-sm">
                        <Leaf size={9} className="text-white" />
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm hover:scale-110 transition active:scale-95"
                    >
                      <Heart
                        size={12}
                        className={isFav ? 'text-red-500 fill-red-500' : 'text-gray-300'}
                      />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <h3
                      className="text-gray-800 text-xs font-semibold leading-tight mb-0.5 truncate cursor-pointer hover:text-blue-600"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2">{product.calories} kcal</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-sm">{product.price.toFixed(2)}€</span>
                      {qty === 0 ? (
                        <button
                          onClick={() => addItem(product)}
                          className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:bg-blue-700 active:scale-90 transition"
                        >
                          <Plus size={14} />
                        </button>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-200 active:scale-90 transition"
                          >
                            <Minus size={11} className="text-gray-600" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 w-4 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-700 active:scale-90 transition"
                          >
                            <Plus size={11} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating cart button */}
      {count > 0 && (
        <div className="fixed bottom-16 left-0 right-0 px-4 z-30 max-w-sm mx-auto md:relative md:bottom-auto md:mt-2 md:mb-4">
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-between px-5 shadow-xl hover:bg-blue-700 active:scale-95 transition-all"
          >
            <span className="bg-blue-500 rounded-lg px-2 py-0.5 text-sm font-bold min-w-[24px] text-center">
              {count}
            </span>
            <span className="font-semibold flex items-center gap-2">
              <ShoppingBag size={16} />
              Ver mi pedido
            </span>
            <span className="font-bold">{cartTotal.toFixed(2)}€</span>
          </button>
        </div>
      )}

      {/* Product detail bottom sheet */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto max-w-sm mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <ImageWithFallback
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-gray-900 font-bold text-xl flex-1 mr-2">{selectedProduct.name}</h3>
              <span className="text-blue-600 font-bold text-xl">{selectedProduct.price.toFixed(2)}€</span>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{selectedProduct.description}</p>
            <div className="mb-3">
              <p className="text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Ingredientes</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.ingredients.map(ing => (
                  <span key={ing} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{ing}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                {selectedProduct.calories} kcal
              </span>
              {selectedProduct.healthy && (
                <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <Leaf size={10} /> Saludable
                </span>
              )}
            </div>
            <button
              onClick={() => { addItem(selectedProduct); setSelectedProduct(null); }}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base hover:bg-blue-700 active:scale-95 transition-all shadow-md"
            >
              Añadir al pedido — {selectedProduct.price.toFixed(2)}€
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
