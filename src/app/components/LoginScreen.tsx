import { useNavigate } from 'react-router';
import { GraduationCap, Coffee } from 'lucide-react';

export function LoginScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />

      {/* Top logo area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        {/* IES badge */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 mb-8 flex items-center gap-2">
          <GraduationCap size={16} className="text-blue-200" />
          <span className="text-blue-100 text-sm font-medium">IES Pío Baroja</span>
        </div>

        {/* App icon */}
        <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6">
          <Coffee size={44} className="text-blue-600" />
        </div>

        <h1 className="text-white font-extrabold text-3xl mb-2 leading-tight">
          API Cafetería
        </h1>
        <p className="text-blue-200 text-sm mb-2">Plataforma de Pre-pedidos</p>

        <div className="w-12 h-1 bg-blue-400 rounded-full my-6" />

        <h2 className="text-white font-bold text-2xl mb-3 leading-snug">
          ¡Pide tu desayuno<br />sin hacer fila!
        </h2>
        <p className="text-blue-200 text-sm max-w-xs leading-relaxed">
          Pre-pide tu menú, elige tu franja horaria y recoge tu pedido sin esperar en colas.
        </p>
      </div>

      {/* Login buttons */}
      <div className="px-6 pb-10 space-y-3 relative z-10">
        {/* Google login */}
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Iniciar sesión con Google
        </button>

        {/* Email login */}
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-blue-900/60 backdrop-blur-sm border border-blue-400/30 text-white font-medium py-4 px-6 rounded-2xl hover:bg-blue-900/80 active:scale-95 transition-all duration-200"
        >
          Usar correo del IES
        </button>

        <p className="text-blue-300 text-xs text-center pt-2">
          🔒 Acceso exclusivo para alumnos y personal del IES Pío Baroja
        </p>
      </div>
    </div>
  );
}
