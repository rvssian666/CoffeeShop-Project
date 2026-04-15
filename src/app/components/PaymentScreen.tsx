import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from './CartContext';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Tarjeta de Crédito / Débito', icon: '💳' },
  { id: 'google', label: 'Google Pay', icon: '🔵' },
  { id: 'apple', label: 'Apple Pay', icon: '⬛' },
];

export function PaymentScreen() {
  const navigate = useNavigate();
  const { total, items, paymentMethod, setPaymentMethod, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/confirmation');
    }, 2200);
  };

  const formatCard = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 16);
    return d.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    if (d.length >= 3) return d.slice(0, 2) + '/' + d.slice(2);
    return d;
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate('/cart')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-gray-900 text-lg flex-1">Pago</h1>
        <div className="flex items-center gap-1 text-green-600">
          <ShieldCheck size={16} />
          <span className="text-xs font-medium">Seguro</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 pb-6">
        {/* Total card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-5 shadow-md">
          <p className="text-blue-200 text-xs mb-1 font-medium">Total a pagar</p>
          <p className="font-extrabold text-4xl mb-1">{total.toFixed(2)}€</p>
          <p className="text-blue-200 text-xs">
            {items.reduce((s, i) => s + i.quantity, 0)} artículos · Pago único
          </p>
        </div>

        {/* Order summary collapsed */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Resumen del pedido</p>
          <div className="space-y-1.5">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate flex-1 mr-2">{item.name} ×{item.quantity}</span>
                <span className="text-gray-700 font-medium flex-shrink-0">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-sm mb-3">Método de pago</h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                  paymentMethod === method.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-xl flex-shrink-0">{method.icon}</span>
                <span className="text-sm font-medium text-gray-700">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card form */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <h2 className="font-bold text-gray-800 text-sm">Datos de la tarjeta</h2>

            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Titular</label>
              <input
                type="text"
                placeholder="Nombre tal como aparece en la tarjeta"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300 transition"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Número de tarjeta</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3 focus-within:border-blue-400 transition">
                <CreditCard size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCard(e.target.value))}
                  className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-300"
                  inputMode="numeric"
                  maxLength={19}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">Caducidad</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300 transition"
                  inputMode="numeric"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block font-medium">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-400 text-gray-700 placeholder-gray-300 transition"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        )}

        {/* Digital wallet info */}
        {(paymentMethod === 'google' || paymentMethod === 'apple') && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-5xl mb-3">{paymentMethod === 'google' ? '🔵' : '⬛'}</div>
            <p className="text-gray-700 font-semibold mb-1">
              {paymentMethod === 'google' ? 'Google Pay' : 'Apple Pay'} listo
            </p>
            <p className="text-gray-400 text-sm">
              Confirma el pago con tu huella o PIN cuando pulses el botón de pago.
            </p>
          </div>
        )}

        {/* Security */}
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck size={14} />
          <span className="text-xs">Pago 100% seguro con cifrado SSL</span>
        </div>
      </div>

      {/* Pay button */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-lg">
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando pago...
            </>
          ) : (
            `Pagar ${total.toFixed(2)}€`
          )}
        </button>
        {processing && (
          <p className="text-center text-gray-500 text-xs mt-2">No cierres esta pantalla</p>
        )}
      </div>
    </div>
  );
}
