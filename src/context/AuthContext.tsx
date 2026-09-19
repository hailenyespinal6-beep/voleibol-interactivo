import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentUser } from '../types';

interface AuthContextType {
  currentUser: StudentUser | null;
  login: (email: string, pass: string) => { success: boolean; message: string };
  register: (name: string, email: string, pass: string, grade?: string, avatar?: string) => { success: boolean; message: string };
  quickLoginAsGuest: () => void;
  logout: () => void;
  updateUserStats: (updates: Partial<StudentUser>) => void;
  markLessonCompleted: (lessonId: string) => void;
  awardCertificate: (score: number) => string;
}

const STORAGE_KEY_CURRENT_USER = 'volei_current_student';
const STORAGE_KEY_ALL_USERS = 'volei_registered_students';

const DEFAULT_GUEST: StudentUser = {
  id: 'guest-std-1',
  name: 'Mateo Morales',
  email: 'mateo.6to@colegio.edu',
  grade: '6to Grado de Primaria',
  avatar: '🏐 Atacante',
  totalPoints: 24,
  matchesPlayed: 4,
  matchesWon: 3,
  courseCompleted: false,
  completedLessons: ['les-1-1', 'les-1-2'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_GUEST;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
        // Also sync in all users directory
        const allSaved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
        const usersList: Array<StudentUser & { pass?: string }> = allSaved ? JSON.parse(allSaved) : [];
        const idx = usersList.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
        if (idx >= 0) {
          usersList[idx] = { ...usersList[idx], ...currentUser };
        } else {
          usersList.push(currentUser);
        }
        localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(usersList));
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch {
      // Catch storage quota
    }
  }, [currentUser]);

  const login = (email: string, pass: string) => {
    if (!email || !pass) {
      return { success: false, message: 'Por favor completa todos los campos' };
    }
    try {
      const allSaved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      const usersList: Array<StudentUser & { pass?: string }> = allSaved ? JSON.parse(allSaved) : [];
      const found = usersList.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

      if (!found) {
        // If it's the demo account
        if (email.trim().toLowerCase() === DEFAULT_GUEST.email.toLowerCase()) {
          setCurrentUser(DEFAULT_GUEST);
          return { success: true, message: '¡Bienvenido de nuevo!' };
        }
        return { success: false, message: 'No existe una cuenta registrada con este correo' };
      }

      if (found.pass && found.pass !== pass) {
        return { success: false, message: 'La contraseña ingresada es incorrecta' };
      }

      // Login success
      const { pass: _, ...userData } = found;
      setCurrentUser(userData);
      return { success: true, message: `¡Bienvenido de nuevo, ${userData.name}!` };
    } catch {
      return { success: false, message: 'Ocurrió un error al procesar el ingreso' };
    }
  };

  const register = (name: string, email: string, pass: string, grade: string = '6to Grado de Primaria', avatar: string = '🏐 Atacante') => {
    if (!name.trim() || !email.trim() || !pass.trim()) {
      return { success: false, message: 'Por favor ingresa nombre, correo y contraseña' };
    }
    if (pass.length < 4) {
      return { success: false, message: 'La contraseña debe tener al menos 4 caracteres' };
    }

    try {
      const allSaved = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      const usersList: Array<StudentUser & { pass?: string }> = allSaved ? JSON.parse(allSaved) : [];
      const exists = usersList.some(u => u.email.toLowerCase() === email.trim().toLowerCase());

      if (exists) {
        return { success: false, message: 'Ya existe un estudiante registrado con este correo' };
      }

      const newUser: StudentUser & { pass: string } = {
        id: 'std-' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        grade: grade || '6to Grado de Primaria',
        avatar: avatar || '🏐 Atacante',
        totalPoints: 0,
        matchesPlayed: 0,
        matchesWon: 0,
        courseCompleted: false,
        completedLessons: [],
        pass: pass.trim()
      };

      usersList.push(newUser);
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(usersList));

      const { pass: _, ...cleanUser } = newUser;
      setCurrentUser(cleanUser);
      return { success: true, message: `¡Cuenta creada con éxito! Bienvenido(a), ${name}!` };
    } catch {
      return { success: false, message: 'Error al registrar la cuenta en el navegador' };
    }
  };

  const quickLoginAsGuest = () => {
    setCurrentUser({
      ...DEFAULT_GUEST,
      id: 'guest-' + Date.now(),
      name: 'Estudiante de 6to A',
      email: 'alumno.6toa@escuela.edu',
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserStats = (updates: Partial<StudentUser>) => {
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const markLessonCompleted = (lessonId: string) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const completed = new Set(prev.completedLessons || []);
      completed.add(lessonId);
      return {
        ...prev,
        completedLessons: Array.from(completed)
      };
    });
  };

  const awardCertificate = (score: number) => {
    const certId = 'CERT-VOLEI-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + new Date().getFullYear();
    const certDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        courseCompleted: true,
        examScore: score,
        certificateId: certId,
        certificateDate: certDate,
        totalPoints: prev.totalPoints + 50
      };
    });

    return certId;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        quickLoginAsGuest,
        logout,
        updateUserStats,
        markLessonCompleted,
        awardCertificate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
