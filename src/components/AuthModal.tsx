import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, X, Award, Shield, CheckCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_CHOICES = [
  { id: '🏐 Rematador', label: 'Rematador', icon: '⚡' },
  { id: '⭐ Armadora', label: 'Armadora', icon: '⭐' },
  { id: '🛡️ Líbero', label: 'Líbero Ágil', icon: '🛡️' },
  { id: '👑 Capitán', label: 'Capitán de Equipo', icon: '👑' },
  { id: '🎯 Bloqueador', label: 'Bloqueador', icon: '🎯' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, quickLoginAsGuest } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('6to Grado de Primaria');
  const [avatar, setAvatar] = useState(AVATAR_CHOICES[0].id);

  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const result = login(email, password);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onClose();
      }, 800);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const result = register(name, email, password, grade, avatar);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTimeout(() => {
        onClose();
      }, 900);
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  };

  const handleQuickDemo = () => {
    quickLoginAsGuest();
    setMessage({ type: 'success', text: '¡Ingresaste con la cuenta de prueba de 6to Grado!' });
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div id="authModalBackdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div id="authModalCard" className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          id="authModalCloseBtn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-amber-900/40 p-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl font-black">
              🏐
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-display">Portal de Estudiantes</h2>
              <p className="text-xs text-amber-300/90 font-medium">Educación Física y Voleibol - 6to Grado</p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-2xl mt-4 border border-slate-800">
            <button
              id="tabLoginBtn"
              type="button"
              onClick={() => { setTab('login'); setMessage(null); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                tab === 'login'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </button>
            <button
              id="tabRegisterBtn"
              type="button"
              onClick={() => { setTab('register'); setMessage(null); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                tab === 'register'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrarse</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {message && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-300'
                  : 'bg-rose-500/20 border border-rose-500/60 text-rose-300'
              }`}
            >
              {message.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <Shield className="w-4 h-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          {tab === 'login' ? (
            <form id="loginForm" onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Correo Electrónico Escolar o Personal
                </label>
                <input
                  id="loginEmailInput"
                  type="email"
                  required
                  placeholder="ejemplo.alumno@colegio.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Contraseña
                </label>
                <input
                  id="loginPasswordInput"
                  type="password"
                  required
                  placeholder="Tu clave secreta"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <button
                id="submitLoginBtn"
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg transition active:scale-98"
              >
                Entrar a Mi Cuenta
              </button>
            </form>
          ) : (
            <form id="registerForm" onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre Completo del Estudiante
                </label>
                <input
                  id="regNameInput"
                  type="text"
                  required
                  placeholder="Ej: Sofia Ramírez Castro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                />
                <p className="text-[11px] text-slate-400 mt-0.5">Aparecerá en tu Certificado Oficial de Culminación.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Correo
                  </label>
                  <input
                    id="regEmailInput"
                    type="email"
                    required
                    placeholder="alumno@colegio.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contraseña
                  </label>
                  <input
                    id="regPassInput"
                    type="password"
                    required
                    placeholder="Mínimo 4 letras"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Grado Escolar
                </label>
                <select
                  id="regGradeSelect"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                >
                  <option value="6to Grado de Primaria">6to Grado de Primaria (General)</option>
                  <option value="6to Grado A - Primaria">6to Grado A - Primaria</option>
                  <option value="6to Grado B - Primaria">6to Grado B - Primaria</option>
                  <option value="6to Grado C - Primaria">6to Grado C - Primaria</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Elige tu Rol / Avatar Deportivo
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVATAR_CHOICES.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatar(av.id)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition flex flex-col items-center gap-1 ${
                        avatar === av.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{av.icon}</span>
                      <span className="text-[11px] truncate w-full">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="submitRegisterBtn"
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-sm shadow-lg transition active:scale-98"
              >
                Crear Mi Cuenta de Voleibol
              </button>
            </form>
          )}

          {/* Quick Demo Option for convenience */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              id="quickGuestLoginBtn"
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Entrar rápido como Estudiante de Prueba (6to A)</span>
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-950/90 px-6 py-3 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Tus certificados y puntuaciones se guardan en tu perfil escolar.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
