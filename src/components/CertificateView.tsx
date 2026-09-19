import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/audio';
import {
  Award,
  Printer,
  Share2,
  CheckCircle,
  Copy,
  Download,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface CertificateViewProps {
  onGoToCourse: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ onGoToCourse }) => {
  const { currentUser } = useAuth();
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const isGraduated = currentUser?.courseCompleted && currentUser?.certificateId;

  // Fallback defaults
  const studentName = currentUser?.name || 'Estudiante Destacado';
  const gradeName = currentUser?.grade || '6to Grado de Primaria';
  const issueDate = currentUser?.certificateDate || new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const certId = currentUser?.certificateId || 'CERT-VOLEI-PREVIEW-6TO';
  const examScore = currentUser?.examScore || 95;

  const handlePrint = () => {
    soundManager.init();
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="certificateContainer" className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6">
      {/* Non-printed Actions Header */}
      <div className="w-full no-print bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white font-display">
            {isGraduated ? 'Tu Certificado Oficial de Voleibol Escolar' : 'Certificado de Culminación (Vista Previa)'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {isGraduated ? (
            <>
              <button
                id="copyCertCodeBtn"
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
              >
                {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Código Copiado' : 'Copiar Credencial'}</span>
              </button>

              <button
                id="printCertificateBtn"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Diploma (A4 / PDF)</span>
              </button>
            </>
          ) : (
            <button
              id="unlockCertificateCourseBtn"
              onClick={onGoToCourse}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Rendir Examen para Obtener Certificado Oficial</span>
            </button>
          )}
        </div>
      </div>

      {!isGraduated && (
        <div className="no-print w-full bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Esta es una vista previa de cómo lucirá tu diploma oficial. Completa el curso o aprueba el Examen de 6to Grado para emitir tu certificado personalizado con número de serie único.
            </span>
          </div>
          <button
            onClick={onGoToCourse}
            className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0 hover:bg-amber-300 transition"
          >
            Ir al Examen
          </button>
        </div>
      )}

      {/* The Printable Certificate Diploma Card */}
      <div
        ref={certificateRef}
        id="officialDiplomaCard"
        className="certificate-print-area w-full bg-gradient-to-br from-amber-50 via-white to-amber-50 text-slate-900 rounded-3xl p-8 sm:p-14 border-[10px] border-amber-700/80 shadow-2xl relative overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(217, 119, 6, 0.1)',
        }}
      >
        {/* Ornate Inner Double Border */}
        <div className="absolute inset-3 border-2 border-amber-600/50 rounded-2xl pointer-events-none" />
        <div className="absolute inset-5 border border-amber-500/30 rounded-xl pointer-events-none" />

        {/* Decorative Watermark Volleyball Graphic */}
        <div className="absolute right-12 bottom-12 opacity-5 pointer-events-none text-9xl">
          🏐
        </div>

        {/* Diploma Header */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏅</span>
            <div className="text-center">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
                DEPARTAMENTO DE EDUCACIÓN FÍSICA Y CIENCIAS DEL DEPORTE
              </p>
              <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 tracking-wider">
                PROGRAMA ESCOLAR DE DESARROLLO ATLÉTICO - NIVEL PRIMARIA
              </p>
            </div>
            <span className="text-3xl">🏅</span>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent my-2" />

          <h1 className="text-2xl sm:text-4xl font-extrabold font-certificate text-slate-900 tracking-wider uppercase">
            Diploma de Honor y Culminación
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-amber-700 italic">
            Por excelencia académica y deportiva en la disciplina de Voleibol
          </p>
        </div>

        {/* Conferred to section */}
        <div className="relative z-10 text-center space-y-4 my-6">
          <p className="text-xs sm:text-sm font-serif text-slate-600 uppercase tracking-widest">
            Se otorga el presente reconocimiento con orgullo a:
          </p>

          <div className="py-2">
            <h2 className="text-3xl sm:text-5xl font-black text-indigo-950 font-display tracking-tight border-b-2 border-amber-600/40 inline-block px-6 pb-2">
              {studentName}
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider">
            {gradeName}
          </p>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-serif px-4">
            Por haber cursado y superado exitosamente todos los módulos formativos sobre <strong>Historia del Voleibol</strong>, <strong>Medidas Oficiales de la Cancha</strong>, <strong>Fundamentos Técnicos (Saque, Antebrazo, Voleo, Remate y Bloqueo)</strong>, <strong>Reglamento Oficial FIVB y el Jugador Líbero</strong>, demostrando un alto compromiso con el compañerismo y el <strong>Juego Limpio</strong>.
          </p>
        </div>

        {/* Score and Distinction Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 my-6">
          <div className="bg-amber-100/80 border border-amber-400 px-4 py-1.5 rounded-full text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Calificación Aprobatoria: {examScore}%</span>
          </div>

          <div className="bg-indigo-100/80 border border-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold text-indigo-950 flex items-center gap-1.5">
            <span>Mención: {examScore >= 90 ? 'Sobresaliente con Honores' : 'Aprobado con Distinción'}</span>
          </div>
        </div>

        {/* Signatures & Seal Section */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end mt-10 pt-4 border-t border-amber-600/30 text-center">
          {/* Instructor 1 */}
          <div className="space-y-1">
            <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-1 mx-4">
              Prof. Carlos Mendoza V.
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase">
              Docente de Educación Física
            </p>
            <p className="text-[9px] text-slate-500">Especialista en Iniciación Deportiva</p>
          </div>

          {/* Golden Seal */}
          <div className="flex flex-col items-center justify-center my-2 sm:my-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 border-4 border-amber-700 shadow-xl flex flex-col items-center justify-center text-slate-950 font-black relative">
              <span className="text-xl">🏆</span>
              <span className="text-[8px] tracking-tighter uppercase font-bold text-amber-950">
                OFICIAL
              </span>
              <div className="absolute -bottom-2 w-10 h-3 bg-red-700 rounded-sm shadow-md" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-3">
              FOLIO: {certId}
            </span>
          </div>

          {/* Instructor 2 */}
          <div className="space-y-1">
            <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-400 pb-1 mx-4">
              Lic. Mariana Valenzuela
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase">
              Dirección de Deportes y Recreación
            </p>
            <p className="text-[9px] text-slate-500">Coordinación de 6to de Primaria</p>
          </div>
        </div>

        {/* Date and Security Code Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 pt-6 mt-4 border-t border-amber-400/20">
          <span>Fecha de Acreditación: {issueDate}</span>
          <span className="font-mono">Certificación Digital Verificable • VoleiEdu 6to</span>
        </div>
      </div>
    </div>
  );
};
