import { useState, useEffect } from 'react';
import { Camera, CheckCircle2, Search, Package, Clock, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';

interface Order {
  id: string;
  code: string;
  items: string;
  status: 'pending' | 'delivered';
  paid: boolean;
  timeSlot: string;
  name: string;
}

const INITIAL_ORDERS: Order[] = [
  { id: '1', code: 'A7-B92', items: '1× Bocadillo Vegetal, 1× Zumo Naranja', status: 'pending', paid: true, timeSlot: '11:30', name: 'Ana García' },
  { id: '2', code: 'C4-X11', items: '2× Café con Leche, 2× Tostada AOVE', status: 'pending', paid: true, timeSlot: '11:30', name: 'Carlos Martínez' },
  { id: '3', code: 'F8-M33', items: '1× Ensalada Mixta, 1× Agua Mineral', status: 'pending', paid: true, timeSlot: '11:30', name: 'María López' },
  { id: '4', code: 'K2-P07', items: '3× Croissant, 1× Zumo Naranja', status: 'pending', paid: false, timeSlot: '11:30', name: 'Pedro Sánchez' },
  { id: '5', code: 'R9-T45', items: '1× Bocadillo Jamón York, 1× Café con Leche', status: 'pending', paid: true, timeSlot: '11:30', name: 'Lucía Fernández' },
];

export function AdminScreen() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<Order | null | 'not-found'>( null);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'queue' | 'scanner'>('queue');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  const markDelivered = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    if (scanResult && typeof scanResult !== 'string' && scanResult.id === id) {
      setScanResult(null);
      setManualCode('');
    }
  };

  const handleSearch = () => {
    if (!manualCode.trim()) return;
    const found = orders.find(o => o.code.toLowerCase() === manualCode.trim().toLowerCase());
    setScanResult(found || 'not-found');
  };

  const timeStr = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col min-h-full bg-gray-100">
      {/* Admin header */}
      <div className="bg-gray-900 text-white px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-xs font-medium">Panel Operativo</p>
            <h1 className="font-bold text-lg text-white">Cafetería IES</h1>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Hora actual</p>
            <p className="font-mono font-bold text-2xl text-white">{timeStr}</p>
          </div>
        </div>

        {/* Status card */}
        <div className={`rounded-2xl p-3 flex items-center justify-between border ${isOpen ? 'bg-green-900/30 border-green-700/40' : 'bg-red-900/30 border-red-700/40'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <div>
              <p className={`text-sm font-bold ${isOpen ? 'text-green-300' : 'text-red-300'}`}>
                {isOpen ? 'Aceptando pedidos' : 'Cafetería cerrada'}
              </p>
              <p className="text-gray-500 text-xs">Franja activa: 11:30 — 11:45</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${isOpen ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {isOpen ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
            {isOpen ? 'Cerrar' : 'Abrir'}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 p-4 pb-0">
        {[
          { label: 'Pendientes', value: pendingOrders.length, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Entregados', value: deliveredOrders.length, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
          { label: 'Sin pagar', value: orders.filter(o => !o.paid && o.status === 'pending').length, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-3 text-center`}>
            <p className={`font-extrabold text-2xl ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-3 mb-3 flex bg-white rounded-2xl p-1 shadow-sm border border-gray-200">
        {[
          { id: 'queue', label: '📋 Cola de Pedidos' },
          { id: 'scanner', label: '📷 Escáner' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'queue' | 'scanner')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Queue tab */}
      {activeTab === 'queue' && (
        <div className="px-4 pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pedidos para 11:30 — 11:45
            </p>
          </div>

          {pendingOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-gray-900 text-base">{order.code}</span>
                  <span className="text-xs text-gray-400">— {order.name}</span>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  order.paid
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${order.paid ? 'bg-green-500' : 'bg-red-500'}`} />
                  {order.paid ? 'PAGADO' : 'SIN PAGAR'}
                </div>
              </div>

              <div className="flex items-start gap-2 mb-3">
                <Package size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 text-sm leading-snug">{order.items}</p>
              </div>

              {!order.paid && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-2 mb-3">
                  <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
                  <p className="text-amber-700 text-xs">Este pedido no está pagado. No entregar.</p>
                </div>
              )}

              <button
                onClick={() => markDelivered(order.id)}
                disabled={!order.paid}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  order.paid
                    ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={15} />
                Marcar como Entregado
              </button>
            </div>
          ))}

          {pendingOrders.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <CheckCircle2 size={44} className="text-green-400 mx-auto mb-3" />
              <p className="text-gray-700 font-bold text-base">¡Todo entregado!</p>
              <p className="text-gray-400 text-sm mt-1">No hay pedidos pendientes en esta franja</p>
            </div>
          )}

          {deliveredOrders.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">
                ✓ Entregados ({deliveredOrders.length})
              </p>
              {deliveredOrders.map(order => (
                <div key={order.id} className="bg-gray-50 rounded-2xl p-3 border border-gray-100 opacity-70">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-gray-500 text-sm">{order.code}</span>
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      ✓ Entregado
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{order.name} · {order.items}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Scanner tab */}
      {activeTab === 'scanner' && (
        <div className="px-4 pb-6 space-y-4">
          {/* Camera viewfinder */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden relative" style={{ aspectRatio: '1 / 1', maxHeight: 280 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 relative">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
                {/* Scan line animation */}
                <div
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 opacity-80"
                  style={{
                    animation: 'scanLine 2s ease-in-out infinite',
                    top: '50%',
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-3 inset-x-0 flex justify-center">
              <div className="flex items-center gap-2 bg-black/60 rounded-full px-3 py-1.5">
                <Camera size={13} className="text-white" />
                <span className="text-white text-xs">Apunta al código QR del alumno</span>
              </div>
            </div>
          </div>

          <style>{`@keyframes scanLine { 0%, 100% { top: 10%; } 50% { top: 90%; } }`}</style>

          {/* Manual code input */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Introducir código manualmente</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: A7-B92"
                value={manualCode}
                onChange={e => { setManualCode(e.target.value.toUpperCase()); setScanResult(null); }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm font-mono uppercase outline-none focus:border-blue-400 text-gray-800 placeholder-gray-300 transition"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 active:scale-95 transition flex items-center justify-center"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Not found */}
            {scanResult === 'not-found' && (
              <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">Código no encontrado</p>
              </div>
            )}

            {/* Found order */}
            {scanResult && scanResult !== 'not-found' && (
              <div className={`mt-3 rounded-xl p-4 border ${scanResult.paid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-extrabold text-gray-900 text-lg">{scanResult.code}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    scanResult.paid
                      ? 'bg-green-100 text-green-700 border-green-300'
                      : 'bg-red-100 text-red-700 border-red-300'
                  }`}>
                    {scanResult.paid ? 'PAGADO ✓' : 'SIN PAGAR ✗'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{scanResult.name}</p>
                <p className="text-sm text-gray-700 mb-3">{scanResult.items}</p>

                {!scanResult.paid && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                    <AlertTriangle size={13} className="text-amber-500" />
                    <p className="text-amber-700 text-xs">No entregar — pedido sin pagar</p>
                  </div>
                )}

                {scanResult.status === 'delivered' ? (
                  <div className="flex items-center justify-center gap-2 py-2 text-green-600 font-semibold text-sm">
                    <CheckCircle2 size={16} />
                    Ya fue entregado
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (scanResult && typeof scanResult !== 'string') {
                        markDelivered(scanResult.id);
                      }
                    }}
                    disabled={!scanResult.paid}
                    className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition ${
                      scanResult.paid
                        ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    Marcar como Entregado
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Notifications sample */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Notificaciones Push Enviadas</p>
            <div className="flex items-start gap-2">
              <span className="text-base flex-shrink-0">🔔</span>
              <p className="text-xs text-blue-700">"Tu franja de recogida empieza en 5 minutos. ¡Tu pedido te espera!"</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-base flex-shrink-0">⚠️</span>
              <p className="text-xs text-blue-700">"La cafetería cerrará la recepción de pedidos del Recreo 1 en 10 minutos."</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
