import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Smartphone } from 'lucide-react';

// ─── Wireframe Screen Components ─────────────────────────────────────────────

function WF_Login() {
  return (
    <div className="flex flex-col h-full bg-gray-300 relative overflow-hidden p-3">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gray-400 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="w-24 h-4 bg-gray-400 rounded-full mb-1" />
        <div className="w-14 h-14 bg-gray-500 rounded-2xl mb-2" />
        <div className="w-24 h-4 bg-gray-600 rounded" />
        <div className="w-16 h-2.5 bg-gray-400 rounded mb-2" />
        <div className="w-10 h-1 bg-gray-500 rounded-full my-2" />
        <div className="w-28 h-3.5 bg-gray-600 rounded mb-1" />
        <div className="w-28 h-3.5 bg-gray-600 rounded mb-1" />
        <div className="w-32 h-2 bg-gray-400 rounded mb-1" />
        <div className="w-28 h-2 bg-gray-400 rounded" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="w-full h-9 bg-white border-2 border-gray-400 rounded-xl flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <div className="w-24 h-2 bg-gray-300 rounded" />
        </div>
        <div className="w-full h-9 bg-gray-500 rounded-xl" />
      </div>
      <div className="w-28 h-2 bg-gray-400 rounded mx-auto" />
    </div>
  );
}

function WF_Home() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white p-2 border-b border-gray-200 space-y-1.5">
        <div className="w-full h-5 bg-yellow-100 border border-yellow-300 rounded-lg" />
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-14 h-1.5 bg-gray-200 rounded" />
            <div className="w-20 h-2.5 bg-gray-400 rounded" />
          </div>
          <div className="flex gap-1">
            <div className="w-7 h-7 bg-gray-200 rounded-full" />
            <div className="w-7 h-7 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-7 bg-gray-100 border border-gray-200 rounded-lg flex items-center px-2 gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <div className="flex-1 h-1.5 bg-gray-300 rounded" />
          </div>
          <div className="w-7 h-7 bg-gray-500 rounded-lg" />
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-5 bg-yellow-50 border border-yellow-200 rounded-lg" />
          <div className="flex-1 h-5 bg-blue-50 border border-blue-200 rounded-lg" />
        </div>
        <div className="flex gap-1 overflow-hidden">
          {[1, 0, 0, 0, 0].map((active, i) => (
            <div key={i} className={`h-4 rounded-full flex-shrink-0 ${active ? 'bg-gray-500 w-10' : 'bg-white border border-gray-300 w-14'}`} />
          ))}
        </div>
      </div>
      <div className="flex-1 p-2">
        <div className="w-24 h-2 bg-gray-300 rounded mb-2" />
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <div className="h-12 bg-gray-200" />
              <div className="p-1.5 space-y-1">
                <div className="w-full h-2 bg-gray-300 rounded" />
                <div className="w-10 h-1.5 bg-gray-200 rounded" />
                <div className="flex items-center justify-between">
                  <div className="w-8 h-2 bg-gray-400 rounded" />
                  <div className="w-5 h-5 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-2 pb-2">
        <div className="w-full h-8 bg-gray-500 rounded-xl" />
      </div>
    </div>
  );
}

