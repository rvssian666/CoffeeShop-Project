import { useNavigate } from 'react-router';
import { ChevronLeft, Minus, Plus, Trash2, Lock, Clock, CreditCard } from 'lucide-react';
import { useCart } from './CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const TIME_SLOTS = [
  { id: '0945', label: '09:45 — 10:00', subtitle: 'Recreo 1', available: true },
  { id: '1130', label: '11:30 — 11:45', subtitle: 'Recreo 2', available: true },
  { id: '1245', label: '12:45 — 13:00', subtitle: 'Recreo 3', available: false, reason: 'Tope de tiempo alcanzado' },
];

export function CartScreen() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, selectedTimeSlot, setSelectedTimeSlot } = useCart();

  const canProceed = items.length > 0 && selectedTimeSlot !== null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-full bg-gray-50 items-center justify-center p-8 text-center">
        <div className="text-7xl mb-5">🛒</div>
        <h2 className="text-gray-900 font-bold text-xl mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">
          Añade productos del menú para comenzar tu pre-pedido
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
        >
          Ver Menú
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-gray-900 text-lg flex-1">Mi Pedido</h1>
        <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.reduce((s, i) => s + i.quantity, 0)} items
        </span>
      </div>

      <div className="flex-1 p-4 space-y-4 pb-6">
        {/* Cart items */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-4 ${idx < items.length - 1 ? 'border-b border-gray-50' : ''}`}
            >
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-800 font-semibold text-sm leading-tight truncate">{item.name}</h3>
                <p className="text-blue-600 font-bold text-sm mt-0.5">{item.price.toFixed(2)}€</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 active:scale-90 transition"
                >
                  <Minus size={12} className="text-gray-600" />
                </button>
                <span className="text-sm font-bold text-gray-900 w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition"
                >
                  <Plus size={12} className="text-white" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center ml-1 hover:bg-red-100 active:scale-90 transition"
                >
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Time slot selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
              <Clock size={16} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-sm">Franja de recogida</h2>
              <p className="text-gray-400 text-xs">Elige cuándo recoger tu pedido</p>
            </div>
          </div>
          <div className="space-y-2">
            {TIME_SLOTS.map(slot => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                  !slot.available
                    ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    : selectedTimeSlot === slot.id
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {!slot.available ? (
                    <Lock size={14} className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      selectedTimeSlot === slot.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedTimeSlot === slot.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{slot.label}</p>
                    <p className="text-xs text-gray-400">{slot.subtitle}</p>
                  </div>
                </div>
                {!slot.available ? (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Cerrado</span>
                ) : (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedTimeSlot === slot.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-50 text-green-600'
                  }`}>
                    {selectedTimeSlot === slot.id ? 'Seleccionado ✓' : 'Disponible'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-sm mb-3">Resumen del pedido</h2>
          <div className="space-y-2 mb-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {item.name} <span className="text-gray-400">×{item.quantity}</span>
                </span>
                <span className="text-sm text-gray-700 font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="font-bold text-gray-900 text-base">Total</span>
            <span className="font-extrabold text-blue-600 text-2xl">{total.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-lg">
        <button
          disabled={!canProceed}
          onClick={() => navigate('/payment')}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            canProceed
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {!selectedTimeSlot ? (
            '⏰ Elige una franja horaria para continuar'
          ) : (
            <>
              <CreditCard size={18} />
              Proceder al pago — {total.toFixed(2)}€
            </>
          )}
        </button>
      </div>
    </div>
  );
}
