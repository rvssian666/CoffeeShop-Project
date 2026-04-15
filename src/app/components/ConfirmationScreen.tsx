import { useNavigate } from 'react-router';
import { QrCode, CheckCircle2, Clock, Share2 } from 'lucide-react';
import { useCart } from './CartContext';

const TIME_LABELS: Record<string, string> = {
  '0945': '09:45 — 10:00',
  '1130': '11:30 — 11:45',
  '1245': '12:45 — 13:00',
};
const RECREO_LABELS: Record<string, string> = {
  '0945': 'Recreo 1',
  '1130': 'Recreo 2',
  '1245': 'Recreo 3',
};

export function ConfirmationScreen() {
  const navigate = useNavigate();
  const { items, total, selectedTimeSlot, clearCart } = useCart();

  const orderCode = 'A7-B92';
  const orderNumber = '#10492';

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-blue-50 via-white to-white p-5">
      {/* Success header */}
      <div className="flex flex-col items-center pt-6 pb-4">
        <div className="relative mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 size={44} className="text-green-500" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
            ✓
          </div>
        </div>
        <h1 className="text-gray-900 font-extrabold text-2xl mb-1">¡Pago Completado!</h1>
        <p className="text-gray-500 text-sm">Tu pedido está siendo preparado</p>

        {selectedTimeSlot && (
          <div className="mt-3 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full">
            <Clock size={14} />
            <span className="text-sm font-semibold">Recogida: {TIME_LABELS[selectedTimeSlot]}</span>
            <span className="text-blue-200 text-xs">({RECREO_LABELS[selectedTimeSlot]})</span>
          </div>
        )}
      </div>

      {/* Digital ticket */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-5">
        {/* Ticket header */}
        <div className="bg-blue-600 text-white text-center py-4">
          <p className="text-blue-200 text-xs mb-0.5">Número de pedido</p>
          <p className="font-bold text-2xl font-mono">{orderNumber}</p>
        </div>

        {/* Perforated edge */}
        <div className="flex items-center px-0">
          <div className="w-5 h-5 bg-blue-50 rounded-full -ml-2.5 flex-shrink-0" />
          <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-0" />
          <div className="w-5 h-5 bg-blue-50 rounded-full -mr-2.5 flex-shrink-0" />
        </div>

        {/* QR + code */}
        <div className="flex flex-col items-center py-5 px-6">
          <p className="text-xs text-gray-400 mb-3 text-center">
            Muestra este código al llegar al mostrador
          </p>

          {/* QR code area */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 mb-4">
            <QrCode size={130} className="text-gray-800" />
          </div>

          {/* Alphanumeric code */}
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 mb-1">Clave alfanumérica</p>
            <div className="flex items-center gap-2">
              <p className="font-mono font-extrabold text-3xl text-gray-900 tracking-[0.2em]">{orderCode}</p>
              <button className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                <Share2 size={13} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Items list */}
          <div className="w-full border-t border-dashed border-gray-200 pt-4 space-y-2">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {item.name}
                    <span className="text-gray-400 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="text-gray-700 font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bocadillo Vegetal ×1</span>
                  <span className="text-gray-700 font-medium">2.50€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Zumo de Naranja ×1</span>
                  <span className="text-gray-700 font-medium">1.80€</span>
                </div>
              </>
            )}
            <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total pagado</span>
              <span className="font-extrabold text-blue-600 text-lg">
                {(total > 0 ? total : 4.30).toFixed(2)}€
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
        <p className="text-amber-700 text-xs text-center">
          🔔 <span className="font-semibold">Recordatorio:</span> Recibirás un aviso 5 minutos antes de tu franja de recogida.
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => { clearCart(); navigate('/home'); }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base shadow-md hover:bg-blue-700 active:scale-95 transition"
        >
          Volver al Inicio
        </button>
        <button
          onClick={() => navigate('/home')}
          className="w-full text-blue-600 font-semibold py-2 text-sm hover:text-blue-800 transition"
        >
          Ver historial de pedidos
        </button>
      </div>
    </div>
  );
}
