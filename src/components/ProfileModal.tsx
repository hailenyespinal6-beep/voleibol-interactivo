import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  User,
  Award,
  Trophy,
  BookOpen,
  LogOut,
  Mail,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificate: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenCertificate }) => {
  const { currentUser, logout } = useAuth();

  if (!isOpen || !currentUser) return null;

  return (
    <div id="profileModalBackdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div id="profileModalCard" className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden relative">
        <button
          id="closeProfileModalBtn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with avatar */}
        <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-amber-900/40 p-6 pb-5 border-b border-slate-800 text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-400/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-lg mb-3">
            {currentUser.avatar?.slice(0, 2) || '🏐'}
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {currentUser.name}
          </h3>
          <p className="text-xs text-amber-300 font-semibold mt-0.5">
            {currentUser.grade || '6to Grado de Primaria'}
          </p>
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{currentUser.email}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-xl font-black text-amber-400 block">{currentUser.totalPoints || 0}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Puntos Totales</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-xl font-black text-cyan-400 block">{currentUser.matchesWon || 0}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Partidos Ganados</span>
            </div>
            <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className="text-xl font-black text-emerald-400 block">
                {currentUser.completedLessons?.length || 0}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Lecciones Vistas</span>
            </div>
          </div>

          {/* Certificate status */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Estado del Certificado</span>
                <span className="text-[11px] text-slate-400">
                  {currentUser.courseCompleted ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Acreditado ({currentUser.examScore}%)
                    </span>
                  ) : (
                    'Pendiente de aprobar el examen'
                  )}
                </span>
              </div>
            </div>

            {currentUser.courseCompleted && (
              <button
                id="profileModalViewCertBtn"
                onClick={() => {
                  onClose();
                  onOpenCertificate();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition"
              >
                Ver
              </button>
            )}
          </div>

          {/* Logout Button */}
          <button
            id="logoutStudentBtn"
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