function WF_Cart() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white p-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
        <div className="w-16 h-3 bg-gray-400 rounded flex-1" />
        <div className="w-10 h-3 bg-gray-200 rounded" />
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {[0, 1, 2].map(i => (
            <div key={i} className={`flex items-center gap-2 p-2 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="w-20 h-2 bg-gray-300 rounded" />
                <div className="w-10 h-2 bg-blue-200 rounded" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                <div className="w-3 h-2 bg-gray-400 rounded" />
                <div className="w-5 h-5 bg-gray-400 rounded-full" />
                <div className="w-5 h-5 bg-red-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-2">
          <div className="flex items-center gap-1 mb-2">
            <div className="w-5 h-5 bg-blue-100 rounded-lg" />
            <div className="w-28 h-2 bg-gray-400 rounded" />
          </div>
          {[
            { active: true, locked: false },
            { active: false, locked: false },
            { active: false, locked: true },
          ].map((slot, i) => (
            <div key={i} className={`flex items-center justify-between p-1.5 rounded-lg border mb-1 ${slot.locked ? 'border-gray-100 bg-gray-50 opacity-50' : slot.active ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full border ${slot.locked ? 'border-gray-300 bg-gray-100' : slot.active ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`} />
                <div className="w-16 h-2 bg-gray-300 rounded" />
                <div className="w-8 h-1.5 bg-gray-200 rounded" />
              </div>
              <div className={`w-12 h-3 rounded-full ${slot.locked ? 'bg-gray-200' : slot.active ? 'bg-blue-100' : 'bg-green-100'}`} />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-2">
          <div className="w-20 h-2.5 bg-gray-400 rounded mb-2" />
          {[0, 1].map(i => (
            <div key={i} className="flex justify-between mb-1">
              <div className="w-24 h-2 bg-gray-200 rounded" />
              <div className="w-8 h-2 bg-gray-300 rounded" />
            </div>
          ))}
          <div className="border-t border-gray-100 pt-1.5 mt-1 flex justify-between items-center">
            <div className="w-10 h-2.5 bg-gray-500 rounded" />
            <div className="w-14 h-4 bg-blue-300 rounded" />
          </div>
        </div>
      </div>
      <div className="p-2 bg-white border-t border-gray-200">
        <div className="w-full h-10 bg-blue-500 rounded-xl flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-blue-300 rounded" />
          <div className="w-28 h-2.5 bg-blue-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function WF_Payment() {
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="bg-white p-2 flex items-center gap-2 border-b border-gray-200">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
        <div className="w-10 h-3 bg-gray-400 rounded flex-1" />
        <div className="w-12 h-3 bg-green-200 rounded" />
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-hidden">
        <div className="bg-blue-500 rounded-xl p-3 space-y-1.5">
          <div className="w-16 h-1.5 bg-blue-300 rounded" />
          <div className="w-20 h-6 bg-blue-300 rounded" />
          <div className="w-24 h-1.5 bg-blue-300 rounded" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-2">
          <div className="w-20 h-2 bg-gray-300 rounded mb-2" />
          {[0, 1, 2].map(i => (
            <div key={i} className="flex justify-between mb-1">
              <div className="w-20 h-1.5 bg-gray-200 rounded" />
              <div className="w-8 h-1.5 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-2">
          <div className="w-24 h-2.5 bg-gray-400 rounded mb-2" />
          {[true, false, false].map((active, i) => (
            <div key={i} className={`flex items-center gap-2 p-1.5 rounded-lg border mb-1 ${active ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
              <div className={`w-3.5 h-3.5 rounded-full border-2 ${active ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`} />
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <div className="w-24 h-1.5 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-2 space-y-1.5">
          <div className="w-16 h-2.5 bg-gray-400 rounded" />
          <div className="h-6 bg-gray-100 border border-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-100 border border-gray-200 rounded-lg" />
          <div className="grid grid-cols-2 gap-1.5">
            <div className="h-6 bg-gray-100 border border-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-100 border border-gray-200 rounded-lg" />
          </div>
        </div>
        <div className="w-32 h-2 bg-gray-200 rounded mx-auto" />
      </div>
      <div className="p-2 bg-white border-t border-gray-200">
        <div className="w-full h-10 bg-blue-500 rounded-xl" />
      </div>
    </div>
  );
}

function WF_Confirmation() {
  return (
    <div className="flex flex-col h-full bg-gray-100 items-center pt-4 px-3">
      <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center mb-2">
        <div className="w-8 h-8 bg-green-400 rounded-full" />
      </div>
      <div className="w-28 h-3.5 bg-gray-500 rounded mb-1" />
      <div className="w-36 h-2 bg-gray-300 rounded mb-2" />
      <div className="w-full h-6 bg-blue-200 rounded-full mb-3" />
      <div className="w-full bg-white rounded-2xl shadow overflow-hidden mb-3">
        <div className="bg-blue-500 h-10 flex flex-col items-center justify-center gap-0.5">
          <div className="w-8 h-1 bg-blue-300 rounded" />
          <div className="w-14 h-3 bg-blue-200 rounded" />
        </div>
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 bg-gray-100 rounded-full -ml-1.5" />
          <div className="flex-1 border-t border-dashed border-gray-300 my-2" />
          <div className="w-3 h-3 bg-gray-100 rounded-full -mr-1.5" />
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="w-20 h-20 bg-gray-200 border-2 border-gray-400 rounded-xl mb-2" />
          <div className="w-16 h-2 bg-gray-300 rounded mb-1" />
          <div className="w-20 h-5 bg-gray-500 rounded mb-2" />
          <div className="w-full bg-blue-100 rounded-lg h-6 mb-2" />
          <div className="w-full border-t border-gray-100 pt-2 space-y-1">
            {[0, 1].map(i => (
              <div key={i} className="flex justify-between">
                <div className="w-24 h-1.5 bg-gray-200 rounded" />
                <div className="w-8 h-1.5 bg-gray-300 rounded" />
              </div>
            ))}
            <div className="flex justify-between pt-1 border-t border-gray-100">
              <div className="w-10 h-2.5 bg-gray-500 rounded" />
              <div className="w-14 h-3 bg-blue-300 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full space-y-1.5">
        <div className="w-full h-9 bg-blue-500 rounded-xl" />
        <div className="w-full h-6 border border-blue-300 rounded-xl" />
      </div>
    </div>
  );
}

function WF_Admin() {
  return (
    <div className="flex flex-col h-full bg-gray-200">
      <div className="bg-gray-800 p-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-16 h-1.5 bg-gray-500 rounded" />
            <div className="w-24 h-3 bg-gray-300 rounded" />
          </div>
          <div className="text-right space-y-1">
            <div className="w-8 h-1.5 bg-gray-500 rounded ml-auto" />
            <div className="w-12 h-5 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
            <div className="w-24 h-2 bg-gray-400 rounded" />
          </div>
          <div className="w-12 h-5 bg-red-500 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {[
          { bg: 'bg-amber-200', border: 'border-amber-300' },
          { bg: 'bg-green-200', border: 'border-green-300' },
          { bg: 'bg-red-200', border: 'border-red-300' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-xl p-2 text-center`}>
            <div className="w-8 h-4 bg-white/50 rounded mx-auto mb-1" />
            <div className="w-full h-1.5 bg-white/50 rounded" />
          </div>
        ))}
      </div>
      <div className="mx-2 mb-2 bg-white rounded-xl p-1 flex gap-0.5">
        <div className="flex-1 h-5 bg-blue-500 rounded-lg" />
        <div className="flex-1 h-5 bg-gray-100 rounded-lg" />
      </div>
      <div className="px-2 space-y-1.5">
        <div className="w-32 h-1.5 bg-gray-400 rounded" />
        {[{ paid: true }, { paid: true }, { paid: false }].map((o, i) => (
          <div key={i} className="bg-white rounded-xl p-2 border border-gray-200">
            <div className="flex justify-between items-center mb-1.5">
              <div className="w-14 h-3 bg-gray-500 rounded" />
              <div className={`w-12 h-3 rounded-full border ${o.paid ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`} />
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mb-1.5" />
            <div className={`w-full h-6 rounded-lg ${o.paid ? 'bg-green-400' : 'bg-gray-200'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Phone Mockup Wrapper ─────────────────────────────────────────────────────

interface PhoneFrameProps {
  screenNumber: number;
  title: string;
  description: string;
  role?: 'client' | 'admin';
  children: React.ReactNode;
}

function PhoneFrame({ screenNumber, title, description, role = 'client', children }: PhoneFrameProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-3">
        <span className={`inline-flex items-center justify-center w-8 h-8 text-white text-xs font-bold rounded-full mb-2 ${role === 'admin' ? 'bg-orange-500' : 'bg-blue-600'}`}>
          {screenNumber}
        </span>
        <h3 className="text-gray-800 font-bold text-sm">{title}</h3>
        <p className="text-gray-400 text-xs mt-0.5 max-w-[160px]">{description}</p>
      </div>
      <div className="bg-gray-800 rounded-[28px] p-2 shadow-2xl">
        <div className="w-14 h-1 bg-gray-700 rounded-full mx-auto mb-1.5" />
        <div className="bg-white rounded-[20px] overflow-hidden" style={{ width: 180, height: 360 }}>
          {children}
        </div>
        <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mt-1.5" />
      </div>
      <div className="mt-3 text-gray-400 text-xs text-center opacity-70">↑ Wireframe</div>
    </div>
  );
}

// ─── Client Screens Data ──────────────────────────────────────────────────────

const CLIENT_SCREENS = [
  { num: 1, title: 'Login', desc: 'Identificación con Google o correo IES' },
  { num: 2, title: 'Catálogo', desc: 'Menú, búsqueda, filtros y favoritos' },
  { num: 3, title: 'Carrito + Horario', desc: 'Pedido y selección de franja horaria' },
  { num: 4, title: 'Pago', desc: 'Pasarela de pago digital segura' },
  { num: 5, title: 'Confirmación + QR', desc: 'Ticket digital y código de recogida' },
];

const WF_SCREENS = [WF_Login, WF_Home, WF_Cart, WF_Payment, WF_Confirmation];

// ─── Main Wireframes View ─────────────────────────────────────────────────────

export function WireframesView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ArrowLeft size={16} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-gray-900 font-extrabold text-xl leading-tight">
                Wireframes — App Cafetería IES
              </h1>
              <p className="text-gray-500 text-xs">Estructura visual · Enfoque Mobile First</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <Smartphone size={12} />
              Mobile First
            </span>
            <span className="hidden sm:inline-flex bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              📐 6 Pantallas
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* ── Cliente section ─────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gray-200" />
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-lg">📱</span>
              <span className="text-sm font-bold text-gray-700">Vista Cliente — Alumnos y Personal</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 justify-items-center">
            {CLIENT_SCREENS.map((screen, idx) => {
              const WFScreen = WF_SCREENS[idx];
              return (
                <PhoneFrame
                  key={screen.num}
                  screenNumber={screen.num}
                  title={screen.title}
                  description={screen.desc}
                >
                  <WFScreen />
                </PhoneFrame>
              );
            })}
          </div>

          {/* Flow journey */}
          <div className="mt-8 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-gray-700 font-bold text-sm mb-4">🗺️ Flujo de Compra (Journey)</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: '1. Login', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                { label: '→', color: '' },
                { label: '2. Ver Menú', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                { label: '→', color: '' },
                { label: '3. Carrito + Horario', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                { label: '→', color: '' },
                { label: '4. Pago', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                { label: '→', color: '' },
                { label: '5. QR Recogida', color: 'bg-green-100 text-green-700 border-green-300' },
              ].map((step, i) => (
                step.label === '→'
                  ? <span key={i} className="text-gray-400 font-bold text-lg">→</span>
                  : <span key={i} className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${step.color}`}>{step.label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Admin section ────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gray-200" />
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-lg">🖥️</span>
              <span className="text-sm font-bold text-gray-700">Vista Administrador — Personal de Cafetería</span>
            </div>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="flex justify-center">
            <PhoneFrame
              screenNumber={6}
              title="Panel Operativo"
              description="Gestión de pedidos, escáner QR y entregas"
              role="admin"
            >
              <WF_Admin />
            </PhoneFrame>
          </div>
        </section>

        {/* ── Design notes ─────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="font-extrabold text-gray-800 text-lg mb-5">📋 Notas del Diseño — API Cafetería IES</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1.5">
                <span className="text-blue-500">👤</span> Perfiles de Usuario
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">◉</span>
                  <span><strong>Alumno/Cliente:</strong> Explora el catálogo y realiza pre-pedidos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">◉</span>
                  <span><strong>Admin Cafetería:</strong> Gestiona pedidos, escanea QR y verifica pagos.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1.5">
                <span className="text-green-500">🕐</span> Gestión de Tiempos
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2"><span>•</span><span>Franjas horarias por recreo (09:45, 11:30, 12:45)</span></li>
                <li className="flex items-start gap-2"><span>•</span><span>Bloqueo automático de pedidos fuera de hora</span></li>
                <li className="flex items-start gap-2"><span>•</span><span>Notificaciones push 5 min antes de la recogida</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1.5">
                <span className="text-purple-500">💡</span> Funcionalidades Clave
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2"><span>⭐</span><span>Sistema de favoritos y repetir pedido</span></li>
                <li className="flex items-start gap-2"><span>🔍</span><span>Búsqueda y filtros por categoría</span></li>
                <li className="flex items-start gap-2"><span>📱</span><span>Código QR + clave alfanumérica de recogida</span></li>
                <li className="flex items-start gap-2"><span>💳</span><span>Pasarela de pago (Tarjeta, Google Pay, Apple Pay)</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
