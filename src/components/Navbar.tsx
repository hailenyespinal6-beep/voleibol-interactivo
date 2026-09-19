import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Gamepad2,
  BookOpen,
  Award,
  User,
  LogIn,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'game' | 'course' | 'certificate';
  setActiveTab: (tab: 'game' | 'course' | 'certificate') => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenProfile,
}) => {
  const { currentUser } = useAuth();

  return (
    <nav id="mainNavigation" className="no-print w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('game')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center text-xl shadow-lg cursor-pointer transform hover:rotate-6 transition"
          >
            🏐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
                VoleiEdu <span className="text-amber-400">6to</span>
              </h1>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                PRIMARIA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Juego a 10 Puntos • Curso Oficial • Certificado de Culminación
            </p>
          </div>
        </div>

        {/* Central Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            id="navGameTabBtn"
            onClick={() => setActiveTab('game')}
            className={`py-1.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'game'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Juego (10 Pts)</span>
          </button>

          <button
            id="navCourseTabBtn"
            onClick={() => setActiveTab('course')}
            className={`py-1.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'course'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curso de Voleibol</span>
          </button>

          <button
            id="navCertTabBtn"
            onClick={() => setActiveTab('certificate')}
            className={`py-1.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certificado</span>
            {currentUser?.courseCompleted && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Right Student Account / Auth Widget */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <button
              id="studentProfileTriggerBtn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 p-1.5 pr-3 rounded-2xl transition"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-xs font-black">
                {currentUser.avatar?.slice(0, 2) || '🏐'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-bold text-white block line-clamp-1">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-amber-300 flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5" />
                  {currentUser.totalPoints || 0} pts
                </span>
              </div>
            </button>
          ) : (
            <button
              id="loginStudentTriggerBtn"
              onClick={onOpenAuth}
              className="py-1.5 px-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Ingresar con Correo</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
