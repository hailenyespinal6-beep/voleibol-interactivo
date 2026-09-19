import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { VolleyballGame } from './components/VolleyballGame';
import { VolleyballCourse } from './components/VolleyballCourse';
import { CertificateView } from './components/CertificateView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'game' | 'course' | 'certificate'>('game');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 p-3 sm:p-6 flex flex-col items-center">
        {activeTab === 'game' && (
          <VolleyballGame onGoToCourse={() => setActiveTab('course')} />
        )}

        {activeTab === 'course' && (
          <VolleyballCourse onViewCertificate={() => setActiveTab('certificate')} />
        )}

        {activeTab === 'certificate' && (
          <CertificateView onGoToCourse={() => setActiveTab('course')} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print w-full py-4 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VoleiEdu 6to • Academia de Voleibol y Educación Física Escolar</span>
          <span className="text-slate-600">Partidos a 10 Puntos • Trivias Deportivas • Certificados Oficiales</span>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenCertificate={() => setActiveTab('certificate')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
