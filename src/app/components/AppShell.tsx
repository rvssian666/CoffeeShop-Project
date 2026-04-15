import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, ShoppingCart, Heart, History } from 'lucide-react';
import { CartProvider, useCart } from './CartContext';

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();

  const tabs = [
    { path: '/home', label: 'Inicio', icon: Home },
    { path: '/cart', label: 'Carrito', icon: ShoppingCart, badge: count },
    { path: '/favorites', label: 'Favoritos', icon: Heart },
    { path: '/history', label: 'Historial', icon: History },
  ];

  return (
    <nav className="flex bg-white border-t border-gray-100 shadow-[0_-1px_8px_rgba(0,0,0,0.06)]">
      {tabs.map(tab => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors relative ${
              active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              <tab.icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

function DevBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isClient = location.pathname !== '/admin' && location.pathname !== '/wireframes';
  const isAdmin = location.pathname === '/admin';
  const isWireframes = location.pathname === '/wireframes';

  return (
    <div className="w-full bg-gray-900 text-white flex items-center justify-between px-3 py-1.5 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-blue-400 text-sm">☕</span>
        <span className="text-xs font-semibold text-gray-200 hidden sm:inline">API Cafetería IES</span>
        <span className="text-xs text-gray-500 hidden md:inline">— Prototipo</span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => navigate('/')}
          className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
            isClient ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          📱 Cliente
        </button>
        <button
          onClick={() => navigate('/admin')}
          className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
            isAdmin ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          🖥️ Admin
        </button>
        <button
          onClick={() => navigate('/wireframes')}
          className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
            isWireframes ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          📐 WF
        </button>
      </div>
    </div>
  );
}

function ShellInner() {
  const location = useLocation();

  const noBottomNav = ['/', '/payment', '/confirmation', '/admin', '/wireframes'];
  const showBottomNav = !noBottomNav.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      {/* Dev navigation bar */}
      <DevBar />

      {/* Phone frame container */}
      <div className="flex-1 flex items-start justify-center sm:py-4">
        <div className="w-full sm:max-w-sm sm:rounded-[36px] sm:shadow-2xl sm:shadow-gray-400/50 overflow-hidden flex flex-col bg-white sm:h-[780px]">
          {/* Screen content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
          {/* Bottom nav */}
          {showBottomNav && <BottomNav />}
        </div>
      </div>
    </div>
  );
}

export function AppShell() {
  return (
    <CartProvider>
      <ShellInner />
    </CartProvider>
  );
}
