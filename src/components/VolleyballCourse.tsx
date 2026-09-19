import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/audio';
import { VOLLEYBALL_COURSE_MODULES, GRADUATION_EXAM_QUESTIONS } from '../data/volleyballData';
import { CourseLesson, VolleyballQuestion } from '../types';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  HelpCircle,
  FileCheck,
  Zap,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface VolleyballCourseProps {
  onViewCertificate: () => void;
}

export const VolleyballCourse: React.FC<VolleyballCourseProps> = ({ onViewCertificate }) => {
  const { currentUser, markLessonCompleted, awardCertificate } = useAuth();

  // Selected module / lesson
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson>(
    VOLLEYBALL_COURSE_MODULES[0].lessons[0]
  );

  // Mini quiz state for lesson
  const [lessonQuizAnswer, setLessonQuizAnswer] = useState<number | null>(null);
  const [lessonQuizSubmitted, setLessonQuizSubmitted] = useState<boolean>(false);

  // Exam mode state
  const [isTakingExam, setIsTakingExam] = useState<boolean>(false);
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<{ [key: number]: number }>({});
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examScorePercentage, setExamScorePercentage] = useState<number>(0);

  // Interactive Court Position Inspector for Module 2
  const [inspectPosition, setInspectPosition] = useState<number>(1);

  const COURT_POSITIONS = [
    { pos: 4, name: 'Posición 4: Delantero Izquierdo', role: 'Rematador de Punta / Atacante Exterior', desc: 'Ataca con remates altos por la banda izquierda y ayuda en el bloqueo.' },
    { pos: 3, name: 'Posición 3: Delantero Centro', role: 'Central / Bloqueador Principal', desc: 'Es el jugador más alto, ataca balones rápidos y forma el muro del bloqueo en la red.' },
    { pos: 2, name: 'Posición 2: Delantero Derecho', role: 'Opuesto o Armador Delantero', desc: 'Defiende y remata por la banda derecha. Si es armador, coloca para sus compañeros.' },
    { pos: 5, name: 'Posición 5: Zaguero Izquierdo', role: 'Defensa de Fondo / Recepción', desc: 'Cubre los balones cruzados que superan el bloqueo y recibe el saque rival.' },
    { pos: 6, name: 'Posición 6: Zaguero Centro', role: 'Defensa Central / Líbero', desc: 'Defiende balones de toque suave y remates al fondo de la cancha.' },
    { pos: 1, name: 'Posición 1: Zaguero Derecho', role: 'Zona de Saque / Defensa', desc: '¡El jugador en esta posición es quien realiza el saque detrás de la línea de fondo!' },
  ];

  // Calculate student overall progress
  const completedList = currentUser?.completedLessons || [];
  const totalLessonsCount = VOLLEYBALL_COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const progressPercent = Math.round((completedList.length / totalLessonsCount) * 100);

  const handleSelectLesson = (lesson: CourseLesson, modId: string) => {
    setSelectedModuleId(modId);
    setSelectedLesson(lesson);
    setLessonQuizAnswer(null);
    setLessonQuizSubmitted(false);
    setIsTakingExam(false);
  };

  const handleLessonQuizSubmit = () => {
    if (lessonQuizAnswer === null) return;
    setLessonQuizSubmitted(true);

    if (lessonQuizAnswer === selectedLesson.quiz.correctIndex) {
      soundManager.playCorrect();
      markLessonCompleted(selectedLesson.id);
    } else {
      soundManager.playWrong();
    }
  };

  // Exam Logic
  const handleStartExam = () => {
    soundManager.init();
    setIsTakingExam(true);
    setExamCurrentIndex(0);
    setExamAnswers({});
    setExamFinished(false);
  };

  const handleSelectExamAnswer = (answerIdx: number) => {
    setExamAnswers((prev) => ({ ...prev, [examCurrentIndex]: answerIdx }));
  };

  const handleNextExamQuestion = () => {
    if (examCurrentIndex < GRADUATION_EXAM_QUESTIONS.length - 1) {
      setExamCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      GRADUATION_EXAM_QUESTIONS.forEach((q, idx) => {
        if (examAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });
      const score = Math.round((correctCount / GRADUATION_EXAM_QUESTIONS.length) * 100);
      setExamScorePercentage(score);
      setExamFinished(true);

      if (score >= 70) {
        soundManager.playVictory();
        awardCertificate(score);
      } else {
        soundManager.playWrong();
      }
    }
  };

  return (
    <div id="volleyballCourseContainer" className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Course Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 border border-indigo-700/60 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                CURSO OFICIAL 6TO DE PRIMARIA
              </span>
              <span className="text-xs text-indigo-200 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Educación Física Acreditada</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display leading-tight">
              Academia de Voleibol Escolar
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-2 leading-relaxed">
              Aprende la historia, las medidas exactas de la cancha, los 5 fundamentos técnicos, las reglas del juego y realiza el examen de graduación para recibir tu <strong>Certificado de Culminación</strong> oficial.
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full sm:w-auto bg-slate-950/70 border border-indigo-800/80 p-4 rounded-2xl flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Tu Progreso del Curso</span>
              <span className="text-amber-400 font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{completedList.length} de {totalLessonsCount} lecciones</span>
              {currentUser?.courseCompleted && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Graduado
                </span>
              )}
            </div>

            {currentUser?.courseCompleted ? (
              <button
                id="viewMyCertificateBtn"
                onClick={onViewCertificate}
                className="mt-1 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Ver Mi Certificado Oficial</span>
              </button>
            ) : (
              <button
                id="goToFinalExamBtn"
                onClick={handleStartExam}
                className="mt-1 w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Rendir Examen de Graduación</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Module Browser or Exam Mode */}
      {isTakingExam ? (
        /* EXAM VIEW */
        <div id="graduationExamCard" className="w-full bg-slate-900 border-2 border-indigo-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {!examFinished ? (
            <div className="space-y-6">
              {/* Exam Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl font-black">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Examen Final de Graduación en Voleibol
                    </h3>
                    <p className="text-xs text-indigo-300">
                      Pregunta {examCurrentIndex + 1} de {GRADUATION_EXAM_QUESTIONS.length} • Necesitas 70% para obtener tu Certificado
                    </p>
                  </div>
                </div>

                <button
                  id="cancelExamBtn"
                  onClick={() => setIsTakingExam(false)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800"
                >
                  Volver a las Clases
                </button>
              </div>

              {/* Current Question */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md mb-2 inline-block">
                  {GRADUATION_EXAM_QUESTIONS[examCurrentIndex].category}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {GRADUATION_EXAM_QUESTIONS[examCurrentIndex].question}
                </h4>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {GRADUATION_EXAM_QUESTIONS[examCurrentIndex].options.map((opt, idx) => {
                    const isSelected = examAnswers[examCurrentIndex] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectExamAnswer(idx)}
                        className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-700/80 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <span>{opt}</span>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected ? 'border-amber-400 bg-amber-400 text-slate-950 font-black' : 'border-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  id="nextExamQuestionBtn"
                  disabled={examAnswers[examCurrentIndex] === undefined}
                  onClick={handleNextExamQuestion}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 disabled:opacity-40 text-slate-950 font-black text-sm shadow transition flex items-center gap-2"
                >
                  <span>
                    {examCurrentIndex === GRADUATION_EXAM_QUESTIONS.length - 1
                      ? 'Finalizar y Calificar Examen'
                      : 'Siguiente Pregunta'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* EXAM RESULTS */
            <div className="text-center py-6 space-y-5 animate-scale-in">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl shadow-2xl border-4 border-amber-400 bg-amber-400/20">
                {examScorePercentage >= 70 ? '🎖️' : '📚'}
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  EVALUACIÓN CULMINADA
                </span>
                <h3 className="text-3xl font-black text-white font-display mt-1">
                  {examScorePercentage >= 70 ? '¡FELICITACIONES, APROBASTE!' : '¡Buen intento! Puedes repasar y volver a intentarlo'}
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Calificación Obtenida: <strong className="text-amber-400 text-xl">{examScorePercentage}%</strong> (Mínimo requerido: 70%)
                </p>
              </div>

              {examScorePercentage >= 70 ? (
                <div className="max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/40 p-5 rounded-2xl text-left space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Certificado Oficial Emitido Exitosamente</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tu nombre <strong>{currentUser?.name}</strong> ha sido acreditado en el Registro de Honor de Voleibol Escolar de 6to Grado.
                  </p>
                  <button
                    id="openGeneratedCertificateBtn"
                    onClick={onViewCertificate}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow transition flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Ver y Descargar Certificado de Culminación</span>
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto bg-rose-500/10 border border-rose-500/40 p-4 rounded-2xl text-xs text-rose-200">
                  <p>Te faltaron algunos aciertos para llegar al 70%. Revisa los 4 módulos de clase y ¡vuelve a presentar el examen cuando estés listo!</p>
                  <button
                    onClick={handleStartExam}
                    className="mt-3 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                  >
                    Repetir Examen Ahora
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* LESSONS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Modules & Lessons Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Módulos de Aprendizaje
            </h3>

            {VOLLEYBALL_COURSE_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <div className="bg-slate-950/80 p-3.5 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 text-xs font-black flex items-center justify-center border border-indigo-500/30">
                      {mod.number}
                    </span>
                    <span className="text-xs font-bold text-white font-display line-clamp-1">
                      {mod.title}
                    </span>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  {mod.lessons.map((les) => {
                    const isCompleted = completedList.includes(les.id);
                    const isActive = selectedLesson.id === les.id;
                    return (
                      <button
                        key={les.id}
                        onClick={() => handleSelectLesson(les, mod.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between group ${
                          isActive
                            ? 'bg-amber-400/20 border border-amber-400 text-amber-300 font-bold'
                            : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                          )}
                          <span className="line-clamp-1">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 group-hover:text-slate-400 shrink-0">
                          {les.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Exam Launcher CTA */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border-2 border-amber-400/60 p-4 rounded-2xl text-center space-y-2.5 mt-2">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>¿Listo para tu Certificado?</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Completa las lecciones o toma el examen final para recibir tu Diploma Oficial.
              </p>
              <button
                id="examLauncherSidebarBtn"
                onClick={handleStartExam}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow hover:from-amber-300 hover:to-amber-400 transition flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Comenzar Examen de Certificación</span>
              </button>
            </div>
          </div>

          {/* Right Main Lesson Viewer */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
            {/* Lesson Title & Meta */}
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Lección de Voleibol Escolar</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedLesson.duration}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                {selectedLesson.title}
              </h3>
              <p className="text-xs text-indigo-300 mt-1.5 leading-relaxed font-medium">
                {selectedLesson.summary}
              </p>
            </div>

            {/* If Module 2 Lesson 2: Interactive Volleyball Court Diagram */}
            {selectedLesson.id === 'les-2-2' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Simulador Interactivo de las 6 Posiciones y Rotación</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">Toca cada posición para aprender su función:</span>
                </div>

                {/* Volleyball Half-Court Diagram */}
                <div className="relative aspect-[16/10] max-h-[260px] w-full bg-amber-500/20 rounded-2xl border-2 border-amber-400/70 p-3 flex flex-col justify-between overflow-hidden">
                  {/* Top: Net representation */}
                  <div className="w-full bg-slate-200 text-slate-900 font-black text-[10px] text-center py-1 rounded shadow">
                    RED CENTRAL ( ZONA DE ATAQUE )
                  </div>

                  {/* 3m Attack line */}
                  <div className="w-full border-b-2 border-dashed border-white/60 my-1 text-[10px] text-white/70 text-right pr-2">
                    Línea de 3 metros (Delanteros / Zagueros)
                  </div>

                  {/* Player Positions Grid */}
                  <div className="grid grid-cols-3 gap-2 h-full py-1">
                    {/* Delanteros (Pos 4, 3, 2) */}
                    <button
                      onClick={() => setInspectPosition(4)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 4 ? 'bg-cyan-500 text-slate-950 border-white' : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      <span className="text-base font-black">4</span>
                      <span className="text-[9px]">Delantero Izq.</span>
                    </button>

                    <button
                      onClick={() => setInspectPosition(3)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 3 ? 'bg-cyan-500 text-slate-950 border-white' : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      <span className="text-base font-black">3</span>
                      <span className="text-[9px]">Delantero Centro</span>
                    </button>

                    <button
                      onClick={() => setInspectPosition(2)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 2 ? 'bg-cyan-500 text-slate-950 border-white' : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      <span className="text-base font-black">2</span>
                      <span className="text-[9px]">Delantero Der.</span>
                    </button>

                    {/* Zagueros (Pos 5, 6, 1) */}
                    <button
                      onClick={() => setInspectPosition(5)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 5 ? 'bg-amber-400 text-slate-950 border-white' : 'bg-slate-900/80 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      <span className="text-base font-black">5</span>
                      <span className="text-[9px]">Zaguero Izq.</span>
                    </button>

                    <button
                      onClick={() => setInspectPosition(6)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 6 ? 'bg-amber-400 text-slate-950 border-white' : 'bg-slate-900/80 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      <span className="text-base font-black">6</span>
                      <span className="text-[9px]">Zaguero Centro (Líbero)</span>
                    </button>

                    <button
                      onClick={() => setInspectPosition(1)}
                      className={`rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition ${
                        inspectPosition === 1 ? 'bg-amber-400 text-slate-950 border-white' : 'bg-slate-900/80 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      <span className="text-base font-black">1</span>
                      <span className="text-[9px]">Zaguero Der. (SAQUE)</span>
                    </button>
                  </div>

                  <div className="w-full bg-slate-950/80 text-[10px] text-center text-slate-400 py-0.5 rounded">
                    Línea de fondo (Atrás de Posición 1 se saca el balón)
                  </div>
                </div>

                {/* Inspected details card */}
                {(() => {
                  const item = COURT_POSITIONS.find((p) => p.pos === inspectPosition);
                  if (!item) return null;
                  return (
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                      <div className="font-bold text-amber-300">{item.name}</div>
                      <div className="text-slate-300 font-semibold mt-0.5">{item.role}</div>
                      <div className="text-slate-400 mt-1">{item.desc}</div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {selectedLesson.content.map((paragraph, idx) => (
                <p key={idx} className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Rules Callout */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Puntos Clave para tu Examen de 6to Grado:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedLesson.keyRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini Lesson Quiz (Comprobación de Lectura) */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Pregunta de Comprobación de la Lección</span>
              </div>

              <h4 className="text-sm font-bold text-white">
                {selectedLesson.quiz.question}
              </h4>

              <div className="space-y-2">
                {selectedLesson.quiz.options.map((opt, idx) => {
                  const isSelected = lessonQuizAnswer === idx;
                  const isCorrect = idx === selectedLesson.quiz.correctIndex;
                  return (
                    <button
                      key={idx}
                      disabled={lessonQuizSubmitted}
                      onClick={() => setLessonQuizAnswer(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                        lessonQuizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : isSelected
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                          : isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      <span className="text-[10px] text-slate-500">
                        Opción {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {!lessonQuizSubmitted ? (
                <button
                  id="submitLessonQuizBtn"
                  disabled={lessonQuizAnswer === null}
                  onClick={handleLessonQuizSubmit}
                  className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-xs shadow transition"
                >
                  Confirmar Respuesta y Marcar Lección Completada
                </button>
              ) : (
                <div
                  className={`p-3 rounded-xl text-xs ${
                    lessonQuizAnswer === selectedLesson.quiz.correctIndex
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                      : 'bg-rose-500/20 border border-rose-500 text-rose-300'
                  }`}
                >
                  <p className="font-bold">
                    {lessonQuizAnswer === selectedLesson.quiz.correctIndex
                      ? '¡Excelente! Has comprendido el concepto.'
                      : '¡Casi! Repasa la explicación:'}
                  </p>
                  <p className="mt-1">{selectedLesson.quiz.explanation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
